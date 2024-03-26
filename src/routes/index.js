const { Router } = require("express");

const usersRouter = require("./users.routes");
const gamesRoutes = require("./games.routes");

const routes = Router()

routes.use("/users", usersRouter)
routes.use("/games", gamesRoutes)

module.exports = routes