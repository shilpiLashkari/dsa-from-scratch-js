/**
 * 810. Chalkboard XOR Game
 *
 * Alice wins immediately when the total XOR is zero. Otherwise, an even
 * number of remaining values guarantees that she can avoid losing.
 *
 * Time: O(n)
 * Space: O(1)
 *
 * @param {number[]} nums
 * @return {boolean}
 */
function xorGame(nums) {
  let xor = 0;

  for (const number of nums) {
    xor ^= number;
  }

  return xor === 0 || nums.length % 2 === 0;
}

module.exports = { xorGame };
