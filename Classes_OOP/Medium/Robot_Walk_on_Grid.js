// Problem: Walking Robot Simulation II (LeetCode #2069)
// A width x height grid is on an XY-plane with the bottom-left cell at (0, 0)
// and the top-right cell at (width - 1, height - 1). The grid is aligned with
// the four cardinal directions ("North", "East", "South", and "West"). A robot
// is initially at cell (0, 0) facing direction "East".
//
// The robot can be instructed to move for a specific number of steps. For each step:
// - Attempts to move forward one cell in the direction it is facing.
// - If the cell the robot is moving to is out of bounds, the robot instead turns
//   90 degrees counterclockwise and retries the step.
// After the robot finishes moving, it stops and awaits the next instruction.
//
// Implement the Robot class:
// - Robot(int width, int height): Initializes the width x height grid with the
//   robot at (0, 0) facing "East".
// - void step(int num): Instructs the robot to move forward num steps.
// - int[] getPos(): Returns the current cell as [x, y].
// - String getDir(): Returns the current direction "North", "East", "South", or "West".
//
// Example 1:
// Input:
// ["Robot", "step", "step", "getPos", "getDir", "step", "step", "step", "getPos", "getDir"]
// [[6, 3], [2], [2], [], [], [2], [1], [4], [], []]
// Output: [null, null, null, [4, 0], "East", null, null, null, [1, 2], "West"]
//
// Explanation:
// Robot robot = new Robot(6, 3); // at (0,0) facing East
// robot.step(2);  // moves to (2, 0), facing East
// robot.step(2);  // moves to (4, 0), facing East
// robot.getPos(); // return [4, 0]
// robot.getDir(); // return "East"
// robot.step(2);  // moves to (5, 0), turns North, moves to (5, 1) -> facing North
// robot.step(1);  // moves to (5, 2), facing North
// robot.step(4);  // turns West, moves four steps to (1, 2), facing West
// robot.getPos(); // return [1, 2]
// robot.getDir(); // return "West"
//
// Constraints:
// - 2 <= width, height <= 100
// - 1 <= num <= 10^5
// - At most 10^4 calls in total to step, getPos, and getDir.

// Solution:

/**
 * @param {number} width
 * @param {number} height
 */
var Robot = function (width, height) {
    this.width = width;
    this.height = height;

    // Directions in counterclockwise order (turn left = next index)
    // Perimeter traversal order: East → North → West → South
    this.dirs = ["East", "North", "West", "South"];

    // Corresponding [dx, dy] for each direction
    this.deltas = [
        [1, 0],   // East
        [0, 1],   // North
        [-1, 0],  // West
        [0, -1],  // South
    ];

    this.x = 0;
    this.y = 0;
    this.dirIdx = 0; // starts facing East

    // Total perimeter steps to cycle around the grid
    // Moving along: bottom (width-1) + right (height-1) + top (width-1) + left (height-1)
    this.perimeter = 2 * (width - 1) + 2 * (height - 1);

    // Current position along the perimeter (0-indexed)
    this.perimPos = 0;
};

/**
 * @param {number} num
 * @return {void}
 */
Robot.prototype.step = function (num) {
    // Reduce steps modulo the perimeter to skip redundant full laps
    const newPos = (this.perimPos + num) % this.perimeter;

    // Edge case: if newPos === 0 after moving (not at start), the robot has
    // completed an exact number of full laps and is back at (0,0).
    // At the true start perimPos=0 means facing East; but after walking, the
    // robot arrives at (0,0) via the South segment → it should face South.
    // We model this by mapping 0 (post-move) to the full perimeter value.
    this.perimPos = (newPos === 0) ? this.perimeter : newPos;

    // Map perimeter position to [x, y, directionIndex]
    const [x, y, dirIdx] = this._getStateFromPerimPos(this.perimPos);
    this.x = x;
    this.y = y;
    this.dirIdx = dirIdx;
};

/**
 * Helper: Given a position along the perimeter, return [x, y, dirIdx].
 * The perimeter is traversed starting at (0,0) going East:
 *   Segment 0: Bottom edge   (0,0) → (w-1, 0)   : East,  length = w-1
 *   Segment 1: Right edge    (w-1,0) → (w-1, h-1): North, length = h-1
 *   Segment 2: Top edge      (w-1,h-1) → (0, h-1): West,  length = w-1
 *   Segment 3: Left edge     (0, h-1) → (0, 0)   : South, length = h-1
 *
 * @param {number} pos
 * @return {[number, number, number]}
 */
Robot.prototype._getStateFromPerimPos = function (pos) {
    const w = this.width;
    const h = this.height;

    // Segment lengths along the perimeter (counterclockwise from bottom-left)
    const seg0 = w - 1;  // Bottom edge:  (0,0)     → (w-1, 0),   facing East
    const seg1 = h - 1;  // Right edge:   (w-1,0)   → (w-1, h-1), facing North
    const seg2 = w - 1;  // Top edge:     (w-1,h-1) → (0, h-1),   facing West
    // seg3 = h - 1       // Left edge:    (0, h-1)  → (0, 0),     facing South

    if (pos <= seg0) {
        // Bottom edge, moving East
        return [pos, 0, 0]; // dirIdx 0 = East
    }
    pos -= seg0;

    if (pos <= seg1) {
        // Right edge, moving North
        return [w - 1, pos, 1]; // dirIdx 1 = North
    }
    pos -= seg1;

    if (pos <= seg2) {
        // Top edge, moving West
        return [w - 1 - pos, h - 1, 2]; // dirIdx 2 = West
    }
    pos -= seg2;

    // Left edge, moving South
    return [0, h - 1 - pos, 3]; // dirIdx 3 = South
};

/**
 * @return {number[]}
 */
Robot.prototype.getPos = function () {
    return [this.x, this.y];
};

/**
 * @return {string}
 */
Robot.prototype.getDir = function () {
    return this.dirs[this.dirIdx];
};

// Notes:
// - Key Insight: The robot always walks counterclockwise along the perimeter:
//   East → North → West → South, and this pattern repeats indefinitely.
// - Instead of simulating each step (O(num) per call), we collapse steps using
//   modulo arithmetic on the perimeter length → O(1) per step().
// - `_getStateFromPerimPos` maps any perimeter offset to an exact [x, y, dir]
//   using segment boundary checks — no loops or simulation needed.
// - Edge Case (perimPos = 0 after stepping): If `(perimPos + num) % perimeter === 0`,
//   the robot has taken an exact multiple of full laps and physically lands at (0,0).
//   However it arrived via the South segment (left edge), so it should face South,
//   NOT East (which is only for the initial state). We fix this by remapping 0 → perimeter
//   so the left-edge segment branch handles it correctly.
// - Time Complexity: O(1) per step(), getPos(), getDir().
// - Space Complexity: O(1).
