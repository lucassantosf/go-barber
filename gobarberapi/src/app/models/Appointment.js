const Sequelize = require('sequelize');
const { Model } = Sequelize;
const { isBefore, subHours } = require('date-fns');

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.STRING,
        canceled_at: Sequelize.STRING,
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.date, new Date());
          },
        },
        cancelable: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(new Date(), subHours(this.date, 2));
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}
module.exports = Appointment;
