// Problem: Get Biggest Three Rhombus Sums in a Grid (LeetCode 1878)

// You are given an m x n integer matrix grid.
// A rhombus sum is the sum of the elements that form the border of a regular rhombus shape in grid. 
// The rhombus must have the shape of a square rotated 45 degrees with each of the corners centered in a grid cell.
// Return the biggest three distinct rhombus sums in the grid in descending order. 
// If there are less than three distinct values, return all of them.

/**
 * @param {number[][]} grid
 * @return {number[]}
 */
var getBiggestThree = function (grid) {
    let m = grid.length;
    let n = grid[0].length;
    let distinctSums = new Set();

    // Iterate through every cell as the potential top coordinate of a rhombus
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            // Expand the size (radius 'k') of the rhombus
            // k = 0 means a single cell rhombus
            let k = 0;
            while (i + 2 * k < m && j - k >= 0 && j + k < n) {
                let sum = 0;

                if (k === 0) {
                    sum = grid[i][j];
                } else {
                    let topRow = i, topCol = j;
                    let bottomRow = i + 2 * k, bottomCol = j;
                    let leftRow = i + k, leftCol = j - k;
                    let rightRow = i + k, rightCol = j + k;

                    // Traverse top-right edge
                    for (let r = topRow, c = topCol; c < rightCol; r++, c++) {
                        sum += grid[r][c];
                    }
                    // Traverse bottom-right edge
                    for (let r = rightRow, c = rightCol; r < bottomRow; r++, c--) {
                        sum += grid[r][c];
                    }
                    // Traverse bottom-left edge
                    for (let r = bottomRow, c = bottomCol; c > leftCol; r--, c--) {
                        sum += grid[r][c];
                    }
                    // Traverse top-left edge
                    for (let r = leftRow, c = leftCol; r > topRow; r--, c++) {
                        sum += grid[r][c];
                    }
                }

                distinctSums.add(sum);
                k++;
            }
        }
    }

    // Convert Set back to array, sort descending, and take top 3
    let sortedDistinctSums = Array.from(distinctSums).sort((a, b) => b - a);
    return sortedDistinctSums.slice(0, 3);
};

// Notes:
// - A rhombus is defined by a top corner, a size 'k', and left/right/bottom corners.
// - Size k=0 is a single point.
// - For any k > 0, the sum involves walking along the perimeter's four lines.
// - Top corner: (i, j)
// - Right corner: (i + k, j + k)
// - Bottom corner: (i + 2k, j)
// - Left corner: (i + k, j - k)
// - Constraints valid for checking: i + 2*k < rows, j - k >= 0, j + k < cols.
// - Time Complexity: O(M * N * min(M, N)), as maximum k is half the shortest matrix dimension.
//   Inside the k-loop, the traversal is proportional to k. So roughly O(M * N * min(M,N)^2).
//   Given M, N <= 50, this easily runs within limits.
// - Space Complexity: O(U) where U is number of unique sums, though bounded by total number of possible rhombi.

module.exports = { getBiggestThree };
