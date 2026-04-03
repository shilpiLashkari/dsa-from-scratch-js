// Problem: Word Break II
//
// Given a string s and a dictionary of strings wordDict, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in any order.
//
// Note that the same word in the dictionary may be reused multiple times in the segmentation.
//
// Example 1:
// Input: s = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]
// Output: ["cats and dog","cat sand dog"]
//
// Example 2:
// Input: s = "pineapplepenapple", wordDict = ["apple","pen","applepen","pine","pineapple"]
// Output: ["pine apple pen apple","pineapple pen apple","pine applepen apple"]
// Explanation: Note that you are allowed to reuse a dictionary word.
//
// Example 3:
// Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
// Output: []
//
// Constraints:
// 1 <= s.length <= 20
// 1 <= wordDict.length <= 1000
// 1 <= wordDict[i].length <= 10
// s and wordDict[i] consist of only lowercase English letters.
// All the strings of wordDict are unique.
// Input is generated in a way that the length of the answer doesn't exceed 105.

// Solution:

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
var wordBreak = function (s, wordDict) {
  const wordSet = new Set(wordDict);
  const memo = new Map();

  const dfs = (startIndex) => {
    if (memo.has(startIndex)) {
      return memo.get(startIndex);
    }

    if (startIndex === s.length) {
      return [""];
    }

    const results = [];

    for (let endIndex = startIndex + 1; endIndex <= s.length; endIndex++) {
      const word = s.substring(startIndex, endIndex);
      if (wordSet.has(word)) {
        const subSentences = dfs(endIndex);
        for (const subSentence of subSentences) {
          results.push(word + (subSentence ? " " + subSentence : ""));
        }
      }
    }

    memo.set(startIndex, results);
    return results;
  };

  return dfs(0);
};

// Notes:
//
// - We need to find *all* possible ways to break the string. This requires exhaustive search (DFS/Backtracking).
// - To optimize, we use Memoization (Top-Down DP) to store results for each starting index.
// - `memo[startIndex]` stores all valid sentences that can be formed from `s.substring(startIndex)`.
// - The base case is when `startIndex` reaches the end of the string, returning `[""]`.
// - We iterate through all possible next words, check if they exist in `wordDict`, and recurse.
// - Time Complexity: O(N^2 + 2^N + W) in the worst case due to the number of combinations.
// - Space Complexity: O(2^N * N) to store the results.
