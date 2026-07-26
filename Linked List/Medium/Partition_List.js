/**
 * LeetCode 86: Partition List
 *
 * Build stable before-x and at-least-x lists, then join them.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

/**
 * @param {ListNode|null} head
 * @param {number} x
 * @return {ListNode|null}
 */
var partition = function (head, x) {
  const beforeDummy = { val: 0, next: null };
  const afterDummy = { val: 0, next: null };
  let before = beforeDummy;
  let after = afterDummy;

  while (head !== null) {
    const next = head.next;
    head.next = null;

    if (head.val < x) before = before.next = head;
    else after = after.next = head;

    head = next;
  }

  before.next = afterDummy.next;
  return beforeDummy.next;
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
    [[1, 4, 3, 2, 5, 2], 3, [1, 2, 2, 4, 3, 5]],
    [[2, 1], 2, [1, 2]],
    [[], 0, []],
  ];

  tests.forEach(([values, x, expected], index) => {
    const actual = toArray(partition(fromArray(values), x));
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { partition };
