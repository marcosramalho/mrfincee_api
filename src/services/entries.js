module.exports = (app) => {
  const create = (entry) => {
    return app.db('entry').insert(entry, '*');
  };

  return { create };
};
