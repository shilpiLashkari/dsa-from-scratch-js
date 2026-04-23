/**
 * Find Kth Bit in Nth Binary String
 * 
 * Strategy: The sequence is defined as Sn = Sn-1 + "1" + reverse(invert(Sn-1)).
 * The length of Sn is 2^n - 1.
 * 1. If k is exactly in the middle (k == 2^(n-1)), it's always "1".
 * 2. If k is in the first half (k < 2^(n-1)), it's the same as the k-th bit 
 *    in Sn-1.
 * 3. If k is in the second half (k > 2^(n-1)), it's the inverse of the bit 
 *    at position (2^n - k) in Sn-1.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(N) for recursion stack.
 */

/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
function findKthBit(n, k) {
    if (n === 1) return "0";

    const len = Math.pow(2, n) - 1;
    const mid = (len + 1) / 2;

    if (k === mid) {
        return "1";
    } else if (k < mid) {
        return findKthBit(n - 1, k);
    } else {
        // Mirror position in the second half and invert
        return findKthBit(n - 1, len - k + 1) === "0" ? "1" : "0";
    }
}

// Example Test Case
console.log("Test 1 (n=3, k=1):", findKthBit(3, 1)); // Expected: "0"
console.log("Test 2 (n=4, k=11):", findKthBit(4, 11)); // Expected: "1"

module.exports = findKthBit;
