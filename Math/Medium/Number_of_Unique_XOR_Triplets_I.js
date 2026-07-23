/**
 * LeetCode 3513: Number of Unique XOR Triplets I
 *
 * nums is a permutation of [1, n]. Return the number of distinct values that
 * can be produced by nums[i] XOR nums[j] XOR nums[k], where i <= j <= k.
 *
 * Strategy:
 * - For n = 1 or n = 2, only the original values can be produced.
 * - For n >= 3, every value representable with the same number of bits as n
 *   can be produced. No larger value is possible because XOR cannot introduce
 *   a bit that is absent from all values in [1, n].
 * - Therefore, the answer is the smallest power of two strictly greater than
 *   n. The array order does not matter, so only nums.length is needed.
 *
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var uniqueXorTriplets = function (nums) {
  const length = nums.length;

  if (length < 3) return length;

  let uniqueValueCount = 1;

  while (uniqueValueCount <= length) {
    uniqueValueCount *= 2;
  }

  return uniqueValueCount;
};

if (require.main === module) {
  const testCases = [
    { nums: [1], expected: 1 },
    { nums: [1, 2], expected: 2 },
    { nums: [3, 1, 2], expected: 4 },
    { nums: [4, 1, 3, 2], expected: 8 },
    { nums: [5, 2, 1, 4, 3], expected: 8 },
    { nums: [8, 3, 6, 1, 5, 2, 7, 4], expected: 16 },
    {
      nums: Array.from({ length: 100000 }, (_, index) => index + 1),
      expected: 131072,
    },
  ];

  testCases.forEach(({ nums, expected }, index) => {
    const actual = uniqueXorTriplets(nums);

    if (actual !== expected) {
      throw new Error(
        `Test ${index + 1} failed: expected ${expected}, received ${actual}`,
      );
    }

    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { uniqueXorTriplets };
