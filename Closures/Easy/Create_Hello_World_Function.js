// Problem: Create Hello World Function
// Write a function createHelloWorld. It should return a new function that always returns "Hello World".
//
// Example 1:
// Input: args = []
// Output: "Hello World"
// Explanation:
// const f = createHelloWorld();
// f(); // "Hello World"
// The function returned by createHelloWorld should always return "Hello World".
//
// Example 2:
// Input: args = [{},null,42]
// Output: "Hello World"
// Explanation:
// const f = createHelloWorld();
// f({}, null, 42); // "Hello World"
// Any arguments could be passed to the function but it should still always return "Hello World".

// Solution:

/**
 * @return {Function}
 */
const createHelloWorld = () => {
    // Return a function that ignores its arguments
    return function (...args) {
        return "Hello World";
    };
};

/**
 * const f = createHelloWorld();
 * f(); // "Hello World"
 */

// Notes:
// - This creates a "Higher-Order Function" (a function that makes another function).
// - The returned function simply ignores any input it gets.
// - It always returns "Hello World" no matter what.
// - Time Complexity: O(1) - it does nothing complex.
