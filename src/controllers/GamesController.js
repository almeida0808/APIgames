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

    const game = await knex("notesGames").where({ id }).first();

    const tags = await knex("tagsGames").where({ game_id: id }).orderBy("name");

    if (!game) {
      throw new AppError("Ops... Essa nota não existe.");
    }
    return response.json({ ...game, tags });
  }

  async delete(request, response) {
    const { id } = request.params;

    const game = await knex("notesGames").where({ id });

    if (!game) {
      throw new AppError("Ops... Essa nota não existe.");
    }

    response.json();
  }

  async index(request, response) {
    const { user_id, title, tags } = request.query;

    let games;

    if (tags) {
      const filterTags = tags.split(",").map((tag) => tag.trim()); // esse filter tags cria um array dessa maneira ["tag1", "tag2"]

      games = await knex("tagsGames")
        .select(["notesGames.id", "notesGames.title", "notesGames.user_id"])
        .where("notesGames.user_id", user_id)
        .whereLike("notesGames.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("notesGames", "notesGames.id", "tagsGames.game_id")
        .orderBy("notesGames.title");
    } else {
      games = await knex("notesGames")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title");
    }

    const userTags = await knex("tagsGames").where({ user_id });

    const GamesWithTags = games.map((game) => {
      const gameTags = userTags.filter((tag) => tag.game_id === game.id); // mostra apenas as tags que estajam vinvuladas cons os games que foram pesquisados

      return {
        ...game,
        tags: gameTags,
      };
    });

    return response.json({ GamesWithTags });
  }
}

module.exports = GamesControllers;
