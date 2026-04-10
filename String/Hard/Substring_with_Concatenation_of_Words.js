// Problem: Substring with Concatenation of Words (LeetCode #30)
// You are given a string s and an array of strings words. All the strings of words are of the same length.
// A concatenated string is a string that exactly contains all the strings of any permutation of words concatenated.
// Return the starting indices of all the concatenated substrings in s.
//
// Example 1:
// Input: s = "barfoothefoobarman", words = ["foo","bar"]
// Output: [0,9]
// Explanation:
// Substrings starting at index 0 and 9 are "barfoo" and "foobar" respectively.
//
// Constraints:
// - 1 <= s.length <= 10^4
// - 1 <= words.length <= 5000
// - 1 <= words[i].length <= 30
// - s and words[i] consist of lowercase English letters.
// - All strings in words are of the same length.

/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function(s, words) {
    if (!s || !words || words.length === 0) return [];

    const wordLen = words[0].length;
    const wordCount = words.length;
    const totalLen = wordLen * wordCount;
    const result = [];
    const wordMap = new Map();

    for (const word of words) {
        wordMap.set(word, (wordMap.get(word) || 0) + 1);
    }

    // Try all possible starting positions within the first wordLen
    for (let i = 0; i < wordLen; i++) {
        let left = i;
        let right = i;
        const currentMap = new Map();
        let count = 0;

        while (right + wordLen <= s.length) {
            const word = s.substring(right, right + wordLen);
            right += wordLen;

            if (wordMap.has(word)) {
                currentMap.set(word, (currentMap.get(word) || 0) + 1);
                count++;

                // If word count exceeds target, shrink from left
                while (currentMap.get(word) > wordMap.get(word)) {
                    const leftWord = s.substring(left, left + wordLen);
                    currentMap.set(leftWord, currentMap.get(leftWord) - 1);
                    count--;
                    left += wordLen;
                }

                if (count === wordCount) {
                    result.push(left);
                }
            } else {
                // Not a valid word, reset window
                currentMap.clear();
                count = 0;
                left = right;
            }
        }
    }

    return result;
};

// Notes:
// - We use a sliding window approach with a frequency map.
// - Since all words have the same length, we can iterate through the string in steps of `wordLen`.
// - We run the sliding window `wordLen` times, each starting at a different offset (0 to wordLen-1) to ensure we cover all alignments.
// - Time Complexity: O(N * L), where N is s.length and L is wordLen. Each character is visited effectively twice.
// - Space Complexity: O(M), where M is the number of unique words in the input array.
