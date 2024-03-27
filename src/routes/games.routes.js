const {Router} = require("express")
const gamesRoutes = Router()

const GamesControllers = require("../controllers/GamesController")
const gamesControllers = new GamesControllers()

gamesRoutes.post("/:user_id", gamesControllers.create)

gamesRoutes.get("/:id", gamesControllers.show)

gamesRoutes.get("/", gamesControllers.index)

gamesRoutes.delete("/:id", gamesControllers.delete)


module.exports = gamesRoutes