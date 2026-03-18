// Problem: Count Submatrices with Top-Left Element and Sum Less Than k (LeetCode 3070)

// You are given a 0-indexed integer matrix grid and an integer k.
// Return the number of submatrices that contain the top-left element of the grid, 
// and have a sum less than or equal to k.

/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
var countSubmatrices = function(grid, k) {
    const m = grid.length;
    const n = grid[0].length;
    let count = 0;

    // Use a 2D Prefix Sum (Integral Image) approach.
    // We can compute the prefix sum in-place by mutating the grid.
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            // The sum of the submatrix from (0,0) to (i,j) is:
            // current_value + sum_above + sum_left - intersection_sum_top_left
            // Since we are mutating in-place, grid[i][j] holds the current value initially.
            
            let above = (i > 0) ? grid[i - 1][j] : 0;
            let left = (j > 0) ? grid[i][j - 1] : 0;
            let intersection = (i > 0 && j > 0) ? grid[i - 1][j - 1] : 0;
            
            grid[i][j] = grid[i][j] + above + left - intersection;
            
            // If the sum of the submatrix anchored at (0,0) ending at (i,j) is <= k, 
            // increment the valid submatrix count.
            if (grid[i][j] <= k) {
                count++;
            } else {
                // Optimization: Since all grid values are non-negative integers (per problem constraints typically),
                // if a submatrix sum exceeds k, any submatrix extending further right or down 
                // will also exceed k. We could potentially break early, but a simple 
                // full traversal is O(m * n) anyway, which easily passes within limits.
                // Note: The constraints usually specify positive grid elements, but if 0s are allowed, 
                // we can't strict-break the entire row/col immediately in all variants, 
                // though usually we could break the current row loop if it gets too large.
            }
        }
    }

    return count;
};

// Notes:
// - A naive approach would iterate all submatrices starting at (0,0) resulting in O(M^2 * N^2) or O(M * N) 
//   if iterating sizes manually for a fixed top-left point.
// - 2D Prefix sums conceptually compress submatrix evaluation.
// - grid[i][j] becomes the cumulative sum of the submatrix bounded by (0,0) and (i,j).
// - Time Complexity: O(M * N) since we traverse the entire grid exactly once.
// - Space Complexity: O(1) if modifying input matrix directly, O(M * N) otherwise.

module.exports = { countSubmatrices };
