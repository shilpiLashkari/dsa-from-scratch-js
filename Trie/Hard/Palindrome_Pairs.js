// Problem: Palindrome Pairs

// You are given a 0-indexed array of unique strings words.
// A palindrome pair is a pair of integers (i, j) such that:
// 0 <= i, j < words.length,
// i != j, and
// words[i] + words[j] (the concatenation of the two strings) is a palindrome.
// Return an array of all the palindrome pairs of words.
//
// You must write an algorithm with O(sum of words[i].length) runtime complexity.
//
// Example 1:
// Input: words = ["abcd","dcba","lls","s","sssll"]
// Output: [[0,1],[1,0],[3,2],[2,4]]
// Explanation: The palindromes are ["abcddcba","dcbaabcd","slls","llssssll"]
//
// Example 2:
// Input: words = ["bat","tab","cat"]
// Output: [[0,1],[1,0]]
// Explanation: The palindromes are ["battab","tabbat"]
//
// Example 3:
// Input: words = ["a",""]
// Output: [[0,1],[1,0]]
// Explanation: The palindromes are ["a","a"]
//
// Constraints:
// 1 <= words.length <= 5000
// 0 <= words[i].length <= 300
// words[i] consists of lowercase English letters.

// Solution:

/**
 * @param {string[]} words
 * @return {number[][]}
 */
const palindromePairs = (words) => {
    const pairs = [];
    const map = new Map();

    for (let i = 0; i < words.length; i++) {
        map.set(words[i], i);
    }

    const isPalindrome = (str) => {
        let left = 0;
        let right = str.length - 1;
        while (left < right) {
            if (str[left] !== str[right]) return false;
            left++;
            right--;
        }
        return true;
    };

    for (let i = 0; i < words.length; i++) {
        const word = words[i];


        for (let j = 0; j <= word.length; j++) {
            const prefix = word.substring(0, j);
            const suffix = word.substring(j);

            if (isPalindrome(prefix)) {
                const reversedSuffix = suffix.split('').reverse().join('');
                if (map.has(reversedSuffix)) {
                    const targetIndex = map.get(reversedSuffix);
                    if (targetIndex !== i) {
                        if (words[targetIndex].length < words[i].length) {
                            pairs.push([targetIndex, i]);
                        }
                    }
                }
            }

            if (isPalindrome(suffix)) {
                const reversedPrefix = prefix.split('').reverse().join('');
                if (map.has(reversedPrefix)) {
                    const targetIndex = map.get(reversedPrefix);
                    if (targetIndex !== i) {
                        if (words[i].length >= words[targetIndex].length) {
                            pairs.push([i, targetIndex]);
                        }
                    }
                }
            }
        }
    }

    return pairs;
};

// Notes:
// - Complexity: O(n * k^2) where n is number of words and k is max word length.
//   We iterate through each word, and for each split, we do O(k) palindrome check and O(k) reverse/hash operations.
//   Since k <= 300, k^2 is small enough.
// - Duplicates handling:
//   Pairs are formed by joining two words. One is usually shorter or equal to the other.
//   We enforce that Case 1 finds pairs where the 'added' word is SHORTER.
//   We enforce that Case 2 finds pairs where the 'added' word is LONGER OR EQUAL.
//   This strictly partitions the solution space based on length, preventing double counting.
//   Specifically for equal length pairs (like "abcd" and "dcba"), only Case 2 will accept them (len >= len).
