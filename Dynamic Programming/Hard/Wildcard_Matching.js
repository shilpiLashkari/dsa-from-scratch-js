// Problem: Wildcard Matching (LeetCode #44)
// Given an input string s and a pattern p, implement wildcard pattern matching with support for '?' and '*'.
// '?' Matches any single character.
// '*' Matches any sequence of characters (including the empty sequence).
// The matching should cover the entire input string (not partial).
//
// Example 1:
// Input: s = "aa", p = "*" -> Output: true
// Example 2:
// Input: s = "cb", p = "?a" -> Output: false
//
// Constraints:
// - 0 <= s.length, p.length <= 2000
// - s consists of lowercase English letters.
// - p consists of lowercase English letters, '?', or '*'.

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    const m = s.length;
    const n = p.length;

    // dp[i][j] represents if s[0...i-1] matches p[0...j-1]
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));

    // Base case: empty string matches empty pattern
    dp[0][0] = true;

    // Base case: empty string matches stars in pattern
    for (let j = 1; j <= n; j++) {
        if (p[j - 1] === '*') {
            dp[0][j] = dp[0][j - 1];
        }
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (p[j - 1] === '?' || s[i - 1] === p[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else if (p[j - 1] === '*') {
                // '*' matches empty sequence (dp[i][j-1]) or matches 1+ char (dp[i-1][j])
                dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
            }
        }
    }

    return dp[m][n];
};

// Notes:
// - Classic 2D DP problem for pattern matching.
// - The recurrence relation for '*' is the core: `dp[i][j] = dp[i][j-1] || dp[i-1][j]`.
// - `dp[i][j-1]` represents '*' as an empty string.
// - `dp[i-1][j]` represents '*' as matching at least one character.
// - Time Complexity: O(M * N) where M and N are lengths of string and pattern.
// - Space Complexity: O(M * N) - can be optimized to O(N) using two rows.
