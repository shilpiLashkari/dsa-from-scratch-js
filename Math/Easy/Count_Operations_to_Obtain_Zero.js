// Problem: Count Operations to Obtain Zero
// You are given two non-negative integers num1 and num2.
// In one operation, if num1 >= num2, you must subtract num2 from num1, otherwise subtract num1 from num2.
// For example, if num1 = 5 and num2 = 4, subtract num2 from num1, thus obtaining num1 = 1 and num2 = 4. However, if num1 = 4 and num2 = 5, after one operation, num1 = 4 and num2 = 1.
// Return the number of operations required to make either num1 = 0 or num2 = 0.

// Example 1:
// Input: num1 = 2, num2 = 3
// Output: 3
// Explanation: 
// - Operation 1: num1 = 2, num2 = 3. Since num1 < num2, we subtract num1 from num2 and get num1 = 2, num2 = 3 - 2 = 1.
// - Operation 2: num1 = 2, num2 = 1. Since num1 > num2, we subtract num2 from num1.
// - Operation 3: num1 = 1, num2 = 1. Since num1 == num2, we subtract num2 from num1.
// Now num1 = 0 and num2 = 1. Since num1 == 0, we stop.

// Example 2:
// Input: num1 = 10, num2 = 10
// Output: 1
// Explanation: 
// - Operation 1: num1 = 10, num2 = 10. Since num1 == num2, we subtract num2 from num1 and get num1 = 0, num2 = 10.
// Now num1 = 0 and num2 = 10. Since num1 == 0, we stop.

// Constraints:
// 0 <= num1, num2 <= 10^5

/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
var countOperations = function(num1, num2) {
    let count = 0;
    while (num1 !== 0 && num2 !== 0) {
        if (num1 >= num2) {
            count += Math.floor(num1 / num2);
            num1 %= num2;
        } else {
            count += Math.floor(num2 / num1);
            num2 %= num1;
        }
    }
    return count;
};

// Notes:
// - A naive approach uses repeated subtraction.
// - We can optimize it by using modulo and division, much like the Euclidean algorithm for GCD.
// - If num1 >= num2, substituting subtraction with `num1 % num2` does `floor(num1/num2)` operations at once.
// - Time Complexity: O(log(min(num1, num2)))
// - Space Complexity: O(1)

module.exports = { countOperations };
