/**
 * Minimum Total Distance Traveled
 * 
 * Problem:
 * There are some robots and factories on a 1D line. You are given an array of robot positions
 * and a 2D array of factories where each factory has a position and a capacity.
 * Each robot must be repaired at exactly one factory. Each factory has a limit on the number
 * of robots it can repair.
 * Return the minimum total distance all robots have to travel to be repaired.
 * 
 * Constraints:
 * - 1 <= robot.length <= 100
 * - 1 <= factory.length <= 100
 * - 1 <= factory[i][1] <= 100
 * - Total capacity >= robot.length
 * 
 * Pattern: Dynamic Programming + Sorting
 * Complexity: O(N * M * N) Time, O(N * M) Space
 */

/**
 * @param {number[]} robot
 * @param {number[][]} factory
 * @return {number}
 */
const minimumTotalDistance = (robot, factory) => {
    // Sort robots and factories by position
    robot.sort((a, b) => a - b);
    factory.sort((a, b) => a[0] - b[0]);

    const n = robot.length;
    const m = factory.length;

    // memo[i][j] = min distance for robots i...n-1 using factories j...m-1
    const memo = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(-1));

    /**
     * dp(i, j)
     * returns the min distance to repair robots[i...n-1]
     * using factories[j...m-1].
     */
    const dp = (i, j) => {
        if (i === n) return 0; // All robots repaired
        if (j === m) return Infinity; // No more factories left

        if (memo[i][j] !== -1) return memo[i][j];

        // Option 1: Skip factory j
        let res = dp(i, j + 1);

        // Option 2: Use factory j for k robots (1 to min(capacity, robots left))
        let distanceSum = 0;
        const [factoryPos, capacity] = factory[j];
        
        for (let k = 1; k <= capacity && i + k <= n; k++) {
            distanceSum += Math.abs(robot[i + k - 1] - factoryPos);
            const subRes = dp(i + k, j + 1);
            if (subRes !== Infinity) {
                res = Math.min(res, distanceSum + subRes);
            }
        }

        return memo[i][j] = res;
    };

    return dp(0, 0);
};

// --- Test Cases ---
const runTest = (robot, factory, expected) => {
    const result = minimumTotalDistance([...robot], [...factory]);
    console.log(`Input: Robots=[${robot}], Factories=[${factory.map(f => `[${f}]`)}]`);
    console.log(`Output: ${result} | Expected: ${expected} | ${result === expected ? '✅' : '❌'}`);
    console.log('---');
};

console.log("Running Minimum Total Distance Traveled tests...");

// Example 1
runTest([0, 4, 6], [[2, 2], [6, 2]], 4);
// Explanation: 
// Robot 0 at 0 moves to factory 0 at 2 (dist 2)
// Robot 1 at 4 moves to factory 1 at 6 (dist 2)
// Robot 2 at 6 stays at factory 1 at 6 (dist 0)
// Total = 2 + 2 + 0 = 4

// Example 2
runTest([1, -1], [[-2, 1], [2, 1]], 2);
// Explanation:
// Robot 0 at 1 moves to factory 1 at 2 (dist 1)
// Robot 1 at -1 moves to factory 0 at -2 (dist 1)
// Total = 1 + 1 = 2

// Additional Case 1: Multiple robots to one factory
runTest([1, 2, 3], [[5, 3]], 9);

// Additional Case 2: Factory with zero capacity handled by constraints, but let's test capacity limit
runTest([1, 2, 3], [[1, 1], [5, 2]], 5); 
// Robot at 1 to Factory at 1 (0)
// Robot at 2 to Factory at 5 (3)
// Robot at 3 to Factory at 5 (2)
// Total = 5

module.exports = { minimumTotalDistance };
