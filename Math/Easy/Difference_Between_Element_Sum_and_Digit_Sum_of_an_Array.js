// Problem: Difference Between Element Sum and Digit Sum of an Array
// You are given a positive integer array nums.
// The element sum is the sum of all the elements in nums.
// The digit sum is the sum of all the digits (not necessarily distinct) that appear in nums.
// Return the absolute difference between the element sum and digit sum of nums.
// Note that the absolute difference between two integers x and y is |x - y|.

// Example 1:
// Input: nums = [1,15,6,3]
// Output: 9
// Explanation: 
// The element sum of nums is 1 + 15 + 6 + 3 = 25.
// The digit sum of nums is 1 + 1 + 5 + 6 + 3 = 16.
// The absolute difference between the element sum and digit sum is |25 - 16| = 9.

// Example 2:
// Input: nums = [1,2,3,4]
// Output: 0
// Explanation:
// The element sum of nums is 1 + 2 + 3 + 4 = 10.
// The digit sum of nums is 1 + 2 + 3 + 4 = 10.
// The absolute difference between the element sum and digit sum is |10 - 10| = 0.

// Constraints:
// 1 <= nums.length <= 2000
// 1 <= nums[i] <= 2000

/**
 * @param {number[]} nums
 * @return {number}
 */
var differenceOfSum = function(nums) {
    let elementSum = 0;
    let digitSum = 0;
    
    for (let num of nums) {
        elementSum += num;
        
        // Calculate digit sum for the current number
        let temp = num;
        while (temp > 0) {
            digitSum += temp % 10;
            temp = Math.floor(temp / 10);
        }
    }
    
    // We actually don't need absolute value because a number is always >= its digit sum.
    // For example: 34 = 30 + 4 >= 3 + 4.
    // So elementSum >= digitSum is always true for positive integers.
    return Math.abs(elementSum - digitSum);
};

// Notes:
// - We can calculate both sums simultaneously in a single pass.
// - It's a mathematically proven fact that for any positive integer `x`, `x >= digit_sum(x)`.
// - So the element sum will always be greater than or equal to the digit sum.
// - Time Complexity: O(N * log_10(max_val))
// - Space Complexity: O(1)

module.exports = { differenceOfSum };
