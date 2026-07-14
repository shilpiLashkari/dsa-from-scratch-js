/**
 * Partition Array into Two Equal Product Subsets
 * 
 * Strategy: We need to find a subset of numbers whose product equals the 
 * square root of the total product. To avoid overflow and for efficiency, 
 * we use prime factorization.
 * 1. Calculate the total count of each prime factor (up to 100) in the array.
 * 2. If any prime factor has an odd total count, equality is impossible.
 * 3. Our target is a subset where each prime factor's count is exactly half 
 *    of the total.
 * 4. We use DP with memoization to find such a subset.
 * 
 * Time Complexity: O(N * Target) where Target is the search space of prime counts.
 * Space Complexity: O(N * Target).
 */

const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];

/**
 * @param {number[]} nums
 * @return {number[]}
 */
function partitionEqualProduct(nums) {
    const n = nums.length;
    const factorCounts = nums.map(getFactors);
    const totalFactors = new Array(25).fill(0);

    for (const factors of factorCounts) {
        for (let i = 0; i < 25; i++) totalFactors[i] += factors[i];
    }

    const target = new Array(25).fill(0);
    for (let i = 0; i < 25; i++) {
        if (totalFactors[i] % 2 !== 0) return [];
        target[i] = totalFactors[i] / 2;
    }

    const memo = new Map();

    function solve(idx, currentTarget) {
        const key = idx + "|" + currentTarget.join(",");
        if (memo.has(key)) return memo.get(key);
        
        // Success: all target counts are 0
        if (currentTarget.every(c => c === 0)) return [];
        if (idx === n || currentTarget.some(c => c < 0)) return null;

        // Option 1: Include nums[idx]
        const nextTarget = currentTarget.map((c, i) => c - factorCounts[idx][i]);
        const included = solve(idx + 1, nextTarget);
        if (included !== null) {
            const res = [nums[idx], ...included];
            memo.set(key, res);
            return res;
        }

        // Option 2: Exclude nums[idx]
        const excluded = solve(idx + 1, currentTarget);
        memo.set(key, excluded);
        return excluded;
    }

    const result = solve(0, target);
    return result || [];
}

function getFactors(num) {
    const counts = new Array(25).fill(0);
    for (let i = 0; i < 25; i++) {
        while (num > 1 && num % PRIMES[i] === 0) {
            counts[i]++;
            num /= PRIMES[i];
        }
    }
    return counts;
}

// Example Test Case
console.log("Test 1:", partitionEqualProduct([2, 4, 8, 1])); // [2, 4] or [8, 1]
console.log("Test 2:", partitionEqualProduct([1, 2, 3, 4])); // []

module.exports = partitionEqualProduct;
