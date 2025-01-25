const { randomNum, randomPickListIndex } = require('../../tools/random-generator.js')

test('I want to randomly select three numbers from five numbers.', () => {
  let list = randomPickListIndex(5, 3)
  expect(list.length).toBe(3)
  expect(list.at(0)).toBeGreaterThanOrEqual(0)
  expect(list.at(0)).toBeLessThan(5)
  expect(list.at(1)).toBeGreaterThanOrEqual(0)
  expect(list.at(1)).toBeLessThan(5)
  expect(list.at(2)).toBeGreaterThanOrEqual(0)
  expect(list.at(2)).toBeLessThan(5)
})

test('I want to randomly select three numbers from three numbers.', () => {
  let list = randomPickListIndex(3, 3)
  expect(list.length).toBe(3)
  expect(list.at(0)).toBeGreaterThanOrEqual(0)
  expect(list.at(0)).toBeLessThan(5)
  expect(list.at(1)).toBeGreaterThanOrEqual(0)
  expect(list.at(1)).toBeLessThan(5)
  expect(list.at(2)).toBeGreaterThanOrEqual(0)
  expect(list.at(2)).toBeLessThan(5)
})

test('I want to randomly select three numbers from two numbers.', () => {
  let list = randomPickListIndex(2, 3)
  expect(list.length).toBe(2)
  expect(list.at(0)).toBeGreaterThanOrEqual(0)
  expect(list.at(0)).toBeLessThan(2)
  expect(list.at(1)).toBeGreaterThanOrEqual(0)
  expect(list.at(1)).toBeLessThan(2)
})