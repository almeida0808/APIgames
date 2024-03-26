const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class GamesControllers {
  async create(request, response) {
    const { user_id } = request.params;
    const { title, description, rating, tags } = request.body;

    const userVerify = await knex("users").where("id", user_id).first()

    if(!userVerify){ 
        throw new AppError("Não foi possivel concluir, usuário não existe.");
    }

    if (rating > 5 || rating < 0) {
        throw new AppError("Adicione uma nota valida, com o valor de 0 a 5");
    }

    const [game_id] = await knex("notesGames").insert({
      title,
      user_id,
      description,
      rating,
    });

    const insertTags = tags.map(name => {
        return{
            game_id, 
            name, 
            user_id
        }
    })

    await knex("tagsGames").insert(insertTags)

    return response.json();
  }
}

module.exports = GamesControllers;
