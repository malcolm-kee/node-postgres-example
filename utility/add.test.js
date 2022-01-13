const add = require('./add');

test('add 1 and 4', () => {
  expect(add(1, 4)).toBe(5);
});

test('add 1 and 6', () => {
  expect(add(1, 6)).toBe(7);
});
