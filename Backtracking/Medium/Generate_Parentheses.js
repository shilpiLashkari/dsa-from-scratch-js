/**
 * Generate Parentheses
 * 
 * Strategy: We use backtracking to build valid combinations. 
 * We keep track of the number of 'open' and 'closed' parentheses used.
 * 1. If open < n, we can add an open parenthesis.
 * 2. If closed < open, we can add a closed parenthesis.
 * 3. If open == n and closed == n, we've found a valid combination.
 * 
 * Time Complexity: O(4^N / sqrt(N)) (Catalan number).
 * Space Complexity: O(N) for recursion stack.
 */

/**
 * @param {number} n
 * @return {string[]}
 */
function generateParenthesis(n) {
    const res = [];

    function backtrack(open, close, current) {
        if (current.length === n * 2) {
            res.push(current);
            return;
        }

        if (open < n) {
            backtrack(open + 1, close, current + "(");
        }
        if (close < open) {
            backtrack(open, close + 1, current + ")");
        }
    }

    backtrack(0, 0, "");
    return res;
}

// Example Test Case
console.log("Test 1 (n=3):", generateParenthesis(3)); 
// Expected: ["((()))","(()())","(())()","()(())","()()()"]

module.exports = generateParenthesis;
