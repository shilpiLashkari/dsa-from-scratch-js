// Problem: Counter
// Given an integer n, return a counter function. This counter function initially returns n and then returns 1 more than the previous value every subsequent time it is called (n, n + 1, n + 2, etc).
//
// Example 1:
// Input: n = 10 
// Output: ["call","call","call"]
// Explanation: 
// const counter = createCounter(10);
// counter(); // 10
// counter(); // 11
// counter(); // 12
//
// Example 2:
// Input: n = -2
// Output: ["call","call","call","call","call"]
// Explanation: counter() initially returns -2. Then increases after each sebsequent call.

// Solution:

/**
 * @param {number} startValue
 * @return {Function} counter
 */
const createCounter = (startValue) => {
    let internalCount = startValue;

    return function () {
        return internalCount++;
    };
};

/**
 * const counter = createCounter(10)
 * counter() 
 * counter() 
 * counter() 
 */

// Notes:
// - I use a Closure here to maintain the state of the counter `internalCount`.
// - Even after `createCounter` finishes, the inner function "remembers" `internalCount`.
// - Each time the inner function is called, it returns the current value and then increases it by 1.
// - Time Complexity: O(1)
