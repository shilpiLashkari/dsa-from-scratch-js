/**
 * LeetCode 3499: Maximize Active Section with Trade I
 *
 * A '1' is an active section and a '0' is inactive. At most once, remove a
 * block of '1's surrounded by '0's, then activate a block of '0's surrounded
 * by '1's. The string is treated as though it has a '1' at each boundary.
 *
 * Strategy:
 * - Count every active section already present.
 * - Scan the string by runs. Removing a '1' run between two neighboring '0'
 *   runs lets the second step activate both zero runs and the removed run.
 * - The removed '1's cancel out when calculating the net change, so the gain
 *   is the sum of the two neighboring zero-run lengths.
 * - Add the largest such gain to the original active count. If fewer than two
 *   zero runs exist, no valid trade can improve the result.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

/**
 * @param {string} s
 * @return {number}
 */
var maxActiveSectionsAfterTrade = function (s) {
  let activeCount = 0;
  let previousZeroRunLength = null;
  let bestGain = 0;

  for (let start = 0; start < s.length; ) {
    let end = start + 1;

    while (end < s.length && s[end] === s[start]) {
      end++;
    }

    const runLength = end - start;

    if (s[start] === "1") {
      activeCount += runLength;
    } else {
      if (previousZeroRunLength !== null) {
        bestGain = Math.max(bestGain, previousZeroRunLength + runLength);
      }

      previousZeroRunLength = runLength;
    }

    start = end;
  }

  return activeCount + bestGain;
};

if (require.main === module) {
  const testCases = [
    { s: "01", expected: 1 },
    { s: "0100", expected: 4 },
    { s: "1000100", expected: 7 },
    { s: "01010", expected: 4 },
    { s: "1111", expected: 4 },
    { s: "000", expected: 0 },
  ];

  testCases.forEach(({ s, expected }, index) => {
    const actual = maxActiveSectionsAfterTrade(s);

    if (actual !== expected) {
      throw new Error(
        `Test ${index + 1} failed: expected ${expected}, received ${actual}`,
      );
    }

    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { maxActiveSectionsAfterTrade };
