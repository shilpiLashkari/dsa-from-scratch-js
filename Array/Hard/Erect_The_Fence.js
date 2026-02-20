// Problem: Erect the Fence

// You are given an array trees where trees[i] = [xi, yi] represents the location of a tree in the garden.
//
// Fence the entire garden using the minimum length of rope, as it is expensive. The garden is well-fenced only if all the trees are enclosed.
//
// Return the coordinates of trees that are exactly located on the fence perimeter. You may return the answer in any order.
//
// Example 1:
// Input: trees = [[1,1],[2,2],[2,0],[2,4],[3,3],[4,2]]
// Output: [[1,1],[2,0],[4,2],[3,3],[2,4]]
// Explanation: All the trees will be on the perimeter of the fence except the tree at [2, 2], which will be inside the fence.
//
// Example 2:
// Input: trees = [[1,2],[2,2],[4,2]]
// Output: [[4,2],[2,2],[1,2]]
// Explanation: The fence forms a line that passes through all the trees.
//
// Constraints:
// 1 <= trees.length <= 3000
// trees[i].length == 2
// 0 <= xi, yi <= 100
// All the given positions are unique.

// Solution:

/**
 * @param {number[][]} trees
 * @return {number[][]}
 */
const outerTrees = (trees) => {
    // Monotone Chain Algorithm
    // Sort trees by x-coordinate (and y-coordinate for ties)
    trees.sort((a, b) => {
        if (a[0] === b[0]) {
            return a[1] - b[1];
        }
        return a[0] - b[0];
    });

    // Cross product of two vectors OA and OB
    // returns positive if O-A-B is counter-clockwise turn,
    // negative if clockwise, and zero if collinear
    const crossProduct = (o, a, b) => {
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    };

    // Build lower hull
    const lower = [];
    for (const tree of trees) {
        // While we have at least 2 points in the lower hull,
        // check if the current point makes a clockwise turn (or matches previous direction)
        // If it does, remove the last point because it's not part of the convex hull
        while (lower.length >= 2 && crossProduct(lower[lower.length - 2], lower[lower.length - 1], tree) < 0) {
            lower.pop();
        }
        lower.push(tree);
    }

    // Build upper hull
    const upper = [];
    // Iterate in reverse order to build the upper hull
    for (let i = trees.length - 1; i >= 0; i--) {
        const tree = trees[i];
        while (upper.length >= 2 && crossProduct(upper[upper.length - 2], upper[upper.length - 1], tree) < 0) {
            upper.pop();
        }
        upper.push(tree);
    }

    // Concatenate lower and upper hulls
    // Remove duplicate points (start and end points might be duplicated)
    // Use a Set to store unique string representations of coordinates
    const uniquePoints = new Set();

    for (const point of lower) {
        uniquePoints.add(point.join(','));
    }
    for (const point of upper) {
        uniquePoints.add(point.join(','));
    }

    // Convert back to array of coordinates
    const result = [];
    for (const pointStr of uniquePoints) {
        result.push(pointStr.split(',').map(Number));
    }

    return result;
};

// Notes:
// - This problem asks us to find the convex hull of a set of points.
// - The Convex Hull is the smallest convex polygon containing all the points.
// - We use the Monotone Chain algorithm, which sorts the points and builds the upper and lower hulls separately.
// - Sorting takes O(N log N). Building the hulls takes O(N). Total Time Complexity: O(N log N).
// - Space Complexity: O(N) to store the hull points.
// - The cross product helps determine the orientation of three points (p, q, r).
// - If crossProduct(p, q, r) > 0, it's a counter-clockwise turn (left turn).
// - If crossProduct(p, q, r) < 0, it's a clockwise turn (right turn).
// - If crossProduct(p, q, r) == 0, the points are collinear.
// - We want to keep points that make counter-clockwise turns or are collinear on the boundary.
// - We iterate through sorted points to build the lower hull, popping points that create a clockwise turn (which would mean the popped point is inside).
// - We do the same for the upper hull by iterating in reverse.
// - Finally, we merge the two hulls and remove duplicates using a Set.
