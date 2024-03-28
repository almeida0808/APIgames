const knex = require("../database/knex");

class TagsController {
  async index(request, response) {
    const { user_id } = request.params;

    const tags = await knex("tagsGames").where({ user_id }).orderBy("name");

    return response.json(tags);
  }
}
module.exports = TagsController;
