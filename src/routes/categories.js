module.exports = () => {
  const findAll = (req, res) => {
    const categories = [
      {
        id: 1,
        name: 'Cartão de crédito',
        description: 'Categoria para organizar o cartão de crédito',
      },
    ];
    res.status(200).json(categories);
  };

  return { findAll };
};
