const Appointment = require('../models/Appointment');
const User = require('../models/User');
const File = require('../models/File');

const CreateAppointmentService = require('../services/CreateAppointmentService');
const CancelAppointmentService = require('../services/CancelAppointmentService');

const Cache = require('../../lib/Cache');

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const cacheKey = `user:${req.userId}:appointments:${page}`;

    const cached = await Cache.get(cacheKey);

    if (cached) {
      return res.json(cached);
    }

    const appointments = await Appointment.findAll({
      where: {
        user_id: req.userId,
        canceled_at: null,
      },
      attributes: ['id', 'date', 'past', 'cancelable'],
      order: ['date'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    await Cache.set(cacheKey, appointments);

    return res.json(appointments);
  }
  async store(req, res) {
    const { provider_id, date } = req.body;

    const appointment = await CreateAppointmentService.run({
      provider_id,
      user_id: req.userId,
      date,
    });

    return res.json(appointment);
  }
  async delete(req, res) {
    const appointment = CancelAppointmentService.run({
      provider_id: req.params.id,
      user_id: req.userId,
    });
    return res.json(appointment);
  }
}

module.exports = new AppointmentController();
