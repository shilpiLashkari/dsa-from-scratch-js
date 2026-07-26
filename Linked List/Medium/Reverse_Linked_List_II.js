/**
 * LeetCode 92: Reverse Linked List II
 *
 * Starting before the reversal range, repeatedly move the next range node to
 * the front of that range.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

/**
 * @param {ListNode|null} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode|null}
 */
var reverseBetween = function (head, left, right) {
  const dummy = { val: 0, next: head };
  let before = dummy;

  for (let position = 1; position < left; position++) {
    before = before.next;
  }

  const rangeTail = before.next;

  for (let step = 0; step < right - left; step++) {
    const moved = rangeTail.next;
    rangeTail.next = moved.next;
    moved.next = before.next;
    before.next = moved;
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
    [[1, 2, 3, 4, 5], 2, 4, [1, 4, 3, 2, 5]],
    [[5], 1, 1, [5]],
    [[3, 5], 1, 2, [5, 3]],
  ];

  tests.forEach(([values, left, right, expected], index) => {
    const actual = toArray(reverseBetween(fromArray(values), left, right));
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { reverseBetween };
