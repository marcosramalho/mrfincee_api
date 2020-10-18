const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const create = (entry) => {
    if (!entry.ent_name) {
      throw new ValidationError('Nome é obrigatório');
    }
    if (!entry.ent_amount) {
      throw new ValidationError('Valor é obrigatório');
    }
    if (!entry.ent_type) {
      throw new ValidationError('Tipo é obrigatório');
    }
    if (!entry.ent_description) {
      throw new ValidationError('Descrição é obrigatório');
    }
    if (!entry.user_id) {
      throw new ValidationError('ID do usuário é obrigatório');
    }
    if (!entry.category_id) {
      throw new ValidationError('Categoria é obrigatória');
    }

    return app.db('entry').insert(entry, '*');
  };

  const findAll = (filter = {}) => {
    return app.db('entry').where(filter).select();
  };

  return { create, findAll };
};
