const { add, subtract } = require('../index');

test('adds 2 + 3 to equal 5', () => {
  expect(add(2, 3)).toBe(5);
});

test('adds -2 + 1 to equal -1', () => {
  expect(add(-2, 1)).toBe(-1);
});

test('subtracts 4 - 3 to equal 1', () => {
  expect(subtract(4, 3)).toBe(1);
});

test('subtracts -2 - 1 to equal -3', () => {
  expect(subtract(-2, 1)).toBe(-3);
});
