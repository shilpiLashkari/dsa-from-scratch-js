/**
 * LeetCode 108: Convert Sorted Array to Binary Search Tree
 *
 * Choose the middle value as the root and recursively build each half. Splitting
 * near the middle guarantees a height-balanced tree.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(log n)
 */

/**
 * @param {number[]} nums
 * @return {TreeNode|null}
 */
var sortedArrayToBST = function (nums) {
  const build = (left, right) => {
    if (left > right) return null;

    const middle = Math.floor((left + right) / 2);

    return {
      val: nums[middle],
      left: build(left, middle - 1),
      right: build(middle + 1, right),
    };
  };

  return build(0, nums.length - 1);
};

if (require.main === module) {
  const inorder = (root, values = []) => {
    if (root === null) return values;
    inorder(root.left, values);
    values.push(root.val);
    inorder(root.right, values);
    return values;
  };
  const tests = [[-10, -3, 0, 5, 9], [1, 3], []];

  tests.forEach((nums, index) => {
    const actual = inorder(sortedArrayToBST(nums));
    if (JSON.stringify(actual) !== JSON.stringify(nums)) {
      throw new Error(`Test ${index + 1}: inorder traversal does not match input`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { sortedArrayToBST };
