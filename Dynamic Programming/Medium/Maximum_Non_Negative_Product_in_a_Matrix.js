// Problem: Maximum Non Negative Product in a Matrix (LeetCode 1594)

/**
 * You are given a m x n matrix grid. Initially, you are at the cell (0, 0) 
 * and you can only move right or down in the matrix.
 * Find the path from (0, 0) to (m - 1, n - 1) which yields the maximum 
 * non-negative product.
 * Return the maximum non-negative product modulo 10^9 + 7. If no non-negative 
 * product path exists, return -1.
 * 
 * @param {number[][]} grid
 * @return {number}
 */
var maxProductPath = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const MOD = 1000000007n;

    // dpMax[i][j] stores the maximum product to reach (i, j)
    // dpMin[i][j] stores the minimum product to reach (i, j)
    const dpMax = Array.from({ length: m }, () => new Array(n));
    const dpMin = Array.from({ length: m }, () => new Array(n));

    // Initialize (0, 0)
    dpMax[0][0] = BigInt(grid[0][0]);
    dpMin[0][0] = BigInt(grid[0][0]);

    // Initialize first row
    for (let j = 1; j < n; j++) {
        dpMax[0][j] = dpMin[0][j] = dpMax[0][j - 1] * BigInt(grid[0][j]);
    }

    // Initialize first column
    for (let i = 1; i < m; i++) {
        dpMax[i][0] = dpMin[i][0] = dpMax[i - 1][0] * BigInt(grid[i][0]);
    }

    // Fill the rest of the DP table
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            const val = BigInt(grid[i][j]);
            const candidates = [
                dpMax[i - 1][j] * val,
                dpMin[i - 1][j] * val,
                dpMax[i][j - 1] * val,
                dpMin[i][j - 1] * val
            ];

            let curMax = candidates[0];
            let curMin = candidates[0];

            for (let k = 1; k < 4; k++) {
                if (candidates[k] > curMax) curMax = candidates[k];
                if (candidates[k] < curMin) curMin = candidates[k];
            }

            dpMax[i][j] = curMax;
            dpMin[i][j] = curMin;
        }
    }

    const res = dpMax[m - 1][n - 1];
    if (res < 0n) return -1;
    return Number(res % MOD);
};

// Notes:
// - Since we can have negative numbers, a minimum (negative) product can 
//   become a maximum (positive) product when multiplied by another negative.
// - We track both max and min products to each cell.
// - Time Complexity: O(m * n)
// - Space Complexity: O(m * n) - can be optimized to O(n).
// - BigInt is used to handle potential overflow and precision issues 
//   before the final modulo.

module.exports = { maxProductPath };
