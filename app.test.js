const createApp = require('./app');

test('it is defined', () => {
  const app = createApp();

  expect(app).toBeDefined();
});
