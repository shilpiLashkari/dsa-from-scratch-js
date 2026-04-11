// Problem: Find the Pivot Integer
// Given a positive integer n, find the pivot integer x such that:
// The sum of all elements between 1 and x inclusively equals the sum of all elements between x and n inclusively.
// Return the pivot integer x. If no such integer exists, return -1. It is guaranteed that there will be at most one pivot index for the given input.

// Example 1:
// Input: n = 8
// Output: 6
// Explanation: 6 is the pivot integer since: 1 + 2 + 3 + 4 + 5 + 6 = 6 + 7 + 8 = 21.

// Example 2:
// Input: n = 1
// Output: 1
// Explanation: 1 is the pivot integer since: 1 = 1.

// Example 3:
// Input: n = 4
// Output: -1
// Explanation: It can be proved that no such integer exist.

// Constraints:
// 1 <= n <= 1000

/**
 * @param {number} n
 * @return {number}
 */
var pivotInteger = function(n) {
    // Math logic:
    // Sum from 1 to x = x(x+1)/2
    // Sum from x to n = Sum(1 to n) - Sum(1 to x-1)
    // = n(n+1)/2 - (x-1)x/2
    // Equating them:
    // x(x+1)/2 = n(n+1)/2 - (x^2 - x)/2
    // Multiply by 2:
    // x^2 + x = n^2 + n - x^2 + x
    // 2x^2 = n^2 + n
    // x^2 = (n^2 + n) / 2
    // x = sqrt((n^2 + n) / 2)
    // If x is an integer, it's our answer. Otherwise, return -1.
    
    let sum = (n * n + n) / 2;
    let x = Math.sqrt(sum);
    
    if (x % 1 === 0) {
        return x;
    }
    
    return -1;
};

// Notes:
// - We can avoid an O(N) loop by using arithmetic series sum formulas.
// - x = sqrt((n^2 + n) / 2).
// - We just check if the result of the formula is an integer.
// - Time Complexity: O(1)
// - Space Complexity: O(1)

module.exports = { pivotInteger };
