/**
 * Predict the Winner
 * 
 * Strategy: This is a zero-sum game solvable with Dynamic Programming. 
 * Let dp[i][j] be the maximum relative score player 1 can get over player 2 
 * in the range [i, j]. 
 * dp[i][j] = max(nums[i] - dp[i+1][j], nums[j] - dp[i][j-1])
 * If dp[0][n-1] >= 0, player 1 can win.
 * 
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2) (can be optimized to O(N)).
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
function predictTheWinner(nums) {
    const n = nums.length;
    const dp = Array.from({ length: n }, () => new Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        dp[i][i] = nums[i];
    }

    for (let len = 2; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            let j = i + len - 1;
            dp[i][j] = Math.max(nums[i] - dp[i + 1][j], nums[j] - dp[i][j - 1]);
        }
    }

    return dp[0][n - 1] >= 0;
}

// Example Test Case
console.log("Test 1:", predictTheWinner([1, 5, 2]));    // Expected: false
console.log("Test 2:", predictTheWinner([1, 5, 233, 7])); // Expected: true

module.exports = predictTheWinner;
