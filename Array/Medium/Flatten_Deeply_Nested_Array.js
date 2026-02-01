// Problem: Flatten Deeply Nested Array
// Given a multi-dimensional array arr and a depth n, return a flattened version of that array.
// A multi-dimensional array is a recursive structure. That is:
// arr = [element1, element2, ..., elementN]
// where each element is either integer or another multi-dimensional array.
// A flattened array is a version of that array with some or all of the sub-arrays removed and replaced with the actual elements in that sub-array.
// This flattening operation should only be done if the current depth of nesting is less than n. The depth of the elements in the first array are considered to be 0.
// Please solve it without the built-in Array.flat method.
//
// Example 1:
// Input: arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], n = 0
// Output: [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
// Explanation: Passing a depth of n=0 will always result in the original array. This is because the smallest possible depth of a subarray (0) is not less than n=0.
//
// Example 2:
// Input: arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], n = 1
// Output: [1, 2, 3, 4, 5, 6, 7, 8, [9, 10, 11], 12, 13, 14, 15]
// Explanation: The subarrays starting with 4, 7, and 13 are all flattened. This is because their depth of 0 is less than 1. However [9, 10, 11] remains unflattened because its depth is 1.

// Solution:

/**
 * @param {Array} inputArray
 * @param {number} depthLimit
 * @return {Array}
 */
const flat = (inputArray, depthLimit) => {
    // If we reached depth 0, we can't flatten anymore
    if (depthLimit === 0) return inputArray;

    const flattenedArray = [];

    for (const element of inputArray) {
        // Check if the element is an array and if we are allowed to go deeper
        if (Array.isArray(element) && depthLimit > 0) {
            // Recursively flatten it with one less depth
            const nested = flat(element, depthLimit - 1);
            flattenedArray.push(...nested);
        } else {
            // Just a regular number, add it
            flattenedArray.push(element);
        }
    }

    return flattenedArray;
};

// Notes:
// - I used recursion to handle varying levels of nesting.
// - The function takes a 'depth' argument to know when to stop flattening.
// - I loop through the array, and if I find a nested array (and we can still go deeper), I recurse.
// - The spread operator `...` is really useful here to merge the results back into the main array.
// - Time Complexity: O(n) where n is the total count of numbers.
