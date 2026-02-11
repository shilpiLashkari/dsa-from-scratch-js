// Problem: Max Points on a Line
//
// Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane, return the maximum number of points that lie on the same straight line.
//
// Example 1:
// Input: points = [[1,1],[2,2],[3,3]]
// Output: 3
//
// Example 2:
// Input: points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
// Output: 4
//
// Constraints:
// 1 <= points.length <= 300
// points[i].length == 2
// -10^4 <= xi, yi <= 10^4
// All the points are unique.

// Solution:

/**
 * @param {number[][]} points
 * @return {number}
 */
var maxPoints = function (points) {
    if (points.length <= 2) return points.length;

    let maxPointsOnLine = 1;

    for (let i = 0; i < points.length; i++) {
        const slopes = new Map();

        for (let j = i + 1; j < points.length; j++) {
            const [x1, y1] = points[i];
            const [x2, y2] = points[j];

            // Calculate slope
            // We use Math.atan2 to avoid precision issues and handle vertical lines automatically.
            // atan2(y, x) returns the angle in radians.
            const angle = Math.atan2(y2 - y1, x2 - x1);

            slopes.set(angle, (slopes.get(angle) || 0) + 1);
        }

        // The max points relative to point i is (count of same slope + point i itself)
        for (const count of slopes.values()) {
            maxPointsOnLine = Math.max(maxPointsOnLine, count + 1);
        }
    }

    return maxPointsOnLine;
};

// Notes:
//
// - We iterate through every point and consider it as the "anchor" point.
// - For each anchor point, we verify the slope of the line formed with every other point.
// - Points with the same slope relative to the anchor point lie on the same line.
// - We use `Math.atan2(dy, dx)` to represent the slope. This is better than `dy/dx` because:
//   1. It handles vertical lines (dx = 0) gracefully without dividing by zero.
//   2. It handles the sign differences (quadrants) correctly.
//   3. It avoids floating point division precision issues better than raw division (though still float).
//   4. Note: Since we only look at `j > i`, vectors are always pointing "forward" in iteration order, so we group safely.
// - Time Complexity: O(N^2), where N is the number of points. We have a nested loop.
// - Space Complexity: O(N) to store the slopes in the Map for each iteration.
