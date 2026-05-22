/**
 * Problem: Search in Rotated Sorted Array
 * 
 * There is an integer array nums sorted in ascending order (with distinct values).
 * Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed).
 * For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].
 * 
 * Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.
 * 
 * You must write an algorithm with O(log n) runtime complexity.
 * 
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) {
            return mid;
        }

        // Check if left half is sorted
        if (nums[left] <= nums[mid]) {
            // Target is in the left sorted portion
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1;
            } else {
                // Target is in the right portion
                left = mid + 1;
            }
        } 
        // Right half is sorted
        else {
            // Target is in the right sorted portion
            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1;
            } else {
                // Target is in the left portion
                right = mid - 1;
            }
        }
    }

    return -1;
};

// ==========================================
// Test Cases
// ==========================================
console.log(search([4, 5, 6, 7, 0, 1, 2], 0)); // Expected: 4
console.log(search([4, 5, 6, 7, 0, 1, 2], 3)); // Expected: -1
console.log(search([1], 0));                   // Expected: -1
console.log(search([1], 1));                   // Expected: 0
console.log(search([5, 1, 3], 5));             // Expected: 0

// ==========================================
// Complexity Analysis
// ==========================================
// Time Complexity: O(log n)
// - We use binary search which repeatedly halves the search space. At each step, we identify which half is properly sorted and decide if the target lies in that half.
// 
// Space Complexity: O(1)
// - Only a few integer variables are used for pointers (left, right, mid), taking constant auxiliary space.
