/**
 * Maximum Total Subarray Value I
 * LeetCode #3689 — Medium
 *
 * Problem: Given a 0-indexed integer array `nums` of length `n` and an integer `k`,
 * choose exactly `k` non-empty subarrays (subarrays may overlap or be reused).
 * The value of a subarray nums[l..r] is defined as: max(nums[l..r]) - min(nums[l..r]).
 * Return the maximum possible total value (sum of values of all k chosen subarrays).
 *
 * Key Insight:
 * Since subarrays can overlap and be reused any number of times, the optimal strategy
 * is to find the single subarray with the largest possible value and pick it k times.
 * The subarray with the largest value spans the global maximum and global minimum of
 * the entire array (since any contiguous subarray containing both extremes achieves
 * the maximum spread: max(nums) - min(nums)).
 * Therefore the answer is simply: (max(nums) - min(nums)) * k.
 *
 * @param {number[]} nums - The input integer array.
 * @param {number} k     - The number of subarrays to select.
 * @return {number}      - The maximum total value achievable.
 */
function maximumTotalValue(nums, k) {
    let globalMax = nums[0];
    let globalMin = nums[0];

    for (const num of nums) {
        if (num > globalMax) globalMax = num;
        if (num < globalMin) globalMin = num;
    }

    return (globalMax - globalMin) * k;
}

// ------------------------------------------------------------------------------------
// Complexity Analysis:
// Time Complexity:  O(N) — single pass through `nums` to find the global max and min.
// Space Complexity: O(1) — only two scalar variables are used regardless of input size.
// ------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------
// Test Cases
// ------------------------------------------------------------------------------------
const runTests = () => {
    const testCases = [
        // Basic case — pick best spread k times
        { nums: [1, 2, 3], k: 2, expected: 4 },
        // All same values — spread is 0
        { nums: [5, 5, 5], k: 3, expected: 0 },
        // k = 1 — just the best single subarray value
        { nums: [4, 1, 9, 3], k: 1, expected: 8 },
        // Large k, small array
        { nums: [0, 10], k: 100000, expected: 1000000 },
        // Single element — no spread possible
        { nums: [7], k: 5, expected: 0 },
    ];

    let passed = 0;
    testCases.forEach((tc, i) => {
        const result = maximumTotalValue(tc.nums, tc.k);
        if (result === tc.expected) {
            console.log(`Test case ${i + 1} passed!`);
            passed++;
        } else {
            console.error(`Test case ${i + 1} failed! Expected ${tc.expected}, but got ${result}`);
        }
    });

    console.log(`${passed} out of ${testCases.length} test cases passed.`);
};

runTests();
