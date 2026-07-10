/**
 * Path Existence Queries in a Graph II
 *
 * You are given an integer n, an array nums, a maximum difference maxDiff,
 * and a list of queries. An undirected edge exists between nodes i and j if
 * |nums[i] - nums[j]| <= maxDiff.
 *
 * For each query [u, v], return the minimum number of edges in a path between
 * u and v. If no path exists, return -1.
 *
 * Approach:
 * Sorting the nodes by value makes every node's neighborhood a contiguous
 * interval in the sorted order. From a sorted position i, the furthest node
 * reachable in one step is the right boundary of that interval. We use binary
 * lifting on those right boundaries to jump across the graph in logarithmic
 * time per query.
 *
 * Time Complexity: O((n + q) log n)
 * Space Complexity: O(n log n)
 *
 * @param {number} n
 * @param {number[]} nums
 * @param {number} maxDiff
 * @param {number[][]} queries
 * @return {number[]}
 */
var pathExistenceQueries = function (n, nums, maxDiff, queries) {
  if (n === 0) {
    return [];
  }

  const sortedOrder = Array.from({ length: n }, (_, index) => index).sort(
    (firstIndex, secondIndex) =>
      nums[firstIndex] - nums[secondIndex] || firstIndex - secondIndex,
  );
  const sortedValues = sortedOrder.map((index) => nums[index]);
  const positionOfNode = Array(n).fill(0);

  sortedOrder.forEach((node, index) => {
    positionOfNode[node] = index;
  });

  const rightBoundary = Array(n).fill(0);

  for (let index = 0; index < n; index += 1) {
    const value = sortedValues[index];
    let right = index;

    while (right + 1 < n && sortedValues[right + 1] - value <= maxDiff) {
      right += 1;
    }

    rightBoundary[index] = right;
  }

  const maxLog = Math.floor(Math.log2(n)) + 1;
  const jumpTable = Array.from({ length: maxLog }, () => Array(n).fill(-1));
  jumpTable[0] = rightBoundary.slice();

  for (let level = 1; level < maxLog; level += 1) {
    const previousLevel = jumpTable[level - 1];
    const currentLevel = jumpTable[level];

    for (let index = 0; index < n; index += 1) {
      const nextIndex = previousLevel[index];
      currentLevel[index] = nextIndex === -1 ? -1 : previousLevel[nextIndex];
    }
  }

  return queries.map(([firstNode, secondNode]) => {
    let start = positionOfNode[firstNode];
    let target = positionOfNode[secondNode];

    if (start === target) {
      return 0;
    }

    if (start > target) {
      [start, target] = [target, start];
    }

    if (target <= rightBoundary[start]) {
      return 1;
    }

    let current = start;
    let steps = 0;

    for (let bit = maxLog - 1; bit >= 0; bit -= 1) {
      const nextIndex = jumpTable[bit][current];
      if (nextIndex !== -1 && nextIndex < target) {
        current = nextIndex;
        steps += 1 << bit;
      }
    }

    return rightBoundary[current] >= target ? steps + 1 : -1;
  });
};

/**
 * Notes:
 * 1. The graph is defined by value differences only, so sorting by nums makes
 *    the neighborhood of each node a contiguous interval.
 * 2. Binary lifting over those intervals lets us answer each query without
 *    exploring the graph from scratch.
 */

// Example usage
// console.log(pathExistenceQueries(5, [1, 8, 3, 4, 2], 3, [[0, 3], [2, 4]]));
// Output: [1, 1]

if (typeof module !== "undefined") {
  module.exports = { pathExistenceQueries };
}
