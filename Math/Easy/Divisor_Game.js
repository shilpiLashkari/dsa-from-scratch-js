// Problem: Divisor Game
// Alice and Bob take turns playing a game, with Alice starting first.
// Initially, there is a number n on the chalkboard.
// On each player's turn, that player makes a move consisting of:
// Choosing any x with 0 < x < n and n % x == 0.
// Replacing the number n on the chalkboard with n - x.
// Also, if a player cannot make a move, they lose the game.
// Return true if and only if Alice wins the game, assuming both players play optimally.

// Example 1:
// Input: n = 2
// Output: true
// Explanation: Alice chooses 1, and Bob has no more moves.

// Example 2:
// Input: n = 3
// Output: false
// Explanation: Alice chooses 1, Bob chooses 1, and Alice has no more moves.

// Constraints:
// 1 <= n <= 1000

/**
 * @param {number} n
 * @return {boolean}
 */
var divisorGame = function(n) {
    // If n is even, Alice can always choose x = 1, making the number odd for Bob.
    // Every divisor of an odd number is odd. Thus, whatever Bob chooses (say y), 
    // the next number n - y (odd - odd) will be even again for Alice.
    // Eventually, the number will reach 2 on Alice's turn, and she chooses 1 and wins.
    // Therefore, if n is even initially, Alice wins. If n is odd, Bob can apply this strategy and win.
    return n % 2 === 0;
};

// Notes:
// - This is a mathematical game theory problem.
// - An even number gives the winning state to the current player if they play optimally.
// - Time Complexity: O(1)
// - Space Complexity: O(1)

module.exports = { divisorGame };
