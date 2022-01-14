const supertest = require('supertest');
const createApp = require('./app');

jest.mock('./db');

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
});

test('it returns result for health check', async () => {
  const app = createApp();
  const agent = supertest(app);

  const healthCheckResult = await agent
    .get('/health-check')
    .then((result) => result.body);

  expect(healthCheckResult).toStrictEqual({ ok: true });
});

test('get movies', async () => {
  const app = createApp();
  const agent = supertest(app);

  const movies = await agent.get('/movie').then((result) => result.body);

  expect(movies).toHaveLength(6);
  expect(movies[0]).toStrictEqual({
    id: 1,
    title: 'Sing 2',
    language: 'EN',
  });
});

test('get movie details', async () => {
  const app = createApp();
  const agent = supertest(app);

  const movie = await agent.get('/movie/1').then((result) => result.body);

  expect(movie).toStrictEqual({
    id: 1,
    title: 'Sing 2',
    language: 'EN',
  });
});
