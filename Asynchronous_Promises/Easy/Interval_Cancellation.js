// Problem: Interval Cancellation
// Given a function fn, an array of arguments args, and an interval time t, return a cancel function cancelFn.
// The function fn should be called with args immediately and then called again every t milliseconds until cancelFn is called at cancelT ms.
//
// Example 1:
// Input: fn = (x) => x * 2, args = [4], t = 35
// Output: 
// [
//    {"time": 0, "returned": 8},
//    {"time": 35, "returned": 8},
//    {"time": 70, "returned": 8},
//    {"time": 105, "returned": 8},
//    {"time": 140, "returned": 8},
//    {"time": 175, "returned": 8}
// ]
// Explanation: 
// cancelT = 190
// fn is called immediately, and then every 35ms.
// The 6th call happens at 175ms.
// The cancel function is called at 190ms, so the 7th call (scheduled for 210ms) is cancelled.

// Solution:

/**
 * @param {Function} callback
 * @param {Array} argumentsList
 * @param {number} intervalTime
 * @return {Function}
 */
const cancellable = (callback, argumentsList, intervalTime) => {
    // 1. Call the function right away (as per requirement)
    callback(...argumentsList);

    // 2. Set up the repeating interval
    const intervalId = setInterval(() => {
        callback(...argumentsList);
    }, intervalTime);

    // 3. Return the function to stop it
    return function () {
        clearInterval(intervalId);
    };
};

// Notes:
// - `setInterval` is just like `setTimeout`, but it automatically repeats.
// - The problem required the function to run *immediately* first, so I handle that manual call before starting the interval.
// - I return a function that uses `clearInterval` to stop the loop when needed.
// - Time Complexity: O(1)
