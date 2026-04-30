/**
 * Problem: Unique Paths II (LeetCode 63)
 * You are given an m x n integer array grid. There is a robot initially located at the top-left corner (grid[0][0]).
 * The robot tries to move to the bottom-right corner (grid[m - 1][n - 1]).
 * The robot can only move either down or right at any point in time.
 * 
 * An obstacle and space are marked as 1 or 0, respectively.
 * Return the number of possible unique paths that the robot can take to reach the bottom-right corner.
 * 
 * Time Complexity: O(m * n)
 * Space Complexity: O(n) - Space optimized DP using a single row
 */

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
function uniquePathsWithObstacles(obstacleGrid) {
    const m = obstacleGrid.length;
    if (m === 0) return 0;
    const n = obstacleGrid[0].length;

    // If the start or end is blocked, no paths exist
    if (obstacleGrid[0][0] === 1 || obstacleGrid[m - 1][n - 1] === 1) return 0;

    // dp[j] represents the number of ways to reach column j in the current row
    let dp = new Array(n).fill(0);
    
    // Initial position
    dp[0] = 1;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (obstacleGrid[i][j] === 1) {
                // If there's an obstacle, 0 ways to reach/pass through this cell
                dp[j] = 0;
            } else if (j > 0) {
                // Number of ways to reach (i, j) = ways from top (dp[j]) + ways from left (dp[j-1])
                dp[j] += dp[j - 1];
            }
        }
    }

    return dp[n - 1];
}

// --- Test Cases ---

const testCases = [
    {
        grid: [
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0]
        ],
        expected: 2
    },
    {
        grid: [
            [0, 1],
            [0, 0]
        ],
        expected: 1
    },
    {
        grid: [
            [0, 0],
            [1, 1],
            [0, 0]
        ],
        expected: 0
    },
    {
        grid: [[1]],
        expected: 0
    }
];

testCases.forEach((tc, i) => {
    const result = uniquePathsWithObstacles(tc.grid);
    console.log(`Test Case ${i + 1}: Expected ${tc.expected}, Got ${result}`);
});

module.exports = uniquePathsWithObstacles;
