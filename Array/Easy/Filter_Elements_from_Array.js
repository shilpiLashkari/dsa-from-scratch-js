// Problem: Filter Elements from Array
// Given an integer array arr and a filtering function fn, return a filtered array filteredArr.
// The fn function takes one or two arguments:
// arr[i] - number from the array
// i - index of arr[i]
// filteredArr should only contain the elements from the arr for which the expression fn(arr[i], i) evaluates to a truthy value. A truthy value is a value where Boolean(value) returns true.
// Please solve it without the built-in Array.filter method.
//
// Example 1:
// Input: arr = [0,10,20,30], fn = function greaterThan10(n) { return n > 10; }
// Output: [20,30]
// Explanation:
// const newArray = filter(arr, fn); // [20, 30]
// The function filters out values that are not greater than 10.

// Solution:

/**
 * @param {number[]} inputArray
 * @param {Function} filteringFunction
 * @return {number[]}
 */
const filter = (inputArray, filteringFunction) => {
    const filteredArray = [];

    for (let index = 0; index < inputArray.length; index++) {
        const currentElement = inputArray[index];

        if (filteringFunction(currentElement, index)) {
            filteredArray.push(currentElement);
        }
    }

    return filteredArray;
};

// Notes:
// - I am simulating the behavior of `Array.filter()`.
// - I iterate through every number in the input array.
// - For each number, I pass it to the `filteringFunction`.
// - If the function returns `true` (or a truthy value), I add that number to my results.
// - Time Complexity: O(n) as we scan the entire list.
