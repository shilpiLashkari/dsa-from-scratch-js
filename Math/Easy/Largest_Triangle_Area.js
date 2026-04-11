// Problem: Largest Triangle Area
// Given an array of points on the X-Y plane points where points[i] = [xi, yi], 
// return the area of the largest triangle that can be formed by any three different points.

// Example 1:
// Input: points = [[0,0],[0,1],[1,0],[0,2],[2,0]]
// Output: 2.00000
// Explanation: The five points are shown in the above figure. The red triangle with vertices [0,0], [0,2], [2,0] has the largest area 2.

// Example 2:
// Input: points = [[1,0],[0,0],[0,1]]
// Output: 0.50000

// Constraints:
// 3 <= points.length <= 50
// -50 <= xi, yi <= 50
// All points are unique.

/**
 * @param {number[][]} points
 * @return {number}
 */
var largestTriangleArea = function (points) {
    let maxArea = 0;
    const n = points.length;

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            for (let k = j + 1; k < n; k++) {
                maxArea = Math.max(maxArea, calculateArea(points[i], points[j], points[k]));
            }
        }
    }

    return maxArea;
};

function calculateArea(p1, p2, p3) {
    // Formula for area of triangle with coordinates:
    // 0.5 * |x1(y2-y3) + x2(y3-y1) + x3(y1-y2)|
    return 0.5 * Math.abs(
        p1[0] * (p2[1] - p3[1]) +
        p2[0] * (p3[1] - p1[1]) +
        p3[0] * (p1[1] - p2[1])
    );
}

// Notes:
// - We iterate through all combinations of 3 points.
// - For each combination, we calculate the area using the coordinate formula.
// - Since N <= 50, O(N^3) is acceptable (~125,000 operations).
// - Time Complexity: O(N^3)
// - Space Complexity: O(1)

module.exports = { largestTriangleArea };
