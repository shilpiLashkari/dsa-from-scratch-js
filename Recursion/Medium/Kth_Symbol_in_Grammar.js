/**
 * K-th Symbol in Grammar
 * 
 * Strategy: The grammar follows a recursive pattern:
 * Row 1: 0
 * Row 2: 01
 * Row 3: 0110
 * Row 4: 01101001
 * 
 * Observation: The first half of Row n is identical to Row n-1. 
 * The second half of Row n is the bitwise inverse of Row n-1.
 * 1. Base case: n = 1, k = 1 -> 0.
 * 2. If k is in the first half of Row n (k <= 2^(n-2)), it's the same as Row n-1.
 * 3. If k is in the second half, it's the inverse of the corresponding bit in Row n-1.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(N) for recursion stack.
 */

/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
function kthGrammar(n, k) {
    if (n === 1) return 0;

    const mid = Math.pow(2, n - 2);
    
    if (k <= mid) {
        return kthGrammar(n - 1, k);
    } else {
        return 1 - kthGrammar(n - 1, k - mid);
    }
}

// Example Test Case
console.log("Test 1 (n=1, k=1):", kthGrammar(1, 1)); // Expected: 0
console.log("Test 2 (n=2, k=1):", kthGrammar(2, 1)); // Expected: 0
console.log("Test 3 (n=2, k=2):", kthGrammar(2, 2)); // Expected: 1

module.exports = kthGrammar;
