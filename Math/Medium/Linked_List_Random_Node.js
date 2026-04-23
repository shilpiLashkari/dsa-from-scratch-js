/**
 * Linked List Random Node
 * 
 * Strategy: Since the linked list size might be unknown or extremely large, 
 * we use Reservoir Sampling to pick a random node in a single pass with O(1) 
 * extra space. We initialize the result with the first node's value. For the 
 * i-th node (where i starts from 1), we pick its value with a probability 
 * of 1/i. By the end of the pass, each node has an equal probability (1/N) 
 * of being chosen.
 * 
 * Time Complexity: O(N) for each getRandom call.
 * Space Complexity: O(1) beyond storing the head.
 */

/**
 * Definition for singly-linked list node.
 */
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}

class Solution {
    /**
     * @param {ListNode} head
     */
    constructor(head) {
        this.head = head;
    }

    /**
     * @return {number}
     */
    getRandom() {
        let count = 0;
        let res = 0;
        let curr = this.head;

        while (curr) {
            count++;
            // Math.random() < 1/count is equivalent to picking with 1/count probability
            if (Math.floor(Math.random() * count) === 0) {
                res = curr.val;
            }
            curr = curr.next;
        }

        return res;
    }
}

// Example Test Cases
const head = new ListNode(1, new ListNode(2, new ListNode(3)));
const sol = new Solution(head);
const results = { 1: 0, 2: 0, 3: 0 };
for (let i = 0; i < 3000; i++) {
    results[sol.getRandom()]++;
}
console.log("Distribution after 3000 picks:", results); 
// Expected: Roughly 1000 each for 1, 2, and 3

module.exports = Solution;
