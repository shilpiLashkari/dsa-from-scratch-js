/**
 * Problem: Maximum Twin Sum of a Linked List (LeetCode 2130)
 * Difficulty: Medium
 * 
 * In a linked list of size n, where n is even, the ith node (0-indexed) of the linked list 
 * is known as the twin of the (n-1-i)th node, if 0 <= i <= (n/2) - 1.
 * For example, if n = 4, then node 0 is the twin of node 3, and node 1 is the twin of node 2. 
 * These are the only twins for n = 4.
 * The twin sum is defined as the sum of a node and its twin.
 * Given the head of a linked list with even length, return the maximum twin sum of the linked list.
 * 
 * Strategy:
 * 1. Find the middle of the linked list using fast and slow pointers. Since the list has an even 
 *    number of nodes, when the fast pointer reaches the end, the slow pointer will be at the start 
 *    of the second half.
 * 2. Reverse the second half of the linked list.
 * 3. Iterate through both halves concurrently, adding the values of corresponding nodes to calculate 
 *    the twin sums. Maintain a running maximum.
 * 4. Restore the second half of the list to preserve the original structure.
 * 5. Return the maximum twin sum.
 * 
 * Time Complexity: O(N) where N is the number of nodes in the list.
 * Space Complexity: O(1) as we are modifying the list in-place and using a few pointers.
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
 * @return {number}
 */
function pairSum(head) {
    if (!head) return 0;
    if (!head.next) return head.val;

    // 1. Find the middle of the linked list
    let slow = head;
    let fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // 2. Reverse the second half of the linked list
    let prev = null;
    let curr = slow;
    while (curr) {
        let nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }

    // prev is now the head of the reversed second half
    let firstHalf = head;
    let secondHalf = prev;
    let maxTwinSum = 0;

    // 3. Find the maximum twin sum
    while (secondHalf) {
        maxTwinSum = Math.max(maxTwinSum, firstHalf.val + secondHalf.val);
        firstHalf = firstHalf.next;
        secondHalf = secondHalf.next;
    }

    // 4. Re-reverse the second half to restore the list
    curr = prev;
    prev = null;
    while (curr) {
        let nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }

    return maxTwinSum;
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

const testCases = [
    { arr: [5, 4, 2, 1], expected: 6 }, // twins: (5,1)->6, (4,2)->6. Max: 6
    { arr: [4, 2, 2, 3], expected: 7 }, // twins: (4,3)->7, (2,2)->4. Max: 7
    { arr: [1, 100000], expected: 100001 } // twins: (1,100000)->100001. Max: 100001
];

testCases.forEach((tc, idx) => {
    const list = arrayToList(tc.arr);
    const result = pairSum(list);
    console.log(`Test Case ${idx + 1}: input=[${tc.arr}]`);
    console.log(`Expected: ${tc.expected}, Result: ${result}`);
    console.log(result === tc.expected ? "✅ Passed" : "❌ Failed");
    console.log("---");
});

module.exports = pairSum;
