/**
 * Partition Array According to Given Pivot
 * 
 * Problem: Given a 0-indexed integer array `nums` and an integer `pivot`. Rearrange `nums` such that:
 * 1. Every element less than `pivot` appears before every element greater than `pivot`.
 * 2. Every element equal to `pivot` appears in between the elements less than and greater than `pivot`.
 * 3. The relative order of the elements less than `pivot` and the elements greater than `pivot` is maintained.
 *
 * @param {number[]} nums
 * @param {number} pivot
 * @return {number[]}
 */
function pivotArray(nums, pivot) {
    const less = [];
    const equal = [];
    const greater = [];

    for (const num of nums) {
        if (num < pivot) {
            less.push(num);
        } else if (num === pivot) {
            equal.push(num);
        } else {
            greater.push(num);
        }
    }

    return less.concat(equal, greater);
}

// ------------------------------------------------------------------------------------
// Complexity Analysis:
// Time Complexity: O(N) where N is the length of the `nums` array. We iterate through the array once and concatenating takes O(N).
// Space Complexity: O(N) since we are storing the elements in three additional arrays.
// ------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------
// Test Cases
// ------------------------------------------------------------------------------------
const runTests = () => {
    const testCases = [
        { nums: [9, 12, 5, 10, 14, 3, 10], pivot: 10, expected: [9, 5, 3, 10, 10, 12, 14] },
        { nums: [-3, 4, 3, 2], pivot: 2, expected: [-3, 2, 4, 3] },
        { nums: [1, 1, 1], pivot: 1, expected: [1, 1, 1] },
        { nums: [5, 4, 3, 2, 1], pivot: 3, expected: [2, 1, 3, 5, 4] }
    ];

    let passed = 0;
    testCases.forEach((tc, i) => {
        const result = pivotArray(tc.nums, tc.pivot);
        if (JSON.stringify(result) === JSON.stringify(tc.expected)) {
            console.log(`Test case ${i + 1} passed!`);
            passed++;
        } else {
            console.error(`Test case ${i + 1} failed! Expected ${tc.expected}, but got ${result}`);
        }
    });

    console.log(`${passed} out of ${testCases.length} test cases passed.`);
};

runTests();
