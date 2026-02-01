// Problem: Counter II
// Write a function createCounter. It should accept an initial integer init. It should return an object with three functions:
// - increment() increases the current value by 1 and returns it.
// - decrement() decreases the current value by 1 and returns it.
// - reset() sets the current value to init and returns it.
//
// Example 1:
// Input: init = 5, calls = ["increment","reset","decrement"]
// Output: [6,5,4]
// Explanation:
// const counter = createCounter(5);
// counter.increment(); // 6
// counter.reset(); // 5
// counter.decrement(); // 4

// Solution:

/**
 * @param {integer} initialValue
 * @return { increment: Function, decrement: Function, reset: Function }
 */
const createCounter = (initialValue) => {
    // Keep track of the current count
    let currentValue = initialValue;

    // Return an object with 3 handy methods
    return {
        increment: () => {
            currentValue += 1;
            return currentValue;
        },
        decrement: () => {
            currentValue -= 1;
            return currentValue;
        },
        reset: () => {
            currentValue = initialValue;
            return currentValue;
        }
    };
};

// Notes:
// - I return an object containing three functions: `increment`, `decrement`, and `reset`.
// - All three functions share access to the same private variable `currentValue`.
// - This is a classic example of encapsulation using closures.
// - Time Complexity: O(1) for all operations.
