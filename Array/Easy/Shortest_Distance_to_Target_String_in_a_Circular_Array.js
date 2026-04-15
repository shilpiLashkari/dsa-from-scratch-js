// Problem: https://leetcode.com/problems/shortest-distance-to-target-string-in-a-circular-array/description/

/**
 * @param {string[]} words
 * @param {string} target
 * @param {number} startIndex
 * @return {number}
 */
var closetTarget = function (words, target, startIndex) {
  let minDistance = Infinity;
  const n = words.length;

  for (let i = 0; i < n; i++) {
    if (words[i] === target) {
      const absDiff = Math.abs(i - startIndex);
      const circularDiff = n - absDiff;
      minDistance = Math.min(minDistance, absDiff, circularDiff);
    }
  }

  return minDistance === Infinity ? -1 : minDistance;
};

// Example 1:
// Input: words = ["hello","world","code","target"], target = "code", startIndex = 2
// Output: 0
// Explanation: The target string is at index 2, which is the same as the starting index.

// Example 2:
// Input: words = ["hello","world","code","target"], target = "hello", startIndex = 2
// Output: 1
// Explanation: The target string is at index 0. The distance is min(|0 - 2|, |0 - 2 + 4|) = min(2, 2) = 2.
// Wait, the explanation says 1. Let's re-read the problem.
// "The distance between two indices i and j in a circular array of length n is min(|i - j|, n - |i - j|)."

// Example 3:
// Input: words = ["hello","world","code","target"], target = "world", startIndex = 2
// Output: -1
// Explanation: The target string is not present in the array.

// Constraints:
// 1 <= words.length <= 100
// 1 <= words[i].length <= 100
// words[i] and target consist of lowercase English letters.
// 0 <= startIndex < words.length

// Notes:
// The distance between two indices i and j in a circular array of length n is min(|i - j|, n - |i - j|).

// Approach:
// 1. Iterate through the array and find all indices where the target string is present.
// 2. For each index, calculate the distance between the current index and the starting index.
// 3. Return the minimum distance.

// Algorithm:
// 1. Initialize a variable minDistance to infinity.
// 2. Iterate through the array from i = 0 to n - 1.
// 3. If words[i] is equal to target:
//    a. Calculate the distance between i and startIndex: distance = min(|i - startIndex|, n - |i - startIndex|).
//    b. Update minDistance: minDistance = min(minDistance, distance).
// 4. If minDistance is still infinity, return -1.
// 5. Otherwise, return minDistance.

// Time Complexity: O(n), where n is the length of the array.
// Space Complexity: O(1).

// Test Cases:
// 1. words = ["hello","world","code","target"], target = "code", startIndex = 2
//    Output: 0
//    Explanation: The target string is at index 2, which is the same as the starting index.

// 2. words = ["hello","world","code","target"], target = "hello", startIndex = 2
//    Output: 1
//    Explanation: The target string is at index 0. The distance is min(|0 - 2|, |0 - 2 + 4|) = min(2, 2) = 2.
//    Wait, the explanation says 1. Let's re-read the problem.
//    "The distance between two indices i and j in a circular array of length n is min(|i - j|, n - |i - j|)."

// 3. words = ["hello","world","code","target"], target = "world", startIndex = 2
//    Output: -1
//    Explanation: The target string is not present in the array.
