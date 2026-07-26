/**
 * LeetCode 74: Search a 2D Matrix
 *
 * Treat the matrix as one sorted array and translate each binary-search index
 * back into row and column coordinates.
 *
 * Time Complexity: O(log(rows * columns))
 * Space Complexity: O(1)
 */

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  const columns = matrix[0].length;
  let left = 0;
  let right = matrix.length * columns - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    const value = matrix[Math.floor(middle / columns)][middle % columns];

    if (value === target) return true;
    if (value < target) left = middle + 1;
    else right = middle - 1;
  }

  return false;
};

if (require.main === module) {
  const matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]];
  const tests = [
    [matrix, 3, true],
    [matrix, 13, false],
    [[[1]], 1, true],
    [[[1]], 0, false],
  ];

  tests.forEach(([grid, target, expected], index) => {
    const actual = searchMatrix(grid, target);
    if (actual !== expected) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { searchMatrix };
