/**
 * LeetCode 21: Merge Two Sorted Lists
 *
 * Link the smaller current node to a dummy-headed result list, then append the
 * unconsumed suffix when either input list is exhausted.
 *
 * Time Complexity: O(n + m)
 * Space Complexity: O(1)
 */

/**
 * @param {ListNode|null} list1
 * @param {ListNode|null} list2
 * @return {ListNode|null}
 */
var mergeTwoLists = function (list1, list2) {
  const dummy = { val: 0, next: null };
  let tail = dummy;

  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      tail.next = list1;
      list1 = list1.next;
    } else {
      tail.next = list2;
      list2 = list2.next;
    }

    tail = tail.next;
  }

  tail.next = list1 ?? list2;
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
    [[1, 2, 4], [1, 3, 4], [1, 1, 2, 3, 4, 4]],
    [[], [], []],
    [[], [0], [0]],
  ];

  tests.forEach(([first, second, expected], index) => {
    const actual = toArray(mergeTwoLists(fromArray(first), fromArray(second)));
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { mergeTwoLists };
