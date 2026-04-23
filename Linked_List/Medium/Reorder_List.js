/**
 * Reorder List
 * 
 * Strategy: To reorder the list in-place to L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → ..., 
 * we follow three steps:
 * 1. Find the middle of the list using slow and fast pointers.
 * 2. Reverse the second half of the list.
 * 3. Merge the first half and the reversed second half alternately.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

/**
 * Definition for singly-linked list node.
 */
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}

/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
function reorderList(head) {
    if (!head || !head.next) return;

    // 1. Find middle
    let slow = head;
    let fast = head;
    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // 2. Reverse second half
    let second = slow.next;
    slow.next = null;
    let prev = null;
    while (second) {
        let temp = second.next;
        second.next = prev;
        prev = second;
        second = temp;
    }

    // 3. Merge
    let first = head;
    second = prev;
    while (second) {
        let temp1 = first.next;
        let temp2 = second.next;
        first.next = second;
        second.next = temp1;
        first = temp1;
        second = temp2;
    }
}

// Example Test Case
const head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4))));
reorderList(head);
let out = [];
let curr = head;
while (curr) {
    out.push(curr.val);
    curr = curr.next;
}
console.log("Test 1:", out); // Expected: [1, 4, 2, 3]

module.exports = reorderList;
