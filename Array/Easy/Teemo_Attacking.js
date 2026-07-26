/**
 * LeetCode 495: Teemo Attacking
 *
 * Each attack contributes either the full duration or only the gap before the
 * next attack when poison intervals overlap.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

/**
 * @param {number[]} timeSeries
 * @param {number} duration
 * @return {number}
 */
var findPoisonedDuration = function (timeSeries, duration) {
  let poisonedTime = duration;

  for (let index = 1; index < timeSeries.length; index++) {
    poisonedTime += Math.min(duration, timeSeries[index] - timeSeries[index - 1]);
  }

  return poisonedTime;
};

if (require.main === module) {
  const tests = [
    [[1, 4], 2, 4],
    [[1, 2], 2, 3],
    [[1], 5, 5],
    [[1, 2, 3, 4], 5, 8],
  ];

  tests.forEach(([timeSeries, duration, expected], index) => {
    const actual = findPoisonedDuration(timeSeries, duration);
    if (actual !== expected) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { findPoisonedDuration };
