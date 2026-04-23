/**
 * Random Pick Index
 * 
 * Strategy: Since the array can be large, we use Reservoir Sampling to pick 
 * a random index for a target value in a single pass with O(1) extra space. 
 * For each index 'i' where nums[i] == target, we increment a counter and pick 
 * 'i' with probability 1/count. This ensures all indices have an equal 
 * 1/N probability of being chosen.
 * 
 * Time Complexity: O(N) for each pick call.
 * Space Complexity: O(1) beyond storing the array.
 */

class Solution {
    /**
     * @param {number[]} nums
     */
    constructor(nums) {
        this.nums = nums;
    }

    /** 
     * @param {number} target
     * @return {number}
     */
    pick(target) {
        let count = 0;
        let res = -1;

        for (let i = 0; i < this.nums.length; i++) {
            if (this.nums[i] === target) {
                count++;
                if (Math.floor(Math.random() * count) === 0) {
                    res = i;
                }
            }
        }

        return res;
    }
}

// Example Test Cases
const sol = new Solution([1, 2, 3, 3, 3]);
console.log("Pick 3:", sol.pick(3)); // Should be 2, 3, or 4 with equal probability
console.log("Pick 1:", sol.pick(1)); // Should be 0

module.exports = Solution;
