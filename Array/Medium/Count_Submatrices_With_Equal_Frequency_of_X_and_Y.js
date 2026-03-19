// Problem: Count Submatrices With Equal Frequency of X and Y (LeetCode 3212)

// You are given a 2D character matrix grid where each cell is 'X', 'Y', or '.'.
// Return the number of submatrices that:
//   1. Contain grid[0][0] (i.e., are anchored at the top-left corner).
//   2. Have an equal frequency of 'X' and 'Y'.
//   3. Contain at least one 'X'.

/**
 * @param {character[][]} grid
 * @return {number}
 */
var countSubmatrices = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    let count = 0;

    // Build two 2D prefix sum arrays: one for X, one for Y.
    // cntX[i][j] = number of 'X's in the submatrix from (0,0) to (i,j)
    // cntY[i][j] = number of 'Y's in the submatrix from (0,0) to (i,j)
    const cntX = Array.from({ length: m }, () => new Array(n).fill(0));
    const cntY = Array.from({ length: m }, () => new Array(n).fill(0));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            // Current cell contribution
            const isX = grid[i][j] === 'X' ? 1 : 0;
            const isY = grid[i][j] === 'Y' ? 1 : 0;

            // Inclusion-exclusion for 2D prefix sum
            const above_x = i > 0 ? cntX[i - 1][j] : 0;
            const left_x  = j > 0 ? cntX[i][j - 1] : 0;
            const diag_x  = (i > 0 && j > 0) ? cntX[i - 1][j - 1] : 0;

            const above_y = i > 0 ? cntY[i - 1][j] : 0;
            const left_y  = j > 0 ? cntY[i][j - 1] : 0;
            const diag_y  = (i > 0 && j > 0) ? cntY[i - 1][j - 1] : 0;

            cntX[i][j] = isX + above_x + left_x - diag_x;
            cntY[i][j] = isY + above_y + left_y - diag_y;

            // Valid submatrix: equal X and Y counts, and at least one X
            if (cntX[i][j] === cntY[i][j] && cntX[i][j] > 0) {
                count++;
            }
        }
    }

    return count;
};

// Notes:
// - All valid submatrices are anchored at (0,0), so we only vary the bottom-right corner (i,j).
// - Two separate prefix sum matrices track 'X' and 'Y' occurrences independently.
// - Validity conditions: cntX == cntY (equal frequency) AND cntX > 0 (at least one X).
// - Time Complexity: O(M * N) — single pass to build prefix sums and check conditions.
// - Space Complexity: O(M * N) for the two prefix sum arrays.

module.exports = { countSubmatrices };
