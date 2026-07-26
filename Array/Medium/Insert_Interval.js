/**
 * LeetCode 57: Insert Interval
 *
 * Copy intervals strictly before the new interval, merge every overlap into
 * the new interval, then append the remaining intervals.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n) for the output
 */

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
  const result = [];
  let index = 0;
  let [start, end] = newInterval;

  while (index < intervals.length && intervals[index][1] < start) {
    result.push(intervals[index++]);
  }

  while (index < intervals.length && intervals[index][0] <= end) {
    start = Math.min(start, intervals[index][0]);
    end = Math.max(end, intervals[index][1]);
    index++;
  }

  result.push([start, end]);

  while (index < intervals.length) result.push(intervals[index++]);

  return result;
};

if (require.main === module) {
  const tests = [
    [[[1, 3], [6, 9]], [2, 5], [[1, 5], [6, 9]]],
    [
      [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]],
      [4, 8],
      [[1, 2], [3, 10], [12, 16]],
    ],
    [[], [5, 7], [[5, 7]]],
  ];

  tests.forEach(([intervals, newInterval, expected], index) => {
    const actual = insert(intervals, newInterval);
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`Test ${index + 1}: inserted intervals mismatch`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { insert };
