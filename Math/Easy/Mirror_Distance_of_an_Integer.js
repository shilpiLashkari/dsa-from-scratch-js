/**
 * Problem: Mirror Distance of an Integer
 * 
 * The Mirror Distance of an integer n is defined as the absolute difference 
 * between the integer and its reversed digit form.
 * 
 * Mathematically: Mirror Distance = |n - reverse(n)|
 * 
 * Example 1:
 * Input: n = 25
 * Output: 27
 * Explanation: |25 - 52| = 27
 * 
 * Example 2:
 * Input: n = 10
 * Output: 9
 * Explanation: |10 - 01| = 9
 * 
 * Example 3:
 * Input: n = 121
 * Output: 0
 * Explanation: |121 - 121| = 0 (Palindrome)
 */

/**
 * @param {number} n
 * @return {number}
 */
const mirrorDistance = function (n) {
    if (n < 0) return 0; // Usually defined for non-negative integers
    
    let originalNumber = n;
    let reversed = 0;
    let temp = n;
    
    while (temp > 0) {
        reversed = (reversed * 10) + (temp % 10);
        temp = Math.floor(temp / 10);
    }
    
    return Math.abs(originalNumber - reversed);
};

/**
 * Notes:
 * - We reverse the digits of the number mathematically using modulo and floor operations.
 * - String conversion could be used (n.toString().split('').reverse().join('')), 
 *   but mathematical reversal is more efficient and uses O(1) extra space.
 * - Time Complexity: O(log10(n)) - The number of digits in n.
 * - Space Complexity: O(1) - Constant space used for variables.
 */

// Example Test Cases
console.log("Input: 25, Mirror Distance:", mirrorDistance(25));   // Output: 27
console.log("Input: 10, Mirror Distance:", mirrorDistance(10));   // Output: 9
console.log("Input: 121, Mirror Distance:", mirrorDistance(121)); // Output: 0
console.log("Input: 0, Mirror Distance:", mirrorDistance(0));     // Output: 0

module.exports = { mirrorDistance };
