const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const findAll = (filter = {}) => {
    return app.db('user').where(filter).select();
  };

  const save = async (user) => {
    if (!user.use_username) {
      throw new ValidationError('Username é obrigatório');
    }
    if (!user.use_email) {
      throw new ValidationError('Email é obrigatório');
    }
    if (!user.use_name) {
      throw new ValidationError('Nome é obrigatório');
    }
    if (!user.use_last_name) {
      throw new ValidationError('Sobrenome é obrigatório');
    }
    if (!user.use_password) {
      throw new ValidationError('Senha é obrigatório');
    }
    if (!user.use_createdAt) {
      throw new ValidationError('Data de criação é obrigatório');
    }

    const usernameDB = await findAll({ use_username: user.use_username });
    if (usernameDB && usernameDB.length > 0) {
      throw new ValidationError('Já existe um usuário com esse username');
    }

    const emailDB = await findAll({ use_email: user.use_email });
    if (emailDB && emailDB.length > 0) {
      throw new ValidationError('Já existe um usuário com esse email');
    }

    return app.db('user').insert(user, '*');
  };

  return { findAll, save };
};
