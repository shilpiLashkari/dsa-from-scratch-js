// Problem: Count Subarrays With Majority Element I (LeetCode)
// Given an integer array nums and an integer target, return the number of subarrays
// where target appears more than half of the subarray's elements.

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var countSubarrays = function(nums, target) {
    const n = nums.length;
    const offset = n + 1;
    const bitSize = 2 * n + 5;
    const bit = new Array(bitSize).fill(0);

    const update = function(index, value) {
        while (index < bitSize) {
            bit[index] += value;
            index += index & -index;
        }
    };

    const query = function(index) {
        let sum = 0;
        while (index > 0) {
            sum += bit[index];
            index -= index & -index;
        }
        return sum;
    };

    let prefixSum = 0;
    let result = 0;

    // We count prefix sums seen so far, then for each new prefix sum,
    // we count how many earlier prefix sums are strictly smaller.
    update(offset, 1);

    for (let i = 0; i < n; i++) {
        prefixSum += nums[i] === target ? 1 : -1;
        const countLess = prefixSum + offset - 1;
        if (countLess >= 1) {
            result += query(countLess);
        }
        update(prefixSum + offset, 1);
    }

    return result;
};

// Notes:
// - Transform the array into +1 when nums[i] is target, and -1 otherwise.
// - A subarray has target as a majority iff its transformed sum is positive.
// - We use a Fenwick Tree to count how many previous prefix sums are strictly smaller.
// - Time Complexity: O(N log N)
// - Space Complexity: O(N)

module.exports = { countSubarrays };
