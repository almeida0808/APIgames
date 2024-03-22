const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const {hash} = require("bcryptjs")

class UsersControllers {
  async create(request, response) {
    const { name, email, password } = request.body;
    const verifyEmail = await knex("users").where("email", email).first();


    if (!name) { // sem nome não cadastra
      throw new AppError("O nome do usuário é obrigatorio");
    }
    if (verifyEmail) { // email repetido não cadastra
      throw new AppError("Este email já está cadastrado");
    }

    const hashedPassword = await hash(password, 8)
    
    await knex("users").insert({
      name,
      email,
      password:hashedPassword
    });

    response.status(201).json();
  }

  async update(request, response){
    const {name, password,email} = request.body
    const {id} = request.params

    if(password){
throw new AppError("função de alterar senha em desenvolvimento")
    }
   
  }

  async delete(request, response){

  }

}

module.exports = UsersControllers;
