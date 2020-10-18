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

test('Nao deve inserir lancamento sem nome', () => {
  return request(app)
    .post(MAIN_ROUTE)
    .send({
      amount: 10,
      type: 'expense',
      description: 'Lanc #1',
      userId: user.id,
      categoryId: category.id,
    })
    .then((result) => {
      expect(result.status).toBe(400);
      expect(result.body.error).toBe('Nome é obrigatório');
    });
});

test('Nao deve inserir lancamento sem valor', () => {
  return request(app)
    .post(MAIN_ROUTE)
    .send({
      name: 'Lanc #1',
      type: 'expense',
      description: 'Lanc #1',
      userId: user.id,
      categoryId: category.id,
    })
    .then((result) => {
      expect(result.status).toBe(400);
      expect(result.body.error).toBe('Valor é obrigatório');
    });
});

test('Deve listar todos os lancamentos', () => {
  return app
    .db('entry')
    .insert({
      ent_name: 'Lanc #1',
      ent_amount: 10,
      ent_type: 'expense',
      ent_description: 'Lanc #1',
      ent_createdAt: new Date(),
      user_id: user.id,
      category_id: category.id,
    })
    .then(() => request(app).get(MAIN_ROUTE))
    .then((result) => {
      expect(result.status).toBe(200);
      expect(result.body.length).toBeGreaterThan(0);
    });
});

test('Deve retornar detalhes do lancamento', () => {
  return app
    .db('entry')
    .insert(
      {
        ent_name: 'Lanc #1',
        ent_amount: 10,
        ent_type: 'expense',
        ent_description: 'Lanc #1',
        ent_createdAt: new Date(),
        user_id: user.id,
        category_id: category.id,
      },
      ['ent_id'],
    )
    .then((entry) => request(app).get(`${MAIN_ROUTE}/${entry[0].ent_id}`))
    .then((result) => {
      expect(result.status).toBe(200);
      expect(result.body.description).toBe('Lanc #1');
      expect(result.body.type).toBe('expense');
      expect(result.body.userId).toBe(user.id);
      expect(result.body.categoryId).toBe(category.id);
    });
});
