module.exports = (app) => {
  const findAll = () => {
    return app.db('user').select();
  };

  const save = (user) => {
    if (!user.use_username) return { error: 'Username é obrigatório' };
    if (!user.use_email) return { error: 'Email é obrigatório' };
    if (!user.use_name) return { error: 'Nome é obrigatório' };
    if (!user.use_last_name) return { error: 'Sobrenome é obrigatório' };
    if (!user.use_password) return { error: 'Senha é obrigatório' };
    if (!user.use_createdAt) return { error: 'Data de criação é obrigatório' };

    return app.db('user').insert(user, '*');
  };

  return { findAll, save };
};
