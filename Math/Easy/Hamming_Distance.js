/**
 * LeetCode 461: Hamming Distance
 *
 * XOR exposes differing bit positions. Repeatedly clear the lowest set bit and
 * count how many such positions exist.
 *
 * Time Complexity: O(number of set bits)
 * Space Complexity: O(1)
 */

/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var hammingDistance = function (x, y) {
  let differentBits = (x ^ y) >>> 0;
  let distance = 0;

  while (differentBits !== 0) {
    differentBits = (differentBits & (differentBits - 1)) >>> 0;
    distance++;
  }

  return distance;
};

if (require.main === module) {
  const tests = [
    [1, 4, 2],
    [3, 1, 1],
    [0, 0, 0],
    [0, 2147483647, 31],
  ];

  tests.forEach(([x, y, expected], index) => {
    const actual = hammingDistance(x, y);
    if (actual !== expected) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { hammingDistance };
