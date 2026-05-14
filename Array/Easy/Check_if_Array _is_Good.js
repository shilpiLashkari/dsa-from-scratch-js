/**
 * Problem: Check if Array is Good
 * LeetCode: 2784 (Easy)
 * 
 * You are given an integer array nums. We consider an array good if it is a permutation of an array base[n].
 * base[n] = [1, 2, ..., n - 1, n, n].
 * For example, base[1] = [1, 1] and base[3] = [1, 2, 3, 3].
 * Return true if the given array is good, otherwise return false.
 * 
 * Note: n = nums.length - 1.
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
const isGood = (nums) => {
    const n = nums.length - 1;
    if (n < 1) return false;

    // Use frequency map for O(N) approach
    const countMap = new Map();
    let maxVal = 0;

    for (const num of nums) {
        countMap.set(num, (countMap.get(num) || 0) + 1);
        if (num > maxVal) maxVal = num;
    }

    // Max value must be exactly n
    if (maxVal !== n) return false;

    // Check frequencies: 1 to n-1 must be 1, n must be 2
    for (let i = 1; i < n; i++) {
        if (countMap.get(i) !== 1) return false;
    }

    if (countMap.get(n) !== 2) return false;

    return true;
};

/**
 * Time Complexity: O(N) - Single pass to build map and a pass up to n.
 * Space Complexity: O(N) - To store frequency map.
 */

// Test Cases
const testCases = [
    { nums: [2, 1, 3], expected: false },
    { nums: [1, 3, 3, 2], expected: true },
    { nums: [1, 1], expected: true },
    { nums: [3, 4, 4, 1, 2, 1], expected: false },
    { nums: [1, 2, 3, 3], expected: true },
    { nums: [1], expected: false },
    { nums: [2, 2], expected: false }, // max is 2, but length is 2, so n=1. Max should be 1.
];

console.log("Running Test Cases for Check if Array is Good:");
testCases.forEach(({ nums, expected }, index) => {
    const result = isGood(nums);
    console.log(`Test Case ${index + 1}: [${nums}] => Expected: ${expected}, Got: ${result} ${result === expected ? "✅" : "❌"}`);
});

export default isGood;
