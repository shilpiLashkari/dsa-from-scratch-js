// Problem: Maximum Amount of Money Robot Can Earn
//
// You are given an m x n grid coins. A robot starts at (0, 0) and wants to reach (m - 1, n - 1). 
// Each cell (i, j) contains coins[i][j] which can be positive (gain money) or negative (robber).
// 
// The robot moves only right or down. In addition, the robot can choose to neutralize the robber 
// at most twice in its journey, making the cost 0 for that cell.
// 
// Find the maximum amount of money the robot can have at the end.
//
// Example 1:
// Input: coins = [[10,10,10],[10,10,10]]
// Output: 40
//
// Example 2:
// Input: coins = [[1,1,-1],[1,-1,1],[-1,1,1]]
// Output: 3
//
// Constraints:
// m == coins.length
// n == coins[i].length
// 1 <= m, n <= 500
// -10^9 <= coins[i][j] <= 10^9

/**
 * @param {number[][]} coins
 * @return {number}
 */
var maximumAmount = function (coins) {
    const m = coins.length;
    const n = coins[0].length;

    // dp[i][j][k] = max money at cell (i, j) with k neutralizations used
    // We initialize with a safe negative infinity.
    const NEG_INF = -Infinity;
    
    // We initialize our 3D DP array
    let dp0 = Array.from({ length: m }, () => new Float64Array(n).fill(NEG_INF));
    let dp1 = Array.from({ length: m }, () => new Float64Array(n).fill(NEG_INF));
    let dp2 = Array.from({ length: m }, () => new Float64Array(n).fill(NEG_INF));

    // Base Case at (0, 0)
    dp0[0][0] = coins[0][0];
    if (coins[0][0] < 0) {
        dp1[0][0] = 0; // Neutralize at (0, 0)
        dp2[0][0] = 0; // Neutralize at (0, 0) - k=2 also covers k=1
    } else {
        dp1[0][0] = coins[0][0];
        dp2[0][0] = coins[0][0];
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0) continue;

            const val = coins[i][j];

            // Potential previous cells
            const fromAbove = i > 0;
            const fromLeft = j > 0;

            // Update for k=0 (no neutralizations used)
            if (fromAbove) dp0[i][j] = Math.max(dp0[i][j], dp0[i - 1][j] + val);
            if (fromLeft) dp0[i][j] = Math.max(dp0[i][j], dp0[i][j - 1] + val);

            // Update for k=1
            if (fromAbove) {
                dp1[i][j] = Math.max(dp1[i][j], dp1[i - 1][j] + val);
                if (val < 0) dp1[i][j] = Math.max(dp1[i][j], dp0[i - 1][j]); // Neutralize at current cell
            }
            if (fromLeft) {
                dp1[i][j] = Math.max(dp1[i][j], dp1[i][j - 1] + val);
                if (val < 0) dp1[i][j] = Math.max(dp1[i][j], dp0[i][j - 1]); // Neutralize at current cell
            }

            // Update for k=2
            if (fromAbove) {
                dp2[i][j] = Math.max(dp2[i][j], dp2[i - 1][j] + val);
                if (val < 0) dp2[i][j] = Math.max(dp2[i][j], dp1[i - 1][j]); // Neutralize at current cell
            }
            if (fromLeft) {
                dp2[i][j] = Math.max(dp2[i][j], dp2[i][j - 1] + val);
                if (val < 0) dp2[i][j] = Math.max(dp2[i][j], dp1[i][j - 1]); // Neutralize at current cell
            }
        }
    }

    return dp2[m - 1][n - 1];
};

// Notes:
// - We use 3 separate 2D arrays (dp0, dp1, dp2) to represent k=0, 1, 2 neutralizations.
// - At each cell, the robot can either:
//   1. Take the coin (positive or negative) without using its power (k stays the same).
//   2. If the coin is negative, use one neutralization power (k increases by 1).
// - Time Complexity: O(M * N) since we visit each cell once and do constant time updates.
// - Space Complexity: O(M * N) to store the DP table. Can be O(N) if only current 
//   and previous rows are kept.

module.exports = { maximumAmount };
