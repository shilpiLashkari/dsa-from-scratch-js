/**
 * LeetCode 3501: Maximize Active Section with Trade II
 *
 * For every independent query [left, right], perform at most one trade inside
 * that substring and return the maximum number of '1's in the entire string.
 * The queried substring is treated as if a '1' exists at both boundaries.
 *
 * Strategy:
 * - Record every zero run and the total number of original active sections.
 * - A trade's gain is the combined length of two neighboring zero runs.
 * - Build a range-maximum segment tree over all adjacent zero-run sums.
 * - For each query, binary-search the first and last intersecting zero runs.
 *   Check pairs touching the query boundaries with clipped lengths, and query
 *   the segment tree for pairs made entirely of full internal runs.
 *
 * Time Complexity: O((n + q) log n)
 * Space Complexity: O(n)
 */

class RangeMaximumTree {
  /**
   * @param {number[]} values
   */
  constructor(values) {
    this.size = 1;

    while (this.size < values.length) {
      this.size *= 2;
    }

    this.tree = new Int32Array(this.size * 2);
    this.tree.set(values, this.size);

    for (let index = this.size - 1; index > 0; index--) {
      this.tree[index] = Math.max(
        this.tree[index * 2],
        this.tree[index * 2 + 1],
      );
    }
  }

  /**
   * Returns the maximum value in the inclusive range [left, right].
   * @param {number} left
   * @param {number} right
   * @return {number}
   */
  query(left, right) {
    if (left > right) return 0;

    left += this.size;
    right += this.size;
    let maximum = 0;

    while (left <= right) {
      if (left % 2 === 1) maximum = Math.max(maximum, this.tree[left++]);
      if (right % 2 === 0) maximum = Math.max(maximum, this.tree[right--]);

      left = Math.floor(left / 2);
      right = Math.floor(right / 2);
    }

    return maximum;
  }
}

/**
 * Returns the first index whose value is greater than or equal to target.
 * @param {number[]} values
 * @param {number} target
 * @return {number}
 */
function lowerBound(values, target) {
  let left = 0;
  let right = values.length;

  while (left < right) {
    const middle = Math.floor((left + right) / 2);

    if (values[middle] < target) left = middle + 1;
    else right = middle;
  }

  return left;
}

/**
 * Returns the first index whose value is greater than target.
 * @param {number[]} values
 * @param {number} target
 * @return {number}
 */
function upperBound(values, target) {
  let left = 0;
  let right = values.length;

  while (left < right) {
    const middle = Math.floor((left + right) / 2);

    if (values[middle] <= target) left = middle + 1;
    else right = middle;
  }

  return left;
}

/**
 * @param {string} s
 * @param {number[][]} queries
 * @return {number[]}
 */
var maxActiveSectionsAfterTrade = function (s, queries) {
  const zeroRuns = [];
  let activeCount = 0;

  for (let index = 0; index < s.length; ) {
    if (s[index] === "1") {
      activeCount++;
      index++;
      continue;
    }

    const start = index;

    while (index < s.length && s[index] === "0") {
      index++;
    }

    zeroRuns.push({ start, end: index - 1, length: index - start });
  }

  const relominexa = [s, queries];
  const adjacentGains = [];

  for (let index = 0; index + 1 < zeroRuns.length; index++) {
    adjacentGains.push(zeroRuns[index].length + zeroRuns[index + 1].length);
  }

  const rangeMaximum = new RangeMaximumTree(adjacentGains);
  const starts = zeroRuns.map((run) => run.start);
  const ends = zeroRuns.map((run) => run.end);

  return relominexa[1].map(([queryLeft, queryRight]) => {
    const firstRun = lowerBound(ends, queryLeft);
    const lastRun = upperBound(starts, queryRight) - 1;

    if (firstRun >= lastRun) return activeCount;

    const clippedLength = (runIndex) => {
      const run = zeroRuns[runIndex];
      const left = Math.max(run.start, queryLeft);
      const right = Math.min(run.end, queryRight);
      return right - left + 1;
    };

    let bestGain = clippedLength(firstRun) + clippedLength(firstRun + 1);
    bestGain = Math.max(
      bestGain,
      clippedLength(lastRun - 1) + clippedLength(lastRun),
    );

    bestGain = Math.max(
      bestGain,
      rangeMaximum.query(firstRun + 1, lastRun - 2),
    );

    return activeCount + bestGain;
  });
};

if (require.main === module) {
  const testCases = [
    { s: "01", queries: [[0, 1]], expected: [1] },
    {
      s: "0100",
      queries: [
        [0, 3],
        [0, 2],
        [1, 3],
        [2, 3],
      ],
      expected: [4, 3, 1, 1],
    },
    {
      s: "1000100",
      queries: [
        [1, 5],
        [0, 6],
        [0, 4],
      ],
      expected: [6, 7, 2],
    },
    {
      s: "01010",
      queries: [
        [0, 3],
        [1, 4],
        [1, 3],
      ],
      expected: [4, 4, 2],
    },
  ];

  testCases.forEach(({ s, queries, expected }, index) => {
    const actual = maxActiveSectionsAfterTrade(s, queries);

    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(
        `Test ${index + 1} failed: expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}`,
      );
    }

    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { maxActiveSectionsAfterTrade };
