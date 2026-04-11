// Problem: Largest Perimeter Triangle
// Given an integer array nums, return the largest perimeter of a triangle with a non-zero area, formed from three of these lengths. 
// If it is impossible to form any triangle of a non-zero area, return 0.

// Example 1:
// Input: nums = [2,1,2]
// Output: 5

// Example 2:
// Input: nums = [1,2,1]
// Output: 0

// Constraints:
// 3 <= nums.length <= 10^4
// 1 <= nums[i] <= 10^6

/**
 * @param {number[]} nums
 * @return {number}
 */
var largestPerimeter = function(nums) {
    // Sort in descending order to easily test the largest combinations first
    nums.sort((a, b) => b - a);
    
    // For a triangle to be valid, the sum of lengths of any two sides must be strictly greater than length of the third side.
    // Since nums is sorted descending: nums[i] >= nums[i+1] >= nums[i+2],
    // The only condition we need to check is if nums[i+1] + nums[i+2] > nums[i].
    for (let i = 0; i < nums.length - 2; i++) {
        if (nums[i + 1] + nums[i + 2] > nums[i]) {
            return nums[i] + nums[i + 1] + nums[i + 2];
        }
    }
    
    return 0;
};

// Notes:
// - A valid triangle follows the triangle inequality theorem: a + b > c for all sides.
// - By sorting in descending order, we can greedily check the longest possible sides.
// - If the two shorter sides of a sorted triplet are strictly greater than the longest side, it forms a valid triangle.
// - Time Complexity: O(N log N) dominated by sorting.
// - Space Complexity: O(1) or O(log N) depending on sort implementation.

module.exports = { largestPerimeter };
