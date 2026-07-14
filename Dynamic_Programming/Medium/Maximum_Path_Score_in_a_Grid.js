/**
 * Problem: Maximum Path Score in a Grid
 * You are given an m x n grid where each cell contains a value of 0, 1, or 2, and an integer k.
 * You start at (0, 0) and must reach (m - 1, n - 1) moving only right or down.
 * 
 * Each cell value determines its score and cost:
 * - 0: adds 0 to score, costs 0.
 * - 1: adds 1 to score, costs 1.
 * - 2: adds 2 to score, costs 1.
 * 
 * Goal: Return the maximum score achievable without exceeding the total cost k.
 * If no such path exists, return -1.
 * 
 * Constraints:
 * - m, n <= 200
 * - k <= 1000
 * - grid[0][0] == 0
 * 
 * Time Complexity: O(m * n * k)
 * Space Complexity: O(n * k) - Space optimized from 3D DP to 2D
 */

/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
function maxPathScore(grid, k) {
    const m = grid.length;
    if (m === 0) return -1;
    const n = grid[0].length;

    // dp[j][c] stores the maximum score to reach column j with exactly c cost
    // We use a single row (dp) to represent the previous row and a temporary row (next_dp) for the current row.
    let dp = Array.from({ length: n }, () => new Int32Array(k + 1).fill(-1));

    for (let i = 0; i < m; i++) {
        let next_dp = Array.from({ length: n }, () => new Int32Array(k + 1).fill(-1));
        for (let j = 0; j < n; j++) {
            const val = grid[i][j];
            const costVal = val > 0 ? 1 : 0;
            const scoreVal = val;

            if (i === 0 && j === 0) {
                // Base case: starting point
                next_dp[0][0] = 0;
                continue;
            }

            for (let c = costVal; c <= k; c++) {
                let maxPrev = -1;

                // From top (previous row, same column)
                if (i > 0 && dp[j][c - costVal] !== -1) {
                    maxPrev = Math.max(maxPrev, dp[j][c - costVal]);
                }

                // From left (same row, previous column)
                if (j > 0 && next_dp[j - 1][c - costVal] !== -1) {
                    maxPrev = Math.max(maxPrev, next_dp[j - 1][c - costVal]);
                }

                if (maxPrev !== -1) {
                    next_dp[j][c] = maxPrev + scoreVal;
                }
            }
        }
        dp = next_dp;
    }

    let maxScore = -1;
    for (let c = 0; c <= k; c++) {
        maxScore = Math.max(maxScore, dp[n - 1][c]);
    }

    return maxScore;
}

// --- Test Cases ---

const testCases = [
    {
        grid: [
            [0, 1, 0],
            [1, 2, 1],
            [0, 1, 0]
        ],
        k: 2,
        expected: 3 // Path: (0,0)->(0,1)->(1,1)->(2,1)->(2,2) cost: 1+1+1+1=4 (Wait, cost limit k=2)
        // Let's re-calculate:
        // (0,0)[0,0] -> (0,1)[1,1] -> (0,2)[0,1] -> (1,2)[1,2] -> (2,2)[0,2] => Score: 0+1+0+1+0=2, Cost: 0+1+0+1+0=2 (Valid)
        // (0,0)[0,0] -> (1,0)[1,1] -> (2,0)[0,1] -> (2,1)[1,2] -> (2,2)[0,2] => Score: 0+1+0+1+0=2, Cost: 0+1+0+1+0=2 (Valid)
        // (0,0)[0,0] -> (0,1)[1,1] -> (1,1)[2,2] -> (1,2)[1,3] (Invalid cost)
        // Max score with k=2 is 2.
    },
    {
        grid: [
            [0, 2, 2],
            [0, 1, 1],
            [0, 0, 0]
        ],
        k: 1,
        expected: 2 // Path: (0,0)->(0,1)->(0,2)->(1,2)->(2,2) costs 1+1+1=3 (Invalid)
        // Path: (0,0)->(1,0)->(2,0)->(2,1)->(2,2) costs 0+0+0+0=0, Score 0.
        // Path: (0,0)->(0,1)->(1,1)->(2,1)->(2,2) cost 1+1+0+0=2 (Invalid)
        // Path: (0,0)->(1,0)->(1,1)->(2,1)->(2,2) cost 0+1+0+0=1, Score 1.
        // Path: (0,0)->(0,1)->(1,1)->(1,2)->(2,2) cost 1+1+1=3 (Invalid)
        // Path: (0,0)->(0,1)->(0,2)... cost > 1
        // (0,0)->(0,1)->(1,1)->(2,1)->(2,2) score 2+1=3 cost 2.
        // Max score with k=1 is 1.
    },
    {
        grid: [
            [0, 1],
            [1, 0]
        ],
        k: 0,
        expected: -1 // No path with cost 0 exists except (0,0)->(0,1) is cost 1, (0,0)->(1,0) is cost 1.
        // Wait, if grid[i][j]=0, cost is 0.
        // Path (0,0)->(0,1) cost 1.
        // Path (0,0)->(1,0) cost 1.
        // Both exceed k=0.
    }
];

// Correcting expected values based on manual dry run:
// Case 1: k=2. Path (0,0)->(0,1)->(0,2)->(1,2)->(2,2) Score: 0+1+0+1+0=2, Cost: 0+1+0+1+0=2. Max score 2.
// Case 2: k=1. Path (0,0)->(1,0)->(1,1)->(2,1)->(2,2) Score: 0+0+1+0+0=1, Cost: 0+0+1+0+0=1. Max score 1.
// Case 3: k=0. No valid path to (1,1) with cost 0. Output -1.

testCases[0].expected = 2;
testCases[1].expected = 1;
testCases[2].expected = -1;

testCases.forEach((tc, i) => {
    const result = maxPathScore(tc.grid, tc.k);
    console.log(`Test Case ${i + 1}: Expected ${tc.expected}, Got ${result}`);
});

module.exports = maxPathScore;
