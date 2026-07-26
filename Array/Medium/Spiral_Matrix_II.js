/**
 * LeetCode 59: Spiral Matrix II
 *
 * Fill successive top, right, bottom, and left boundaries with increasing
 * values while shrinking the remaining square.
 *
 * Time Complexity: O(n^2)
 * Space Complexity: O(n^2)
 */

/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
  const matrix = Array.from({ length: n }, () => new Array(n));
  let top = 0;
  let bottom = n - 1;
  let left = 0;
  let right = n - 1;
  let value = 1;

  while (top <= bottom) {
    for (let column = left; column <= right; column++) {
      matrix[top][column] = value++;
    }
    top++;

    for (let row = top; row <= bottom; row++) {
      matrix[row][right] = value++;
    }
    right--;

    if (top <= bottom) {
      for (let column = right; column >= left; column--) {
        matrix[bottom][column] = value++;
      }
      bottom--;
    }

    if (left <= right) {
      for (let row = bottom; row >= top; row--) {
        matrix[row][left] = value++;
      }
      left++;
    }
  }

  return matrix;
};

if (require.main === module) {
  const tests = [
    [3, [[1, 2, 3], [8, 9, 4], [7, 6, 5]]],
    [1, [[1]]],
    [2, [[1, 2], [4, 3]]],
  ];

  tests.forEach(([n, expected], index) => {
    const actual = generateMatrix(n);
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`Test ${index + 1}: generated matrix mismatch`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { generateMatrix };
