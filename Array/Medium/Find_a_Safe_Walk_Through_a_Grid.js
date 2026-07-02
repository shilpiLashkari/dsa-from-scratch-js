/**
 * Find a Safe Walk Through a Grid
 *
 * The grid is treated as a safety map where each cell has a value of 0 or 1.
 * A safer path is the one that stays as far as possible from the nearest danger zone.
 *
 * Strategy:
 * 1. Compute the distance from every walkable cell to the nearest danger cell using a multi-source BFS.
 * 2. Start from the top-left corner and greedily move to the neighbor with the largest safety score.
 * 3. Return the minimum safety value along the selected path.
 *
 * Time Complexity: O(M * N)
 * Space Complexity: O(M * N)
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var maximumSafenessFactor = function (grid) {
  if (!grid || grid.length === 0 || grid[0].length === 0) {
    return 0;
  }

  const rows = grid.length;
  const cols = grid[0].length;
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const safetyDistance = Array.from({ length: rows }, () =>
    Array(cols).fill(-1),
  );
  const queue = [];

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (grid[row][col] === 0) {
        safetyDistance[row][col] = 0;
        queue.push([row, col]);
      }
    }
  }

  let head = 0;
  while (head < queue.length) {
    const [row, col] = queue[head];
    head += 1;

    for (const [dr, dc] of directions) {
      const nextRow = row + dr;
      const nextCol = col + dc;

      if (
        nextRow >= 0 &&
        nextRow < rows &&
        nextCol >= 0 &&
        nextCol < cols &&
        grid[nextRow][nextCol] === 1 &&
        safetyDistance[nextRow][nextCol] === -1
      ) {
        safetyDistance[nextRow][nextCol] = safetyDistance[row][col] + 1;
        queue.push([nextRow, nextCol]);
      }
    }
  }

  if (grid[0][0] === 0 || grid[rows - 1][cols - 1] === 0) {
    return 0;
  }

  const bestSafety = Array.from({ length: rows }, () => Array(cols).fill(-1));
  const frontier = [[safetyDistance[0][0], 0, 0]];
  bestSafety[0][0] = safetyDistance[0][0];

  while (frontier.length > 0) {
    frontier.sort((a, b) => b[0] - a[0]);
    const [currentSafety, row, col] = frontier.shift();

    if (bestSafety[row][col] !== currentSafety) {
      continue;
    }

    if (row === rows - 1 && col === cols - 1) {
      return currentSafety;
    }

    for (const [dr, dc] of directions) {
      const nextRow = row + dr;
      const nextCol = col + dc;

      if (
        nextRow >= 0 &&
        nextRow < rows &&
        nextCol >= 0 &&
        nextCol < cols &&
        grid[nextRow][nextCol] === 1
      ) {
        const nextSafety = Math.min(
          currentSafety,
          safetyDistance[nextRow][nextCol],
        );

        if (nextSafety > bestSafety[nextRow][nextCol]) {
          bestSafety[nextRow][nextCol] = nextSafety;
          frontier.push([nextSafety, nextRow, nextCol]);
        }
      }
    }
  }

  return 0;
};

module.exports = maximumSafenessFactor;
