/**
 * LeetCode 25: Reverse Nodes in k-Group
 *
 * Locate each complete group of k nodes, reverse it in place, and reconnect its
 * boundaries. Leave the final incomplete group unchanged.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

/**
 * @param {ListNode|null} head
 * @param {number} k
 * @return {ListNode|null}
 */
var reverseKGroup = function (head, k) {
  const dummy = { val: 0, next: head };
  let groupPrevious = dummy;

  while (true) {
    let kth = groupPrevious;
    for (let step = 0; step < k && kth !== null; step++) kth = kth.next;
    if (kth === null) break;

    const groupNext = kth.next;
    let previous = groupNext;
    let current = groupPrevious.next;

    while (current !== groupNext) {
      const next = current.next;
      current.next = previous;
      previous = current;
      current = next;
    }

    const oldGroupStart = groupPrevious.next;
    groupPrevious.next = kth;
    groupPrevious = oldGroupStart;
  }

  return dummy.next;
};

module.exports = { reverseKGroup };
