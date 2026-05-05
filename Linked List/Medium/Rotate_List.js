/**
 * Problem: Rotate List (LeetCode 61)
 * Difficulty: Medium
 * 
 * Given the head of a linked list, rotate the list to the right by k places.
 * 
 * Strategy:
 * 1. Find the length of the list and the tail node.
 * 2. Connect the tail to the head to make it a circular linked list.
 * 3. The new tail will be at position (length - (k % length) - 1) from the original head.
 * 4. Break the circular connection and return the new head.
 * 
 * Time Complexity: O(N) where N is the number of nodes in the list.
 * Space Complexity: O(1) as we are only using a few pointers.
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
 * @param {number} k
 * @return {ListNode}
 */
const rotateRight = (head, k) => {
    if (!head || !head.next || k === 0) return head;

    // 1. Find length and tail
    let length = 1;
    let tail = head;
    while (tail.next) {
        tail = tail.next;
        length++;
    }

    // 2. Make it circular
    tail.next = head;

    // 3. Find the new tail
    let stepsToNewTail = length - (k % length);
    let newTail = tail;
    while (stepsToNewTail > 0) {
        newTail = newTail.next;
        stepsToNewTail--;
    }

    // 4. Break the circle
    let newHead = newTail.next;
    newTail.next = null;

    return newHead;
};

// --- Test Cases ---
function arrayToList(arr) {
    if (!arr.length) return null;
    let head = new ListNode(arr[0]);
    let curr = head;
    for (let i = 1; i < arr.length; i++) {
        curr.next = new ListNode(arr[i]);
        curr = curr.next;
    }
    return head;
}

function listToArray(head) {
    let result = [];
    let curr = head;
    while (curr) {
        result.push(curr.val);
        curr = curr.next;
    }
    return result;
}

const testCases = [
    { head: [1, 2, 3, 4, 5], k: 2, expected: [4, 5, 1, 2, 3] },
    { head: [0, 1, 2], k: 4, expected: [2, 0, 1] },
    { head: [1, 2], k: 1, expected: [2, 1] },
    { head: [1], k: 5, expected: [1] },
    { head: [], k: 0, expected: [] }
];

testCases.forEach(({ head, k, expected }, index) => {
    const listHead = arrayToList(head);
    const resultHead = rotateRight(listHead, k);
    const resultArr = listToArray(resultHead);
    
    console.log(`Test Case ${index + 1}: head=[${head}], k=${k}`);
    console.log(`Expected: [${expected}], Result: [${resultArr}]`);
    console.log(JSON.stringify(resultArr) === JSON.stringify(expected) ? "✅ Passed" : "❌ Failed");
    console.log("---");
});

module.exports = rotateRight;
