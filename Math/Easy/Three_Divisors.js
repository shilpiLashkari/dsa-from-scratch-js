// Problem: Three Divisors
// Given an integer n, return true if n has exactly three positive divisors. Otherwise, return false.
// An integer m is a divisor of n if there exists an integer k such that n = k * m.

// Example 1:
// Input: n = 2
// Output: false
// Explanation: 2 has only two divisors: 1 and 2.

// Example 2:
// Input: n = 4
// Output: true
// Explanation: 4 has three divisors: 1, 2, and 4.

// Constraints:
// 1 <= n <= 10^4

/**
 * @param {number} n
 * @return {boolean}
 */
var isThree = function(n) {
    if (n < 4) return false;
    
    // A number has exactly three divisors if and only if it's the square of a prime number.
    // E.g., 4 = 2^2 (divisors: 1, 2, 4)
    // 9 = 3^2 (divisors: 1, 3, 9)
    // 25 = 5^2 (divisors: 1, 5, 25)
    
    let root = Math.floor(Math.sqrt(n));
    if (root * root !== n) return false;
    
    // Check if the root is prime
    for (let i = 2; i * i <= root; i++) {
        if (root % i === 0) return false;
    }
    
    return true;
};

// Notes:
// - A number has exactly 3 divisors if and only if it is the square of a prime number.
// - E.g., 36 has divisors 1, 2, 3, 4, 6, 9, 12, 18, 36 (9 divisors), root is 6 (not prime).
// - We find the integer square root of n. If n is not a perfect square, return false.
// - If n is a perfect square, we check if its square root is prime.
// - Time Complexity: O(1) in practical terms since N <= 10^4, strictly O(N^(1/4))
// - Space Complexity: O(1)

module.exports = { isThree };
