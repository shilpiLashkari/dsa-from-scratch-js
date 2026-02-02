// Problem: Trapping Rain Water

// Given n non-negative integers representing an elevation map where the width of each bar is 1, 
// compute how much water it can trap after raining.
//
// Example 1:
// Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
// Output: 6
// Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. 
// In this case, 6 units of rain water (blue section) are being trapped.
//
// Example 2:
// Input: height = [4,2,0,3,2,5]
// Output: 9
//
// Constraints:
// n == height.length
// 1 <= n <= 2 * 10^4
// 0 <= height[i] <= 10^5

// Solution:

/**
 * @param {number[]} height
 * @return {number}
 */
const trap = (height) => {
    // Edge case: if array is too small, no water can be trapped
    if (height.length < 3) {
        return 0;
    }

    let left = 0;
    let right = height.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let totalWater = 0;

    // Use two pointers moving towards each other
    while (left < right) {
        // Process the side with the smaller height
        // Why? Water level is determined by the minimum of the two boundaries
        if (height[left] < height[right]) {
            // Check if current position can hold water
            if (height[left] >= leftMax) {
                // This is a new peak on the left, update the max
                leftMax = height[left];
            } else {
                // Water can be trapped here!
                // The amount is the difference between the max height so far and current height
                totalWater += leftMax - height[left];
            }
            left++; // Move left pointer forward
        } else {
            // Process from the right side
            if (height[right] >= rightMax) {
                // New peak on the right
                rightMax = height[right];
            } else {
                // Water trapped on the right side
                totalWater += rightMax - height[right];
            }
            right--; // Move right pointer backward
        }
    }

    return totalWater;
};

// Notes:
// - The key insight: water at any position is determined by the minimum of the tallest bars on its left and right.
// - Water level at position i = min(max_height_left, max_height_right) - height[i]
// - We use the two-pointer technique to avoid calculating left/right max arrays separately.
// - We always process the side with the smaller height because that's the limiting factor for water.
// - Think of it like this: if left side is shorter, we know for sure that the right side won't limit the water on the left.
// - As we move inward, we keep track of the maximum height seen so far from each side.
// - If current height is less than the max, we can trap water equal to the difference.
// - If current height is greater than or equal to max, it becomes the new boundary (no water trapped here).
// - This approach is elegant because we solve the problem in a single pass without extra space.
// - Time Complexity: O(n) - we visit each element exactly once.
// - Space Complexity: O(1) - we only use a few variables regardless of input size.
