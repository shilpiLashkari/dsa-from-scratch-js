// Problem: Flip Square Submatrix Vertically (LeetCode 3643)

// You are given an m x n integer matrix grid, and three integers x, y, and k.
// Flip (reverse the row order of) the k x k submatrix of grid whose top-left corner is at (x, y).
// Return the modified grid.

/**
 * @param {number[][]} grid
 * @param {number} x
 * @param {number} y
 * @param {number} k
 * @return {number[][]}
 */
var flipSubmatrix = function(grid, x, y, k) {
    let top = x;
    let bottom = x + k - 1;

    // Use two pointers to swap rows within the k x k submatrix
    while (top < bottom) {
        // Swap only the k columns in the submatrix (from col y to y + k - 1)
        for (let col = y; col < y + k; col++) {
            const temp = grid[top][col];
            grid[top][col] = grid[bottom][col];
            grid[bottom][col] = temp;
        }
        top++;
        bottom--;
    }

    return grid;
};

// Notes:
// - "Flip vertically" means reversing the order of the rows within the submatrix.
// - Only elements within the k x k region (rows x to x+k-1, cols y to y+k-1) are modified.
// - A two-pointer approach pairs the top and bottom rows and swaps them column by column.
// - Elements outside the submatrix remain unchanged.
// - Time Complexity: O(k^2) — at most k/2 row swaps, each swapping k elements.
// - Space Complexity: O(1) — in-place modification.

module.exports = { flipSubmatrix };
