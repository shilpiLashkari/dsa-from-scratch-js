// Problem: Nim Game
// You are playing the following Nim Game with your friend:
// Initially, there is a heap of stones on the table.
// You and your friend will alternate taking turns, and you go first.
// On each turn, the person whose turn it is will remove 1 to 3 stones from the heap.
// The one who removes the last stone is the winner.
// Given n, the number of stones in the heap, return true if you can win the game assuming both you and your friend play optimally, otherwise return false.

// Example 1:
// Input: n = 4
// Output: false
// Explanation: These are the possible outcomes:
// 1. You remove 1 stone. Your friend removes 3 stones, including the last one. Your friend wins.
// 2. You remove 2 stones. Your friend removes 2 stones, including the last one. Your friend wins.
// 3. You remove 3 stones. Your friend removes 1 stone, including the last one. Your friend wins.
// In all outcomes, your friend wins.

// Example 2:
// Input: n = 1
// Output: true

// Example 3:
// Input: n = 2
// Output: true

// Constraints:
// 1 <= n <= 2^31 - 1

/**
 * @param {number} n
 * @return {boolean}
 */
var canWinNim = function (n) {
    // If n is a multiple of 4, the first player will always lose if the second player plays optimally.
    // In any other case, the first player can always win by reducing the heap to a multiple of 4 for the next player.
    return n % 4 !== 0;
};

// Notes:
// - This is a classic game theory problem.
// - If the number of stones is a multiple of 4 (e.g., 4, 8, 12...), you will always lose.
// - Whatever you pick (1, 2, or 3), your friend can pick (4-yourPick) to reach the next multiple of 4.
// - Time Complexity: O(1)
// - Space Complexity: O(1)

module.exports = { canWinNim };
