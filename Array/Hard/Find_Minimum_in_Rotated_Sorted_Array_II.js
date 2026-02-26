// Problem: Find Minimum in Rotated Sorted Array II

// Suppose an array of length n sorted in ascending order is rotated between 1 and n times.
// For example, the array nums = [0,1,2,4,5,6,7] might become:
// [4,5,6,7,0,1,2] if it was rotated 4 times.
// [0,1,2,4,5,6,7] if it was rotated 7 times.
// Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in 
// the array [a[n-1], a[0], a[1], ..., a[n-2]].

// Given the sorted rotated array nums that may contain duplicates, return the minimum element of this array.
// You must decrease the overall operation steps as much as possible.

// Example 1:
// Input: nums = [1,3,5]
// Output: 1

// Example 2:
// Input: nums = [2,2,2,0,1]
// Output: 0

// Constraints:
// n == nums.length
// 1 <= n <= 5000
// -5000 <= nums[i] <= 5000

/**
 * @param {number[]} nums
 * @return {number}
 */
const findMin = (nums) => {
    let low = 0;
    let high = nums.length - 1;

    while (low < high) {
        let mid = low + Math.floor((high - low) / 2);

        if (nums[mid] < nums[high]) {
            high = mid;
        }
        else if (nums[mid] > nums[high]) {
            low = mid + 1;
        }
        else {
            high--;
        }
    }

    return nums[low];
};

// Notes:
// - This is an extension of the "Find Minimum in Rotated Sorted Array" problem.
// - The key difference is the presence of duplicates (nums[mid] === nums[high]).
// - In the worst case (all elements same except one), the time complexity becomes O(n).
// - On average, the time complexity is O(log n).
// - Space Complexity: O(1) as we only use pointers.
// - This approach effectively handles the "plateau" created by duplicate values.

module.exports = { findMin };
