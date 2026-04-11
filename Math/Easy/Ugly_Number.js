// Problem: Ugly Number
// An ugly number is a positive integer whose prime factors are limited to 2, 3, and 5.

// Example 1:
// Input: n = 6
// Output: true
// Explanation: 6 = 2 × 3

// Example 2:
// Input: n = 1
// Output: true
// Explanation: 1 has no prime factors, therefore all its prime factors are limited to 2, 3, and 5.

// Example 3:
// Input: n = 14
// Output: false
// Explanation: 14 is not ugly since it includes the prime factor 7.

// Constraints:
// -2^31 <= n <= 2^31 - 1

/**
 * @param {number} n
 * @return {boolean}
 */
var isUgly = function (n) {
    if (n <= 0) return false;

    // Divide by 2, 3, and 5 as much as possible
    const factors = [2, 3, 5];
    for (let factor of factors) {
        while (n % factor === 0) {
            n /= factor;
        }
    }

    // If the remaining number is 1, then all factors were from {2, 3, 5}
    return n === 1;
};

// Notes:
// - An ugly number only contains prime factors 2, 3, and 5.
// - We repeatedly divide the number by 2, 3, and 5 until we can't anymore.
// - If the final result is 1, the number was ugly.
// - Time Complexity: O(log N) - Logarithmic with respect to factors 2, 3, and 5.
// - Space Complexity: O(1)

module.exports = { isUgly };
