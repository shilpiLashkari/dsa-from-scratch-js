/**
 * 124. Binary Tree Maximum Path Sum
 *
 * Time: O(n)
 * Space: O(h)
 *
 * @param {TreeNode} root
 * @return {number}
 */
function maxPathSum(root) {
  let best = Number.NEGATIVE_INFINITY;

  function maximumGain(node) {
    if (node === null) {
      return 0;
    }

    const leftGain = Math.max(0, maximumGain(node.left));
    const rightGain = Math.max(0, maximumGain(node.right));

    best = Math.max(best, node.val + leftGain + rightGain);
    return node.val + Math.max(leftGain, rightGain);
  }

  maximumGain(root);
  return best;
}

module.exports = { maxPathSum };
