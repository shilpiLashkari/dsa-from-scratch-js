/**
 * LeetCode 100: Same Tree
 *
 * Two trees are identical when their current values match and both pairs of
 * child subtrees are identical.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(h)
 */

/**
 * @param {TreeNode|null} p
 * @param {TreeNode|null} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  if (p === null || q === null) return p === q;

  return (
    p.val === q.val &&
    isSameTree(p.left, q.left) &&
    isSameTree(p.right, q.right)
  );
};

if (require.main === module) {
  const leaf = (val) => ({ val, left: null, right: null });
  const tests = [
    [
      { val: 1, left: leaf(2), right: leaf(3) },
      { val: 1, left: leaf(2), right: leaf(3) },
      true,
    ],
    [
      { val: 1, left: leaf(2), right: null },
      { val: 1, left: null, right: leaf(2) },
      false,
    ],
    [null, null, true],
  ];

  tests.forEach(([first, second, expected], index) => {
    const actual = isSameTree(first, second);
    if (actual !== expected) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { isSameTree };
