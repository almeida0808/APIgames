const { Router } = require("express");

const usersRouter = require("./users.routes");
const gamesRoutes = require("./games.routes");
const tagsRoutes = require("./tags.routes");

const routes = Router()

routes.use("/users", usersRouter)
routes.use("/games", gamesRoutes)
routes.use("/tags", tagsRoutes)
module.exports = routes