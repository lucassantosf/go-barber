"use strict";

const User = use("App/Models/User");
const Role = use("Adonis/Models/Role");
const Permission = use("Adonis/Models/Permission");

class DatabaseSeeder {
  async run() {
    const user = await User.create({
      name: "Lucas",
      email: "lucas@gmail.com",
      password: "123456",
    });

    const createInvite = await Permission.create({
      slug: "invites_create",
      name: "Convidar membros",
    });

    const createProject = await Permission.create({
      slug: "projects_create",
      name: "Criar projetos",
    });

    const admin = await Role.create({
      slug: "administrator",
      name: "Administrador",
    });

    const moderator = await Role.create({
      slug: "moderator",
      name: "Moderador",
    });

    await Role.create({
      slug: "visitor",
      name: "Visitante",
    });

    await admin.permission().attach([createInvite.id, createProject.id]);
    await moderator.permission().attach([createProject.id]);

    const team = await user.teams().create({
      name: "teammaster",
      user_id: user.id,
    });

    const teamJoin = await user.teamJoins().where("team_id", team.id).first();

    await teamJoin.roles().attach([admin.id]);
  }
}

module.exports = DatabaseSeeder;
