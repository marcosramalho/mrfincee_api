module.exports = (app) => {
  const create = (entry) => {
    if (!entry.ent_name) return { error: 'Nome é obrigatório' };
    if (!entry.ent_amount) return { error: 'Valor é obrigatório' };

    return app.db('entry').insert(entry, '*');
  };

  const findAll = (filter = {}) => {
    return app.db('entry').where(filter).select();
  };

  return { create, findAll };
};
