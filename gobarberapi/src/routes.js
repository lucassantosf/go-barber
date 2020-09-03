const { Router } = require('express');
const Brute = require('express-brute');
const BruteRedis = require('express-brute-redis');
const multer = require('multer');
const multerConfig = require('./config/multer');

const UserController = require('./app/controllers/UserController');
const FileController = require('./app/controllers/FileController');
const SessionController = require('./app/controllers/SessionController');
const ProviderController = require('./app/controllers/ProviderController');
const AppointmentController = require('./app/controllers/AppointmentController');
const ScheduleController = require('./app/controllers/ScheduleController');
const NotificationController = require('./app/controllers/NotificationController');
const AvailableController = require('./app/controllers/AvailableController');

const validateUserStore = require('./app/validators/UserStore');
const validateUserUpdate = require('./app/validators/UserUpdate');
const validateSessionStore = require('./app/validators/SessionStore');
const validateAppointmentStore = require('./app/validators/AppointmentStore');

const authMiddleware = require('./app/middlewares/auth');

const routes = new Router();
const upload = multer(multerConfig);

const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const bruteForce = new Brute(bruteStore);

routes.post('/users', validateUserStore, UserController.store);
routes.post(
  '/sessions',
  bruteForce.prevent,
  validateSessionStore,
  SessionController.store
);

routes.use(authMiddleware);

routes.put('/users', validateUserUpdate, UserController.update);
routes.post('/files', upload.single('file'), FileController.store);

routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

routes.get('/appointments', AppointmentController.index);
routes.post(
  '/appointments',
  validateAppointmentStore,
  AppointmentController.store
);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/schedules', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

module.exports = routes;
