// Problem: Promise Time Limit
// Given an asynchronous function fn and a time t in milliseconds, return a new time limited version of the input function.
// fn takes arguments provided to the time limited function.
// The time limited function should follow these rules:
// - If the fn completes within the time limit of t milliseconds, the time limited function should resolve with the result.
// - If the execution of the fn exceeds the time limit, the time limited function should reject with the string "Time Limit Exceeded".
//
// Example 1:
// Input: 
// fn = async (n) => { await sleep(100); return n * n; }, 
// inputs = [5], t = 50
// Output: {"rejected":"Time Limit Exceeded","time":50}

// Solution:

/**
 * @param {Function} asyncFunction
 * @param {number} timeLimit
 * @return {Function}
 */
const timeLimit = (asyncFunction, timeLimit) => {
    return async function (...args) {
        return new Promise((resolve, reject) => {

            const timeoutId = setTimeout(() => {
                reject("Time Limit Exceeded");
            }, timeLimit);

            asyncFunction(...args)
                .then((result) => {
                    clearTimeout(timeoutId);
                    resolve(result);
                })
                .catch((error) => {
                    clearTimeout(timeoutId);
                    reject(error);
                });
        });
    }
};

// Notes:
// - This problem is a race between the actual function and a timer.
// - I create a `new Promise` that manages this race.
// - I set a `setTimeout` that will reject with "Time Limit Exceeded" if time runs out.
// - At the same time, I run the provided function. If it finishes first, I clear the timeout and return the result.
// - It's important to use `clearTimeout` so the timer doesn't keep running in the background.
// - Time Complexity: O(1) setup time.
