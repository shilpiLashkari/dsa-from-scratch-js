// Problem: Check if Strings Can be Made Equal With Operations I
//
// You are given two strings s1 and s2, both of length 4, consisting of lowercase English letters.
// You can apply the following operation on s1 any number of times:
// 
// Choose any two indices i and j such that j - i = 2, then swap the characters s1[i] and s1[j].
// Return true if you can make the string s1 equal to s2, and false otherwise.
//
// Example 1:
// Input: s1 = "abcd", s2 = "cdab"
// Output: true
// Explanation: We can do the following operations on s1:
// - Choose indices i = 0, j = 2. The resulting string is s1 = "cbad".
// - Choose indices i = 1, j = 3. The resulting string is s1 = "cdab" = s2.
//
// Example 2:
// Input: s1 = "abcd", s2 = "dabc"
// Output: false
// Explanation: It can be demonstrated that it is impossible to make s1 equal to s2.
//
// Constraints:
// s1.length == s2.length == 4
// s1 and s2 consist only of lowercase English letters.

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var canBeEqual = function (s1, s2) {
    // For s1 and s2 to be equal with swaps at distance 2:
    // - Indices (0, 2) of s1 must have the same characters as indices (0, 2) of s2.
    // - Indices (1, 3) of s1 must have the same characters as indices (1, 3) of s2.
    
    // Check even indices (0 and 2)
    const even1 = [s1[0], s1[2]].sort().join('');
    const even2 = [s2[0], s2[2]].sort().join('');
    
    // Check odd indices (1 and 3)
    const odd1 = [s1[1], s1[3]].sort().join('');
    const odd2 = [s2[1], s2[3]].sort().join('');
    
    return even1 === even2 && odd1 === odd2;
};

// Notes:
// - Since the length is fixed at 4, the only possible swaps are (0, 2) and (1, 3).
// - Swap (0, 2) allows us to reorder characters at even positions.
// - Swap (1, 3) allows us to reorder characters at odd positions.
// - We can simply collect characters at even positions and odd positions, sort them, and compare.
// - Time Complexity: O(1) since the string length is constant (4).
// - Space Complexity: O(1) as we only store a few characters.

module.exports = { canBeEqual };
