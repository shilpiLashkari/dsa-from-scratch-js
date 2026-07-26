/**
 * LeetCode 76: Minimum Window Substring
 *
 * Expand a window until it contains every required character count, then shrink
 * it from the left while preserving validity.
 *
 * Time Complexity: O(|s| + |t|)
 * Space Complexity: O(character set)
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  if (t.length > s.length) return "";

  const needed = new Map();
  for (const character of t) {
    needed.set(character, (needed.get(character) ?? 0) + 1);
  }

  let missing = t.length;
  let left = 0;
  let bestStart = 0;
  let bestLength = Infinity;

  for (let right = 0; right < s.length; right++) {
    const character = s[right];
    const count = needed.get(character);

    if (count !== undefined) {
      if (count > 0) missing--;
      needed.set(character, count - 1);
    }

    while (missing === 0) {
      const length = right - left + 1;
      if (length < bestLength) {
        bestLength = length;
        bestStart = left;
      }

      const removed = s[left++];
      const removedCount = needed.get(removed);
      if (removedCount !== undefined) {
        needed.set(removed, removedCount + 1);
        if (removedCount + 1 > 0) missing++;
      }
    }
  }

  return bestLength === Infinity
    ? ""
    : s.slice(bestStart, bestStart + bestLength);
};

module.exports = { minWindow };
