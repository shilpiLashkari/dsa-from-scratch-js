// Problem : You are given an integer array nums of length n and a 2D integer array queries of size q, where queries[i] = [li, ri, ki, vi].

// For each query, you must apply the following operations in order:

// Set idx = li.
// While idx <= ri:
// Update: nums[idx] = (nums[idx] * vi) % (109 + 7)
// Set idx += ki.
// Return the bitwise XOR of all elements in nums after processing all queries.

// Example 1:

// Input: nums = [1,1,1], queries = [[0,2,1,4]]

// Output: 4

// Explanation:

// A single query [0, 2, 1, 4] multiplies every element from index 0 through index 2 by 4.
// The array changes from [1, 1, 1] to [4, 4, 4].
// The XOR of all elements is 4 ^ 4 ^ 4 = 4.
// Example 2:

// Input: nums = [2,3,1,5,4], queries = [[1,4,2,3],[0,2,1,2]]

// Output: 31

// Explanation:

// The first query [1, 4, 2, 3] multiplies the elements at indices 1 and 3 by 3, transforming the array to [2, 9, 1, 15, 4].
// The second query [0, 2, 1, 2] multiplies the elements at indices 0, 1, and 2 by 2, resulting in [4, 18, 2, 15, 4].
// Finally, the XOR of all elements is 4 ^ 18 ^ 2 ^ 15 ^ 4 = 31.​​​​​​​​​​​​​​

// Constraints:

// 1 <= n == nums.length <= 103
// 1 <= nums[i] <= 109
// 1 <= q == queries.length <= 103
// queries[i] = [li, ri, ki, vi]
// 0 <= li <= ri < n
// 1 <= ki <= n
// 1 <= vi <= 105

/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number}
 */
var xorAfterQueries = function (nums, queries) {
  const MOD = 1000000007n;
  let bigNums = nums.map((n) => BigInt(n));

  for (const [l, r, k, v] of queries) {
    const val = BigInt(v);
    for (let i = l; i <= r; i += k) {
      bigNums[i] = (bigNums[i] * val) % MOD;
    }
  }

  let result = 0n;
  for (const num of bigNums) {
    result ^= num;
  }

  return Number(result);
};

// Notes

// 1. The "Skip" Pattern: Instead of hitting every number in a range, the code uses $k$ to hop over elements. It’s like walking up stairs two or three at a time—you only land on specific indices and leave the ones in between untouched.

// Keeping the Remainder: We’re dealing with a huge prime number ($10^9 + 7$). Every time you multiply, you have to take the remainder (modulo) to keep the numbers from exploding into infinity. It keeps everything neat and within a specific "bucket."

// 3. JavaScript’s Math Safety: Standard numbers in JS get "blurry" once they get too big. Using BigInt is like using a high-precision calculator; it ensures that when we multiply two large values, we don't lose a single digit before we apply the modulo.

// 4. Order Matters: This isn't a "do it all at once" situation. Because the second query might multiply a number that was already changed by the first, you have to follow the instructions step-by-step. If you scramble the order, you'll get a totally different final answer.

// 5. The Final Squishing (XOR): Once all the math is done, we "XOR" everything together. This bitwise operation essentially compares the binary bits of all the numbers in the array to spit out one single final integer.
