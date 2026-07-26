/**
 * LeetCode 496: Next Greater Element I
 *
 * Scan nums2 with a decreasing stack. A larger value resolves every smaller
 * stacked value, allowing constant-time lookup for nums1 afterward.
 *
 * Time Complexity: O(n + m)
 * Space Complexity: O(n)
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
  const nextGreater = new Map();
  const stack = [];

  for (const number of nums2) {
    while (stack.length > 0 && stack[stack.length - 1] < number) {
      nextGreater.set(stack.pop(), number);
    }

    stack.push(number);
  }

  return nums1.map((number) => nextGreater.get(number) ?? -1);
};

if (require.main === module) {
  const tests = [
    [[4, 1, 2], [1, 3, 4, 2], [-1, 3, -1]],
    [[2, 4], [1, 2, 3, 4], [3, -1]],
    [[1], [1], [-1]],
  ];

  tests.forEach(([nums1, nums2, expected], index) => {
    const actual = nextGreaterElement(nums1, nums2);
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { nextGreaterElement };
