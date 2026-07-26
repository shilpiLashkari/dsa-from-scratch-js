/**
 * 272. Closest Binary Search Tree Value II
 *
 * Time: O(h + k)
 * Space: O(h)
 *
 * @param {TreeNode} root
 * @param {number} target
 * @param {number} k
 * @return {number[]}
 */
function closestKValues(root, target, k) {
  const predecessors = [];
  const successors = [];
  const values = [];

  let node = root;

  while (node !== null) {
    if (node.val <= target) {
      predecessors.push(node);
      node = node.right;
    } else {
      successors.push(node);
      node = node.left;
    }
  }

  function nextPredecessor() {
    const current = predecessors.pop();
    let child = current.left;

    while (child !== null) {
      predecessors.push(child);
      child = child.right;
    }

    return current.val;
  }

  function nextSuccessor() {
    const current = successors.pop();
    let child = current.right;

    while (child !== null) {
      successors.push(child);
      child = child.left;
    }

    return current.val;
  }

  while (values.length < k) {
    if (predecessors.length === 0) {
      values.push(nextSuccessor());
    } else if (successors.length === 0) {
      values.push(nextPredecessor());
    } else {
      const predecessorDifference = target - predecessors.at(-1).val;
      const successorDifference = successors.at(-1).val - target;

      values.push(
        predecessorDifference <= successorDifference
          ? nextPredecessor()
          : nextSuccessor(),
      );
    }
  }

  return values;
}

module.exports = { closestKValues };
