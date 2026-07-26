/**
 * LeetCode 248: Strobogrammatic Number III
 *
 * Generate strobogrammatic strings by placing valid mirrored digit pairs from
 * the outside inward, then retain values inside the inclusive string bounds.
 *
 * Time Complexity: O(5^(digits / 2))
 * Space Complexity: O(digits)
 */

/**
 * @param {string} low
 * @param {string} high
 * @return {number}
 */
var strobogrammaticInRange = function (low, high) {
  const pairs = [
    ["0", "0"],
    ["1", "1"],
    ["6", "9"],
    ["8", "8"],
    ["9", "6"],
  ];
  let count = 0;

  const build = (characters, left, right) => {
    if (left > right) {
      const value = characters.join("");
      if (
        (value.length > low.length || value >= low) &&
        (value.length < high.length || value <= high)
      ) {
        count++;
      }
      return;
    }

    for (const [first, second] of pairs) {
      if (left === 0 && right > 0 && first === "0") continue;
      if (left === right && first !== second) continue;

      characters[left] = first;
      characters[right] = second;
      build(characters, left + 1, right - 1);
    }
  };

  for (let length = low.length; length <= high.length; length++) {
    build(new Array(length), 0, length - 1);
  }

  return count;
};

module.exports = { strobogrammaticInRange };
