// Problem: Group By
// Write code that enhances all arrays such that you can call the array.groupBy(fn) method on any array and it will return a grouped version of the array.
// A grouped array is an object where each key is the output of fn(arr[i]) and each value is an array containing all items in the original array with that key.
// The provided callback fn will accept an item in the array and return a string key.
// The order of each value list should be the order the items appear in the array. Any order of keys is acceptable.
// Please solve it without using the built-in Array.groupBy method.
//
// Example 1:
// Input: 
// array = [
//   {"id":"1"},
//   {"id":"1"},
//   {"id":"2"}
// ], 
// fn = function (item) { 
//   return item.id; 
// }
// Output: 
// { 
//   "1": [{"id": "1"}, {"id": "1"}],   
//   "2": [{"id": "2"}] 
// }
// Explanation:
// Output is from array.groupBy(fn).
// The selector function gets the "id" for each item.

// Solution:

/**
 * @param {Function} callbackFunction
 * @return {Object}
 */
Array.prototype.groupBy = function (callbackFunction) {
    const groupedResult = {};

    // 'this' refers to the array we are calling .groupBy() on
    for (const item of this) {
        // Calculate the key using the callback
        const key = callbackFunction(item);

        // If this key doesn't exist yet, initialize it with an empty array
        if (!groupedResult[key]) {
            groupedResult[key] = [];
        }

        // Push the item into the correct group
        groupedResult[key].push(item);
    }

    return groupedResult;
};

/**
 * [1,2,3].groupBy(String) // {"1":[1],"2":[2],"3":[3]}
 */

// Notes:
// - I attached this method to `Array.prototype` so it works on any array.
// - I use a helper object `groupedResult` to organize items.
// - I loop through the array, calculate the correct group key for each item, and add it to the corresponding list.
// - Code is cleaner because we don't need to manually check indices, just keys.
// - Time Complexity: O(n) as we pass through the array once.
