/**
 * Find the Winner of the Circular Game (Josephus Problem)
 * 
 * Strategy: This is the classic Josephus Problem. The position of the 
 * winner can be found using the recursive relation:
 * f(n, k) = (f(n-1, k) + k) % n
 * where f(n, k) is the 0-indexed position of the winner.
 * 
 * Time Complexity: O(N)
 * Space Complexity: O(1) if implemented iteratively.
 */

/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
function findTheWinner(n, k) {
    let winner = 0; // f(1, k)
    for (let i = 2; i <= n; i++) {
        winner = (winner + k) % i;
    }
    return winner + 1; // Convert to 1-indexed
}

// Example Test Case
console.log("Test 1 (n=5, k=2):", findTheWinner(5, 2)); // Expected: 3
console.log("Test 2 (n=6, k=5):", findTheWinner(6, 5)); // Expected: 1

module.exports = findTheWinner;
