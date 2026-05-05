/**
 * Swap Nodes in Pairs
 * 
 * Strategy: We use recursion to swap nodes in pairs. In each step, we swap 
 * the first two nodes and then recursively call the function for the rest of 
 * the list. The base cases are when the list is empty or has only one node.
 * 
 * Time Complexity: O(N) where N is the number of nodes.
 * Space Complexity: O(N) for the recursive call stack.
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
function swapPairs(head) {
    // Base cases
    if (!head || !head.next) return head;

    // Nodes to be swapped
    const firstNode = head;
    const secondNode = head.next;

    // Swapping
    firstNode.next = swapPairs(secondNode.next);
    secondNode.next = firstNode;

    // Now the head is the second node
    return secondNode;
}

// Example Test Case
const head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4))));
let res = swapPairs(head);
let out = [];
while (res) {
    out.push(res.val);
    res = res.next;
}
console.log("Test 1:", out); // Expected: [2, 1, 4, 3]

module.exports = swapPairs;
