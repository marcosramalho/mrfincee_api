module.exports = (app) => {
  const findAll = (filter = {}) => {
    return app.db('user').where(filter).select();
  };

  const save = async (user) => {
    if (!user.use_username) return { error: 'Username é obrigatório' };
    if (!user.use_email) return { error: 'Email é obrigatório' };
    if (!user.use_name) return { error: 'Nome é obrigatório' };
    if (!user.use_last_name) return { error: 'Sobrenome é obrigatório' };
    if (!user.use_password) return { error: 'Senha é obrigatório' };
    if (!user.use_createdAt) return { error: 'Data de criação é obrigatório' };

    const userDB = await findAll({ use_username: user.use_username });
    if (userDB && userDB.length > 0) {
      return { error: 'Já existe um usuário com esse username' };
    }
    return app.db('user').insert(user, '*');
  };

  return { findAll, save };
};
