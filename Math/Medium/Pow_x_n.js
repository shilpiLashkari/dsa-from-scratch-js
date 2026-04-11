// Problem: Pow(x, n)
// Implement pow(x, n), which calculates x raised to the power n (i.e., x^n).

// Example 1:
// Input: x = 2.00000, n = 10
// Output: 1024.00000

// Example 2:
// Input: x = 2.10000, n = 3
// Output: 9.26100

// Example 3:
// Input: x = 2.00000, n = -2
// Output: 0.25000
// Explanation: 2^-2 = 1/2^2 = 1/4 = 0.25

// Constraints:
// -100.0 < x < 100.0
// -2^31 <= n <= 2^31-1
// n is an integer.
// -10^4 <= x^n <= 10^4

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
    if (n === 0) return 1;
    
    // Handle negative power
    let m = n;
    if (m < 0) {
        x = 1 / x;
        // Adjust for -2^31 which becomes 2^31 and overflows 32-bit signed if JS was strict, 
        // but JS numbers are double precision floats so it's fine.
        m = Math.abs(m); 
    }
    
    let result = 1;
    let currentProduct = x;
    
    // Fast exponentiation (exponentiation by squaring)
    while (m > 0) {
        if (m % 2 === 1) {
            result *= currentProduct;
        }
        currentProduct *= currentProduct;
        m = Math.floor(m / 2);
    }
    
    return result;
};

// Notes:
// - We use binary exponentiation (exponentiation by squaring).
// - n = 2^k1 + 2^k2 + ...
// - x^n can be calculated by matching the bits of n.
// - E.g. x^9 = x^(1001 base 2) = x^8 * x^1.
// - At each step we square the base and halve the exponent.
// - If the current exponent is odd, we multiply our result by the current base.
// - Time Complexity: O(log |n|)
// - Space Complexity: O(1)

module.exports = { myPow };
