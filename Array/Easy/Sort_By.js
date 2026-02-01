// Problem: Sort By
// Given an array arr and a function fn, return a sorted array sortedArr.
// You can assume fn only returns numbers and those numbers determine the sort order of sortedArr.
// sortedArr must be sorted in ascending order by fn(arr[i]) key.
// You may assume that fn will never duplicate numbers for a given array.
//
// Example 1:
// Input: arr = [5, 4, 1, 2, 3], fn = (x) => x
// Output: [1, 2, 3, 4, 5]
// Example 2:
// Input: arr = [{"x": 1}, {"x": 0}, {"x": -1}], fn = (d) => d.x
// Output: [{"x": -1}, {"x": 0}, {"x": 1}]
//
// Constraints:
// arr is a valid JSON array
// fn is a function that returns a number
// 1 <= arr.length <= 5 * 10^5

// Solution:

/**
 * @param {Array} inputArray
 * @param {Function} sortKeyFunction
 * @return {Array}
 */
const sortBy = (inputArray, sortKeyFunction) => {
    // Array.sort sorts in place, so we return the result of that
    return inputArray.sort((a, b) => {
        // Compare the values returned by the sortKeyFunction
        // To sort ascending: result(a) - result(b)
        return sortKeyFunction(a) - sortKeyFunction(b);
    });
};

// Notes:
// - JavaScript's built-in `sort` function allows us to define how to compare two items (`a` and `b`).
// - The problem asks us to sort based on the value returned by `sortKeyFunction`.
// - So, I calculate the values `fn(a)` and `fn(b)` and subtract them.
// - If the result is negative, `a` comes first. If positive, `b` comes first.
// - Time Complexity: O(n log n), which is standard for efficient sorting.
