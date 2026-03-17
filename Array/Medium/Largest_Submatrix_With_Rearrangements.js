// Problem: Largest Submatrix With Rearrangements (LeetCode 1727)

// You are given a binary matrix matrix of size m x n, and you are allowed to rearrange the columns of the matrix in any order.
// Return the area of the largest submatrix within matrix where every element of the submatrix is 1 after reordering the columns optimally.

/**
 * @param {number[][]} matrix
 * @return {number}
 */
var largestSubmatrix = function(matrix) {
    const m = matrix.length;
    const n = matrix[0].length;
    let maxArea = 0;

    // Step 1: Compute cumulative consecutive 1's heights for each column
    for (let i = 1; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 1) {
                // Accumulate height from the cell directly above
                matrix[i][j] += matrix[i - 1][j];
            }
        }
    }

    // Step 2: Sort each row and calculate max area
    for (let i = 0; i < m; i++) {
        // Sort the current row's heights in descending order
        // This mimics optimally moving the columns with the tallest heights together
        let sortedHeights = matrix[i].slice().sort((a, b) => b - a);

        for (let k = 0; k < n; k++) {
            // Because it's sorted descending, sortedHeights[k] is the minimum height 
            // among the first k + 1 columns in this rearranged subset.
            // Width is explicitly (k + 1).
            const currentHeight = sortedHeights[k];
            const currentArea = currentHeight * (k + 1);
            maxArea = Math.max(maxArea, currentArea);
            
            // Optimization: If currentHeight is 0, subsequent heights will also be 0, so break early
            if (currentHeight === 0) break;
        }
    }

    return maxArea;
};

// Notes:
// - A naive checking of every combination of columns is O(2^N * M), which is vastly inefficient.
// - Instead, we can process column heights row by row. If matrix[i][j] is 1, its "height" 
//   increases based on the cell directly above it. If it's 0, the height resets to 0.
// - This turns the problem into finding the largest rectangle in a histogram for each row, 
//   BUT with the freedom to rearrange bars.
// - By sorting each row's computed heights in descending order, we optimally group taller columns
//   together. The area calculation then simply evaluates max(height[k] * (k + 1)).
// - Time Complexity: O(M * N * log(N)) due to the sorting step for each of the M rows.
// - Space Complexity: O(N) auxiliary space per row for the `slice()` during sorting, 
//   with the input matrix modified in place to store heights.

module.exports = { largestSubmatrix };
