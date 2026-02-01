// Problem: Add Two Promises
// Given two promises promise1 and promise2, return a new promise. promise1 and promise2 will both resolve with a number. The returned promise should resolve with the sum of the two numbers.
//
// Example 1:
// Input: 
// promise1 = new Promise(resolve => setTimeout(() => resolve(2), 20)), 
// promise2 = new Promise(resolve => setTimeout(() => resolve(5), 60))
// Output: 7
// Explanation: The two input promises resolve with the values of 2 and 5 respectively. The returned promise should resolve with a value of 2 + 5 = 7. The time the returned promise resolves is not judged for this problem.

// Solution:

/**
 * @param {Promise} promise1
 * @param {Promise} promise2
 * @return {Promise}
 */
const addTwoPromises = async (promise1, promise2) => {
    // Wait for both promises to finish using Promise.all
    // It gives us an array of both results: [result1, result2]
    const [result1, result2] = await Promise.all([promise1, promise2]);

    // Return the sum
    return result1 + result2;
};

// Notes:
// - `Promise.all` is the most efficient way to handle this.
// - It runs both promises in parallel (at the same time), rather than waiting for one then the other.
// - Once both are done, I destructure the results into variables and simply add them.
// - Time Complexity: O(1) (logic only).
