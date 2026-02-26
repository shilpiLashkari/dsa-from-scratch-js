// Problem: Debounce
// Given a function fn and a time in milliseconds t, return a debounced version of that function.
// A debounced function is a function whose execution is delayed by t milliseconds and whose execution is cancelled if it is called again within that window of time. The debounced function should also receive the passed parameters.
// For example, let's say t = 50ms, and the function was called at 30ms, 60ms, and 100ms.
// The first 2 function calls would be cancelled, and the 3rd function call would be executed at 150ms.
// If instead t = 35ms, The 1st call would be cancelled, the 2nd would be executed at 95ms, and the 3rd would be executed at 135ms.
//
// Example 1:
// Input: 
// t = 50
// calls = [
//   {"t": 30, "inputs": [1]},
//   {"t": 60, "inputs": [2]},
//   {"t": 100, "inputs": [3]}
// ]
// Output: [{"t": 150, "inputs": [3]}]
// Explanation: 
// The 1st call is delayed by 50ms. The 2nd call arrives at 60ms, cancelling the 1st.
// The 2nd call is delayed by 50ms. The 3rd call arrives at 100ms, cancelling the 2nd.
// The 3rd call is delayed by 50ms. It executes at 150ms.

// Solution:

/**
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */
const debounce = (functionToDebounce, delay) => {
    let timerId;

    return function (...args) {
        clearTimeout(timerId);

        timerId = setTimeout(() => {
            functionToDebounce.apply(this, args);
        }, delay);
    }
};

/**
 * const log = debounce(console.log, 100);
 * log('Hello'); 
 * log('Hello'); 
 * log('Hello'); 
 */

// Notes:
// - Debouncing is useful for things like search bars (waiting for the user to stop typing).
// - I use a `timerId` variable to keep track of the active timer.
// - Every time the function is called, I cancel the previous timer using `clearTimeout`.
// - Then I start a brand new timer.
// - This ensures the function only runs once the calls stop coming in for 't' milliseconds.
// - Time Complexity: O(1)
