// Problem: First Missing Positive

// Given an unsorted integer array nums, return the smallest positive integer that is not present in the array.
// You must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space.
//
// Example 1:
// Input: nums = [1,2,0]
// Output: 3
// Explanation: The numbers in the range [1,2] are all in the array.
//
// Example 2:
// Input: nums = [3,4,-1,1]
// Output: 2
// Explanation: 1 is in the array but 2 is missing.
//
// Example 3:
// Input: nums = [7,8,9,11,12]
// Output: 1
// Explanation: The smallest positive integer 1 is missing.
//
// Constraints:
// 1 <= nums.length <= 10^5
// -2^31 <= nums[i] <= 2^31 - 1

// Solution:

/**
 * @param {number[]} nums
 * @return {number}
 */
const firstMissingPositive = (nums) => {
    const n = nums.length;

    for (let i = 0; i < n; i++) {
        if (nums[i] <= 0 || nums[i] > n) {
            nums[i] = n + 1; 
        }
    }

    for (let i = 0; i < n; i++) {
        const num = Math.abs(nums[i]); 

        if (num <= n) {
            const targetIndex = num - 1; 

            if (nums[targetIndex] > 0) {
                nums[targetIndex] = -nums[targetIndex];
            }
        }
    }

    for (let i = 0; i < n; i++) {
        if (nums[i] > 0) {
            return i + 1; 
        }
    }

    return n + 1;
};

// Notes:
// - This problem is tricky because we need O(1) space, so we can't use a Set or extra array.
// - The clever trick: use the input array itself as a hash map by using indices to represent numbers.
// - Key insight: if the array has length n, the answer MUST be in range [1, n+1].
// - Why? Because even if the array is [1,2,3,...,n], the answer would be n+1.
// - Step 1 cleans up irrelevant numbers (negatives, zeros, numbers > n) by replacing them with n+1.
// - Step 2 is the magic: for each valid number, we mark its presence by negating the value at index (number-1).
// - For example, if we see number 3, we make nums[2] negative to indicate "3 is present".
// - Step 3 finds the first index that's still positive - that means the number (index+1) is missing.
// - We use Math.abs() when reading values because they might have been negated in previous iterations.
// - Time Complexity: O(n) - we make three passes through the array.
// - Space Complexity: O(1) - we modify the input array in-place without extra space.
