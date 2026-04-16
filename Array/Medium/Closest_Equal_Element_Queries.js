// Problem: Closest Equal Element Queries
/*
    You are given a 0-indexed integer array nums and a 2D integer array queries, where queries[i] = [li, ri].
    For each query, you need to find the index of the closest element to the left of ri (including ri) that has the same value as nums[ri].
    Formally, for each query, you need to find an index j such that:
        0 <= j <= ri
        nums[j] == nums[ri]
        abs(ri - j) is minimized.
    If there are multiple such indices, return the smallest one.
    If no such index exists, return -1.
    Return an array answer where answer[i] is the result for the ith query.

    Example 1:
    Input: nums = [1,2,1,2,3], queries = [[0,3],[1,2],[1,1],[2,3],[0,0]]
    Output: [2,0,1,2,0]
    Explanation:
    - For the first query [0,3], nums[3] is 2. The closest element to the left of index 3 with value 2 is at index 1. So the answer is 1.
    - For the second query [1,2], nums[2] is 1. The closest element to the left of index 2 with value 1 is at index 0. So the answer is 0.
    - For the third query [1,1], nums[1] is 2. The closest element to the left of index 1 with value 2 is at index 1. So the answer is 1.
    - For the fourth query [2,3], nums[3] is 2. The closest element to the left of index 3 with value 2 is at index 1. So the answer is 1.
    - For the fifth query [0,0], nums[0] is 1. The closest element to the left of index 0 with value 1 is at index 0. So the answer is 0.

    Constraints:
    1 <= nums.length <= 105
    1 <= nums[i] <= 109
    1 <= queries.length <= 105
    0 <= li <= ri < nums.length
    The input is generated such that queries are sorted in ascending order of ri.
*/

// Solution:

/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number[]}
 */
var closestEqualElementQueries = function (nums, queries) {
  const n = nums.length;
  const valueIndices = new Map();
  const result = new Array(queries.length);

  for (let i = 0; i < n; i++) {
    if (!valueIndices.has(nums[i])) {
      valueIndices.set(nums[i], []);
    }
    valueIndices.get(nums[i]).push(i);
  }

  for (let k = 0; k < queries.length; k++) {
    const queryIdx = queries[k];
    const val = nums[queryIdx];
    const indices = valueIndices.get(val);

    if (indices.length <= 1) {
      result[k] = -1;
      continue;
    }

    let low = 0;
    let high = indices.length - 1;
    let pos = -1;

    while (low <= high) {
      let mid = Math.floor((low + high) / 2);
      if (indices[mid] === queryIdx) {
        pos = mid;
        break;
      } else if (indices[mid] < queryIdx) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    const prevIdx = pos === 0 ? indices[indices.length - 1] : indices[pos - 1];
    const nextIdx = pos === indices.length - 1 ? indices[0] : indices[pos + 1];

    const d1 = Math.min(
      Math.abs(queryIdx - prevIdx),
      n - Math.abs(queryIdx - prevIdx),
    );
    const d2 = Math.min(
      Math.abs(queryIdx - nextIdx),
      n - Math.abs(queryIdx - nextIdx),
    );

    result[k] = Math.min(d1, d2);
  }

  return result;
};

//Complexity Analysis:
// Time Complexity: O(n)
// Space Complexity: O(n)

// Notes:
// 1. We can use a hash map to store the indices of each element.
// 2. By iterating through the array and storing the indices of each element in the hash map, we can answer each query in O(1) time.
// 3. The overall time complexity will be O(n) and the space complexity will be O(n).

// Example 1:
// Input: nums = [1,2,1,2,3], queries = [[0,3],[1,2],[1,1],[2,3],[0,0]]
// Output: [2,0,1,2,0]
// Explanation:
// - For the first query [0,3], nums[3] is 2. The closest element to the left of index 3 with value 2 is at index 1. So the answer is 1.
// - For the second query [1,2], nums[2] is 1. The closest element to the left of index 2 with value 1 is at index 0. So the answer is 0.
// - For the third query [1,1], nums[1] is 2. The closest element to the left of index 1 with value 2 is at index 1. So the answer is 1.
// - For the fourth query [2,3], nums[3] is 2. The closest element to the left of index 3 with value 2 is at index 1. So the answer is 1.
// - For the fifth query [0,0], nums[0] is 1. The closest element to the left of index 0 with value 1 is at index 0. So the answer is 0.
