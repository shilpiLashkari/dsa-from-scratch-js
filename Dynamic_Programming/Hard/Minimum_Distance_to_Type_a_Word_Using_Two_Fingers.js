/**
 * Minimum Distance to Type a Word Using Two Fingers
 * 
 * Problem:
 * You have a keyboard layout as shown below:
 * A B C D E F
 * G H I J K L
 * M N O P Q R
 * S T U V W X
 * Y Z
 * 
 * Write a function that returns the minimum total distance to type a given uppercase
 * string `word` using two fingers. The distance between two letters (x1, y1) and (x2, y2)
 * is |x1 - x2| + |y1 - y2|. 
 * Initially, your two fingers are unplaced and can start anywhere with zero cost.
 * 
 * Constraints:
 * - 2 <= word.length <= 300
 * - word consists of uppercase English letters.
 * 
 * Pattern: Dynamic Programming
 * Complexity: O(N) Time, O(N) Space
 */

/**
 * @param {string} word
 * @return {number}
 */
const minimumDistance = (word) => {
    const n = word.length;
    // memo[i][other_pos + 1] -> other_pos ranges from -1 to 25
    // other_pos = -1 means the second finger hasn't been placed yet
    const memo = Array.from({ length: n }, () => new Array(27).fill(-1));

    // Helper to calculate the Manhattan distance between two characters represented by indices 0 to 25
    const getDis = (a, b) => {
        if (a === -1) return 0; // Unplaced finger has a free jump
        const x1 = Math.floor(a / 6);
        const y1 = a % 6;
        const x2 = Math.floor(b / 6);
        const y2 = b % 6;
        return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    };

    /**
     * dp(i, other_pos)
     * returns the min distance to type word[i...n-1]
     * given that one finger is at word[i-1] and the other is at 'other_pos'.
     */
    const dp = (i, other_pos) => {
        if (i === n) return 0; // Finished typing the word
        
        if (memo[i][other_pos + 1] !== -1) {
            return memo[i][other_pos + 1];
        }

        const c_pos = word.charCodeAt(i) - 65; // 'A' is 65
        const prev_pos = word.charCodeAt(i - 1) - 65;

        // Path 1: Move the finger that is currently hovering over word[i-1] to word[i]
        const cost1 = getDis(prev_pos, c_pos) + dp(i + 1, other_pos);

        // Path 2: Move the other finger (at other_pos) to word[i]
        const cost2 = getDis(other_pos, c_pos) + dp(i + 1, prev_pos);

        memo[i][other_pos + 1] = Math.min(cost1, cost2);
        return memo[i][other_pos + 1];
    };

    // We start at i = 1, meaning we type word[0] for free with one finger, 
    // placing it at word[0]. The second finger has not been placed yet (other_pos = -1).
    if (n <= 1) return 0;
    return dp(1, -1);
};

// --- Test Cases ---
const runTest = (word, expected) => {
    const result = minimumDistance(word);
    console.log(`Input: "${word}" | Output: ${result} | Expected: ${expected} | ${result === expected ? '✅' : '❌'}`);
};

console.log("Running Minimum Distance to Type a Word Using Two Fingers tests...");
runTest("CAKE", 3);
// Explanation: 
// Finger 1 at 'C', cost = 0
// Finger 1 moves to 'A', cost = 2
// Finger 2 at 'K', cost = 0
// Finger 2 moves to 'E', cost = 1
// Total = 3

runTest("HAPPY", 6);
runTest("NEW", 3);
runTest("YEAR", 7);
