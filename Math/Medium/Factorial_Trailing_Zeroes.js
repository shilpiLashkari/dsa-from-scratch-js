// Problem: Factorial Trailing Zeroes
// Given an integer n, return the number of trailing zeroes in n!.
// Note that n! = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1.

// Example 1:
// Input: n = 3
// Output: 0
// Explanation: 3! = 6, no trailing zero.

// Example 2:
// Input: n = 5
// Output: 1
// Explanation: 5! = 120, one trailing zero.

// Example 3:
// Input: n = 0
// Output: 0

// Constraints:
// 0 <= n <= 10^4
// Follow up: Could you write a solution that works in logarithmic time complexity?

/**
 * @param {number} n
 * @return {number}
 */
var trailingZeroes = function(n) {
    let count = 0;
    
    // A trailing zero is created by multiplying 10, which is 2 * 5.
    // In any factorial, the number of 2 factors is always far greater than the number of 5 factors.
    // Thus, we just need to count how many times 5 is a prime factor in the numbers from 1 to n.
    // Also, numbers like 25 have two 5s, 125 has three 5s, etc.
    // So we successively divide n by 5 and add up the quotients.
    
    while (n > 0) {
        n = Math.floor(n / 5);
        count += n;
    }
    
    return count;
};

// Notes:
// - A trailing zero is produced by a factor of 10.
// - 10 is composed of prime factors 2 and 5.
// - In a factorial sequence (1 * 2 * ... * n), the occurrences of factor 2 will always outnumber occurrences of factor 5.
// - Therefore, the total number of trailing zeros is solely determined by the number of 5s.
// - Time Complexity: O(log_5(N)) -> Logarithmic time, meets follow up constraint.
// - Space Complexity: O(1)

module.exports = { trailingZeroes };
