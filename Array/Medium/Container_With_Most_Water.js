/**
 * Problem: Container With Most Water
 * Difficulty: Medium
 * Pattern: Two Pointers / Greedy
 * 
 * You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).
 * Find two lines that together with the x-axis form a container, such that the container contains the most water.
 * Return the maximum amount of water a container can store.
 * Notice that you may not slant the container.
 * 
 * Complexity:
 * - Time: O(N) where N is the length of the height array. Two pointers traverse the array once.
 * - Space: O(1) as we use constant extra space.
 */

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;

    while (left < right) {
        // Calculate current area
        // Height is limited by the shorter line
        const width = right - left;
        const currentHeight = Math.min(height[left], height[right]);
        const currentArea = width * currentHeight;

        maxWater = Math.max(maxWater, currentArea);

        // Move the pointer pointing to the shorter line
        // Why? Moving the taller line can only decrease width without increasing height (limited by shorter line)
        // Moving the shorter line gives a chance to find a taller line to pair with the other one
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxWater;
};

// Example Usage:
// console.log(maxArea([1,8,6,2,5,4,8,3,7])); // 49
// console.log(maxArea([1,1])); // 1

module.exports = maxArea;
