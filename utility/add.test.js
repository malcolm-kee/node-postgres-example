const add = require('./add');

test('add', () => {
  expect(add(1, 4)).toBe(5);
});