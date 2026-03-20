// Problem: Minimum Absolute Difference in Sliding Submatrix (LeetCode 3567)

// You are given an m x n integer matrix grid and an integer k.
// For each k x k submatrix, compute the minimum absolute difference between
// any two distinct values within that submatrix.
// Return a (m - k + 1) x (n - k + 1) answer matrix where ans[i][j] is the result
// for the k x k submatrix starting at (i, j).

/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number[][]}
 */
var minAbsDiff = function(grid, k) {
    const m = grid.length;
    const n = grid[0].length;
    const rows = m - k + 1;
    const cols = n - k + 1;

    // Initialize the answer matrix with zeros
    const ans = Array.from({ length: rows }, () => new Array(cols).fill(0));

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // Use a Set to collect distinct values in the k x k submatrix
            const seen = new Set();
            for (let di = 0; di < k; di++) {
                for (let dj = 0; dj < k; dj++) {
                    seen.add(grid[i + di][j + dj]);
                }
            }

            // If all values are the same (only one distinct value), diff is 0
            if (seen.size <= 1) {
                ans[i][j] = 0;
                continue;
            }

            // Sort the distinct values and find the minimum adjacent difference
            const sorted = Array.from(seen).sort((a, b) => a - b);
            let minDiff = Infinity;
            for (let p = 1; p < sorted.length; p++) {
                minDiff = Math.min(minDiff, sorted[p] - sorted[p - 1]);
            }
            ans[i][j] = minDiff;
        }
    }

    return ans;
};

// Notes:
// - For each k x k submatrix, we extract unique values using a Set.
// - Sorting the distinct values and checking adjacent pairs gives the minimum absolute difference.
//   This works because after sorting, the global minimum difference is always between two adjacent elements.
// - If all elements are identical, the answer is 0 by definition.
// - Time Complexity: O((m-k+1) * (n-k+1) * k^2 * log(k^2))
//   Each submatrix takes O(k^2) to collect values and O(k^2 * log(k^2)) to sort.
// - Space Complexity: O(k^2) per submatrix for the Set and sorted array.

module.exports = { minAbsDiff };
