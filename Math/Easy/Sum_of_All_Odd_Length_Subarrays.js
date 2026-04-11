// Problem: Sum of All Odd Length Subarrays
// Given an array of positive integers arr, return the sum of all possible odd-length subarrays of arr.
// A subarray is a contiguous subsequence of the array.

// Example 1:
// Input: arr = [1,4,2,5,3]
// Output: 58
// Explanation: The odd-length subarrays of arr and their sums are:
// [1] = 1, [4] = 4, [2] = 2, [5] = 5, [3] = 3
// [1,4,2] = 7, [4,2,5] = 11, [2,5,3] = 10
// [1,4,2,5,3] = 15
// If we add all these together we get 1 + 4 + 2 + 5 + 3 + 7 + 11 + 10 + 15 = 58

// Example 2:
// Input: arr = [1,2]
// Output: 3
// Explanation: There are only 2 subarrays of odd length, [1] and [2]. Their sum is 3.

// Constraints:
// 1 <= arr.length <= 100
// 1 <= arr[i] <= 1000

/**
 * @param {number[]} arr
 * @return {number}
 */
var sumOddLengthSubarrays = function(arr) {
    let totalSum = 0;
    const n = arr.length;

    // Mathematical Approach:
    // For each element at index i, how many odd-length subarrays does it belong to?
    // Number of elements to its left is `i`, to its right is `n - i - 1`.
    // It can form a subarray by picking some elements from left and some from right.
    // Total subarrays containing arr[i] = (i + 1) * (n - i)
    // How many of these have odd length? Exactly half of them (rounded up).
    // So, odd_length_subarrays_count = Math.ceil(((i + 1) * (n - i)) / 2)
    
    for (let i = 0; i < n; i++) {
        let totalSubarrays = (i + 1) * (n - i);
        let oddSubarrays = Math.ceil(totalSubarrays / 2);
        totalSum += arr[i] * oddSubarrays;
    }

    return totalSum;
};

// Notes:
// - A naive O(N^3) or O(N^2) approach works because N is small, but O(N) is possible.
// - In O(N) approach, we count the contribution of each element to the final sum.
// - An element at index i appears in (i + 1) * (n - i) total contiguous subarrays.
// - Exactly half of these subarrays (ceil divided by 2) will have an odd length.
// - Time Complexity: O(N)
// - Space Complexity: O(1)

module.exports = { sumOddLengthSubarrays };
