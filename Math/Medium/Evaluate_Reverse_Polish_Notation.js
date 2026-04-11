// Problem: Evaluate Reverse Polish Notation
// Evaluate the value of an arithmetic expression in Reverse Polish Notation.
// Valid operators are +, -, *, and /. Each operand may be an integer or another expression.
// Note that division between two integers should truncate toward zero.
// It is guaranteed that the given RPN expression is always valid. That means the expression would always evaluate to a result, and there will not be any division by zero operation.

// Example 1:
// Input: tokens = ["2","1","+","3","*"]
// Output: 9
// Explanation: ((2 + 1) * 3) = 9

// Example 2:
// Input: tokens = ["4","13","5","/","+"]
// Output: 6
// Explanation: (4 + (13 / 5)) = 6

// Constraints:
// 1 <= tokens.length <= 10^4
// tokens[i] is either an operator: "+", "-", "*", or "/", or an integer in the range [-200, 200].

/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function(tokens) {
    let stack = [];
    
    for (let token of tokens) {
        if (token === '+' || token === '-' || token === '*' || token === '/') {
            let b = stack.pop();
            let a = stack.pop();
            let result;
            
            if (token === '+') result = a + b;
            else if (token === '-') result = a - b;
            else if (token === '*') result = a * b;
            else if (token === '/') {
                // Truncate towards zero in JavaScript
                result = Math.trunc(a / b);
            }
            
            stack.push(result);
        } else {
            stack.push(parseInt(token));
        }
    }
    
    return stack.pop();
};

// Notes:
// - Reverse Polish Notation (Postfix notation) is best evaluated using a Stack.
// - Push numbers onto the stack. When an operator is encountered, pop the last two elements, evaluate, and push the result back.
// - Javascript's Math.trunc() is perfect for truncating a division toward zero (unlike Math.floor which goes towards -Infinity for negative numbers).
// - Time Complexity: O(N) where N is the number of tokens.
// - Space Complexity: O(N) for the stack.

module.exports = { evalRPN };
