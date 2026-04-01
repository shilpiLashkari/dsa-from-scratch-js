// Problem: Robot Collisions
// 
// There are n 1-indexed robots, each having a position on a 1D line, health, and direction (L or R).
// You are given 0-indexed integer arrays positions, healths, and a string directions (directions[i] 
// is either 'L' for left or 'R' for right). All integers in positions are unique.
// 
// All robots start moving on the line simultaneously at the same speed in their given directions. 
// If two robots ever share the same position while moving, they will collide.
// 
// When two robots collide:
// - The robot with lower health is removed from the line.
// - The robot with higher health has its health reduced by 1.
// - If both robots have the same health, both are removed from the line.
// 
// Return an array containing the health of the remaining robots (in the order they were 
// originally given), after no further collisions can occur.
// 
// Example 1:
// Input: positions = [5,4,3,2,1], healths = [2,17,9,15,10], directions = "RRRRR"
// Output: [2,17,9,15,10]
// 
// Example 2:
// Input: positions = [3,5,2,6], healths = [10,10,15,12], directions = "RLRL"
// Output: [14]
// Explanation: 
// 1. Robot at pos 3 (R, health 10) collides with Robot at pos 5 (L, health 10). Both removed.
// 2. Robot at pos 2 (R, health 15) collides with Robot at pos 6 (L, health 12). 
//    Robot at pos 6 removed, Robot at pos 2 health becomes 14.
// 
// Constraints:
// 1 <= positions.length == healths.length == directions.length <= 10^5
// 1 <= positions[i], healths[i] <= 10^9
// directions[i] is either 'L' or 'R'.
// All values in positions are distinct.

/**
 * @param {number[]} positions
 * @param {number[]} healths
 * @param {string} directions
 * @return {number[]}
 */
var survivedRobotsHealths = function (positions, healths, directions) {
    const n = positions.length;
    const robots = [];
    for (let i = 0; i < n; i++) {
        robots.push({
            id: i,
            pos: positions[i],
            health: healths[i],
            dir: directions[i]
        });
    }

    // Sort robots by position
    robots.sort((a, b) => a.pos - b.pos);

    const stack = [];
    for (let i = 0; i < n; i++) {
        const robot = robots[i];

        if (robot.dir === 'R') {
            stack.push(robot);
        } else {
            // Left moving robot collides with right moving robots in the stack
            while (stack.length > 0 && stack[stack.length - 1].dir === 'R' && robot.health > 0) {
                const top = stack[stack.length - 1];

                if (top.health > robot.health) {
                    top.health -= 1;
                    robot.health = 0;
                } else if (top.health < robot.health) {
                    robot.health -= 1;
                    stack.pop();
                } else {
                    robot.health = 0;
                    stack.pop();
                }
            }

            if (robot.health > 0) {
                stack.push(robot);
            }
        }
    }

    // Sort survival robots by their original id
    stack.sort((a, b) => a.id - b.id);

    return stack.map(r => r.health);
};

// Notes:
// - We use a stack-based simulation similar to the "Asteroid Collision" problem.
// - Robots moving to the right ('R') are stored in a stack.
// - When a robot moving to the left ('L') is encountered, it potential collides with 
//   all robots currently in the stack.
// - Sorting by position is crucial to ensure collisions are processed in the correct order.
// - Complexity:
//   - Time: O(N log N) due to sorting. The collision loop is O(N) total across all robots.
//   - Space: O(N) to store robots and the stack.

module.exports = { survivedRobotsHealths };
