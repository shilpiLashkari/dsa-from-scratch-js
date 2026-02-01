// Problem: Compact Object
// Given an object or array obj, return a compact object.
// A compact object is the same as the original object, except with keys containing falsy values removed. This operation applies to the object and any nested objects. Arrays are considered objects where the indices are keys. A value is considered falsy when Boolean(value) returns false.
// You may assume the obj is the output of JSON.parse. In other words, it is valid JSON.
//
// Example 1:
// Input: obj = [null, 0, false, 1]
// Output: [1]
// Explanation: All falsy values have been removed from the array.
//
// Example 2:
// Input: obj = {"a": null, "b": [false, 1]}
// Output: {"b": [1]}
// Explanation: obj["a"] and obj["b"][0] had falsy values and were removed.

// Solution:

/**
 * @param {Object|Array} inputObject
 * @return {Object|Array}
 */
const compactObject = (inputObject) => {
    // Base Case: If it's just a value (number, string, null), return it directly
    if (inputObject === null || typeof inputObject !== 'object') {
        return inputObject;
    }

    // Identify if we are working with an Array or an Object
    if (Array.isArray(inputObject)) {
        // For arrays, we clean each item recursively, then remove the bad ones (Boolean(false) ones)
        return inputObject
            .map(compactObject) // Recursively compact children
            .filter(Boolean);   // Keep only truthy values
    }

    // For objects, we build a new object
    const compactedResult = {};
    for (const key in inputObject) {
        // Clean the value
        const cleanedValue = compactObject(inputObject[key]);

        // If the cleaned value is valid (truthy), add it to our result
        if (Boolean(cleanedValue)) {
            compactedResult[key] = cleanedValue;
        }
    }

    return compactedResult;
};

// Notes:
// - Since the structure is nested, I used recursion to handle deep levels.
// - First, I check if the input is an object or array (and not null).
// - If it's an array, I filter out the "falsy" values and recursively clean the rest.
// - If it's an object, I create a new empty object and only copy over keys with "truthy" values.
// - Time Complexity: O(n) because we visit every element once.
