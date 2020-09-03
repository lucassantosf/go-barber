const { startOfHour, parseISO, isBefore, format } = require('date-fns');
const pt = require('date-fns/locale/pt');

const User = require('../models/User');
const Appointment = require('../models/Appointment');
const Notification = require('../schemas/Notification');

const Cache = require('../../lib/Cache');

class CreateAppointmentService {
  async run({ provider_id, user_id, date }) {
    /* Check if provider_id is a provider */
    const checkIsProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!checkIsProvider) {
      throw new Error('You can only create appointments with providers');
    }

    /* Check for past dates */
    const hourStart = startOfHour(parseISO(date));
    if (isBefore(hourStart, new Date())) {
      throw new Error('Past Date is not permitted');
    }

    /* Check date availability */
    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });
    if (checkAvailability) {
      throw new Error('Appointment date is not available');
    }

    const appointment = await Appointment.create({
      user_id,
      provider_id,
      date,
    });

    /* Notify appointment provider */
    const user = await User.findByPk(user_id);
    const formattedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM, 'às' H:mm'h'",
      { locale: pt }
    );

    await Notification.create({
      content: `Novo agendamento de ${user.name} para dia ${user.formattedDate} `,
      user: provider_id,
    });

    // Invalidate cache
    await Cache.invalidatePrefix(`user:${user.id}:appointment`);

    return appointment;
  }
}

module.exports = new CreateAppointmentService();
