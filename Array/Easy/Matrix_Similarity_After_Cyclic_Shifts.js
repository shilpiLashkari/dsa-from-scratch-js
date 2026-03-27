// Problem: Matrix Similarity After Cyclic Shifts (LeetCode 2946)

/**
 * You are given a 0-indexed m x n integer matrix mat and an integer k.
 * Even-indexed rows are cyclically shifted to the left by k positions.
 * Odd-indexed rows are cyclically shifted to the right by k positions.
 * Return true if the resulting matrix is identical to the original matrix.
 * 
 * @param {number[][]} mat
 * @param {number} k
 * @return {boolean}
 */
var areSimilar = function(mat, k) {
    const m = mat.length;
    const n = mat[0].length;
    
    // The effective shift amount is k % n
    const shift = k % n;
    if (shift === 0) return true;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            // After any cyclic shift k, the matrix is identical if 
            // every element mat[i][j] matches its counterpart at (j + k) % n.
            // This holds for both left and right shifts because similarity 
            // implies the row is periodic with a period dividing k.
            if (mat[i][j] !== mat[i][(j + shift) % n]) {
                return false;
            }
        }
    }
    
    return true;
};

// Notes:
// - Rotating a row by k (left or right) and getting the same row means 
//   the row's elements repeat every k positions (cyclically).
// - This is equivalent to checking mat[i][j] === mat[i][(j + k) % n].
// - Time Complexity: O(m * n)
// - Space Complexity: O(1)

module.exports = { areSimilar };
