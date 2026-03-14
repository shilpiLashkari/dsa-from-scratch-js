// Problem: The k-th Lexicographical String of All Happy Strings of Length n (LeetCode 1415)

// A happy string is a string that:
// - consists only of letters of the set ['a', 'b', 'c'].
// - s[i] != s[i + 1] for all values of i from 1 to s.length - 1 (string is 1-indexed).
// For example, strings "abc", "ac", "b" and "cabc" are all happy strings.
// Given two integers n and k, consider a list of all happy strings of length n sorted in lexicographical order.
// Return the kth string of this list or return an empty string if there are less than k happy strings of length n.

/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getHappyString = function (n, k) {
    // Total happy strings of length n is 3 * 2^(n-1)
    const totalHappyStrings = 3 * Math.pow(2, n - 1);
    
    // If k is greater than total possible happy strings, return empty string
    if (k > totalHappyStrings) {
        return "";
    }

    let result = "";
    const chars = ['a', 'b', 'c'];
    
    // Convert k to 0-indexed for easier math
    k -= 1; 

    // Determine the first character
    // There are 3 choices for the first char, each branch has 2^(n-1) strings
    let branchSize = Math.pow(2, n - 1);
    let charIndex = Math.floor(k / branchSize);
    let firstChar = chars[charIndex];
    result += firstChar;

    // Remaining k within this branch
    k %= branchSize;

    // Determine subsequent characters
    for (let i = 1; i < n; i++) {
        // Next branch size is cut in half
        branchSize /= 2;
        
        // Two possible characters for the next position
        // We find them by taking all chars and excluding the last chosen character
        const availableChars = chars.filter(c => c !== result[result.length - 1]);
        
        charIndex = Math.floor(k / branchSize);
        result += availableChars[charIndex];
        
        k %= branchSize;
    }

    return result;
};

// Notes:
// - Since a happy string has no consecutive identical characters, the first character has 3 choices,
//   and every subsequent character has exactly 2 choices.
// - Therefore, the total number of happy strings of length n is 3 * 2^(n-1).
// - By determining the size of the "branch" of strings starting with a specific character,
//   we can build the string iteratively without generating all strings (O(n) time).
// - This mathematical deduction approach is much faster than DFS backtracking.
// - Time Complexity: O(n) - We iteratively determine each of the n characters.
// - Space Complexity: O(1) - Ignorning the output string space; no recursion stack.

module.exports = { getHappyString };
