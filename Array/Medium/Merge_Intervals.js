/**
 * LeetCode 56: Merge Intervals
 *
 * Sort intervals by start, then extend the last merged interval whenever the
 * next interval overlaps it.
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n) for the output
 */

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  intervals.sort((first, second) => first[0] - second[0]);
  const merged = [];

  for (const interval of intervals) {
    const last = merged[merged.length - 1];

    if (last === undefined || last[1] < interval[0]) {
      merged.push([...interval]);
    } else {
      last[1] = Math.max(last[1], interval[1]);
    }
  }

  return merged;
};

if (require.main === module) {
  const tests = [
    [[[1, 3], [2, 6], [8, 10], [15, 18]], [[1, 6], [8, 10], [15, 18]]],
    [[[1, 4], [4, 5]], [[1, 5]]],
    [[[1, 4], [0, 2], [3, 5]], [[0, 5]]],
  ];

  tests.forEach(([intervals, expected], index) => {
    const actual = merge(intervals.map((interval) => [...interval]));
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`Test ${index + 1}: merged intervals mismatch`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { merge };
