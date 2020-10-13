module.exports = (app) => {
  const findAll = () => {
    return app.db('category').select();
  };
  return { findAll };
};
