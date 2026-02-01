// Problem: Return Length of Arguments Passed
// Write a function argumentsLength that returns the count of arguments passed to it.
//
// Example 1:
// Input: args = [5]
// Output: 1
// Explanation:
// argumentsLength(5); // 1
//
// Example 2:
// Input: args = [{}, null, "3"]
// Output: 3
// Explanation:
// argumentsLength({}, null, "3"); // 3

// Solution:

/**
 * @param {...(null|boolean|number|string|Array|Object)} args
 * @return {number}
 */
const argumentsLength = (...args) => {
    // The rest operator (...args) puts all arguments into an array
    return args.length;
};

/**
 * argumentsLength(1, 2, 3); // 3
 */

// Notes:
// - The `...args` syntax (Rest Parameters) is perfect here.
// - It takes whatever inputs are given and bundles them into a standard Array.
// - Then I simply assume the length of that array to know the count.
// - Time Complexity: O(1) to access the length property.
