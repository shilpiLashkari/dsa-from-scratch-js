// Problem: Number of Common Factors
// Given two positive integers a and b, return the number of common factors of a and b.
// An integer x is a common factor of a and b if x divides both a and b.

// Example 1:
// Input: a = 12, b = 6
// Output: 4
// Explanation: The common factors of 12 and 6 are 1, 2, 3, 6.

// Example 2:
// Input: a = 25, b = 30
// Output: 2
// Explanation: The common factors of 25 and 30 are 1, 5.

// Constraints:
// 1 <= a, b <= 1000

/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var commonFactors = function(a, b) {
    let count = 0;
    
    // We only need to check up to the minimum of the two numbers.
    let min = Math.min(a, b);
    
    for (let i = 1; i <= min; i++) {
        if (a % i === 0 && b % i === 0) {
            count++;
        }
    }
    
    // Alternative: We could find the GCD of a and b first, 
    // and then just find the number of factors of the GCD!
    
    return count;
};

// Notes:
// - A common factor must be <= min(a, b).
// - We can just loop from 1 to min(a,b) and check divisibility.
// - An optimization is to find the GCD of a and b, and count its divisors up to sqrt(GCD).
// - But given constraints <= 1000, O(min(a, b)) is perfectly fast enough.
// - Time Complexity: O(min(a, b))
// - Space Complexity: O(1)

module.exports = { commonFactors };
