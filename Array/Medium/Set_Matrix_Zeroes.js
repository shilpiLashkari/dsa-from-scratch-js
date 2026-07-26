/**
 * LeetCode 73: Set Matrix Zeroes
 *
 * Use the first row and column as marker storage, with separate flags preserving
 * whether those marker regions originally contained zeroes.
 *
 * Time Complexity: O(rows * columns)
 * Space Complexity: O(1)
 */

/**
 * @param {number[][]} matrix
 * @return {void}
 */
var setZeroes = function (matrix) {
  const rows = matrix.length;
  const columns = matrix[0].length;
  let zeroFirstRow = false;
  let zeroFirstColumn = false;

  for (let column = 0; column < columns; column++) {
    if (matrix[0][column] === 0) zeroFirstRow = true;
  }

  for (let row = 0; row < rows; row++) {
    if (matrix[row][0] === 0) zeroFirstColumn = true;
  }

  for (let row = 1; row < rows; row++) {
    for (let column = 1; column < columns; column++) {
      if (matrix[row][column] === 0) {
        matrix[row][0] = 0;
        matrix[0][column] = 0;
      }
    }
  }

  for (let row = 1; row < rows; row++) {
    for (let column = 1; column < columns; column++) {
      if (matrix[row][0] === 0 || matrix[0][column] === 0) {
        matrix[row][column] = 0;
      }
    }
  }

  if (zeroFirstRow) matrix[0].fill(0);
  if (zeroFirstColumn) {
    for (const row of matrix) row[0] = 0;
  }
};

if (require.main === module) {
  const tests = [
    [[[1, 1, 1], [1, 0, 1], [1, 1, 1]], [[1, 0, 1], [0, 0, 0], [1, 0, 1]]],
    [
      [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]],
      [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]],
    ],
    [[[1]], [[1]]],
  ];

  tests.forEach(([input, expected], index) => {
    const actual = input.map((row) => [...row]);
    setZeroes(actual);
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`Test ${index + 1}: matrix mismatch`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { setZeroes };
