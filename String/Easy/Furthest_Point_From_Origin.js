// Problem: Furthest Point From Origin (LeetCode 2833)
// Difficulty: Easy
// Pattern: String / Counting

/**
 * You are given a string moves of length n consisting only of characters 'L', 'R', and '_'.
 * The string represents your moves on a number line starting from the origin 0.
 *
 * In the ith move, you can choose one of the following directions:
 * - Move to the left if moves[i] = 'L' or moves[i] = '_'
 * - Move to the right if moves[i] = 'R' or moves[i] = '_'
 *
 * Return the furthest distance from the origin you can reach after n moves.
 *
 * Example 1:
 * Input: moves = "L_R__"
 * Output: 3
 * Explanation: The furthest point we can reach from the origin 0 is -3 by replacing 
 * all '_' with 'L'. Now, moves = "LLRLL" and the ending position is -3.
 *
 * Example 2:
 * Input: moves = "_R__LL_"
 * Output: 5
 * Explanation: The furthest point we can reach from the origin 0 is -5 by replacing 
 * all '_' with 'L'. Now, moves = "LRLLLLL" and the ending position is -5.
 *
 * Example 3:
 * Input: moves = "_______"
 * Output: 7
 * Explanation: The furthest point we can reach from the origin 0 is 7 by replacing 
 * all '_' with 'R'. Now, moves = "RRRRRRR" and the ending position is 7.
 *
 * Constraints:
 * - 1 <= moves.length <= 50
 * - moves consists only of characters 'L', 'R' and '_'.
 */

/**
 * @param {string} moves
 * @return {number}
 */
const furthestDistanceFromOrigin = (moves) => {
    let countL = 0;
    let countR = 0;
    let countUnderscore = 0;

    for (const move of moves) {
        if (move === 'L') {
            countL++;
        } else if (move === 'R') {
            countR++;
        } else {
            countUnderscore++;
        }
    }

    // The logic is to move as far as possible in the direction we are already leaning towards.
    // We replace all '_' with the direction ('L' or 'R') that has more moves.
    // Mathematically, this is equivalent to abs(countL - countR) + countUnderscore.
    return Math.abs(countL - countR) + countUnderscore;
};

// Notes:
// - Time Complexity: O(N), where N is the length of the moves string. We traverse the string once.
// - Space Complexity: O(1), as we only use three variables to store counts.
// - This is a greedy approach. To maximize the absolute distance, we should use all 
//   flexible moves ('_') to reinforce the direction we have already moved in most.

module.exports = { furthestDistanceFromOrigin };

// Test cases
if (require.main === module) {
    console.log(furthestDistanceFromOrigin("L_R__"));    // Expected: 3
    console.log(furthestDistanceFromOrigin("_R__LL_"));  // Expected: 5
    console.log(furthestDistanceFromOrigin("_______"));  // Expected: 7
}
