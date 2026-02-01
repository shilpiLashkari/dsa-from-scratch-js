// Problem: Memoize
// Given a function fn, return a memoized version of that function.
// A memoized function is a function that will never be called twice with the same inputs. Instead it will return a cached value.
// You can assume there are 3 possible input functions: sum, fib, and factorial.
//
// Example 1:
// Input: 
// fnName = "sum"
// actions = ["call","call","getCallCount","call","getCallCount"]
// values = [[2,2],[2,2],[],[1,2],[]]
// Output: [4,4,1,3,2]
// Explanation:
// const sum = (a, b) => a + b;
// const memoizedSum = memoize(sum);
// memoizedSum(2, 2); // Returns 4. sum() was called as (2, 2). Returns 4.
// memoizedSum(2, 2); // Returns 4. sum() was not called.
// // Total call count: 1
// memoizedSum(1, 2); // Returns 3. sum() was called as (1, 2). Returns 3.
// // Total call count: 2

// Solution:

/**
 * @param {Function} functionToMemoize
 * @return {Function}
 */
const memoize = (functionToMemoize) => {
    const memoryCache = new Map();

    return function (...args) {
        // Create a unique key for the inputs (e.g., "[2,2]")
        const key = JSON.stringify(args);

        // If we've seen this key before, return the saved answer directly
        if (memoryCache.has(key)) {
            return memoryCache.get(key);
        }

        // If not, calculate the result by running the function
        const result = functionToMemoize.apply(this, args);

        // Save the result for next time
        memoryCache.set(key, result);

        return result;
    }
}

// Notes:
// - I store the function results in a `Map` where the key is the arguments.
// - Before running the function, I check if I've already saved the answer for these specific arguments.
// - If yes, I return the saved answer instantly (caching).
// - If no, I run the function, save the result in the map, and then return it.
// - `JSON.stringify` helps turn the arguments list into a unique string key.
// - Time Complexity: O(1) for the lookup.
