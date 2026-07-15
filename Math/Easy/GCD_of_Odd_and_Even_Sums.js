/**
 * LeetCode 3658: GCD of Odd and Even Sums
 * * Problem:
 * You are given an integer n. Your task is to compute the GCD (greatest common divisor) of two values:
 * 1. sumOdd: the sum of the smallest n positive odd numbers.
 * 2. sumEven: the sum of the smallest n positive even numbers.
 * * Return the GCD of sumOdd and sumEven.
 * * Strategy:
 * - The sum of the first n odd numbers (1, 3, 5, ..., 2n-1) is a well-known mathematical identity:
 * sumOdd = n^2
 * - The sum of the first n even numbers (2, 4, 6, ..., 2n) is another well-known identity:
 * sumEven = n * (n + 1)
 * - We need to find the Greatest Common Divisor: GCD(n^2, n * (n + 1)).
 * - Using the properties of GCD:
 * GCD(n^2, n * (n + 1)) = n * GCD(n, n + 1)
 * - Since n and n + 1 are consecutive integers, they are coprime, which means GCD(n, n + 1) = 1.
 * - Therefore, GCD(n^2, n * (n + 1)) = n * 1 = n.
 * - The answer is always n.
 * * Time Complexity: O(1)
 * Space Complexity: O(1)
 */

/**
 * @param {number} n
 * @return {number}
 */
var gcdOfOddEvenSums = function (n) {
  // The mathematical simplification reduces GCD(n^2, n*(n+1)) down to n
  return n;
};

// Test cases
const testCases = [
  {
    n: 4,
    expected: 4, // sumOdd = 1+3+5+7=16, sumEven = 2+4+6+8=20. GCD(16, 20) = 4
  },
  {
    n: 5,
    expected: 5, // sumOdd = 25, sumEven = 30. GCD(25, 30) = 5
  },
  {
    n: 1,
    expected: 1, // sumOdd = 1, sumEven = 2. GCD(1, 2) = 1
  },
];

testCases.forEach((tc, index) => {
  const result = gcdOfOddEvenSums(tc.n);
  console.log(
    `Test Case ${index + 1}: ${result === tc.expected ? "PASSED" : "FAILED"} (Expected: ${tc.expected}, Got: ${result})`,
  );
});
