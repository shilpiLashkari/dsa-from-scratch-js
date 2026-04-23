/**
 * Elimination Game
 * 
 * Strategy: We don't need to actually simulate the elimination using an 
 * array. Instead, we track the 'head' (the first element) of the remaining 
 * numbers in each round.
 * - Initial: head = 1, step = 1, remaining = n, leftToRight = true.
 * - In each round:
 *   - If moving from left to right, the head ALWAYS moves: head += step.
 *   - If moving from right to left, the head moves ONLY if 'remaining' is 
 *     odd (e.g., [2, 4, 6] -> 4 is head, [2, 4, 6, 8] -> 2 is still head).
 *   - After each round: remaining is halved, step is doubled, and we switch direction.
 * 
 * Time Complexity: O(log N) as the 'remaining' count is halved in each step.
 * Space Complexity: O(1).
 */

/**
 * @param {number} n
 * @return {number}
 */
function lastRemaining(n) {
    let head = 1;
    let step = 1;
    let remaining = n;
    let leftToRight = true;

    while (remaining > 1) {
        if (leftToRight || remaining % 2 === 1) {
            head += step;
        }
        
        remaining = Math.floor(remaining / 2);
        step *= 2;
        leftToRight = !leftToRight;
    }

    return head;
}

// Example Test Cases
console.log("Test 1 (n=9):", lastRemaining(9)); // Expected: 6
console.log("Test 2 (n=1):", lastRemaining(1)); // Expected: 1

module.exports = lastRemaining;
