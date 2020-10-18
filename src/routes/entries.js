module.exports = (app) => {
  const findAll = (req, res) => {
    app.services.entries.findAll().then((result) => {
      const entries = result.map((r) => {
        return {
          id: r.ent_id,
          name: r.ent_name,
          amount: r.ent_amount,
          type: r.ent_type,
          paid: r.ent_paid,
          description: r.ent_description,
          datePaid: r.ent_date_paid,
          createdAt: r.ent_createdAt,
          userId: r.user_id,
          categoryId: r.category_id,
        };
      });

      res.status(200).json(entries);
    });
  };

  const findOne = (req, res) => {
    app.services.entries.findAll({ ent_id: req.params.id }).then((record) => {
      const entry = {
        id: record[0].ent_id,
        name: record[0].ent_name,
        amount: record[0].ent_amount,
        type: record[0].ent_type,
        paid: record[0].ent_paid,
        description: record[0].ent_description,
        datePaid: record[0].ent_date_paid,
        createdAt: record[0].ent_createdAt,
        userId: record[0].user_id,
        categoryId: record[0].category_id,
      };

      res.status(200).json(entry);
    });
  };

  const create = async (req, res) => {
    const data = {
      ent_name: req.body.name,
      ent_amount: req.body.amount,
      ent_type: req.body.type,
      ent_description: req.body.description,
      ent_createdAt: new Date(),
      user_id: req.body.userId,
      category_id: req.body.categoryId,
    };
    const result = await app.services.entries.create(data);

    if (result.error) {
      return res.status(400).json(result);
    }

    return res.status(201).json({
      name: result[0].ent_name,
      amount: result[0].ent_amount,
      type: result[0].ent_type,
      description: result[0].ent_description,
      userId: result[0].user_id,
      categoryId: result[0].category_id,
      datePaid: result[0].ent_date_paid,
      paid: result[0].ent_paid,
    });
  };

  return { create, findAll, findOne };
};
