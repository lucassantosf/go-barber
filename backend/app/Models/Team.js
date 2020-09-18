"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Team extends Model {
  users() {
    return this.belongsToMany("App/Models/User").pivotModel(
      "App/Models/UserTeam"
    );
  }

  projects() {
    return this.hasMany("App/Models/Project");
  }
}

module.exports = Team;
