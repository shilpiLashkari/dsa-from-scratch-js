/**
 * Perfect Squares
 * 
 * Strategy: We use dynamic programming to solve this problem. Let dp[i] be 
 * the minimum number of perfect square numbers that sum to i. For each i 
 * from 1 to n, we can calculate dp[i] by considering all perfect squares 
 * j*j that are less than or equal to i. The recurrence relation is:
 * dp[i] = min(dp[i - j*j] + 1) for all 1 <= j*j <= i.
 * 
 * Time Complexity: O(N * sqrt(N)) where N is the input number.
 * Space Complexity: O(N) to store the dp table.
 */

/**
 * @param {number} n
 * @return {number}
 */
function numSquares(n) {
    const dp = new Array(n + 1).fill(Infinity);
    dp[0] = 0;

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j * j <= i; j++) {
            dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
        }
    }

    return dp[n];
}

// Example Test Cases
console.log("Test 1:", numSquares(12)); // Expected: 3 (4 + 4 + 4)
console.log("Test 2:", numSquares(13)); // Expected: 2 (4 + 9)

module.exports = numSquares;
