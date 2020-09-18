"use strict";

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.post("users", "UserController.store");
Route.post("sessions", "SessionController.store");

Route.group(() => {
  Route.resource("teams", "TeamController").apiOnly();
}).middleware("auth");

Route.group(() => {
  Route.post("invites", "InviteController.store");
  Route.resource("projects", "ProjectController").apiOnly;
}).middleware(["auth", "team"]);
