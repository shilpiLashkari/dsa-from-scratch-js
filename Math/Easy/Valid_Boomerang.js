// Problem: Valid Boomerang
// Given an array points where points[i] = [xi, yi] represents a point on the X-Y plane, return true if these points are a boomerang.
// A boomerang is a set of three points that are all distinct and not in a straight line.

// Example 1:
// Input: points = [[1,1],[2,3],[3,2]]
// Output: true

// Example 2:
// Input: points = [[1,1],[2,2],[3,3]]
// Output: false

// Constraints:
// points.length == 3
// points[i].length == 2
// 0 <= xi, yi <= 100

/**
 * @param {number[][]} points
 * @return {boolean}
 */
var isBoomerang = function(points) {
    let p1 = points[0];
    let p2 = points[1];
    let p3 = points[2];
    
    // Calculate the area using the shoelace formula / cross product.
    // If the area is 0, the points are collinear (in a straight line).
    // The expression is derived from: x1*(y2 - y3) + x2*(y3 - y1) + x3*(y1 - y2)
    // Or equivalently checking if slopes are equal: (y2 - y1) / (x2 - x1) == (y3 - y2) / (x3 - x2)
    // To avoid division by zero, we use cross multiplication:
    // (y2 - y1) * (x3 - x2) == (y3 - y2) * (x2 - x1)
    
    return (p2[1] - p1[1]) * (p3[0] - p2[0]) !== (p3[1] - p2[1]) * (p2[0] - p1[0]);
};

// Notes:
// - A boomerang means the three points are not collinear.
// - We can check collinearity by comparing the slopes between points.
// - Using cross-multiplication avoids division by zero issues and precise floating point comparisons.
// - Time Complexity: O(1)
// - Space Complexity: O(1)

module.exports = { isBoomerang };
