// Problem: Check if Strings Can be Made Equal With Operations II
//
// You are given two strings s1 and s2, both of length n, consisting of lowercase English letters.
// You can apply the following operation on s1 any number of times:
//
// Choose any two indices i and j such that i < j and (j - i) is even, then swap the characters s1[i] and s1[j].
// Return true if you can make the string s1 equal to s2, and false otherwise.
//
// Example 1:
// Input: s1 = "abcdba", s2 = "cabdab"
// Output: true
// Explanation: We can apply the following operations on s1:
// - Choose indices i = 0, j = 2. s1 becomes "cbadba".
// - Choose indices i = 2, j = 4. s1 becomes "cbdb aa".
// - Choose indices i = 1, j = 5. s1 becomes "cabdab".
// s1 is now equal to s2.
//
// Example 2:
// Input: s1 = "abe", s2 = "bea"
// Output: false
// Explanation: It is impossible to make s1 equal to s2.
//
// Constraints:
// n == s1.length == s2.length
// 1 <= n <= 10^5
// s1 and s2 consist only of lowercase English letters.

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkStrings = function (s1, s2) {
    const n = s1.length;
    
    // characters at even indices can be rearranged among themselves
    // characters at odd indices can be rearranged among themselves
    // so for s1 and s2 to be equal, the frequency of characters 
    // at even positions and odd positions must match between the two strings.
    
    const evenFreq1 = new Array(26).fill(0);
    const oddFreq1 = new Array(26).fill(0);
    const evenFreq2 = new Array(26).fill(0);
    const oddFreq2 = new Array(26).fill(0);
    
    for (let i = 0; i < n; i++) {
        if (i % 2 === 0) {
            evenFreq1[s1.charCodeAt(i) - 97]++;
            evenFreq2[s2.charCodeAt(i) - 97]++;
        } else {
            oddFreq1[s1.charCodeAt(i) - 97]++;
            oddFreq2[s2.charCodeAt(i) - 97]++;
        }
    }
    
    for (let i = 0; i < 26; i++) {
        if (evenFreq1[i] !== evenFreq2[i] || oddFreq1[i] !== oddFreq2[i]) {
            return false;
        }
    }
    
    return true;
};

// Notes:
// - The condition (j - i) is even means i and j must have the same parity.
// - Therefore, all characters at even indices can be swapped and rearranged.
// - Similarly, all characters at odd indices can be rearranged.
// - We use frequency counting (O(n)) to check if the set of characters 
//   at even and odd positions matches between s1 and s2.
// - Time Complexity: O(n) where n is the length of the string.
// - Space Complexity: O(1) as the frequency arrays have a fixed size of 26.

module.exports = { checkStrings };
