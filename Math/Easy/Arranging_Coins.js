// Problem: Arranging Coins
// You have n coins and you want to build a staircase with these coins. 
// The staircase consists of k rows where the ith row has exactly i coins. 
// The last row of the staircase may be incomplete.
// Given the integer n, return the number of complete rows of the staircase you will build.

// Example 1:
// Input: n = 5
// Output: 2
// Explanation: Because the 3rd row is incomplete, we return 2.

// Example 2:
// Input: n = 8
// Output: 3
// Explanation: Because the 4th row is incomplete, we return 3.

// Constraints:
// 1 <= n <= 2^31 - 1

/**
 * @param {number} n
 * @return {number}
 */
var arrangeCoins = function (n) {
    // The sum of first k natural numbers is k(k+1)/2. 
    // We need to find the largest k such that k(k+1)/2 <= n.
    // k^2 + k - 2n <= 0.
    // Solving for k: k = (-1 + Math.sqrt(1 + 8n)) / 2.
    
    return Math.floor((Math.sqrt(1 + 8 * n) - 1) / 2);
};

// Notes:
// - This is a mathematical problem involving arithmetic series.
// - The number of coins in k rows is Sum(i=1 to k) = k(k+1)/2.
// - We solve the quadratic equation k^2 + k - 2n = 0 using the quadratic formula.
// - Alternatively, binary search can be used to find the largest k.
// - Time Complexity: O(1) (since Math.sqrt is constant time for fixed precision).
// - Space Complexity: O(1)

module.exports = { arrangeCoins };
