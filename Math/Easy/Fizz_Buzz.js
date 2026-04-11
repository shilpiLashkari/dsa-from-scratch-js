// Problem: Fizz Buzz
// Given an integer n, return a string array answer (1-indexed) where:
// answer[i] == "FizzBuzz" if i is divisible by 3 and 5.
// answer[i] == "Fizz" if i is divisible by 3.
// answer[i] == "Buzz" if i is divisible by 5.
// answer[i] == i (as a string) if none of the above conditions are true.

// Example 1:
// Input: n = 3
// Output: ["1","2","Fizz"]

// Example 2:
// Input: n = 5
// Output: ["1","2","Fizz","4","Buzz"]

// Example 3:
// Input: n = 15
// Output: ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]

// Constraints:
// 1 <= n <= 10^4

/**
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function (n) {
    let result = [];

    for (let i = 1; i <= n; i++) {
        let current = "";
        if (i % 3 === 0) current += "Fizz";
        if (i % 5 === 0) current += "Buzz";
        
        if (current === "") {
            result.push(i.toString());
        } else {
            result.push(current);
        }
    }

    return result;
};

// Notes:
// - We iterate from 1 to n and check for divisibility by 3 and 5.
// - If divisible by both, we get "FizzBuzz".
// - Concatenating strings ("Fizz" and "Buzz") is a cleaner way to handle the "FizzBuzz" case.
// - Time Complexity: O(N)
// - Space Complexity: O(1) (excluding space for result array)

module.exports = { fizzBuzz };
