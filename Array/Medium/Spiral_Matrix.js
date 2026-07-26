/**
 * LeetCode 54: Spiral Matrix
 *
 * Repeatedly consume the top row, right column, bottom row, and left column
 * while shrinking four boundaries.
 *
 * Time Complexity: O(rows * columns)
 * Space Complexity: O(1), excluding the output
 */

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  const order = [];
  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    for (let column = left; column <= right; column++) {
      order.push(matrix[top][column]);
    }
    top++;

    for (let row = top; row <= bottom; row++) {
      order.push(matrix[row][right]);
    }
    right--;

    if (top <= bottom) {
      for (let column = right; column >= left; column--) {
        order.push(matrix[bottom][column]);
      }
      bottom--;
    }

    if (left <= right) {
      for (let row = bottom; row >= top; row--) {
        order.push(matrix[row][left]);
      }
      left++;
    }
  }

  return order;
};

if (require.main === module) {
  const tests = [
    [[[1, 2, 3], [4, 5, 6], [7, 8, 9]], [1, 2, 3, 6, 9, 8, 7, 4, 5]],
    [
      [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]],
      [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7],
    ],
    [[[1]], [1]],
  ];

  tests.forEach(([matrix, expected], index) => {
    const actual = spiralOrder(matrix);
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`Test ${index + 1}: spiral order mismatch`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { spiralOrder };
