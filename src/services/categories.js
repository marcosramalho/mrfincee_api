module.exports = (app) => {
  const findAll = () => {
    return app.db('category').select();
  };

  const save = (category) => {
    if (!category.cat_name) return { error: 'Nome é obrigatório' };
    if (!category.cat_description) return { error: 'Descrição é obrigatório' };
    return app.db('category').insert(category, '*');
  };

  return { findAll, save };
};
