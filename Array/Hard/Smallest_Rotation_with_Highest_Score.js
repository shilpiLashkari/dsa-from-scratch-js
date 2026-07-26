/**
 * 798. Smallest Rotation with Highest Score
 *
 * Time: O(n)
 * Space: O(n)
 *
 * @param {number[]} nums
 * @return {number}
 */
function bestRotation(nums) {
  const length = nums.length;
  const scoreChanges = new Array(length).fill(0);
  let score = 0;

  for (let index = 0; index < length; index += 1) {
    if (nums[index] <= index) {
      score += 1;
    }

    const badIntervalStart = (
      index - nums[index] + 1 + length
    ) % length;
    const badIntervalEnd = (index + 1) % length;

    scoreChanges[badIntervalStart] -= 1;
    scoreChanges[badIntervalEnd] += 1;

    if (badIntervalStart > badIntervalEnd) {
      scoreChanges[0] -= 1;
    }
  }

  let bestScore = score;
  let bestIndex = 0;

  for (let rotation = 1; rotation < length; rotation += 1) {
    score += scoreChanges[rotation];

    if (score > bestScore) {
      bestScore = score;
      bestIndex = rotation;
    }
  }

  return bestIndex;
}

module.exports = { bestRotation };
