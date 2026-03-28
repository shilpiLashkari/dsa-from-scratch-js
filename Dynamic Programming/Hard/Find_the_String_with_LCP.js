// Problem: Find the String with LCP
//
// We are given an n x n matrix lcp where lcp[i][j] is the length of the longest common prefix between s[i..n-1] and s[j..n-1].
// Return the lexicographically smallest string s that matches the matrix lcp. 
// If no such string exists, return an empty string. 
// A string s is lexicographically smaller than a string t if at the first position where they differ, 
// the string s has a letter that appears earlier in the alphabet than the corresponding letter in t.
//
// Example 1:
// Input: lcp = [[4,0,2,0],[0,3,0,1],[2,0,2,0],[0,1,0,1]]
// Output: "abac"
// Explanation: lcp corresponds to s = "abac". This is the lexicographically smallest string that matches lcp.
//
// Example 2:
// Input: lcp = [[4,3,2,1],[3,3,2,1],[2,2,2,1],[1,1,1,1]]
// Output: "aaaa"
// Explanation: lcp corresponds to s = "aaaa".
//
// Example 3:
// Input: lcp = [[4,3,2,1],[3,3,2,1],[2,2,2,1],[1,1,1,1]]
// Output: ""
// Explanation: lcp[1][2] = 2 implies s[1..3] == s[2..3]. 
// But s[1..3] = "aaa" and s[2..3] = "aa", their lengths are different, which is a contradiction.
// (Wait, this example explanation from LeetCode is a bit different, but the core idea is validation).
//
// Constraints:
// 1 <= n == lcp.length == lcp[i].length <= 1000
// 0 <= lcp[i][j] <= n

/**
 * @param {number[][]} lcp
 * @return {string}
 */
var findTheString = function (lcp) {
    const n = lcp.length;
    const s = new Array(n).fill("");
    let charCode = 97; // 'a'

    // Greedy assignment
    for (let i = 0; i < n; i++) {
        if (s[i] !== "") continue;
        if (charCode > 122) return ""; // More than 26 characters needed
        
        const char = String.fromCharCode(charCode);
        for (let j = i; j < n; j++) {
            if (lcp[i][j] > 0) {
                s[j] = char;
            }
        }
        charCode++;
    }

    // Validation
    for (let i = 0; i < n; i++) {
        if (s[i] === "") return ""; // Should not happen if logic is correct
    }

    // Check if the constructed string matches the LCP matrix
    // We can use DP to build the actual LCP matrix for our string and compare
    // dp[i][j] = (s[i] === s[j]) ? (1 + (dp[i+1][j+1] || 0)) : 0
    const dp = Array.from({ length: n + 1 }, () => new Int32Array(n + 1));
    for (let i = n - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if (s[i] === s[j]) {
                dp[i][j] = dp[i + 1][j + 1] + 1;
            } else {
                dp[i][j] = 0;
            }
            if (dp[i][j] !== lcp[i][j]) return "";
        }
    }

    return s.join("");
};

// Notes:
// - We use a greedy approach to build the lexicographically smallest string.
// - We iterate through the matrix, and for each unassigned index `i`, we assign the next available character ('a'-'z').
// - Every index `j` that has `lcp[i][j] > 0` must have the same character as index `i`.
// - After construction, we must validate the string against the input `lcp` matrix.
// - Validation is done using DP: `dp[i][j]` is the LCP of `s[i:]` and `s[j:]`.
// - Time Complexity: O(n^2) for both construction and validation.
// - Space Complexity: O(n^2) to store the DP table (can be optimized to O(n), but n=1000 is fine for O(n^2)).

module.exports = findTheString;
