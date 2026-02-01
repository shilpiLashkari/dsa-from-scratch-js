// Problem: Join Two Arrays by ID
// Given two arrays arr1 and arr2, return a new array joinedArray. All the objects in each of the two inputs arrays will contain an id field that has an integer value.
// joinedArray is an array formed by merging arr1 and arr2 based on their id key. The length of joinedArray should be the length of unique values of id. The returned array should be sorted in ascending order based on the id key.
// If a given id exists in one array but not the other, the single object with that id should be included in the result array without modification.
// If two objects share an id, their properties should be merged as follows:
// - If a key only exists in one object, that single key-value pair should be included in the object.
// - If a key is included in both objects, the value in the object from arr2 should override the value from arr1.
//
// Example 1:
// Input: 
// arr1 = [{"id": 1, "x": 1}, {"id": 2, "x": 9}]
// arr2 = [{"id": 3, "x": 5}]
// Output: 
// [{"id": 1, "x": 1}, {"id": 2, "x": 9}, {"id": 3, "x": 5}]
// 
// Example 2:
// Input: 
// arr1 = [{"id": 1, "x": 2, "y": 3}, {"id": 2, "x": 3, "y": 6}]
// arr2 = [{"id": 2, "x": 10, "y": 20}, {"id": 3, "x": 0, "y": 0}]
// Output: 
// [{"id": 1, "x": 2, "y": 3}, {"id": 2, "x": 10, "y": 20}, {"id": 3, "x": 0, "y": 0}]

// Solution:

/**
 * @param {Array} array1
 * @param {Array} array2
 * @return {Array}
 */
const join = (array1, array2) => {
    // We'll use an object to quickly look up items by their ID
    const combinedData = {};

    // Helper function to add items to our combinedData object
    const processArray = (arr) => {
        for (const item of arr) {
            // If ID exists, merge it. If not, just add it.
            if (combinedData[item.id]) {
                // array2 items come later, so they will override array1 (standard spread behavior)
                combinedData[item.id] = { ...combinedData[item.id], ...item };
            } else {
                combinedData[item.id] = item;
            }
        }
    };

    // First process the first array
    processArray(array1);

    // Then process the second array (which handles overrides)
    processArray(array2);

    // Convert our object back to an array and sort by ID
    const sortedResult = Object.values(combinedData).sort((a, b) => a.id - b.id);

    return sortedResult;
};

// Notes:
// - I use an Object as a simple Map (`combinedData`) to group items by their ID.
// - I assume `arr2` should override `arr1` when IDs match, so I process `arr1` first, then `arr2`.
// - Using spread syntax `{...old, ...new}` makes merging extremely clean and easy.
// - Finally, I pull all the values out and sort them by ID to meet the requirement.
// - Time Complexity: O(n log n) because of the sorting step at the end.
