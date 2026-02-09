// Problem: Execute Asynchronous Functions in Parallel
// Given an array of asynchronous functions functions, return a new promise promise. Each function in the array accepts no arguments and returns a promise.
// promise resolves:
// - When all the promises returned from functions were resolved successfully. The resolved value of promise should be an array of all the resolved values of promises in the same order as they were in the functions.
// promise rejects:
// - When any of the promises returned from functions were rejected. promise should also reject with the reason of the first rejection.
// Please solve it without using the built-in Promise.all function.
//
// Example 1:
// Input: functions = [
//  () => new Promise(resolve => setTimeout(() => resolve(5), 200))
// ]
// Output: {"t": 200, "resolved": [5]}
//
// Example 2:
// Input: functions = [
//    () => new Promise(resolve => setTimeout(() => resolve(1), 200)), 
//    () => new Promise((resolve, reject) => setTimeout(() => reject("Error"), 100))
// ]
// Output: {"t": 100, "rejected": "Error"}

// Solution:

/**
 * @param {Array<Function>} functionsArray
 * @return {Promise<any>}
 */
const promiseAll = async (functionsArray) => {
    return new Promise((resolve, reject) => {
        // Edge case: Empty array should resolve immediately
        if (functionsArray.length === 0) {
            resolve([]);
            return;
        }

        // Array to store our results in the correct order
        const results = new Array(functionsArray.length);

        let completedCount = 0;
        let hasRejected = false;

        // Loop through each function...
        functionsArray.forEach((fn, index) => {
            // ...and execute it!
            fn()
                .then(val => {
                    // If something already failed, ignore this success
                    if (hasRejected) return;

                    // Store the result at the SAME index it came from
                    results[index] = val;
                    completedCount++;

                    // If this was the last one, we are done!
                    if (completedCount === functionsArray.length) {
                        resolve(results);
                    }
                })
                .catch(err => {
                    // If any promise fails, we reject the whole thing immediately
                    if (!hasRejected) {
                        hasRejected = true;
                        reject(err);
                    }
                });
        });
    });
};

// Notes:
// - This is like building the `Promise.all()` method from scratch.
// - I create a new Promise and loop through all the provided functions to run them immediately (in parallel).
// - I keep a counter `completedCount` to track how many have finished.
// - As each one finishes, I save its result in the correct index of the `results` array.
// - If any single function fails, I reject the main promise immediately.
// - Time Complexity: O(N) to start all functions.
