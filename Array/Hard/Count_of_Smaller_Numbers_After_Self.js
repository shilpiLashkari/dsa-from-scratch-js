// Problem: Count of Smaller Numbers After Self
//
// Given an integer array nums, return an integer array counts where counts[i] is the number of smaller elements to the right of nums[i].
//
// Example 1:
// Input: nums = [5,2,6,1]
// Output: [2,1,1,0]
// Explanation:
// To the right of 5 there are 2 smaller elements (2 and 1).
// To the right of 2 there is only 1 smaller element (1).
// To the right of 6 there is 1 smaller element (1).
// To the right of 1 there is 0 smaller element.
//
// Example 2:
// Input: nums = [-1]
// Output: [0]
//
// Example 3:
// Input: nums = [-1,-1]
// Output: [0,0]
//
// Constraints:
// 1 <= nums.length <= 10^5
// -10^4 <= nums[i] <= 10^4

// Solution:

/**
 * @param {number[]} nums
 * @return {number[]}
 */
const countSmaller = (nums) => {
    const n = nums.length;
    const counts = new Array(n).fill(0);

    // Create an array of objects to track original indices
    // We need indices because sorting will change positions, but we need to update counts at original indices
    const items = nums.map((val, index) => ({ val, index }));

    // Merge Sort function
    const mergeSort = (arr) => {
        if (arr.length <= 1) return arr;

        const mid = Math.floor(arr.length / 2);
        const left = mergeSort(arr.slice(0, mid));
        const right = mergeSort(arr.slice(mid));

        return merge(left, right);
    };

    // Merge function that counts smaller elements
    const merge = (left, right) => {
        const sorted = [];
        let i = 0; // pointer for left
        let j = 0; // pointer for right
        let rightCounter = 0; // counts number of elements from right array that are smaller than current left element

        while (i < left.length && j < right.length) {
            // Sort in ascending order
            if (right[j].val < left[i].val) {
                // If right element is smaller, it moves to sorted array BEFORE left element
                // This means checking from left's perspective, this right element is "smaller and to the right"
                rightCounter++;
                sorted.push(right[j]);
                j++;
            } else {
                // If left element is smaller or equal, it's its turn to be placed in sorted array
                // At this moment, we know exactly how many elements from 'right' subarray (which were originally to the right of 'left' subarray)
                // have jumped ahead of 'left[i]' because they were smaller.
                counts[left[i].index] += rightCounter;
                sorted.push(left[i]);
                i++;
            }
        }

        // Processing remaining elements
        while (i < left.length) {
            counts[left[i].index] += rightCounter;
            sorted.push(left[i]);
            i++;
        }

        while (j < right.length) {
            sorted.push(right[j]);
            j++;
        }

        return sorted;
    };

    mergeSort(items);
    return counts;
};

// Notes:
// - Naive solution: O(n^2) by checking every element to the right. Too slow for n=10^5.
// - Optimal approach: Merge Sort or Binary Indexed Tree (BIT) / Segment Tree.
// - Merge Sort Strategy (Divide and Conquer):
//   1. Divide array into halves until single elements.
//   2. Merge step: When merging two sorted subarrays (left and right), we know elements in 'right' were originally at indices greater than elements in 'left'.
//   3. If we pick an element from 'right' because it's smaller than 'left[i]', we know it's a "smaller element to the right" for 'left[i]'.
//   4. We maintain a 'rightCounter' to track how many such elements we've seen from the right subarray during the merge process.
//   5. When we finally pick 'left[i]', add 'rightCounter' to its count.
// - Time Complexity: O(n log n). Merge sort takes O(n log n).
// - Space Complexity: O(n) for the temporary arrays and objects to store indices.
