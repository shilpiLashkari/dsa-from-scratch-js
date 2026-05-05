/**
 * Remove Nodes From Linked List
 * 
 * Strategy: We need to remove nodes that have a node with a greater value 
 * to their right. This can be elegantly solved using recursion. 
 * We recursively call the function for 'head.next'. If the returned 
 * next node has a greater value than the current head, we discard the 
 * current head and return head.next. Otherwise, we keep the head.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(N) for recursion stack.
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
function removeNodes(head) {
    if (!head || !head.next) return head;

    head.next = removeNodes(head.next);

    if (head.next.val > head.val) {
        return head.next;
    }

    return head;
}

// Example Test Case
const head = new ListNode(5, new ListNode(2, new ListNode(13, new ListNode(3, new ListNode(8)))));
let res = removeNodes(head);
let out = [];
while (res) {
    out.push(res.val);
    res = res.next;
}
console.log("Test 1:", out); // Expected: [13, 8]

module.exports = removeNodes;
