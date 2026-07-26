/**
 * 805. Split Array With Same Average
 *
 * Time: O(n^2 * possible sums)
 * Space: O(n * possible sums)
 *
 * @param {number[]} nums
 * @return {boolean}
 */
function splitArraySameAverage(nums) {
  const length = nums.length;
  const total = nums.reduce((sum, number) => sum + number, 0);
  const maximumSubsetSize = Math.floor(length / 2);
  const possibleSums = Array.from(
    { length: maximumSubsetSize + 1 },
    () => new Set(),
  );

  possibleSums[0].add(0);

  for (const number of nums) {
    for (
      let subsetSize = maximumSubsetSize;
      subsetSize >= 1;
      subsetSize -= 1
    ) {
      for (const sum of possibleSums[subsetSize - 1]) {
        possibleSums[subsetSize].add(sum + number);
      }
    }
  }

  for (
    let subsetSize = 1;
    subsetSize <= maximumSubsetSize;
    subsetSize += 1
  ) {
    if (
      (total * subsetSize) % length === 0
      && possibleSums[subsetSize].has((total * subsetSize) / length)
    ) {
      return true;
    }
  }

  return false;
}

module.exports = { splitArraySameAverage };
