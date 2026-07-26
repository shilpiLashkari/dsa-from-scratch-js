/**
 * LeetCode 82: Remove Duplicates from Sorted List II
 *
 * Use a dummy node and bypass an entire equal-value run whenever the current
 * node has a duplicate.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

/**
 * @param {ListNode|null} head
 * @return {ListNode|null}
 */
var deleteDuplicates = function (head) {
  const dummy = { val: 0, next: head };
  let previous = dummy;
  let current = head;

  while (current !== null) {
    if (current.next !== null && current.val === current.next.val) {
      const duplicateValue = current.val;
      while (current !== null && current.val === duplicateValue) {
        current = current.next;
      }
      previous.next = current;
    } else {
      previous = current;
      current = current.next;
    }
  }

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
    [[1, 2, 3, 3, 4, 4, 5], [1, 2, 5]],
    [[1, 1, 1, 2, 3], [2, 3]],
    [[1, 1], []],
  ];

  tests.forEach(([values, expected], index) => {
    const actual = toArray(deleteDuplicates(fromArray(values)));
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { deleteDuplicates };
