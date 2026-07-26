class UnionFind {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, index) => index);
    this.componentSize = new Array(size).fill(1);
  }

  find(node) {
    while (node !== this.parent[node]) {
      this.parent[node] = this.parent[this.parent[node]];
      node = this.parent[node];
    }

    return node;
  }

  union(first, second) {
    let firstRoot = this.find(first);
    let secondRoot = this.find(second);

    if (firstRoot === secondRoot) {
      return;
    }

    if (this.componentSize[firstRoot] < this.componentSize[secondRoot]) {
      [firstRoot, secondRoot] = [secondRoot, firstRoot];
    }

    this.parent[secondRoot] = firstRoot;
    this.componentSize[firstRoot] += this.componentSize[secondRoot];
  }

  size(node) {
    return this.componentSize[this.find(node)];
  }
}

/**
 * 803. Bricks Falling When Hit
 *
 * Time: O((rows * columns + hits) * alpha(rows * columns))
 * Space: O(rows * columns)
 *
 * @param {number[][]} grid
 * @param {number[][]} hits
 * @return {number[]}
 */
function hitBricks(grid, hits) {
  const rows = grid.length;
  const columns = grid[0].length;
  const roof = rows * columns;
  const workingGrid = grid.map((row) => [...row]);
  const unionFind = new UnionFind(roof + 1);
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  for (const [row, column] of hits) {
    workingGrid[row][column] -= 1;
  }

  const indexOf = (row, column) => row * columns + column;

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      if (workingGrid[row][column] !== 1) {
        continue;
      }

      if (row === 0) {
        unionFind.union(indexOf(row, column), roof);
      }

      if (row > 0 && workingGrid[row - 1][column] === 1) {
        unionFind.union(indexOf(row, column), indexOf(row - 1, column));
      }

      if (column > 0 && workingGrid[row][column - 1] === 1) {
        unionFind.union(indexOf(row, column), indexOf(row, column - 1));
      }
    }
  }

  const fallen = new Array(hits.length).fill(0);

  for (let hitIndex = hits.length - 1; hitIndex >= 0; hitIndex -= 1) {
    const [row, column] = hits[hitIndex];
    workingGrid[row][column] += 1;

    if (workingGrid[row][column] !== 1) {
      continue;
    }

    const before = unionFind.size(roof);
    const brick = indexOf(row, column);

    if (row === 0) {
      unionFind.union(brick, roof);
    }

    for (const [rowChange, columnChange] of directions) {
      const nextRow = row + rowChange;
      const nextColumn = column + columnChange;

      if (
        nextRow >= 0
        && nextRow < rows
        && nextColumn >= 0
        && nextColumn < columns
        && workingGrid[nextRow][nextColumn] === 1
      ) {
        unionFind.union(brick, indexOf(nextRow, nextColumn));
      }
    }

    fallen[hitIndex] = Math.max(0, unionFind.size(roof) - before - 1);
  }

  return fallen;
}

module.exports = { hitBricks };
