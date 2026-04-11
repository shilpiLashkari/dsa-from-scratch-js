// Problem: Climbing Stairs
// You are climbing a staircase. It takes n steps to reach the top.
// Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

// Example 1:
// Input: n = 2
// Output: 2
// Explanation: There are two ways to climb to the top.
// 1. 1 step + 1 step
// 2. 2 steps

// Example 2:
// Input: n = 3
// Output: 3
// Explanation: There are three ways to climb to the top.
// 1. 1 step + 1 step + 1 step
// 2. 1 step + 2 steps
// 3. 2 steps + 1 step

// Constraints:
// 1 <= n <= 45

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
    if (n <= 2) return n;

    let first = 1;
    let second = 2;

    for (let i = 3; i <= n; i++) {
        let third = first + second;
        first = second;
        second = third;
    }

    return second;
};

// Notes:
// - This is a classic dynamic programming problem, equivalent to finding the nth Fibonacci number.
// - To reach step n, you can come from step n-1 (by taking 1 step) or step n-2 (by taking 2 steps).
// - So, ways(n) = ways(n-1) + ways(n-2).
// - We use iterative approach to save space.
// - Time Complexity: O(N)
// - Space Complexity: O(1)

module.exports = { climbStairs };
