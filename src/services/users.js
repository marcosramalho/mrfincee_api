module.exports = (app) => {
  const findAll = () => {
    return app.db('user').select();
  };

  const save = (user) => {
    if (!user.use_username) return { error: 'Username é obrigatório' };
    if (!user.use_email) return { error: 'Email é obrigatório' };

    return app.db('user').insert(user, '*');
  };

  return { findAll, save };
};
