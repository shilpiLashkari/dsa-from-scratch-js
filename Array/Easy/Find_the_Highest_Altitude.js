// Problem: Find the Highest Altitude

// You are given a strictly increasing array gain of integers representing the altitude you would reach when you were located at index i.
// You start at an altitude of 0. Return the highest altitude you reach.

// Example 1:
// Input: gain = [92, 51, 60, -48, 1]
// Output: 192
// Explanation:
// The altitudes are [0, 92, 143, 203, 155, 156].
// The highest is 203.

// Example 2:
// Input: gain = [-5, 1, 5, 0, -7]
// Output: 5
// Explanation:
// The altitudes are [0, -5, -4, 1, 1, -6].
// The highest is 1.

// Constraints:
// 1 <= gain.length <= 100
// -100 <= gain[i] <= 100

/**
 * @param {number[]} gain
 * @return {number}
 */
const largestAltitude = (gain) => {
    let currentAltitude = 0;
    let maxAltitude = 0;

    for (const altitudeChange of gain) {
        currentAltitude += altitudeChange;
        maxAltitude = Math.max(maxAltitude, currentAltitude);
    }

    return maxAltitude;
};

// Notes:
// - We start at altitude 0, which is our initial maximum.
// - For each gain in the array, we add it to the current altitude.
// - We keep track of the maximum altitude reached so far.
// - We use Math.max to update the maximum whenever current altitude exceeds it.
// - Time Complexity: O(n) - single pass through the array
// - Space Complexity: O(1) - only using constant extra space

module.exports = { largestAltitude };
