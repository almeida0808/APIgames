exports.up = knex => knex.schema.createTable("tagsGames" , table => {
table.text("name").notNullable()

table.integer('user_id').references('id').inTable("users")
table.integer('game_id').references('id').inTable("notesGames").onDelete("CASCADE")

}) 

exports.down = knex => knex.schema.dropTable("notesGames")
