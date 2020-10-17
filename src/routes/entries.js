module.exports = (app) => {
  const create = (req, res) => {
    const data = {
      ent_name: req.body.name,
      ent_amount: req.body.amount,
      ent_type: req.body.type,
      ent_description: req.body.description,
      ent_createdAt: new Date(),
      user_id: req.body.userId,
      category_id: req.body.categoryId,
    };
    app.services.entries.create(data).then((result) => {
      res.status(201).json({
        name: result[0].ent_name,
        amount: result[0].ent_amount,
        type: result[0].ent_type,
        description: result[0].ent_description,
      });
    });
  };

  return { create };
};
