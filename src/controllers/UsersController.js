const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const { hash, compare } = require("bcryptjs");

class UsersControllers {
  async create(request, response) {
    const { name, email, password } = request.body;
    const verifyEmail = await knex("users").where("email", email).first();

    if (!name) {
      // sem nome não cadastra
      throw new AppError("O nome do usuário é obrigatorio");
    }
    if (verifyEmail) {
      // email repetido não cadastra
      throw new AppError("Este email já está cadastrado");
    }

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    });

    response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    const user = await knex("users").where({ id }).first();

    if (!user) {
      throw new AppError("Esse usuário não existe");
    }


/// criamos uma verificação pra ver se oo usuário deseja atualizar seu email, tirando o bug de não conseguir alterar outras informações sem colocar um email
    if (email && user.email !== email) {// se tiver um novo email passado, ele verifica se o email antigo(user.email) é = ao novo email(email)
      const userWithUpdatedEmail = await knex("users")
          .where("email", email)
          .first();
  
      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
          throw new AppError("Esse email está em uso");
          
      }

    user.email = email;
  }

  if (name) {
    user.name = name;
}


    if (password && !old_password) {
      throw new AppError("Digite sua senha antiga");
    }

    if (password && old_password) {
     

      const old_passwordCorrect = await compare(old_password, user.password);

      if (!old_passwordCorrect) {
        throw new AppError("Digite uma senha válida");
      }

      user.password = await hash(password, 8);
    }

    await knex("users")
      .where({ id })
      .update({
        email: user.email,
        name: user.name,
        password: user.password,
        updated_at: knex.raw("DATETIME('now')"),
      });
    response.json();
  }

  async delete(request, response) {
    const { id } = request.params;
    await knex("users").where({ id }).delete();

    response.json();
  }
}

module.exports = UsersControllers;
