// Problem: Maximum Walls Destroyed by Robots (LeetCode 3661)

// You are given a line with robots and walls.
// Each robot at position robots[i] has a bullet with range distance[i].
// It can fire either LEFT or RIGHT, destroying all walls in its path within range.
// However, if a bullet hits another robot, it stops immediately (robots block bullets).
// Robots are NOT destroyed by bullets. A wall and robot can share a position (wall is destroyed).
// Return the maximum number of UNIQUE walls that can be destroyed.

// Example 1:
// Input: robots = [1, 5, 9], distance = [5, 2, 3], walls = [2, 3, 6, 8, 10]
// Output: 4
// Explanation: Robot 0 fires right → destroys walls at 2, 3 (stopped by robot at 5).
//              Robot 1 fires right → destroys wall at 6 (stopped by robot at 9).
//              Robot 2 fires right → destroys wall at 10.
//              Total = 4.

// Constraints:
// 1 <= robots.length <= 10^5
// robots.length == distance.length
// 1 <= walls.length <= 10^5
// Positions can be up to 10^9

/**
 * Uses binary search to find the leftmost index where walls[index] >= target.
 * @param {number[]} sortedWalls
 * @param {number} target
 * @return {number}
 */
function bisectLeft(sortedWalls, target) {
    let lo = 0, hi = sortedWalls.length;
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (sortedWalls[mid] < target) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}

/**
 * Uses binary search to find the leftmost index where walls[index] > target.
 * @param {number[]} sortedWalls
 * @param {number} target
 * @return {number}
 */
function bisectRight(sortedWalls, target) {
    let lo = 0, hi = sortedWalls.length;
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (sortedWalls[mid] <= target) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}

/**
 * Counts the number of walls in the range [left, right] using binary search.
 * @param {number[]} sortedWalls - sorted array of wall positions
 * @param {number} left
 * @param {number} right
 * @return {number}
 */
function countWallsInRange(sortedWalls, left, right) {
    if (left > right) return 0;
    const lo = bisectLeft(sortedWalls, left);
    const hi = bisectRight(sortedWalls, right);
    return hi - lo;
}

/**
 * @param {number[]} robots - positions of robots
 * @param {number[]} distance - max bullet range for each robot
 * @param {number[]} walls - positions of walls
 * @return {number}
 */
var maxWallsDestroyed = function (robots, distance, walls) {
    const n = robots.length;

    // Pair robots with their distances and sort by position
    const bots = robots.map((pos, i) => [pos, distance[i]]);
    bots.sort((a, b) => a[0] - b[0]);

    // Sort walls for binary search
    const sortedWalls = [...walls].sort((a, b) => a - b);

    // For each robot i, precompute walls destroyed when firing LEFT or RIGHT.
    // Firing LEFT:  range = [max(pos - dist, leftBound + 1), pos]
    //   leftBound = position of robot i-1 (or -Infinity if none)
    // Firing RIGHT: range = [pos, min(pos + dist, rightBound - 1)]
    //   rightBound = position of robot i+1 (or +Infinity if none)
    // Note: bullets stop at the adjacent robot, so we use exclusive boundary.

    const leftCount = new Array(n);  // walls destroyed if robot i fires left
    const rightCount = new Array(n); // walls destroyed if robot i fires right

    for (let i = 0; i < n; i++) {
        const [pos, dist] = bots[i];

        // Fire LEFT
        const leftBound = i > 0 ? bots[i - 1][0] : -Infinity;
        const leftStart = Math.max(pos - dist, leftBound + 1);
        leftCount[i] = countWallsInRange(sortedWalls, leftStart, pos);

        // Fire RIGHT
        const rightBound = i < n - 1 ? bots[i + 1][0] : Infinity;
        const rightEnd = Math.min(pos + dist, rightBound - 1);
        rightCount[i] = countWallsInRange(sortedWalls, pos, rightEnd);
    }

    // DP approach:
    // Process robots left to right. The key interaction is between adjacent robots:
    // if robot i fires RIGHT and robot i+1 fires LEFT, there might be overlap
    // in the walls between them. We need to avoid double-counting.
    //
    // dp[i][0] = max walls destroyed considering robots 0..i, where robot i fires LEFT
    // dp[i][1] = max walls destroyed considering robots 0..i, where robot i fires RIGHT
    //
    // When robot i fires LEFT:
    //   No conflict with robot i-1's direction → dp[i][0] = max(dp[i-1][0], dp[i-1][1]) + leftCount[i]
    //
    // When robot i fires RIGHT:
    //   If robot i-1 fired RIGHT: no overlap between robot i-1's right and robot i's right
    //     → dp[i][1] = dp[i-1][1] + rightCount[i]
    //   If robot i-1 fired LEFT: no overlap either
    //     → dp[i][1] = dp[i-1][0] + rightCount[i]
    //
    // However, the overlap concern is between robot i firing LEFT and robot i-1 firing RIGHT
    // into the same gap. Since bullets stop at adjacent robots, robot i-1 fires right
    // up to (bot[i].pos - 1), and robot i fires left down to (bot[i-1].pos + 1).
    // The overlapping region is [bot[i-1].pos + 1, bot[i].pos - 1] ∩ both ranges.
    // Walls in this overlap would be double-counted.
    //
    // Let overlap(i) = walls in the intersection of robot i-1's RIGHT range and robot i's LEFT range.

    // Precompute overlaps between consecutive robots
    const overlap = new Array(n).fill(0);
    for (let i = 1; i < n; i++) {
        const [prevPos, prevDist] = bots[i - 1];
        const [curPos, curDist] = bots[i];

        // Robot i-1 fires right: range = [prevPos, min(prevPos + prevDist, curPos - 1)]
        const prevRightEnd = Math.min(prevPos + prevDist, curPos - 1);
        // Robot i fires left:  range = [max(curPos - curDist, prevPos + 1), curPos]
        const curLeftStart = Math.max(curPos - curDist, prevPos + 1);

        // Overlap = intersection of [prevPos, prevRightEnd] and [curLeftStart, curPos]
        // = [max(prevPos, curLeftStart), min(prevRightEnd, curPos)]
        // But we only care about the gap between robots: [prevPos+1, curPos-1]
        const overlapStart = Math.max(prevPos + 1, curLeftStart);
        const overlapEnd = Math.min(prevRightEnd, curPos - 1);

        overlap[i] = countWallsInRange(sortedWalls, overlapStart, overlapEnd);
    }

    // DP transitions
    // dp[0] = fire left, dp[1] = fire right
    let prevLeft = leftCount[0];
    let prevRight = rightCount[0];

    for (let i = 1; i < n; i++) {
        const newLeft = Math.max(prevLeft, prevRight) + leftCount[i];

        // When both robot i-1 fired RIGHT and robot i fires LEFT, subtract overlap
        const newLeftAdjusted = Math.max(
            prevLeft + leftCount[i],
            prevRight + leftCount[i] - overlap[i]
        );

        const newRight = Math.max(prevLeft, prevRight) + rightCount[i];

        prevLeft = newLeftAdjusted;
        prevRight = newRight;
    }

    return Math.max(prevLeft, prevRight);
};

// Notes:
// - This problem combines Dynamic Programming with Binary Search.
// - DP Approach:
//   - We process robots left to right (sorted by position).
//   - Each robot makes a binary choice: fire LEFT or fire RIGHT.
//   - The key challenge is that when robot i-1 fires RIGHT and robot i fires LEFT,
//     their ranges may overlap in the gap between them, causing double-counting.
//   - We precompute the overlap and subtract it in the DP transition.
// - Binary Search:
//   - We sort the walls array and use bisect (binary search) to efficiently count
//     how many walls fall in any given range [L, R].
// - Time Complexity: O((N + W) log W) where N = number of robots, W = number of walls.
//   Sorting walls is O(W log W), sorting robots is O(N log N), and each of the O(N) 
//   robots does O(log W) binary searches.
// - Space Complexity: O(N + W) for the sorted arrays and DP arrays.

module.exports = { maxWallsDestroyed };
