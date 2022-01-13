/**
 * Utility to pick properties from object
 *
 * Example:
 *
 * omit({ a: 'A', b: 'B' }, ['a']); // -> { a: 'A' }
 */
function pick(object, keysToPick) {
  const result = {};

  keysToPick.forEach((key) => {
    if (key in object) {
      result[key] = object[key];
    }
  });

  return result;
}

module.exports = pick;
