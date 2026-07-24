/**
 * LeetCode 3514: Number of Unique XOR Triplets II
 *
 * Return the number of distinct values produced by
 * nums[i] XOR nums[j] XOR nums[k], where i <= j <= k.
 *
 * Strategy:
 * 1. Remove duplicate input values because they cannot create new XOR results.
 * 2. Mark every XOR value obtainable from a pair of input values.
 * 3. XOR each marked pair value with every input value and mark the resulting
 *    triplet value.
 * 4. Count the marked triplet values.
 *
 * Because an index may be reused and XOR is commutative, every selection of
 * three values can be reordered into valid indices i <= j <= k.
 *
 * Time Complexity: O(u^2 + u * m)
 * Space Complexity: O(m)
 * where u is the number of distinct input values and m is the XOR value range.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var uniqueXorTriplets = function (nums) {
  const uniqueNumbers = [...new Set(nums)];
  let maximumValue = 0;

  for (const number of uniqueNumbers) {
    maximumValue = Math.max(maximumValue, number);
  }

  let xorRange = 1;

  while (xorRange <= maximumValue) {
    xorRange *= 2;
  }

  const pairXors = new Uint8Array(xorRange);

  for (const first of uniqueNumbers) {
    for (const second of uniqueNumbers) {
      pairXors[first ^ second] = 1;
    }
  }

  const tripletXors = new Uint8Array(xorRange);

  for (let pairXor = 0; pairXor < xorRange; pairXor++) {
    if (pairXors[pairXor] === 0) continue;

    for (const third of uniqueNumbers) {
      tripletXors[pairXor ^ third] = 1;
    }
  }

  let uniqueValueCount = 0;

  for (const isPresent of tripletXors) {
    uniqueValueCount += isPresent;
  }

  return uniqueValueCount;
};

if (require.main === module) {
  const testCases = [
    { nums: [1, 3], expected: 2 },
    { nums: [6, 7, 8, 9], expected: 4 },
    { nums: [1, 2, 3], expected: 4 },
    { nums: [1, 2, 4], expected: 4 },
    { nums: [1, 2, 3, 4], expected: 8 },
    { nums: [1, 1, 2], expected: 2 },
    { nums: [5], expected: 1 },
    {
      nums: Array.from({ length: 1500 }, (_, index) => index + 1),
      expected: 2048,
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
