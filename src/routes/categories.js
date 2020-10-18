module.exports = (app) => {
  const findAll = (req, res, next) => {
    app.services.categories
      .findAll()
      .then((result) => {
        const data = result.map((r) => {
          return {
            id: r.cat_id,
            name: r.cat_name,
            description: r.cat_description,
            createdAt: r.cat_createdAt,
          };
        });
        res.status(200).json(data);
      })
      .catch((error) => next(error));
  };

  const create = async (req, res, next) => {
    try {
      const category = {
        cat_name: req.body.name,
        cat_description: req.body.description,
        cat_createdAt: new Date(),
      };
      const result = await app.services.categories.save(category);

      const data = {
        id: result[0].cat_id,
        name: result[0].cat_name,
        description: result[0].cat_description,
        createdAt: result[0].cat_createdAt,
      };

      return res.status(201).json(data);
    } catch (error) {
      return next(error);
    }
  };

  return { findAll, create };
};
