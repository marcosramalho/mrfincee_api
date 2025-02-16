module.exports = (app) => {
  const findAll = (req, res, next) => {
    app.services.users
      .findAll()
      .then((result) => {
        const users = result.map((r) => {
          return {
            username: r.use_username,
            email: r.use_email,
            lastName: r.use_last_name,
            createdAt: r.use_createdAt,
            name: r.use_name,
          };
        });
        res.status(200).json(users);
      })
      .catch((error) => next(error));
  };

  const create = async (req, res, next) => {
    try {
      const data = {
        use_username: req.body.username,
        use_email: req.body.email,
        use_name: req.body.name,
        use_last_name: req.body.lastName,
        use_password: req.body.password,
        use_createdAt: req.body.createdAt === '' ? undefined : new Date(),
      };

      const result = await app.services.users.save(data);

      return res.status(201).json({
        id: result[0].use_id,
        username: result[0].use_username,
        email: result[0].use_email,
        lastName: result[0].use_last_name,
        createdAt: result[0].use_createdAt,
        name: result[0].use_name,
      });
    } catch (error) {
      return next(error);
    }
  };

  return { findAll, create };
};
