// Problem: To Be Or Not To Be
// Write a function expect that helps developers test their code. It should take in any value val and return an object with the following two functions.
// - toBe(val) accepts another value and returns true if the two values === each other. If they are not equal, it should throw an error "Not Equal".
// - notToBe(val) accepts another value and returns true if the two values !== each other. If they are equal, it should throw an error "Equal".
//
// Example 1:
// Input: func = () => expect(5).toBe(5)
// Output: {"value": true}
// Explanation: 5 === 5 so this expression returns true.
//
// Example 2:
// Input: func = () => expect(5).toBe(null)
// Output: {"error": "Not Equal"}
// Explanation: 5 !== null so this expression throws the error "Not Equal".

// Solution:

/**
 * @param {string} actualValue
 * @return {Object}
 */
const expect = (actualValue) => {
    return {
        toBe: (expectedValue) => {
            if (actualValue === expectedValue) {
                return true;
            } else {
                throw new Error("Not Equal");
            }
        },
        notToBe: (expectedValue) => {
            if (actualValue !== expectedValue) {
                return true;
            } else {
                throw new Error("Equal");
            }
        }
    };
};

// Notes:
// - This is like writing a tiny version of a testing library (like Jest).
// - I return an object containing the two required matcher functions: `toBe` and `notToBe`.
// - `toBe` checks for equality (`===`) and throws an error if it fails.
// - `notToBe` checks for inequality (`!==`) and throws if they match.
// - It's a clean way to encapsulate basic assertions.
// - Time Complexity: O(1)
