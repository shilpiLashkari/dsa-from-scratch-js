// Problem: Perfect Number
// A perfect number is a positive integer that is equal to the sum of its positive divisors, excluding the number itself.
// A divisor of an integer n is an integer that can divide n without leaving a remainder.
// Given an integer n, return true if n is a perfect number, otherwise return false.

// Example 1:
// Input: num = 28
// Output: true
// Explanation: 28 = 1 + 2 + 4 + 7 + 14
// 1, 2, 4, 7, and 14 are all divisors of 28.

// Example 2:
// Input: num = 7
// Output: false

// Constraints:
// 1 <= num <= 10^8

/**
 * @param {number} num
 * @return {boolean}
 */
var checkPerfectNumber = function (num) {
    if (num <= 1) return false;

    let sum = 1;
    let sqrt = Math.sqrt(num);

    for (let i = 2; i <= sqrt; i++) {
        if (num % i === 0) {
            sum += i;
            if (i * i !== num) {
                sum += num / i;
            }
        }
    }

    return sum === num;
};

// Notes:
// - We find all divisors of num by iterating up to sqrt(num).
// - For every divisor i, num/i is also a divisor.
// - We exclude the number itself from the sum.
// - Time Complexity: O(sqrt(N))
// - Space Complexity: O(1)

module.exports = { checkPerfectNumber };
