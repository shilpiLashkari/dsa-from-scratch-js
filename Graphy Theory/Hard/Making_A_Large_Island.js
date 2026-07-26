/**
 * 827. Making A Large Island
 *
 * Time: O(n^2)
 * Space: O(n^2)
 *
 * @param {number[][]} grid
 * @return {number}
 */
function largestIsland(grid) {
  const size = grid.length;
  const islandIds = Array.from({ length: size }, () => new Array(size).fill(0));
  const islandSizes = [0, 0];
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let nextIslandId = 2;

  for (let row = 0; row < size; row += 1) {
    for (let column = 0; column < size; column += 1) {
      if (grid[row][column] === 0 || islandIds[row][column] !== 0) {
        continue;
      }

      const stack = [[row, column]];
      islandIds[row][column] = nextIslandId;
      let area = 0;

      while (stack.length > 0) {
        const [currentRow, currentColumn] = stack.pop();
        area += 1;

        for (const [rowChange, columnChange] of directions) {
          const nextRow = currentRow + rowChange;
          const nextColumn = currentColumn + columnChange;

          if (
            nextRow >= 0
            && nextRow < size
            && nextColumn >= 0
            && nextColumn < size
            && grid[nextRow][nextColumn] === 1
            && islandIds[nextRow][nextColumn] === 0
          ) {
            islandIds[nextRow][nextColumn] = nextIslandId;
            stack.push([nextRow, nextColumn]);
          }
        }
      }

      islandSizes[nextIslandId] = area;
      nextIslandId += 1;
    }
  }

  let largest = 0;

  for (const area of islandSizes) {
    largest = Math.max(largest, area);
  }

  for (let row = 0; row < size; row += 1) {
    for (let column = 0; column < size; column += 1) {
      if (grid[row][column] !== 0) {
        continue;
      }

      const neighboringIslands = new Set();
      let area = 1;

      for (const [rowChange, columnChange] of directions) {
        const nextRow = row + rowChange;
        const nextColumn = column + columnChange;

        if (
          nextRow >= 0
          && nextRow < size
          && nextColumn >= 0
          && nextColumn < size
        ) {
          neighboringIslands.add(islandIds[nextRow][nextColumn]);
        }
      }

      for (const islandId of neighboringIslands) {
        area += islandSizes[islandId];
      }

      largest = Math.max(largest, area);
    }
  }

  return largest;
}

module.exports = { largestIsland };
