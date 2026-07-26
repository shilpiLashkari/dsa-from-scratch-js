/**
 * LeetCode 118: Pascal's Triangle
 *
 * Build each row from the adjacent pairs in the preceding row. The two boundary
 * values are always 1.
 *
 * Time Complexity: O(numRows^2)
 * Space Complexity: O(numRows^2)
 */

/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
  const triangle = [];

  for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
    const row = new Array(rowIndex + 1).fill(1);

    for (let column = 1; column < rowIndex; column++) {
      row[column] =
        triangle[rowIndex - 1][column - 1] +
        triangle[rowIndex - 1][column];
    }

    triangle.push(row);
  }

  return triangle;
};

if (require.main === module) {
  const tests = [
    [5, [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]],
    [1, [[1]]],
    [2, [[1], [1, 1]]],
  ];

  tests.forEach(([numRows, expected], index) => {
    const actual = generate(numRows);
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`Test ${index + 1}: triangle mismatch`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { generate };
