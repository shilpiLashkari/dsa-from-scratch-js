/**
 * LeetCode 463: Island Perimeter
 *
 * Add four edges for every land cell, then subtract two for each shared edge
 * with land above or to the left.
 *
 * Time Complexity: O(rows * columns)
 * Space Complexity: O(1)
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var islandPerimeter = function (grid) {
  let perimeter = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid[0].length; column++) {
      if (grid[row][column] === 0) continue;

      perimeter += 4;
      if (row > 0 && grid[row - 1][column] === 1) perimeter -= 2;
      if (column > 0 && grid[row][column - 1] === 1) perimeter -= 2;
    }
  }

  return perimeter;
};

if (require.main === module) {
  const tests = [
    [
      [
        [0, 1, 0, 0],
        [1, 1, 1, 0],
        [0, 1, 0, 0],
        [1, 1, 0, 0],
      ],
      16,
    ],
    [[[1]], 4],
    [[[1, 0]], 4],
  ];

  tests.forEach(([grid, expected], index) => {
    const actual = islandPerimeter(grid);
    if (actual !== expected) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { islandPerimeter };
