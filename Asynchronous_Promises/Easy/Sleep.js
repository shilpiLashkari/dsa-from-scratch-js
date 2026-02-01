// Problem: Sleep
// Given a positive integer millis, write an asynchronous function that sleeps for millis milliseconds.
// It can resolve any value.
//
// Example 1:
// Input: millis = 100
// Output: 100
// Explanation: It should return a promise that resolves after 100ms.
// let t = Date.now();
// sleep(100).then(() => {
//   console.log(Date.now() - t); // 100
// });

// Solution:

/**
 * @param {number} milliseconds
 * @return {Promise}
 */
const sleep = async (milliseconds) => {
    // Return a new Promise that resolves after the given time
    return new Promise((resolve) => {
        // setTimeout does the actual waiting
        setTimeout(resolve, milliseconds);
    });
}

/**
 * let t = Date.now()
 * sleep(100).then(() => console.log(Date.now() - t)) // 100
 */

// Notes:
// - `setTimeout` handles the waiting part natively.
// - I wrap it in a Promise so I can use `await` with it in async functions.
// - I pass the `resolve` function directly to `setTimeout`, so the promise completes exactly when the timer fires.
// - Time Complexity: O(1)
