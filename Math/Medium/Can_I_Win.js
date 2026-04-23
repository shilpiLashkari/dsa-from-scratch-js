/**
 * Can I Win
 * 
 * Strategy: This is a game theory problem that can be solved using recursion 
 * with memoization (minimax). We use a bitmask to represent the set of used 
 * integers. For each turn, the current player tries all available integers. 
 * If picking an integer 'i' leads to a total >= desiredTotal, or if it leads 
 * to a state from which the second player cannot win, the current player wins.
 * 
 * Time Complexity: O(2^N) where N is maxChoosableInteger, as there are 2^N 
 * possible states for the bitmask.
 * Space Complexity: O(2^N) for the memoization map.
 */

/**
 * @param {number} maxChoosableInteger
 * @param {number} desiredTotal
 * @return {boolean}
 */
function canIWin(maxChoosableInteger, desiredTotal) {
    // If the sum of all numbers is less than the total, no one can win
    const totalSum = (maxChoosableInteger * (maxChoosableInteger + 1)) / 2;
    if (totalSum < desiredTotal) return false;
    if (desiredTotal <= 0) return true;

    const memo = new Map();

    function solve(mask, currentTotal) {
        if (memo.has(mask)) return memo.get(mask);

        for (let i = 1; i <= maxChoosableInteger; i++) {
            const bit = 1 << i;
            if ((mask & bit) === 0) {
                // If I can win with this number or if the opponent can't win after I pick it
                if (currentTotal + i >= desiredTotal || !solve(mask | bit, currentTotal + i)) {
                    memo.set(mask, true);
                    return true;
                }
            }
        }

        memo.set(mask, false);
        return false;
    }

    return solve(0, 0);
}

// Example Test Cases
console.log("Test 1 (10, 11):", canIWin(10, 11)); // Expected: false
console.log("Test 2 (10, 0):", canIWin(10, 0));   // Expected: true
console.log("Test 3 (10, 1):", canIWin(10, 1));   // Expected: true

module.exports = canIWin;
