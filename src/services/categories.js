module.exports = (app) => {
  const findAll = () => {
    return app.db('category').select();
  };

  const save = (category) => {
    return app.db('category').insert(category, '*');
  };

  return { findAll, save };
};
