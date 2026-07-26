/**
 * LeetCode 63: Unique Paths II
 *
 * Use one DP row where dp[column] stores paths from above and dp[column - 1]
 * stores paths from the left. Obstacles reset their cell to zero paths.
 *
 * Time Complexity: O(rows * columns)
 * Space Complexity: O(columns)
 */

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
  const columns = obstacleGrid[0].length;
  const paths = new Array(columns).fill(0);
  paths[0] = 1;

  for (const row of obstacleGrid) {
    for (let column = 0; column < columns; column++) {
      if (row[column] === 1) paths[column] = 0;
      else if (column > 0) paths[column] += paths[column - 1];
    }
  }

  return paths[columns - 1];
};

if (require.main === module) {
  const tests = [
    [[[0, 0, 0], [0, 1, 0], [0, 0, 0]], 2],
    [[[0, 1], [0, 0]], 1],
    [[[1]], 0],
    [[[0]], 1],
  ];

  tests.forEach(([grid, expected], index) => {
    const actual = uniquePathsWithObstacles(grid);
    if (actual !== expected) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { uniquePathsWithObstacles };
