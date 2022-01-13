const pick = require('./pick');

test('pick', () => {
  expect(pick({ a: 'A', b: 'B' }, ['a'])).toStrictEqual({ a: 'A' });
});
