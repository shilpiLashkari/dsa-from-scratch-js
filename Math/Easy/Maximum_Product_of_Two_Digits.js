/**
 * LeetCode 3536: Maximum Product of Two Digits
 *
 * Given a positive integer n, return the maximum product of any two digits.
 * Equal digit values may be used when they occur in different positions.
 *
 * Strategy:
 * - Extract each digit using modulo 10.
 * - Track the largest and second-largest digits seen so far.
 * - Their product is maximal because every digit is non-negative.
 *
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */

/**
 * @param {number} n
 * @return {number}
 */
var maxProduct = function (n) {
  let largestDigit = -1;
  let secondLargestDigit = -1;
  let remaining = n;

  while (remaining > 0) {
    const digit = remaining % 10;

    if (digit >= largestDigit) {
      secondLargestDigit = largestDigit;
      largestDigit = digit;
    } else if (digit > secondLargestDigit) {
      secondLargestDigit = digit;
    }

    remaining = Math.floor(remaining / 10);
  }

  return largestDigit * secondLargestDigit;
};

if (require.main === module) {
  const testCases = [
    { n: 31, expected: 3 },
    { n: 22, expected: 4 },
    { n: 124, expected: 8 },
    { n: 998, expected: 81 },
    { n: 909, expected: 81 },
    { n: 1000000000, expected: 0 },
    { n: 123456789, expected: 72 },
  ];

  testCases.forEach(({ n, expected }, index) => {
    const actual = maxProduct(n);

    if (actual !== expected) {
      throw new Error(
        `Test ${index + 1} failed: expected ${expected}, received ${actual}`,
      );
    }

    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { maxProduct };
