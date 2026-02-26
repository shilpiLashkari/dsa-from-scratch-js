// Problem: Function Composition
// Given an array of functions [f1, f2, f3, ..., fn], return a new function fn that is the function composition of the array of functions.
// The function composition of [f(x), g(x), h(x)] is fn(x) = f(g(h(x))).
// The function composition of an empty list of functions is the identity function x => x.
// You may assume each function in the array accepts one integer as input and returns one integer as output.
//
// Example 1:
// Input: functions = [x => x + 1, x => x * x, x => 2 * x], x = 4
// Output: 65
// Explanation:
// Evaluating from right to left ...
// Starting with x = 4.
// 2 * (4) = 8
// (8) * (8) = 64
// (64) + 1 = 65

// Solution:

/**
 * @param {Function[]} functionsArray
 * @return {Function}
 */
const compose = (functionsArray) => {
    if (functionsArray.length === 0) {
        return function (x) { return x; };
    }

    return function (x) {
        for (let i = functionsArray.length - 1; i >= 0; i--) {
            x = functionsArray[i](x);
        }
        return x;
    };
};

// Notes:
// - Function Composition leads to reading code from Right to Left.
// - I start with the input `x` and pass it to the last function in the list.
// - Then I take that result and pass it to the second-to-last function, and so on.
// - It's basically a loop that updates `x` at each step.
// - If the list is empty, I just return `x` as is.
// - Time Complexity: O(n) because we run through all functions once.
