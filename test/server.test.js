const supertest = require('supertest');

const request = supertest('http://www.google.com');

test('Deve responder na porta 3001', () => {
  return request.get('/').then((res) => {
    expect(res.status).toBe(200);
  });
});
