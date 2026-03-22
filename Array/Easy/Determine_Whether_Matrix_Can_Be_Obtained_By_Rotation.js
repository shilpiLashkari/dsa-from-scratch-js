// Problem: Determine Whether Matrix Can Be Obtained By Rotation (LeetCode 1886)

/**
 * Given two n x n binary matrices mat and target, return true if it is 
 * possible to make mat equal to target by rotating mat in 90-degree 
 * increments, or false otherwise.
 * 
 * @param {number[][]} mat
 * @param {number[][]} target
 * @return {boolean}
 */
var findRotation = function(mat, target) {
    const n = mat.length;

    /**
     * Helper to rotate a matrix 90 degrees clockwise in-place.
     * @param {number[][]} matrix 
     */
    const rotate = (matrix) => {
        // Transpose the matrix
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
            }
        }
        // Reverse each row
        for (let i = 0; i < n; i++) {
            matrix[i].reverse();
        }
    };

    /**
     * Helper to compare two n x n matrices.
     * @param {number[][]} m1 
     * @param {number[][]} m2 
     * @returns {boolean}
     */
    const isEqual = (m1, m2) => {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (m1[i][j] !== m2[i][j]) return false;
            }
        }
        return true;
    };

    // Try up to 4 rotations (0, 90, 180, 270)
    for (let i = 0; i < 4; i++) {
        if (isEqual(mat, target)) {
            return true;
        }
        rotate(mat);
    }

    return false;
};

// Notes:
// - A 90-degree clockwise rotation can be achieved by transposing the matrix 
//   and then reversing each row.
// - We check all 4 possible rotations (0, 90, 180, 270 degrees) to see if 
//   any rotation matches the target.
// - Time Complexity: O(n^2) where n is the number of rows/cols. Comparing 
//   and rotating both take O(n^2), and we do it at most 4 times.
// - Space Complexity: O(1) if we rotate the matrix in-place.

module.exports = { findRotation };
