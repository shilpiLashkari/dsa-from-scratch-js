// Problem: Reverse Pairs

// Given an integer array nums, return the number of reverse pairs in the array.
// A reverse pair is a pair (i, j) where:
// 0 <= i < j < nums.length and
// nums[i] > 2 * nums[j].

// Example 1:
// Input: nums = [1,3,2,3,1]
// Output: 2
// Explanation: The reverse pairs are (1, 4) and (3, 4).
// - nums[1] = 3, nums[4] = 1, 3 > 2 * 1
// - nums[3] = 3, nums[4] = 1, 3 > 2 * 1

// Example 2:
// Input: nums = [2,4,3,5,1]
// Output: 3
// Explanation: The reverse pairs are (1, 4), (2, 4), and (3, 4).
// - nums[1] = 4, nums[4] = 1, 4 > 2 * 1
// - nums[2] = 3, nums[4] = 1, 3 > 2 * 1
// - nums[3] = 5, nums[4] = 1, 5 > 2 * 1

// Constraints:
// 1 <= nums.length <= 5 * 10^4
// -2^31 <= nums[i] <= 2^31 - 1

/**
 * @param {number[]} nums
 * @return {number}
 */
const reversePairs = (nums) => {
    if (!nums || nums.length < 2) return 0;
    return mergeSort(nums, 0, nums.length - 1);
};

/**
 * Modified merge sort to count reverse pairs.
 * @param {number[]} nums 
 * @param {number} left 
 * @param {number} right 
 * @returns {number}
 */
const mergeSort = (nums, left, right) => {
    if (left >= right) return 0;

    const mid = Math.floor((left + right) / 2);
    let count = mergeSort(nums, left, mid) + mergeSort(nums, mid + 1, right);

    // Count reverse pairs where i is in the left half and j is in the right half
    let j = mid + 1;
    for (let i = left; i <= mid; i++) {
        while (j <= right && nums[i] > 2 * nums[j]) {
            j++;
        }
        count += (j - (mid + 1));
    }

    // Merge the two sorted halves
    merge(nums, left, mid, right);
    return count;
};

/**
 * Merge two sorted halves of the array.
 * @param {number[]} nums 
 * @param {number} left 
 * @param {number} mid 
 * @param {number} right 
 */
const merge = (nums, left, mid, right) => {
    const temp = [];
    let i = left;
    let j = mid + 1;

    while (i <= mid && j <= right) {
        if (nums[i] <= nums[j]) {
            temp.push(nums[i++]);
        } else {
            temp.push(nums[j++]);
        }
    }

    while (i <= mid) temp.push(nums[i++]);
    while (j <= right) temp.push(nums[j++]);

    for (let k = 0; k < temp.length; k++) {
        nums[left + k] = temp[k];
    }
};

// Notes:
// - A brute force approach would take O(n^2), which is too slow for 5 * 10^4 elements.
// - This problem is similar to "Count Inversions", but the condition is nums[i] > 2 * nums[j], 
//   not just nums[i] > nums[j].
// - We use a modified Merge Sort because during the merge step, the left and right 
//   subarrays are already sorted.
// - This allows us to use a two-pointer approach to count pairs in O(left_len + right_len) 
//   time instead of O(left_len * right_len).
// - Time Complexity: O(n log n) - Standard Merge Sort complexity.
// - Space Complexity: O(n) - For the temporary array used in merging.
// - Caution: We must count the pairs *before* merging the halves to maintain the 
//   original relative order of elements between the two halves.

module.exports = { reversePairs };
