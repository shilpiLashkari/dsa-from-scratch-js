// Problem: Timeout Cancellation
// Given a function fn, an array of arguments args, and a timeout t in milliseconds, return a cancel function cancelFn.
// After a delay of t, fn should be called with args passed as parameters unless cancelFn was invoked before the delay of t milliseconds elapses, specifically at cancelT ms.
// In that case, fn should never be called.
//
// Example 1:
// Input: fn = (x) => x * 5, args = [2], t = 20
// Output: [{"time": 20, "returned": 10}]
// Explanation: 
// const cancelTime = 50;
// const cancel = cancellable(fn, args, t);
// setTimeout(cancel, cancelTime);
// The cancellation was scheduled to occur after a delay of cancelTime (50ms), which is after the execution of fn (20ms).
// Thus, fn is invoked at t=20ms.

// Solution:

/**
 * @param {Function} callback
 * @param {Array} argumentsList
 * @param {number} delay
 * @return {Function}
 */
const cancellable = (callback, argumentsList, delay) => {
    // Schedule the function to run after 'delay' ms
    const timerId = setTimeout(() => {
        callback(...argumentsList);
    }, delay);

    // Return a function that cancels that scheduled task
    return function () {
        clearTimeout(timerId);
    };
};

/**
 *  const cancel = cancellable(console.log, ["Hello"], 100);
 *  cancel(); // "Hello" will NEVER be logged because we cancelled it immediately.
 */

// Notes:
// - `setTimeout` gives us a "ticket ID" (timerId).
// - We can use this ID to cancel the timer using `clearTimeout`.
// - I return a function that simply calls `clearTimeout` with that ID.
// - If the user calls this cancellation function, the scheduled task is removed from the queue.
// - Time Complexity: O(1)
