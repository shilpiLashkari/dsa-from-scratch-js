// Problem: Remove Duplicates From Sorted Array
// Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. 
// The relative order of the elements should be kept the same. 
// Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array nums. 
// More formally, if there are k elements after removing the duplicates, then the first k elements of nums should hold the final result. 
// It does not matter what you leave beyond the first k elements.
// Return k after placing the final result in the first k slots of nums.
// Do not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.

// Example 1:
// Input: nums = [1,1,2]
// Output: 2, nums = [1,2,_]

// Example 2:
// Input: nums = [0,0,1,1,1,2,2,3,3,4]
// Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]

// Constraints:
// 1 <= nums.length <= 3 * 10^4
// -10^4 <= nums[i] <= 10^4
// nums is sorted in non-decreasing order.

// Follow up: 
// - Could you solve it without using extra space for another array?
// - Could you minimize the total number of operations done on the array?

// Constraints:
// -2^31 <= x <= 2^31 - 1

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
    let k = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > nums[k]) {
            k += 1;
            nums[k] = nums[i];
        }
    }
    return k + 1;
};


// Notes:
// - The problem asks to remove duplicates from a sorted array in-place.
// - We must keep the relative order of the elements.
// - We must modify the input array in-place with O(1) extra memory.
// - Time Complexity: O(n) - We process each element of the array.
// - Space Complexity: O(1) - Constant extra space used for variables.

