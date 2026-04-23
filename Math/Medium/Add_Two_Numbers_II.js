/**
 * Add Two Numbers II
 * 
 * Strategy: Since we need to add numbers starting from the least significant 
 * digit but the linked list gives us the most significant first, we use two 
 * stacks to reverse the order. We push all node values into stacks, then pop 
 * them to perform the addition with carry. Each new sum is added as a new 
 * head of the result list (prepending).
 * 
 * Time Complexity: O(N + M) where N and M are the lengths of the two lists.
 * Space Complexity: O(N + M) for the stacks.
 */

/**
 * Definition for singly-linked list node.
 */
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function addTwoNumbers(l1, l2) {
    const s1 = [];
    const s2 = [];

    while (l1) {
        s1.push(l1.val);
        l1 = l1.next;
    }
    while (l2) {
        s2.push(l2.val);
        l2 = l2.next;
    }

    let carry = 0;
    let head = null;

    while (s1.length || s2.length || carry) {
        const v1 = s1.length ? s1.pop() : 0;
        const v2 = s2.length ? s2.pop() : 0;
        
        let sum = v1 + v2 + carry;
        carry = Math.floor(sum / 10);
        sum %= 10;

        // Prepend new node
        const node = new ListNode(sum);
        node.next = head;
        head = node;
    }

    return head;
}

// Example Test Cases
const l1 = new ListNode(7, new ListNode(2, new ListNode(4, new ListNode(3))));
const l2 = new ListNode(5, new ListNode(6, new ListNode(4)));
let res = addTwoNumbers(l1, l2);
let out = [];
while (res) {
    out.push(res.val);
    res = res.next;
}
console.log("Test 1:", out); // Expected: [7, 8, 0, 7]

module.exports = addTwoNumbers;
