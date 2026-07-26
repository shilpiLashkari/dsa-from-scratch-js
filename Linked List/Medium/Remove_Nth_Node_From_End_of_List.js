/**
 * LeetCode 19: Remove Nth Node From End of List
 *
 * Advance a fast pointer n steps from a dummy node, then move fast and slow
 * together. Slow stops immediately before the node to remove.
 *
 * Time Complexity: O(length)
 * Space Complexity: O(1)
 */

/**
 * @param {ListNode|null} head
 * @param {number} n
 * @return {ListNode|null}
 */
var removeNthFromEnd = function (head, n) {
  const dummy = { val: 0, next: head };
  let fast = dummy;
  let slow = dummy;

  for (let step = 0; step <= n; step++) {
    fast = fast.next;
  }

  while (fast !== null) {
    fast = fast.next;
    slow = slow.next;
  }

  slow.next = slow.next.next;
  return dummy.next;
};

if (require.main === module) {
  const fromArray = (values) => {
    const dummy = { val: 0, next: null };
    let tail = dummy;
    for (const val of values) tail = tail.next = { val, next: null };
    return dummy.next;
  };
  const toArray = (head) => {
    const values = [];
    while (head !== null) {
      values.push(head.val);
      head = head.next;
    }
    return values;
  };
  const tests = [
    [[1, 2, 3, 4, 5], 2, [1, 2, 3, 5]],
    [[1], 1, []],
    [[1, 2], 1, [1]],
    [[1, 2], 2, [2]],
  ];

  tests.forEach(([values, n, expected], index) => {
    const actual = toArray(removeNthFromEnd(fromArray(values), n));
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { removeNthFromEnd };
