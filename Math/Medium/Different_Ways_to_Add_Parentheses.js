/**
 * Different Ways to Add Parentheses
 * 
 * Strategy: This problem is a classic example of Divide and Conquer. For every 
 * operator in the expression, we split the expression into two parts: left 
 * and right. We recursively find all possible results for the left and right 
 * parts, and then combine them using the current operator. We use memoization 
 * to store the results of sub-expressions to avoid redundant computations.
 * 
 * Time Complexity: Exponential in the worst case (related to Catalan numbers), 
 * but significantly reduced by memoization.
 * Space Complexity: O(N * 2^N) to store memoized results and recursive stack.
 */

/**
 * @param {string} expression
 * @return {number[]}
 */
function diffWaysToCompute(expression) {
    const memo = new Map();

    function compute(input) {
        if (memo.has(input)) return memo.get(input);

        const results = [];
        let hasOperator = false;

        for (let i = 0; i < input.length; i++) {
            const char = input[i];
            if (char === '+' || char === '-' || char === '*') {
                hasOperator = true;
                const left = compute(input.substring(0, i));
                const right = compute(input.substring(i + 1));

                for (const l of left) {
                    for (const r of right) {
                        if (char === '+') results.push(l + r);
                        else if (char === '-') results.push(l - r);
                        else if (char === '*') results.push(l * r);
                    }
                }
            }
        }

        // Base case: if no operator was found, the input is just a number
        if (!hasOperator) {
            results.push(parseInt(input));
        }

        memo.set(input, results);
        return results;
    }

    return compute(expression);
}

// Example Test Cases
console.log("Test 1:", diffWaysToCompute("2-1-1").sort((a, b) => a - b)); 
// Expected: [0, 2] -> (2-1)-1 = 0, 2-(1-1) = 2

console.log("Test 2:", diffWaysToCompute("2*3-4*5").sort((a, b) => a - b)); 
// Expected: [-34, -14, -10, -10, 10]
/*
(2*(3-(4*5))) = -34
((2*3)-(4*5)) = -14
((2*(3-4))*5) = -10
(2*((3-4)*5)) = -10
(((2*3)-4)*5) = 10
*/

module.exports = diffWaysToCompute;
