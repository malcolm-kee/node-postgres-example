/**
 * Utility to remove properties from object
 *
 * Example:
 *
 * omit({ a: 'A', b: 'B' }, ['a']); // -> { b: 'B' }
 */
function omit(object, keysToOmit) {
  const result = Object.assign({}, object);

  keysToOmit.forEach((key) => delete result[key]);

  return result;
}

module.exports = omit;
