// Problem: Calculate Money in Leetcode Bank
// Hercy wants to save money for his first car. He puts money in the Leetcode bank every day.
// He starts by putting in $1 on Monday, the first day. Every day from Tuesday to Sunday, he will put in $1 more than the day before. 
// On every subsequent Monday, he will put in $1 more than the previous Monday.
// Given n, return the total amount of money he will have in the Leetcode bank at the end of the nth day.

// Example 1:
// Input: n = 4
// Output: 10
// Explanation: After the 4th day, the total is 1 + 2 + 3 + 4 = 10.

// Example 2:
// Input: n = 10
// Output: 37
// Explanation: After the 10th day, the total is (1 + 2 + 3 + 4 + 5 + 6 + 7) + (2 + 3 + 4) = 37.

// Constraints:
// 1 <= n <= 1000

/**
 * @param {number} n
 * @return {number}
 */
var totalMoney = function(n) {
    let weeks = Math.floor(n / 7);
    let remainingDays = n % 7;
    
    // First week is 1+2+3+4+5+6+7 = 28
    // Second week is 2+3+4+5+6+7+8 = 28 + 7
    // Total for 'w' weeks is an arithmetic progression:
    // Sum = w/2 * (2 * a + (w - 1) * d) where a = 28, d = 7
    
    let total = Math.floor(weeks * (2 * 28 + (weeks - 1) * 7) / 2);
    
    // For the remaining days, the start value is weeks + 1
    let startValue = weeks + 1;
    for (let i = 0; i < remainingDays; i++) {
        total += startValue + i;
    }
    
    return total;
};

// Notes:
// - We can calculate the complete weeks using math (Arithmetic Progression).
// - Each full week has a sum of 28, 35, 42, etc. This is an AP with a=28, d=7.
// - The remaining partial week can be simulated or calculated with another AP sum.
// - Time Complexity: O(1) mathematical calculation, ignoring the loop of max 6 iterations.
// - Space Complexity: O(1)

module.exports = { totalMoney };
