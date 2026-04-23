/**
 * Shuffle an Array
 * 
 * Strategy: We use the Fisher-Yates shuffle algorithm to ensure that every 
 * permutation is equally likely. For each index 'i' in the array, we pick a 
 * random index 'j' such that i <= j < n, and swap the elements at i and j. 
 * This guarantees an O(N) shuffle with uniform distribution.
 * 
 * Time Complexity: O(N) for shuffle, O(1) for reset (since we store a copy).
 * Space Complexity: O(N) to store the original array.
 */

class Solution {
    /**
     * @param {number[]} nums
     */
    constructor(nums) {
        this.original = [...nums];
        this.array = nums;
    }

    /**
     * Resets the array to its original configuration and returns it.
     * @return {number[]}
     */
    reset() {
        this.array = [...this.original];
        return this.array;
    }

    /**
     * Returns a random shuffling of the array.
     * @return {number[]}
     */
    shuffle() {
        for (let i = 0; i < this.array.length; i++) {
            const j = i + Math.floor(Math.random() * (this.array.length - i));
            // Swap
            [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
        }
        return this.array;
    }
}

// Example Test Cases
const sol = new Solution([1, 2, 3]);
console.log("Shuffle 1:", sol.shuffle());
console.log("Reset:", sol.reset());
console.log("Shuffle 2:", sol.shuffle());

module.exports = Solution;
