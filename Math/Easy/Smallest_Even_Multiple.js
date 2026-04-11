// Problem: Smallest Even Multiple
// Given a positive integer n, return the smallest positive integer that is a multiple of both 2 and n.

// Example 1:
// Input: n = 5
// Output: 10
// Explanation: The smallest multiple of both 5 and 2 is 10.

// Example 2:
// Input: n = 6
// Output: 6
// Explanation: The smallest multiple of both 6 and 2 is 6. Note that a number is a multiple of itself.

// Constraints:
// 1 <= n <= 150

/**
 * @param {number} n
 * @return {number}
 */
var smallestEvenMultiple = function(n) {
    // If n is already even, the smallest multiple of both 2 and n is n itself.
    // If n is odd, the smallest multiple of both 2 and n is 2 * n.
    return n % 2 === 0 ? n : n * 2;
};

// Notes:
// - We essentially need to find the LCM (Least Common Multiple) of 2 and n.
// - Since 2 is prime, if n is not divisible by 2 (i.e. n is odd), the LCM is 2*n.
// - If n is divisible by 2 (i.e. n is even), the LCM is just n.
// - Time Complexity: O(1)
// - Space Complexity: O(1)

module.exports = { smallestEvenMultiple };
