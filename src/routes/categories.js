module.exports = (app) => {
  const findAll = (req, res) => {
    app.services.categories.findAll().then((result) => {
      const data = result.map((r) => {
        return {
          id: r.cat_id,
          name: r.cat_name,
          description: r.cat_description,
          createdAt: r.cat_createdAt,
        };
      });
      res.status(200).json(data);
    });
  };

  const create = async (req, res) => {
    const category = {
      cat_name: req.body.name,
      cat_description: req.body.description,
      cat_createdAt: new Date(),
    };
    const [result] = await app.services.categories.save(category);
    const data = {
      id: result.cat_id,
      name: result.cat_name,
      description: result.cat_description,
      createdAt: result.cat_createdAt,
    };

    res.status(201).json(data);
  };

  return { findAll, create };
};
