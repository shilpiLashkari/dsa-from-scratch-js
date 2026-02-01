// Problem: Is Object Empty
// Given an object or an array, return if it is empty.
// - An empty object contains no key-value pairs.
// - An empty array contains no elements.
// You may assume the object or array is the output of JSON.parse.
//
// Example 1:
// Input: obj = {"x": 5, "y": 42}
// Output: false
// Explanation: The object has 2 key-value pairs so it is not empty.
//
// Example 2:
// Input: obj = {}
// Output: true
// Explanation: The object doesn't have any key-value pairs so it is empty.
//
// Example 3:
// Input: obj = [null, false, 0]
// Output: false
// Explanation: The array has 3 elements so it is not empty.
//
// Constraints:
// 2 <= JSON.stringify(obj).length <= 10^5
// Can be object or array

// Solution:

/**
 * @param {Object|Array} inputObject
 * @return {boolean}
 */
const isEmpty = (inputObject) => {
    // If it's an array, checking length is enough
    if (Array.isArray(inputObject)) {
        return inputObject.length === 0;
    }

    // If it's an object, we need to check if it has any keys
    return Object.keys(inputObject).length === 0;
};

// Notes:
// - Arrays are easy: I just check if `.length` is zero.
// - Objects are trickier because they don't have a specific length property.
// - I use `Object.keys(inputObject)` to get a list of all keys. If that list is empty, the object is empty.
// - Time Complexity: O(1) for arrays, but O(n) for objects (since we have to count the keys).
