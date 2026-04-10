/**
 * Minimum Distance Between Three Equal Elements I (LeetCode 3740)
 *
 * Find three indices (i, j, k) such that nums[i] == nums[j] == nums[k]
 * and |i - j| + |j - k| + |k - i| is minimized.
 * For i < j < k, the distance is 2 * (k - i).
 *
 * @param {number[]} nums
 * @return {number}
 */
var minimumDistance = function (nums) {
  const indicesMap = new Map();
  let minDistance = Infinity;

  // Group indices by their value
  for (let i = 0; i < nums.length; i++) {
    const val = nums[i];
    if (!indicesMap.has(val)) {
      indicesMap.set(val, []);
    }
    indicesMap.get(val).push(i);
  }

  // Check each group of indices
  for (const indices of indicesMap.values()) {
    // We need at least 3 indices to form a triplet
    if (indices.length >= 3) {
      // Because indices are added in order, they are already sorted.
      // For a triplet (i, j, k) such that i < j < k, the minimum distance
      // for a fixed i and k is when they are "consecutive" in the list of indices.
      // Specifically, for index indices[p] and indices[p+2], the middle index j is indices[p+1].
      for (let p = 0; p <= indices.length - 3; p++) {
        const i = indices[p];
        const k = indices[p + 2];
        const currentDistance = 2 * (k - i);
        if (currentDistance < minDistance) {
          minDistance = currentDistance;
        }
      }
    }
  }

  return minDistance === Infinity ? -1 : minDistance;
};

/**
 * Notes:
 * 1. The formula |i-j| + |j-k| + |k-i| simplified for i < j < k is:
 *    (j-i) + (k-j) + (k-i) = 2(k-i).
 * 2. To minimize 2(k-i), we need to minimize (k-i).
 * 3. In a sorted list of indices for the same value, the closest index k
 *    relative to index i (with exactly one index j between them)
 *    is always the one at position i+2.
 */

