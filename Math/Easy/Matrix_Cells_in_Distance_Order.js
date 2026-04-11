// Problem: Matrix Cells in Distance Order
// You are given four integers rows, cols, rCenter, and cCenter. There is a rows x cols matrix and you are on the cell with the coordinates (rCenter, cCenter).
// Return the coordinates of all cells in the matrix, sorted by their distance from (rCenter, cCenter) from the smallest distance to the largest distance. 
// You may return the answer in any order that satisfies this condition.
// The distance between two cells (r1, c1) and (r2, c2) is |r1 - r2| + |c1 - c2|.

// Example 1:
// Input: rows = 1, cols = 2, rCenter = 0, cCenter = 0
// Output: [[0,0],[0,1]]
// Explanation: The distances from (0, 0) to other cells are: [0,1]

// Example 2:
// Input: rows = 2, cols = 2, rCenter = 0, cCenter = 1
// Output: [[0,1],[0,0],[1,1],[1,0]]
// Explanation: The distances from (0, 1) to other cells are: [0,1,1,2].

// Constraints:
// 1 <= rows, cols <= 100
// 0 <= rCenter < rows
// 0 <= cCenter < cols

/**
 * @param {number} rows
 * @param {number} cols
 * @param {number} rCenter
 * @param {number} cCenter
 * @return {number[][]}
 */
var allCellsDistOrder = function(rows, cols, rCenter, cCenter) {
    let result = [];
    
    // Generate all cell coordinates
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            result.push([r, c]);
        }
    }
    
    // Sort based on Manhattan distance to the center
    result.sort((a, b) => {
        let distA = Math.abs(a[0] - rCenter) + Math.abs(a[1] - cCenter);
        let distB = Math.abs(b[0] - rCenter) + Math.abs(b[1] - cCenter);
        return distA - distB;
    });
    
    return result;
};

// Notes:
// - We generate all possible (r, c) coordinates in the matrix.
// - Then we sort the array of coordinates using a custom comparator based on Manhattan distance.
// - Alternatively, we could use BFS from the center, which would naturally visit cells in order of their distance.
// - Time Complexity: O(R*C log(R*C)) due to sorting. BFS would be O(R*C).
// - Space Complexity: O(R*C) for the result array.

module.exports = { allCellsDistOrder };
