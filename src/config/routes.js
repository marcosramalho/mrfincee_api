module.exports = (app) => {
  app
    .route('/users')
    .get(app.routes.users.findAll)
    .post(app.routes.users.create);

  app
    .route('/categories')
    .get(app.routes.categories.findAll)
    .post(app.routes.categories.create);

  app
    .route('/entries')
    .get(app.routes.entries.findAll)
    .post(app.routes.entries.create);

  app.route('/entries/:id').get(app.routes.entries.findOne);
};
