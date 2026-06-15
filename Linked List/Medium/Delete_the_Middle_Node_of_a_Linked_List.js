/**
 * Problem: Delete the Middle Node of a Linked List (LeetCode 2095)
 * Difficulty: Medium
 * 
 * You are given the head of a linked list. Delete the middle node, and return the head of the modified linked list.
 * The middle node of a linked list of size n is the ⌊n / 2⌋-th node from the start using 0-based indexing.
 * 
 * Strategy:
 * 1. Handle edge case: If the list contains 0 or 1 node, deleting the middle node (or the only node) 
 *    leaves an empty list. Return null.
 * 2. Use the fast and slow pointer technique to find the middle node of the list.
 * 3. Keep track of the predecessor to the slow pointer (`prev`) to perform the deletion.
 * 4. To delete the middle node, set `prev.next = slow.next`.
 * 5. Return the original head of the list.
 * 
 * Time Complexity: O(N) where N is the number of nodes in the linked list.
 * Space Complexity: O(1) as we are modifying the list in-place and using constant extra space.
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
 * @return {ListNode}
 */
function deleteMiddle(head) {
    // Edge case: if list is empty or has only one node
    if (!head || !head.next) {
        return null;
    }

    let slow = head;
    let fast = head;
    let prev = null;

    // Fast pointer moves twice as fast as slow pointer
    while (fast && fast.next) {
        prev = slow;
        slow = slow.next;
        fast = fast.next.next;
    }

    // slow is now the middle node, prev is the node before it
    prev.next = slow.next;

    return head;
}

// --- Test Cases ---
function arrayToList(arr) {
    if (!arr || !arr.length) return null;
    let head = new ListNode(arr[0]);
    let curr = head;
    for (let i = 1; i < arr.length; i++) {
        curr.next = new ListNode(arr[i]);
        curr = curr.next;
    }
    return head;
}

function listToArray(head) {
    const result = [];
    let curr = head;
    while (curr) {
        result.push(curr.val);
        curr = curr.next;
    }
    return result;
}

const testCases = [
    { arr: [1, 3, 4, 7, 1, 2, 6], expected: [1, 3, 4, 1, 2, 6] }, // size 7 -> middle index 3 (7) deleted
    { arr: [1, 2, 3, 4], expected: [1, 2, 4] },                   // size 4 -> middle index 2 (3) deleted
    { arr: [2, 1], expected: [2] },                              // size 2 -> middle index 1 (1) deleted
    { arr: [1], expected: [] }                                   // size 1 -> middle index 0 (1) deleted -> null
];

testCases.forEach((tc, idx) => {
    const list = arrayToList(tc.arr);
    const result = deleteMiddle(list);
    const resultArr = listToArray(result);
    console.log(`Test Case ${idx + 1}: input=[${tc.arr}]`);
    console.log(`Expected: [${tc.expected}], Result: [${resultArr}]`);
    const passed = JSON.stringify(resultArr) === JSON.stringify(tc.expected);
    console.log(passed ? "✅ Passed" : "❌ Failed");
    console.log("---");
});

module.exports = deleteMiddle;
