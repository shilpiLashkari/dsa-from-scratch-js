class MinHeap {
  constructor() {
    this.values = [];
  }

  push(value) {
    this.values.push(value);
    let index = this.values.length - 1;

    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);

      if (this.values[parent][0] <= value[0]) {
        break;
      }

      this.values[index] = this.values[parent];
      index = parent;
    }

    this.values[index] = value;
  }

  pop() {
    const minimum = this.values[0];
    const last = this.values.pop();

    if (this.values.length === 0) {
      return minimum;
    }

    this.values[0] = last;
    let index = 0;

    while (true) {
      const left = index * 2 + 1;
      const right = left + 1;
      let smallest = index;

      if (
        left < this.values.length
        && this.values[left][0] < this.values[smallest][0]
      ) {
        smallest = left;
      }

      if (
        right < this.values.length
        && this.values[right][0] < this.values[smallest][0]
      ) {
        smallest = right;
      }

      if (smallest === index) {
        break;
      }

      [this.values[index], this.values[smallest]] = [
        this.values[smallest],
        this.values[index],
      ];
      index = smallest;
    }

    return minimum;
  }

  get size() {
    return this.values.length;
  }
}

/**
 * 778. Swim in Rising Water
 *
 * Time: O(n^2 log n)
 * Space: O(n^2)
 *
 * @param {number[][]} grid
 * @return {number}
 */
function swimInWater(grid) {
  const size = grid.length;
  const best = Array.from(
    { length: size },
    () => new Array(size).fill(Number.POSITIVE_INFINITY),
  );
  const heap = new MinHeap();
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  best[0][0] = grid[0][0];
  heap.push([grid[0][0], 0, 0]);

  while (heap.size > 0) {
    const [time, row, column] = heap.pop();

    if (row === size - 1 && column === size - 1) {
      return time;
    }

    if (time !== best[row][column]) {
      continue;
    }

    for (const [rowChange, columnChange] of directions) {
      const nextRow = row + rowChange;
      const nextColumn = column + columnChange;

      if (
        nextRow < 0
        || nextRow >= size
        || nextColumn < 0
        || nextColumn >= size
      ) {
        continue;
      }

      const nextTime = Math.max(time, grid[nextRow][nextColumn]);

      if (nextTime < best[nextRow][nextColumn]) {
        best[nextRow][nextColumn] = nextTime;
        heap.push([nextTime, nextRow, nextColumn]);
      }
    }
  }

  return -1;
}

module.exports = { swimInWater };
