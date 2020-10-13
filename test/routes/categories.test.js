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
