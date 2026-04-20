// Problem: https://leetcode.com/problems/two-furthest-houses-with-different-colors/

/**
 * @param {number[]} colors
 * @return {number}
 */
var maxDistance = function (colors) {
  const n = colors.length;
  let maxDist = 0;

  // The furthest house with a different color must involve either the first or the last house.
  // Case 1: Furthest house from the right that is different from colors[0]
  for (let i = n - 1; i >= 0; i--) {
    if (colors[i] !== colors[0]) {
      maxDist = Math.max(maxDist, i);
      break;
    }
  }

  // Case 2: Furthest house from the left that is different from colors[n-1]
  for (let i = 0; i < n; i++) {
    if (colors[i] !== colors[n - 1]) {
      maxDist = Math.max(maxDist, (n - 1) - i);
      break;
    }
  }

  return maxDist;
};

// Example 1:
// Input: colors = [1,1,1,6,1,1,1]
// Output: 3
// Explanation: In colors = [1,1,1,6,1,1,1], the house at index 0 has color 1 and the house at index 3 has color 6. They have different colors, and their distance is |3 - 0| = 3.

// Example 2:
// Input: colors = [1,8,3,8,3]
// Output: 4
// Explanation: In colors = [1,8,3,8,3], the house at index 0 has color 1 and the house at index 4 has color 3. They have different colors, and their distance is |4 - 0| = 4.

// Example 3:
// Input: colors = [0,1]
// Output: 1
// Explanation: The house at index 0 has color 0 and the house at index 1 has color 1. They have different colors, and their distance is |1 - 0| = 1.

// Constraints:
// n == colors.length
// 2 <= n <= 100
// 0 <= colors[i] <= 100
// Test data are generated such that at least two houses have different colors.

// Approach:
// A greedy approach works here because the maximum distance will always involve one of the endpoints.
// If the first and last houses have different colors, the answer is n-1.
// If they have the same color, we need to find the furthest house from the left that is different from the last house,
// OR the furthest house from the right that is different from the first house.

// Algorithm:
// 1. Initialize maxDist to 0.
// 2. Scan from the end of the array (n-1 down to 0).
// 3. The first house we find with a color different from colors[0] gives a potential max distance (i - 0).
// 4. Scan from the beginning of the array (0 up to n-1).
// 5. The first house we find with a color different from colors[n-1] gives another potential max distance (n-1 - i).
// 6. Return the maximum of these distances.

// Time Complexity: O(n), since we traverse the array at most twice.
// Space Complexity: O(1).

// Test Cases:
// console.log(maxDistance([1,1,1,6,1,1,1])); // Expected: 3
// console.log(maxDistance([1,8,3,8,3]));     // Expected: 4
// console.log(maxDistance([0,1]));           // Expected: 1
