class MaxHeap {
  constructor() {
    this.values = [];
  }

  peek() {
    return this.values[0];
  }

  push(value) {
    this.values.push(value);
    let index = this.values.length - 1;

    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);

      if (this.values[parent][0] >= value[0]) {
        break;
      }

      this.values[index] = this.values[parent];
      index = parent;
    }

    this.values[index] = value;
  }

  pop() {
    const top = this.values[0];
    const last = this.values.pop();

    if (this.values.length === 0) {
      return top;
    }

    this.values[0] = last;
    let index = 0;

    while (true) {
      const left = index * 2 + 1;
      const right = left + 1;
      let largest = index;

      if (
        left < this.values.length
        && this.values[left][0] > this.values[largest][0]
      ) {
        largest = left;
      }

      if (
        right < this.values.length
        && this.values[right][0] > this.values[largest][0]
      ) {
        largest = right;
      }

      if (largest === index) {
        break;
      }

      [this.values[index], this.values[largest]] = [
        this.values[largest],
        this.values[index],
      ];
      index = largest;
    }

    return top;
  }

  get size() {
    return this.values.length;
  }
}

/**
 * 218. The Skyline Problem
 *
 * Time: O(n log n)
 * Space: O(n)
 *
 * @param {number[][]} buildings
 * @return {number[][]}
 */
function getSkyline(buildings) {
  const skyline = [];
  const active = new MaxHeap();
  let buildingIndex = 0;

  while (buildingIndex < buildings.length || active.size > 0) {
    let x;

    if (
      active.size === 0
      || (
        buildingIndex < buildings.length
        && buildings[buildingIndex][0] <= active.peek()[1]
      )
    ) {
      x = buildings[buildingIndex][0];

      while (
        buildingIndex < buildings.length
        && buildings[buildingIndex][0] === x
      ) {
        const [, right, height] = buildings[buildingIndex];
        active.push([height, right]);
        buildingIndex += 1;
      }
    } else {
      x = active.peek()[1];
    }

    while (active.size > 0 && active.peek()[1] <= x) {
      active.pop();
    }

    const height = active.size > 0 ? active.peek()[0] : 0;

    if (skyline.length === 0 || skyline.at(-1)[1] !== height) {
      skyline.push([x, height]);
    }
  }

  return skyline;
}

module.exports = { getSkyline };
