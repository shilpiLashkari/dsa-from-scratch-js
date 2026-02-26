// Problem: Array Wrapper
// Create a class ArrayWrapper that accepts an array of integers in its constructor. This class should have two features:
// - When two instances of this class are added together with the + operator, the resulting value is the sum of all the elements in both arrays.
// - When the String() function is called on the instance, it will return a comma separated string surrounded by brackets. For example, [1,2,3].
//
// Example 1:
// Input: nums = [[1,2],[3,4]], operation = "Add"
// Output: 10
// Explanation:
// const obj1 = new ArrayWrapper([1,2]);
// const obj2 = new ArrayWrapper([3,4]);
// obj1 + obj2; // 10
//
// Example 2:
// Input: nums = [[23,98,42,70]], operation = "String"
// Output: "[23,98,42,70]"
// Explanation:
// const obj = new ArrayWrapper([23,98,42,70]);
// String(obj); // "[23,98,42,70]"

// Solution:

/**
 * @param {number[]} nums
 * @return {void}
 */
var ArrayWrapper = function (nums) {
    this.nums = nums;
};

/**
 * @return {number}
 */
ArrayWrapper.prototype.valueOf = function () {
    return this.nums.reduce((sum, num) => sum + num, 0);
}

/**
 * @return {string}
 */
ArrayWrapper.prototype.toString = function () {
    return `[${this.nums.join(',')}]`;
}

/**
 * const obj1 = new ArrayWrapper([1,2]);
 * const obj2 = new ArrayWrapper([3,4]);
 * obj1 + obj2; 
 * String(obj1); 
 * String(obj2); 
 */

// Notes:
// - Note that I hacked the `+` operator by defining a `valueOf` method.
// - `valueOf` is called implicitly by JavaScript when trying to turn an object into a number.
// - Similarly, `toString` handles the string conversion logic.
// - This makes the class feel like a native primitive type when used in expressions.
// - Time Complexity: O(n) to sum the elements.
