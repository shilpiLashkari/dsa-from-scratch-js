/**
 * LeetCode 83: Remove Duplicates from Sorted List
 *
 * Walk the sorted list once and bypass a next node whenever it has the same
 * value as the current node.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

/**
 * @param {ListNode|null} head
 * @return {ListNode|null}
 */
var deleteDuplicates = function (head) {
  let current = head;

  while (current !== null && current.next !== null) {
    if (current.val === current.next.val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }

  return head;
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
    [[1, 1, 2], [1, 2]],
    [[1, 1, 2, 3, 3], [1, 2, 3]],
    [[], []],
  ];

  tests.forEach(([input, expected], index) => {
    const actual = toArray(deleteDuplicates(fromArray(input)));
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { deleteDuplicates };
