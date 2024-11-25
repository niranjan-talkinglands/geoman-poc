import { expect, test } from 'vitest';

const sum = (a: number, b: number): number => a + b;

test('sum test', () => {
  expect(sum(1, 2)).toBe(3);
});
