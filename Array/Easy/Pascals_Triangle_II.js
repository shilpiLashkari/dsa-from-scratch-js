/**
 * LeetCode 119: Pascal's Triangle II
 *
 * Maintain one row and update it from right to left so every calculation still
 * reads values from the preceding row.
 *
 * Time Complexity: O(rowIndex^2)
 * Space Complexity: O(rowIndex)
 */

/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function (rowIndex) {
  const row = [1];

  for (let currentRow = 1; currentRow <= rowIndex; currentRow++) {
    row.push(1);

    for (let column = currentRow - 1; column > 0; column--) {
      row[column] += row[column - 1];
    }
  }

  return row;
};

if (require.main === module) {
  const tests = [
    [3, [1, 3, 3, 1]],
    [0, [1]],
    [1, [1, 1]],
    [5, [1, 5, 10, 10, 5, 1]],
  ];

  tests.forEach(([rowIndex, expected], index) => {
    const actual = getRow(rowIndex);
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { getRow };
