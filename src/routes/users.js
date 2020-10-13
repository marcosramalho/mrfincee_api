module.exports = (app) => {
  const findAll = (req, res) => {
    app
      .db('user')
      .select()
      .then((result) => {
        res.status(200).json(result);
      });
  };

  const create = async (req, res) => {
    const data = {
      use_username: req.body.username,
      use_email: req.body.email,
      use_name: req.body.name,
      use_last_name: req.body.lastName,
      use_password: req.body.password,
      cat_createdAt: new Date(),
    };
    const result = await app.db('user').insert(data, '*');
    res.status(201).json({
      username: result[0].use_username,
      email: result[0].use_email,
      lastName: result[0].use_last_name,
      createdAt: result[0].use_createdAt,
      name: result[0].use_name,
    });
  };

  return { findAll, create };
};
