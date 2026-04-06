// Problem: Walking Robot Simulation (LeetCode 874)
// Difficulty: Medium
// Pattern: Array / Simulation / Hash Set for Obstacles

/**
 * A robot on an infinite XY-plane starts at point (0, 0) and faces north.
 * The robot receives an array of integers commands, which represents a sequence
 * of moves it must execute.
 *
 * Commands:
 * -2: Turn left 90 degrees.
 * -1: Turn right 90 degrees.
 * 1 <= k <= 9: Move forward k units, one unit at a time.
 *
 * There are obstacles on the grid. If the robot attempts to move into a square
 * containing an obstacle, it stays in its current location and proceeds to the
 * next command.
 *
 * @param {number[]} commands
 * @param {number[][]} obstacles
 * @return {number}
 */
var robotSim = function(commands, obstacles) {
    // Directions: 0: North, 1: East, 2: South, 3: West
    const dx = [0, 1, 0, -1];
    const dy = [1, 0, -1, 0];
    
    let x = 0;
    let y = 0;
    let direction = 0; // Starts facing North
    let maxDistanceSq = 0;

    // Use a Set for O(1) obstacle lookup.
    // Store coordinates as a string "x,y".
    const obstacleSet = new Set();
    for (let i = 0; i < obstacles.length; i++) {
        obstacleSet.add(obstacles[i][0] + ',' + obstacles[i][1]);
    }

    for (let i = 0; i < commands.length; i++) {
        const cmd = commands[i];

        if (cmd === -1) {
            // Turn right
            direction = (direction + 1) % 4;
        } else if (cmd === -2) {
            // Turn left
            direction = (direction + 3) % 4;
        } else {
            // Move forward k units
            for (let k = 0; k < cmd; k++) {
                const nextX = x + dx[direction];
                const nextY = y + dy[direction];

                if (!obstacleSet.has(nextX + ',' + nextY)) {
                    x = nextX;
                    y = nextY;
                    maxDistanceSq = Math.max(maxDistanceSq, x * x + y * y);
                } else {
                    // Blocked by obstacle
                    break;
                }
            }
        }
    }

    return maxDistanceSq;
};

// Notes:
// - Time Complexity: O(N + K) where N is number of obstacles and K is total units moved.
// - Space Complexity: O(N) for storing obstacles in a Set.
// - Using a Set with string keys "x,y" is efficient for coordinate lookup in JS.
// - The direction array [dx, dy] allows for easy state transitions using modulo.

module.exports = { robotSim };

