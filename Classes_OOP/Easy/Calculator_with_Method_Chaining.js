// Problem: Calculator with Method Chaining
// Design a Calculator class. The class should provide the mathematical operations of addition, subtraction, multiplication, division, and exponentiation. It should also allow consecutive operations to be performed using method chaining. The Calculator constructor should accept a number which serves as the initial value of result.
// Your Calculator class should have the following methods:
// - add - subtract - multiply - divide - power - getResult
//
// Example 1:
// Input: actions = ["Calculator", "add", "subtract", "getResult"], values = [10, 5, 7]
// Output: 8
// Explanation: 
// new Calculator(10).add(5).subtract(7).getResult() // 10 + 5 - 7 = 8

// Solution:

class Calculator {

    /** 
     * @param {number} value
     */
    constructor(startValue) {
        this.currentValue = startValue;
    }

    /** 
     * @param {number} value
     * @return {Calculator}
     */
    add(value) {
        this.currentValue += value;
        // Returning 'this' allows chaining: cal.add(5).subtract(2)
        return this;
    }

    /** 
     * @param {number} value
     * @return {Calculator}
     */
    subtract(value) {
        this.currentValue -= value;
        return this;
    }

    /** 
     * @param {number} value
     * @return {Calculator}
     */
    multiply(value) {
        this.currentValue *= value;
        return this;
    }

    /** 
     * @param {number} value
     * @return {Calculator}
     */
    divide(value) {
        if (value === 0) {
            throw new Error("Division by zero is not allowed");
        }
        this.currentValue /= value;
        return this;
    }

    /** 
     * @param {number} value
     * @return {Calculator}
     */
    power(value) {
        this.currentValue = Math.pow(this.currentValue, value);
        return this;
    }

    /** 
     * @return {number}
     */
    getResult() {
        return this.currentValue;
    }
}

// Notes:
// - "Method Chaining" is when a method returns the object itself (`this`).
// - This allows us to call the next method immediately on the result of the previous one (e.g., `.add().subtract()`).
// - I maintain the state in `this.currentValue` and modify it with each operation.
// - Time Complexity: O(1) per operation.
