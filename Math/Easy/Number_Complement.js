/**
 * LeetCode 476: Number Complement
 *
 * Build a mask of 1 bits matching num's binary width, then XOR it with num to
 * flip exactly those significant bits.
 *
 * Time Complexity: O(log num)
 * Space Complexity: O(1)
 */

/**
 * @param {number} num
 * @return {number}
 */
var findComplement = function (num) {
  let powerOfTwo = 1;

  while (powerOfTwo <= num) {
    powerOfTwo *= 2;
  }

  return (powerOfTwo - 1) ^ num;
};

if (require.main === module) {
  const tests = [
    [5, 2],
    [1, 0],
    [10, 5],
    [2147483647, 0],
  ];

  tests.forEach(([num, expected], index) => {
    const actual = findComplement(num);
    if (actual !== expected) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { findComplement };
