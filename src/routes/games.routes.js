const {Router} = require("express")
const gamesRoutes = Router()

const GamesControllers = require("../controllers/GamesController")
const gamesControllers = new GamesControllers()

gamesRoutes.post("/:user_id", gamesControllers.create)

module.exports = gamesRoutes