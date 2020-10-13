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

  return { findAll };
};
