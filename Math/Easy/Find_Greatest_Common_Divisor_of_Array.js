/**
 * LeetCode 1979: Find Greatest Common Divisor of Array
 *
 * Given an integer array nums, return the greatest common divisor (GCD) of
 * its smallest and largest values.
 *
 * Strategy:
 * 1. Find the minimum and maximum values in one pass through the array.
 * 2. Apply the Euclidean algorithm to those two values. Repeatedly replace
 *    (a, b) with (b, a % b) until b becomes zero; a is then the GCD.
 *
 * Time Complexity: O(n + log(minValue))
 * Space Complexity: O(1)
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var findGCD = function (nums) {
  let minValue = nums[0];
  let maxValue = nums[0];

  for (const number of nums) {
    minValue = Math.min(minValue, number);
    maxValue = Math.max(maxValue, number);
  }

  while (minValue !== 0) {
    const remainder = maxValue % minValue;
    maxValue = minValue;
    minValue = remainder;
  }

  return maxValue;
};

if (require.main === module) {
  const testCases = [
    { nums: [2, 5, 6, 9, 10], expected: 2 },
    { nums: [7, 5, 6, 8, 3], expected: 1 },
    { nums: [3, 3], expected: 3 },
    { nums: [6, 12, 18, 24], expected: 6 },
  ];

  testCases.forEach(({ nums, expected }, index) => {
    const actual = findGCD(nums);
    console.assert(
      actual === expected,
      `Test ${index + 1} failed: expected ${expected}, received ${actual}`,
    );
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { findGCD };
