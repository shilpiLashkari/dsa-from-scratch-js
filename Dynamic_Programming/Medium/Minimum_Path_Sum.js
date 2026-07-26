/**
 * LeetCode 64: Minimum Path Sum
 *
 * Use one DP row. Each cell adds its grid value to the smaller cost arriving
 * from above or from the left.
 *
 * Time Complexity: O(rows * columns)
 * Space Complexity: O(columns)
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  const costs = new Array(grid[0].length).fill(Infinity);
  costs[0] = 0;

  for (const row of grid) {
    for (let column = 0; column < row.length; column++) {
      const fromLeft = column > 0 ? costs[column - 1] : Infinity;
      costs[column] = row[column] + Math.min(costs[column], fromLeft);
    }
  }

  return costs[costs.length - 1];
};

if (require.main === module) {
  const tests = [
    [[[1, 3, 1], [1, 5, 1], [4, 2, 1]], 7],
    [[[1, 2, 3], [4, 5, 6]], 12],
    [[[5]], 5],
  ];

  tests.forEach(([grid, expected], index) => {
    const actual = minPathSum(grid);
    if (actual !== expected) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { minPathSum };
