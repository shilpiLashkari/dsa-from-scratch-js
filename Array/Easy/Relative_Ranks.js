/**
 * LeetCode 506: Relative Ranks
 *
 * Sort athlete indices by descending score, then write each medal or numeric
 * rank back to the athlete's original position.
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */

/**
 * @param {number[]} score
 * @return {string[]}
 */
var findRelativeRanks = function (score) {
  const indices = score.map((_, index) => index);
  indices.sort((first, second) => score[second] - score[first]);

  const medals = ["Gold Medal", "Silver Medal", "Bronze Medal"];
  const ranks = new Array(score.length);

  indices.forEach((athleteIndex, rankIndex) => {
    ranks[athleteIndex] = medals[rankIndex] ?? String(rankIndex + 1);
  });

  return ranks;
};

if (require.main === module) {
  const tests = [
    [[5, 4, 3, 2, 1], ["Gold Medal", "Silver Medal", "Bronze Medal", "4", "5"]],
    [[10, 3, 8, 9, 4], ["Gold Medal", "5", "Bronze Medal", "Silver Medal", "4"]],
    [[1], ["Gold Medal"]],
  ];

  tests.forEach(([score, expected], index) => {
    const actual = findRelativeRanks(score);
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`Test ${index + 1}: rank mismatch`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { findRelativeRanks };
