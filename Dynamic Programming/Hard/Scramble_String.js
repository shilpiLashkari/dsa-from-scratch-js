// Problem: Scramble String (LeetCode #87)
// We can scramble a string s to get a string t using the following algorithm:
// 1. If the length of the string is 1, stop.
// 2. If the length of the string is > 1, do the following:
//    - Split the string into two non-empty substrings at a random index.
//    - (Optional) Swap the two substrings.
//    - Recursively apply the algorithm to both substrings.
//
// Given two strings s1 and s2 of the same length, return true if s2 is a scrambled string of s1.
//
// Example 1:
// Input: s1 = "great", s2 = "rgeat" -> Output: true
// Explanation: One possible splitting way is "g" + "reat". "g" is a scrambled string of "g".
// "reat" is scrambled into "rgeat" by splitting into "r" + "eat" and swapping to "eat" + "r", etc.
//
// Constraints:
// - s1.length == s2.length
// - 1 <= s1.length <= 30
// - s1 and s2 consist of lowercase English letters.

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var isScramble = function(s1, s2) {
    const memo = new Map();

    const solve = (str1, str2) => {
        const key = `${str1}-${str2}`;
        if (memo.has(key)) return memo.get(key);

        if (str1 === str2) return true;
        
        // Fast fail: if characters don't match, they can't be scrambled versions
        if (str1.length !== str2.length) return false;
        if (!hasSameFrequency(str1, str2)) {
            memo.set(key, false);
            return false;
        }

        const n = str1.length;
        for (let i = 1; i < n; i++) {
            // Case 1: No swap
            if (solve(str1.substring(0, i), str2.substring(0, i)) && 
                solve(str1.substring(i), str2.substring(i))) {
                memo.set(key, true);
                return true;
            }
            
            // Case 2: Swap the two parts
            if (solve(str1.substring(0, i), str2.substring(n - i)) && 
                solve(str1.substring(i), str2.substring(0, n - i))) {
                memo.set(key, true);
                return true;
            }
        }

        memo.set(key, false);
        return false;
    };

    function hasSameFrequency(str1, str2) {
        const counts = new Array(26).fill(0);
        for (let i = 0; i < str1.length; i++) {
            counts[str1.charCodeAt(i) - 97]++;
            counts[str2.charCodeAt(i) - 97]--;
        }
        return counts.every(c => c === 0);
    }

    return solve(s1, s2);
};

// Notes:
// - This problem is solved using recursion with memoization (Top-down DP).
// - For any split point `i`, we check if the two parts match either directly (no swap) or diagonally (swap).
// - The pruning step (checking character frequencies) is crucial to reduce the search space.
// - Time Complexity: O(5^N) theoretically, but practically much faster due to the frequency check pruning.
// - Space Complexity: O(N^2 * 2^N) for the memoization map.
