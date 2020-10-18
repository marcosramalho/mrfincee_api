module.exports = (app) => {
  const create = (entry) => {
    return app.db('entry').insert(entry, '*');
  };

  const findAll = (filter = {}) => {
    return app.db('entry').where(filter).select();
  };

  return { create, findAll };
};
