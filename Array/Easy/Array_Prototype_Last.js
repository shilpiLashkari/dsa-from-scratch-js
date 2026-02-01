// Problem: Array Prototype Last
// Write code that enhances all arrays such that you can call the array.last() method on any array and it will return the last element. If there are no elements in the array, it should return -1.
//
// Example 1:
// Input: nums = [null, {}, 3]
// Output: 3
// Explanation: Calling nums.last() should return the last element: 3.
//
// Example 2:
// Input: nums = []
// Output: -1
// Explanation: Because there are no elements, return -1.
//
// Constraints:
// 0 <= arr.length <= 1000

// Solution:

/**
 * @return {null|boolean|number|string|Array|Object}
 */
Array.prototype.last = function () {
    // Check if the array is empty
    if (this.length === 0) {
        return -1;
    }

    // Return the last element using the length property
    return this[this.length - 1];
};

/**
 * const arr = [1, 2, 3];
 * arr.last(); // 3
 */

// Notes:
// - I attached a new method directly to the `Array.prototype` so all arrays can use it.
// - Inside the function, `this` refers to the specific array we are working with.
// - First, I handle the edge case: if the array is empty, I return -1.
// - If it's not empty, I just grab the element at the last index (`length - 1`).
// - Time Complexity: O(1) (instant access).
