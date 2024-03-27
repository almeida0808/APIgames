const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const { query } = require("express");

class GamesControllers {
  async create(request, response) {
    const { user_id } = request.params;
    const { title, description, rating, tags } = request.body;

    const userVerify = await knex("users").where("id", user_id).first();

    if (!userVerify) {
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

    const insertTags = tags.map((name) => {
      return {
        game_id,
        name,
        user_id,
      };
    });

    await knex("tagsGames").insert(insertTags);

    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const game = await knex("notesGames").where({id}).first()

  const tags = await knex("tagsGames").where({game_id: id}).orderBy("name")
    if(!game){
      throw new AppError("Ops... Essa nota não existe.")
    }
    return response.json({...note,
    tags})
  }

  async delete(request,response){
    const {id} = request.params

    const game = await knex("notesGames").where({id}).delete()

    if(!game){
      throw new AppError("Ops... Essa nota não existe.")
    }
 
    response.json()
  }

  async index(request, response){
    const {user_id} = request.query

    const games = await knex("notesGames").where({user_id}).orderBy("title")

    response.json({games})
  }
}

module.exports = GamesControllers;
