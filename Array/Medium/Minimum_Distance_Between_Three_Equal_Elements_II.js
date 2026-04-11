/**
 * Minimum Distance Between Three Equal Elements II (LeetCode 3741)
 *
 * Find three indices (i, j, k) such that nums[i] == nums[j] == nums[k]
 * and |i - j| + |j - k| + |k - i| is minimized.
 *
 * This version is optimized for performance and memory usage by only tracking
 * the last two encountered indices for each value, rather than storing all indices.
 *
 * @param {number[]} nums
 * @return {number}
 */
var minimumDistance = function (nums) {
  // Map to store the last two indices seen for each value: { value: [secondLastIndex, lastIndex] }
  const lastIndicesMap = new Map();
  let minDistance = Infinity;

  for (let k = 0; k < nums.length; k++) {
    const val = nums[k];

    if (!lastIndicesMap.has(val)) {
      lastIndicesMap.set(val, [k]);
    } else {
      const indices = lastIndicesMap.get(val);

      if (indices.length === 1) {
        // We now have two indices: [firstIndex, secondIndex]
        indices.push(k);
      } else {
        // We already have two indices, say i and j. Current index is k.
        // Triple is (i, j, k). Distance is 2 * (k - i).
        const i = indices[0];
        const currentDistance = 2 * (k - i);

        if (currentDistance < minDistance) {
          minDistance = currentDistance;
        }

        // Update the pair to [j, k] for the next potential triplet
        indices[0] = indices[1];
        indices[1] = k;
      }
    }
  }

  return minDistance === Infinity ? -1 : minDistance;
};

/**
 * Notes:
 * 1. Mathematical Simplification: For i < j < k, the formula |i - j| + |j - k| + |k - i|
 *    simplifies to (j - i) + (k - j) + (k - i) = 2 * (k - i).
 *    This means the middle index 'j' doesn't affect the total distance as long as it exists.
 * 2. Space Optimization: Instead of storing all indices for a value (O(N) space),
 *    we only need the two most recent indices. This reduces the memory footprint per unique value.
 * 3. Time Complexity: O(N) because we iterate through the array once.
 * 4. Space Complexity: O(U) where U is the number of unique elements in nums.
 */

module.exports = { minimumDistance };
