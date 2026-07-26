/**
 * 132. Palindrome Partitioning II
 *
 * Time: O(n^2)
 * Space: O(n)
 *
 * @param {string} s
 * @return {number}
 */
function minCut(s) {
  const length = s.length;

  if (length <= 1) {
    return 0;
  }

  const cuts = Array.from({ length }, (_, index) => index);

  const expand = (left, right) => {
    while (left >= 0 && right < length && s[left] === s[right]) {
      cuts[right] = left === 0
        ? 0
        : Math.min(cuts[right], cuts[left - 1] + 1);
      left -= 1;
      right += 1;
    }
  };

  for (let center = 0; center < length; center += 1) {
    expand(center, center);
    expand(center - 1, center);
  }

  return cuts[length - 1];
}

module.exports = { minCut };
