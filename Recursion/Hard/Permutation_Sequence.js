/**
 * Permutation Sequence
 * 
 * Strategy: Instead of generating all permutations (which would be O(n!)), 
 * we use a mathematical approach based on factorials to determine each digit 
 * of the k-th permutation.
 * 
 * Logic:
 * 1. Calculate factorials from 0 to n-1.
 * 2. Create a list of numbers [1, 2, ..., n].
 * 3. Adjust k to be 0-indexed (k = k - 1).
 * 4. For each position from n down to 1:
 *    - The index of the number in our list is index = floor(k / (n-1)!).
 *    - Append numbers[index] to our result.
 *    - Remove numbers[index] from the list.
 *    - Update k = k % (n-1)!.
 * 
 * Time Complexity: O(n²) because we iterate n times, and in each iteration we perform an array splice which takes O(n).
 * Space Complexity: O(n) to store the factorials and the list of numbers.
 */

/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
function getPermutation(n, k) {
    const factorials = [1];
    const numbers = [];
    
    // Precompute factorials and initialize numbers array
    for (let i = 1; i < n; i++) {
        factorials[i] = factorials[i - 1] * i;
    }
    for (let i = 1; i <= n; i++) {
        numbers.push(i);
    }

    // Convert k to 0-indexed
    k--;

    let result = "";
    for (let i = n - 1; i >= 0; i--) {
        const index = Math.floor(k / factorials[i]);
        result += numbers[index];
        numbers.splice(index, 1);
        k %= factorials[i];
    }

    return result;
}

// Example Test Cases
console.log("Test 1 (n=3, k=3):", getPermutation(3, 3)); // Expected: "213"
console.log("Test 2 (n=4, k=9):", getPermutation(4, 9)); // Expected: "2314"
console.log("Test 3 (n=3, k=1):", getPermutation(3, 1)); // Expected: "123"

module.exports = getPermutation;
