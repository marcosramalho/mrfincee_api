module.exports = (app) => {
  app
    .route('/users')
    .get(app.routes.users.findAll)
    .post(app.routes.users.create);

  app
    .route('/categories')
    .get(app.routes.categories.findAll)
    .post(app.routes.categories.create);

  app.route('/entries').post(app.routes.entries.create);
};
