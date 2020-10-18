const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const findAll = (filter = {}) => {
    return app.db('category').where(filter).select();
  };

  const save = async (category) => {
    if (!category.cat_name) {
      throw new ValidationError('Nome é obrigatório');
    }
    if (!category.cat_description) {
      throw new ValidationError('Descrição é obrigatório');
    }

    const categoryDB = await findAll({ cat_name: category.cat_name });

    if (categoryDB && categoryDB.length > 0) {
      throw new ValidationError('Já existe uma categoria com esse nome');
    }

    return app.db('category').insert(category, '*');
  };

  return { findAll, save };
};
