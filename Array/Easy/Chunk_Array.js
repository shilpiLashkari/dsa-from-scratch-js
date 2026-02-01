// Problem: Chunk Array
// Given an array arr and a chunk size size, return a chunked array.
// A chunked array contains the original elements in arr, but consists of subarrays each of length size. The length of the last subarray may be less than size if arr.length is not evenly divisible by size.
// You may assume the array is the output of JSON.parse. In other words, it is valid JSON.
// Please solve it without using lodash's _.chunk function.
//
// Example 1:
// Input: arr = [1,2,3,4,5], size = 1
// Output: [[1],[2],[3],[4],[5]]
// Example 2:
// Input: arr = [1,9,6,3,2], size = 3
// Output: [[1,9,6],[3,2]]
// Explanation:
// The first chunk is [1,9,6].
// The second chunk is [3,2].
//
// Constraints:
// arr is a valid JSON array
// 2 <= JSON.stringify(arr).length <= 10^5
// 1 <= size <= arr.length + 1

// Solution:

/**
 * @param {Array} inputArray
 * @param {number} chunkSize
 * @return {Array[]}
 */
const chunk = (inputArray, chunkSize) => {
    const chunkedArray = [];

    // Iterate through the array, skipping by 'chunkSize' each time
    for (let index = 0; index < inputArray.length; index += chunkSize) {
        // Slice a piece of the array from current index to index + chunkSize
        const currentChunk = inputArray.slice(index, index + chunkSize);

        // Add this piece to our result
        chunkedArray.push(currentChunk);
    }

    return chunkedArray;
};

// Notes:
// - I loop through the main array, but instead of checking every index, I jump by `chunkSize` steps.
// - At each step, I slice off a piece of the array of the correct size.
// - `slice` handles the end of the array gracefully (it won't crash if we ask for more than is left).
// - I push these pieces into my result array.
// - Time Complexity: O(n) because we still touch every element to copy it.
