// Problem: Longest Valid Parentheses (LeetCode #32)
// Given a string containing just the characters '(' and ')', return the length of the longest valid (well-formed) parentheses substring.
//
// Example 1:
// Input: s = "(()" -> Output: 2
// Explanation: The longest valid parentheses substring is "()".
// Example 2:
// Input: s = ")()())" -> Output: 4
// Explanation: The longest valid parentheses substring is "()()".
//
// Constraints:
// - 0 <= s.length <= 3 * 10^4
// - s[i] is '(' or ')'.

/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
    if (!s || s.length < 2) return 0;

    let maxLen = 0;
    // dp[i] stores the length of the longest valid parentheses substring ending at index i
    const dp = new Array(s.length).fill(0);

    for (let i = 1; i < s.length; i++) {
        if (s[i] === ')') {
            if (s[i - 1] === '(') {
                // Found '()', length is 2 + whatever was valid before it
                dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
            } else if (i - dp[i - 1] > 0 && s[i - dp[i - 1] - 1] === '(') {
                // Found '))' and there is a matching '(' before the current valid sequence
                // Length is current valid sequence (dp[i-1]) + 2 + whatever was before the matching '('
                const prevValid = i - dp[i - 1] >= 2 ? dp[i - dp[i - 1] - 2] : 0;
                dp[i] = dp[i - 1] + 2 + prevValid;
            }
            maxLen = Math.max(maxLen, dp[i]);
        }
    }

    return maxLen;
};

// Notes:
// - We use 1D Dynamic Programming.
// - `dp[i]` represents the length of the longest valid parentheses ending at index `i`.
// - If `s[i]` is '(', it cannot end a valid sequence, so `dp[i] = 0`.
// - If `s[i]` is ')', we check two cases:
//   1. Adjacent matcher '()': just add 2 to the result of `dp[i-2]`.
//   2. Nested matcher '))': check if the character before the current valid sequence `dp[i-1]` is '('.
//      If so, we add 2 to `dp[i-1]` and then add whatever sequence was valid before that matching '('.
// - Time Complexity: O(N) where N is the length of s.
// - Space Complexity: O(N) for the DP array.
