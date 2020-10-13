module.exports = (app) => {
  const findAll = () => {
    return app.db('category').select();
  };

  const save = (category) => {
    if (!category.cat_name) return { error: 'Nome é obrigatório' };
    return app.db('category').insert(category, '*');
  };

  return { findAll, save };
};
