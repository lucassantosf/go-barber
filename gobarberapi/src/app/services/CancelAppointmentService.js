const { isBefore, subHours } = require('date-fns');

const User = require('../models/User');
const Appointment = require('../models/Appointment');

const Cache = require('../../lib/Cache');

class CancelAppointmentService {
  async run({ provider_id, user_id, date }) {
    const appointment = await Appointment.findByPk(provider_id, {
      include: [
        { model: User, as: 'provider', attributes: ['name', 'email'] },
        { model: User, as: 'user', attributes: ['name', 'email'] },
      ],
    });
    if (appointment.user_id !== user_id) {
      throw new Error("You don't have permission to cancel this appointment");
    }

    const dateWithSub = subHours(appointment.date, 2);

    if (isBefore(dateWithSub, new Date())) {
      throw new Error('You can only cancel appointments 2 hours in advance');
    }

    appointment.canceled_at = new Date()
      .toJSON()
      .slice(0, 19)
      .replace('T', ' ');

    await appointment.save();

    // Invalidate cache
    await Cache.invalidatePrefix(`user:${user_id}:appointment`);

    return appointment;
  }
}

module.exports = new CancelAppointmentService();
