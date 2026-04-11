// Problem: Surface Area of 3D Shapes
// You are given an n x n grid where we place some 1 x 1 x 1 cubes. 
// Each value v = grid[i][j] represents a tower of v cubes placed on top of cell (i, j).
// Return the total surface area of the resulting shapes.

// Example 1:
// Input: grid = [[1,2],[3,4]]
// Output: 34

// Example 2:
// Input: grid = [[1,1,1],[1,0,1],[1,1,1]]
// Output: 32

// Constraints:
// n == grid.length == grid[i].length
// 1 <= n <= 50
// 0 <= grid[i][j] <= 50

/**
 * @param {number[][]} grid
 * @return {number}
 */
var surfaceArea = function (grid) {
    let totalArea = 0;
    let n = grid.length;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let v = grid[i][j];
            if (v > 0) {
                // Surface area of a tower of height v is 4*v + 2
                // (4 sides * v pixels + 1 top + 1 bottom)
                totalArea += 4 * v + 2;

                // Subtract hidden area between this tower and the one on its left
                if (i > 0) {
                    totalArea -= 2 * Math.min(v, grid[i - 1][j]);
                }
                // Subtract hidden area between this tower and the one above it
                if (j > 0) {
                    totalArea -= 2 * Math.min(v, grid[i][j - 1]);
                }
            }
        }
    }

    return totalArea;
};

// Notes:
// - A single tower of height V has surface area 4*V + 2.
// - When two towers of height V1 and V2 are adjacent, they hide area equal to 2 * min(V1, V2).
// - We iterate through cells and subtract the hidden area shared with previously visited neighbors.
// - Time Complexity: O(N^2)
// - Space Complexity: O(1)

module.exports = { surfaceArea };
