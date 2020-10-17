module.exports = (app) => {
  const create = (entry) => {
    return app.db('entry').insert(entry, '*');
  };

  const findAll = () => {
    return app.db('entry').select();
  };

  return { create, findAll };
};
