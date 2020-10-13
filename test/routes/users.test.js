const request = require('supertest');

const app = require('../../src/app');

test('Deve listar todos os usuários', () => {
  return request(app)
    .get('/users')
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Deve inserir usuário com sucesso', () => {
  const email = `${Date.now()}@email.com`;
  const username = `${Date.now()}user`;
  return request(app)
    .post('/users')
    .send({
      name: 'Marcos',
      lastName: 'Ramalho',
      password: '123456',
      username,
      email,
    })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('Marcos');
      expect(res.body.lastName).toBe('Ramalho');
    });
});

test('Nao deve inserir usuario sem username', () => {
  return request(app)
    .post('/users')
    .send({
      name: 'Marcos',
      lastName: 'Ramalho',
      password: '123456',
      email: 'mm@email.com',
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Username é obrigatório');
    });
});

test('Nao deve inserir usuario sem email', () => {
  return request(app)
    .post('/users')
    .send({
      name: 'Marcos',
      lastName: 'Ramalho',
      password: '123456',
      username: 'mrfinceeuser',
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Email é obrigatório');
    });
});

test('Nao deve inserir usuario sem o nome', () => {
  return request(app)
    .post('/users')
    .send({
      lastName: 'Ramalho',
      password: '123456',
      username: 'mrfinceeuser',
      email: 'mm@email.com',
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Nome é obrigatório');
    });
});

test('Nao deve inserir usuario sem o sobrenome', () => {
  return request(app)
    .post('/users')
    .send({
      name: 'Marcos',
      password: '123456',
      username: 'mrfinceeuser',
      email: 'mm@email.com',
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Sobrenome é obrigatório');
    });
});

test('Nao deve inserir usuario sem senha', () => {
  return request(app)
    .post('/users')
    .send({
      name: 'Marcos',
      lastName: 'Ramalho',
      username: 'mrfinceeuser',
      email: 'mm@email.com',
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Senha é obrigatório');
    });
});

test('Nao deve inserir usuario sem data de criacao', () => {
  return request(app)
    .post('/users')
    .send({
      name: 'Marcos',
      lastName: 'Ramalho',
      password: '123456',
      username: 'mrfinceeuser',
      email: 'mm@email.com',
      createdAt: '',
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Data de criação é obrigatório');
    });
});

test('Nao deve inserir usuario com username duplicado', () => {
  const email = `${Date.now()}@email.com`;
  return request(app)
    .post('/users')
    .send({
      name: 'Marcos',
      lastName: 'Ramalho',
      password: '123456',
      username: 'marcosramalho',
      email,
    })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Já existe um usuário com esse username');
    });
});
