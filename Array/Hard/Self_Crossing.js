/**
 * Problem: Self Crossing
 * Difficulty: Hard
 * Pattern: Geometry / Array
 * 
 * You are given an array of integers distance.
 * You start at point (0,0) on an X-Y plane and move distance[0] meters to the north,
 * then distance[1] meters to the west, distance[2] meters to the south,
 * distance[3] meters to the east, and so on. In other words, after each move,
 * your direction changes counter-clockwise.
 * 
 * Return true if your path crosses itself, and false if it does not.
 * 
 * Complexity:
 * - Time: O(N) where N is the length of the distance array. We iterate through the array once.
 * - Space: O(1) as we only use a constant amount of extra space for variables.
 */

/**
 * @param {number[]} distance
 * @return {boolean}
 */
var isSelfCrossing = function (distance) {
    const n = distance.length;
    if (n <= 3) return false;

    for (let i = 3; i < n; i++) {
        // Case 1: Fourth line crosses first line or onward
        if (distance[i] >= distance[i - 2] && distance[i - 1] <= distance[i - 3]) {
            return true;
        }

        // Case 2: Fifth line meets first line
        if (i >= 4) {
            if (distance[i - 1] === distance[i - 3] && distance[i] + distance[i - 4] >= distance[i - 2]) {
                return true;
            }
        }

        // Case 3: Sixth line crosses first line
        if (i >= 5) {
            if (distance[i - 1] <= distance[i - 3] &&
                distance[i - 1] + distance[i - 5] >= distance[i - 3] &&
                distance[i - 2] > distance[i - 4] &&
                distance[i] + distance[i - 4] >= distance[i - 2]) {
                return true;
            }
        }
    }

    return false;
};

// Example Usage:
// console.log(isSelfCrossing([2, 1, 1, 2])); // true
// console.log(isSelfCrossing([1, 2, 3, 4])); // false
// console.log(isSelfCrossing([1, 1, 1, 2, 1])); // true

module.exports = isSelfCrossing;
