// Problem: Array Reduce Transformation
// Given an integer array nums, a reducer function fn, and an initial value init, return a reduced array.
// A reduced array is created by applying the following operation: val = fn(init, nums[0]), val = fn(val, nums[1]), val = fn(val, nums[2]), ... until every element in the array has been processed. The final value of val is returned.
// If the length of the array is 0, it should return the initial value.
// Please solve it without using the built-in Array.reduce method.
//
// Example 1:
// Input: nums = [1,2,3,4], fn = function sum(accum, curr) { return accum + curr; }, init = 0
// Output: 10
// Explanation: initially, the value is init=0.
// (0) + nums[0] = 1
// (1) + nums[1] = 3
// (3) + nums[2] = 6
// (6) + nums[3] = 10
// The final answer is 10.

// Solution:

/**
 * @param {number[]} inputArray
 * @param {Function} reducerFunction
 * @param {number} initialValue
 * @return {number}
 */
const reduce = (inputArray, reducerFunction, initialValue) => {
    let accumulator = initialValue;

    for (let index = 0; index < inputArray.length; index++) {
        accumulator = reducerFunction(accumulator, inputArray[index]);
    }

    return accumulator;
};

// Notes:
// - I'm basically rebuilding the standard `.reduce()` method from scratch.
// - I start with an `accumulator` variable set to the `initialValue`.
// - Then, I loop through every item in the array.
// - At each step, I update the accumulator by passing the current result and the new item into the reducer function.
// - Time Complexity: O(n) because I have to look at each element once.
