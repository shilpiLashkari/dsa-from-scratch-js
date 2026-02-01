// Problem: Apply Transform Over Each Element in Array
// Given an integer array arr and a mapping function fn, return a new array with a transformation applied to each element.
// The returned array should be created such that returnedArray[i] = fn(arr[i], i).
// Please solve it without the built-in Array.map method.
//
// Example 1:
// Input: arr = [1,2,3], fn = function plusone(n) { return n + 1; }
// Output: [2,3,4]
// Explanation:
// const newArray = map(arr, plusone); // [2,3,4]
// The function increases each value in the array by one.

// Solution:

/**
 * @param {number[]} inputArray
 * @param {Function} transformFunction
 * @return {number[]}
 */
const map = (inputArray, transformFunction) => {
    // Create an empty array to hold our results
    const transformedArray = [];

    // Iterate over the input array
    for (let index = 0; index < inputArray.length; index++) {
        // Apply the transformation function to the current element and its index
        const processedValue = transformFunction(inputArray[index], index);

        // Add the processed value to our result array
        transformedArray.push(processedValue);
    }

    return transformedArray;
};

// Notes:
// - This is a manual implementation of `Array.map()`.
// - I create a new empty array so I don't modify the original data (immutability).
// - Then I loop through the input array, run the transformation function on each item, and push the result to my new array.
// - Time Complexity: O(n) since every element is processed once.
