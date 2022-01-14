const supertest = require('supertest');
const createApp = require('./app');

test('it is defined', () => {
  const app = createApp();

  expect(app).toBeDefined();
});

test('it returns 404 for unmatch path', async () => {
  const app = createApp();

  const agent = supertest(app);

  const defaultResult = await agent
    .get('/non-exi3t')
    .then((result) => result.text);

  expect(defaultResult.includes('Page Not Found')).toBe(true);

  const jsonResult = await agent
    .get('/non-exi3t')
    .set('Accept', 'application/json')
    .then((result) => result.body);

  expect(jsonResult).toStrictEqual({ error: 'Not found' });
});
