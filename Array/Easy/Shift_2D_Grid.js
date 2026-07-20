/**
 * LeetCode 1260: Shift 2D Grid
 *
 * Shift every value in the grid k positions to the right. Values wrap to the
 * next row, and the bottom-right value wraps back to the top-left position.
 *
 * Strategy:
 * - Treat the rows and columns as one flattened array of length rows * columns.
 * - Convert each cell to its flattened index, add k, and wrap with modulo.
 * - Convert the shifted index back into a row and column in the result grid.
 *
 * Time Complexity: O(rows * columns)
 * Space Complexity: O(rows * columns) for the returned grid
 */

/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number[][]}
 */
var shiftGrid = function (grid, k) {
  const rows = grid.length;
  const columns = grid[0].length;
  const cellCount = rows * columns;
  const shift = k % cellCount;
  const shiftedGrid = Array.from({ length: rows }, () => Array(columns));

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const currentIndex = row * columns + column;
      const shiftedIndex = (currentIndex + shift) % cellCount;
      const shiftedRow = Math.floor(shiftedIndex / columns);
      const shiftedColumn = shiftedIndex % columns;

      shiftedGrid[shiftedRow][shiftedColumn] = grid[row][column];
    }
  }

  return shiftedGrid;
};

if (require.main === module) {
  const testCases = [
    {
      grid: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
      k: 1,
      expected: [
        [9, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
    },
    {
      grid: [
        [3, 8, 1, 9],
        [19, 7, 2, 5],
        [4, 6, 11, 10],
        [12, 0, 21, 13],
      ],
      k: 4,
      expected: [
        [12, 0, 21, 13],
        [3, 8, 1, 9],
        [19, 7, 2, 5],
        [4, 6, 11, 10],
      ],
    },
    {
      grid: [[1], [2], [3]],
      k: 6,
      expected: [[1], [2], [3]],
    },
  ];

  testCases.forEach(({ grid, k, expected }, index) => {
    const actual = shiftGrid(grid, k);
    const passed = JSON.stringify(actual) === JSON.stringify(expected);

    if (!passed) {
      throw new Error(
        `Test ${index + 1} failed: expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}`,
      );
    }

    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { shiftGrid };
