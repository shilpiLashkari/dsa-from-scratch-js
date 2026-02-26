// Problem: Allow One Function Call
// Given a function fn, return a new function that is identical to the original function except that it ensures fn is called at most once.
// The first time the returned function is called, it should return the same result as fn.
// Every subsequent time it is called, it should return undefined.
//
// Example 1:
// Input: fn = (a,b,c) => (a + b + c), calls = [[1,2,3],[2,3,6]]
// Output: [{"calls":1,"value":6}]
// Explanation:
// const onceFn = once(fn);
// onceFn(1, 2, 3); // 6
// onceFn(2, 3, 6); // undefined, fn was not called

// Solution:

/**
 * @param {Function} functionToLimit
 * @return {Function}
 */
const once = (functionToLimit) => {
    let hasBeenCalled = false;

    return function (...args) {
        if (!hasBeenCalled) {
            hasBeenCalled = true;

            return functionToLimit.apply(this, args);
        }

        return undefined;
    }
};

// Notes:
// - I use a simple boolean flag `hasBeenCalled` to track if the function ran.
// - Since the returned function forms a closure, it persists this flag between calls.
// - If the flag is false, I run the logic and flip it to true.
// - If the flag is already true, I just return `undefined`.
// - Time Complexity: O(1)
