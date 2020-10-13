const request = require('supertest');

const app = require('../../src/app');

test('Deve listar todas as categorias', () => {
  return request(app)
    .get('/categories')
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThanOrEqual(0);
    });
});

test('Deve inserir uma categoria com sucesso', () => {
  const name = `${Date.now()}cat`;
  return request(app)
    .post('/categories')
    .send({
      name,
      description: 'Categoria descrição',
    })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe(name);
    });
});

test('Nao deve inserir categoria sem nome', () => {
  return request(app)
    .post('/categories')
    .send({
      description: 'Categoria descrição',
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Nome é obrigatório');
    });
});

test('Nao deve inserir categoria sem descricao', () => {
  return request(app)
    .post('/categories')
    .send({
      name: 'Lazer',
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Descrição é obrigatório');
    });
});
