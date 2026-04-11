// Problem: Projection Area of 3D Shapes
// You are given an n x n grid where we place some 1 x 1 x 1 cubes that are axis-aligned with the x, y, and z axes.
// Each value v = grid[i][j] represents a tower of v cubes placed on top of the cell (i, j).
// We view the projection of these cubes onto the xy, yz, and zx planes.
// Return the total area of all three projections.

// Example 1:
// Input: grid = [[1,2],[3,4]]
// Output: 17
// Explanation: All three projections are shown in the figure.

// Example 2:
// Input: grid = [[2]]
// Output: 5

// Constraints:
// n == grid.length == grid[i].length
// 1 <= n <= 50
// 0 <= grid[i][j] <= 50

/**
 * @param {number[][]} grid
 * @return {number}
 */
var projectionArea = function (grid) {
    let n = grid.length;
    let xyArea = 0;
    let yzArea = 0;
    let zxArea = 0;

    for (let i = 0; i < n; i++) {
        let maxInRow = 0;
        let maxInCol = 0;
        for (let j = 0; j < n; j++) {
            // XY area: number of cells with at least one cube
            if (grid[i][j] > 0) xyArea++;

            // ZX area: sum of max heights in each row
            maxInRow = Math.max(maxInRow, grid[i][j]);

            // YZ area: sum of max heights in each column
            maxInCol = Math.max(maxInCol, grid[j][i]);
        }
        zxArea += maxInRow;
        yzArea += maxInCol;
    }

    return xyArea + yzArea + zxArea;
};

// Notes:
// - XY projection: Number of non-zero cells.
// - ZX projection: Sum across rows of the maximum height in each row.
// - YZ projection: Sum across columns of the maximum height in each column.
// - Time Complexity: O(N^2)
// - Space Complexity: O(1)

module.exports = { projectionArea };
