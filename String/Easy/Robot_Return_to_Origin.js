// Problem: Robot Return to Origin (LeetCode 657)
// Difficulty: Easy
// Pattern: String / Simulation

/**
 * There is a robot starting at the position (0, 0), the origin, on a 2D plane.
 * Given a sequence of its moves, judge if this robot ends up at (0, 0) after
 * it completes all its moves.
 *
 * You are given a string moves where moves[i] represents its ith move.
 * Valid moves are 'R' (right), 'L' (left), 'U' (up), and 'D' (down).
 *
 * Return true if the robot returns to the origin after it finishes all of its moves,
 * or false otherwise.
 *
 * Note: The way that the robot is "facing" is irrelevant. 'R' will always make
 * the robot move to the right once, 'L' will always make it move left, etc.
 * Also, assume that the magnitude of the robot's movement is the same for each move.
 *
 * Example 1:
 * Input: moves = "UD"
 * Output: true
 *
 * Example 2:
 * Input: moves = "LL"
 * Output: false
 *
 * Constraints:
 * - 1 <= moves.length <= 2 * 10^4
 * - moves only contains the characters 'U', 'D', 'L' and 'R'
 */

/**
 * @param {string} moves
 * @return {boolean}
 */
const judgeCircle = (moves) => {
    let x = 0;
    let y = 0;

    for (let i = 0; i < moves.length; i++) {
        const move = moves[i];
        if (move === 'U') {
            y++;
        } else if (move === 'D') {
            y--;
        } else if (move === 'L') {
            x--;
        } else if (move === 'R') {
            x++;
        }
    }

    return x === 0 && y === 0;
};

// Notes:
// - Time Complexity: O(N), where N is the length of the string 'moves'. We traverse the string once.
// - Space Complexity: O(1), as we only use two variables for tracking coordinates.
// - Simulation is the most efficient approach here given the constraints.

module.exports = { judgeCircle };
