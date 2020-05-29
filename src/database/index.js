const Sequelize = require('sequelize');
const mongoose = require('mongoose');

const User = require('../app/models/User');
const File = require('../app/models/File');
const Appointment = require('../app/models/Appointment');
const databaseConfig = require('../config/database');

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb+srv://gobarber:yf1XNfLRDDCZ8Sv@cluster0-cz7qq.mongodb.net/test?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
      }
    );
  }
}
module.exports = new Database();
