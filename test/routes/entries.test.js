const request = require('supertest');

const app = require('../../src/app');

// expense --> despesa
// revenue --> receita

const MAIN_ROUTE = '/entries';
let user;
let category;

beforeAll(async () => {
  const [resUser] = await app.services.users.save({
    use_username: `${Date.now()}user`,
    use_email: `${Date.now()}@email.com`,
    use_name: 'User',
    use_last_name: 'Entry',
    use_password: '123456',
    use_createdAt: new Date(),
  });

  const [resCategory] = await app.services.categories.save({
    cat_name: `${Date.now()}cat`,
    cat_description: 'Categoria descrição',
    cat_createdAt: new Date(),
  });

  user = {
    id: resUser.use_id,
    name: resUser.use_name,
    lastName: resUser.use_last_name,
    username: resUser.use_username,
    email: resUser.use_email,
  };

  category = {
    id: resCategory.cat_id,
    name: resCategory.cat_name,
    description: resCategory.cat_description,
  };
});

test('Deve inserir um lançamento com sucesso', () => {
  return request(app)
    .post(MAIN_ROUTE)
    .send({
      name: 'Lanc #1',
      amount: 10,
      type: 'expense',
      description: 'Lanc #1',
      userId: user.id,
      categoryId: category.id,
    })
    .then((result) => {
      expect(result.status).toBe(201);
      expect(result.body.name).toBe('Lanc #1');
    });
});

test('Deve listar todos os lancamentos', () => {
  return request(app)
    .get(MAIN_ROUTE)
    .then((result) => {
      expect(result.status).toBe(200);
      expect(result.body.length).toBeGreaterThan(0);
    });
});
