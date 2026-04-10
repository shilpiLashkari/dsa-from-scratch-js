// Problem: Regular Expression Matching (LeetCode #10)
// Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*'.
// '.' Matches any single character.
// '*' Matches zero or more of the preceding element.
// The matching should cover the entire input string (not partial).
//
// Example 1:
// Input: s = "aa", p = "a*" -> Output: true
// Explanation: '*' matches zero or more of the preceding element, 'a'. 
// Therefore, by repeating 'a' once, it becomes "aa".
//
// Constraints:
// - 1 <= s.length <= 20
// - 1 <= p.length <= 20
// - s consists of only lowercase English letters.
// - p consists of lowercase English letters, '.', and '*'.
// - It is guaranteed for each appearance of the character '*', there will be a previous valid character to match.

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    const m = s.length;
    const n = p.length;
    const memo = new Map();

    const solve = (i, j) => {
        const key = `${i},${j}`;
        if (memo.has(key)) return memo.get(key);

        if (j === n) return i === m;

        const firstMatch = i < m && (s[i] === p[j] || p[j] === '.');

        let result;
        if (j + 1 < n && p[j + 1] === '*') {
            // Case 1: Match 0 occurrence of '*'
            // Case 2: Match 1+ occurrence of '*' if there's a first match
            result = solve(i, j + 2) || (firstMatch && solve(i + 1, j));
        } else {
            result = firstMatch && solve(i + 1, j + 1);
        }

        memo.set(key, result);
        return result;
    };

    return solve(0, 0);
};

// Notes:
// - This is a classic 2D Dynamic Programming problem.
// - We use recursion with memoization to avoid redundant computations.
// - The '*' character is the trickiest part as it can match 0 to many occurrences.
// - If we see a '*', we have two choices: skip it (j+2) or consume one matching character (i+1) and stay at the same pattern index.
// - Time Complexity: O(M * N) where M and N are lengths of s and p.
// - Space Complexity: O(M * N) for the memoization table.
