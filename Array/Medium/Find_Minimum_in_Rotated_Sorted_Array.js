/**
 * Problem: Find Minimum in Rotated Sorted Array
 * Link: https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/
 * 
 * Time Complexity: O(log n) - Binary search reduces the search space by half each step.
 * Space Complexity: O(1) - Only a few variables used for pointers.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
const findMin = function(nums) {
    let left = 0;
    let right = nums.length - 1;

    // If the array is not rotated at all
    if (nums[left] <= nums[right]) {
        return nums[left];
    }

    while (left < right) {
        let mid = Math.floor((left + right) / 2);

        // If nums[mid] > nums[right], the minimum is in the right half
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            // Otherwise, the minimum is in the left half (including mid)
            right = mid;
        }
    }

    return nums[left];
};

// --- Test Cases ---

const test = () => {
    const cases = [
        { nums: [3, 4, 5, 1, 2], expected: 1 },
        { nums: [4, 5, 6, 7, 0, 1, 2], expected: 0 },
        { nums: [11, 13, 15, 17], expected: 11 },
        { nums: [1], expected: 1 },
        { nums: [2, 1], expected: 1 },
        { nums: [5, 1, 2, 3, 4], expected: 1 },
        { nums: [2, 3, 4, 5, 1], expected: 1 }
    ];

    cases.forEach(({ nums, expected }, index) => {
        const result = findMin(nums);
        console.assert(result === expected, `Test Case ${index + 1} Failed: nums=[${nums}], expected=${expected}, got=${result}`);
        if (result === expected) {
            console.log(`Test Case ${index + 1} Passed!`);
        }
    });
};

test();
