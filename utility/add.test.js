const add = require('./add');

function test(name, testCode) {
  try {
    testCode();
    console.log(`Passed: ${name}`);
  } catch (err) {
    console.error(`Failed: ${name}`);
    console.error(err);
  }
}

function expect(value) {
  function toBe(expected) {
    if (value !== expected) {
      throw new Error(`${value} does not equal to ${expected}`);
    }
  }

  return {
    toBe,
  };
}

test('add 1 and 4', () => {
  expect(add(1, 4)).toBe(4);
});

test('add 1 and 6', () => {
  expect(add(1, 6)).toBe(7);
});
