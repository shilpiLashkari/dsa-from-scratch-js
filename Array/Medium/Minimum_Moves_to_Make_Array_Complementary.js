/**
 * Minimum Moves to Make Array Complementary
 * 
 * Problem:
 * You are given an integer array nums of even length n and an integer limit. 
 * In one move, you can replace any element from nums with another integer between 1 and limit, inclusive.
 * The array nums is complementary if for all indices i (0-indexed), 
 * nums[i] + nums[n - 1 - i] equals the same integer. 
 * Return the minimum number of moves required to make nums complementary.
 * 
 * Time Complexity: O(N + Limit) where N is the length of nums.
 * Space Complexity: O(Limit) for the difference array.
 */

/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number}
 */
const minMoves = function(nums, limit) {
    const n = nums.length;
    // Possible sums range from 2 to 2 * limit
    // diff[i] stores the change in moves needed if we choose target sum i
    const diff = new Array(2 * limit + 2).fill(0);

    for (let i = 0; i < n / 2; i++) {
        const a = nums[i];
        const b = nums[n - 1 - i];

        const minVal = Math.min(a, b);
        const maxVal = Math.max(a, b);

        // For each pair (a, b), we calculate the number of moves needed for any target sum S:
        // 1. S in [2, minVal + 1): 2 moves (replace both a and b)
        // 2. S in [minVal + 1, a + b): 1 move (replace either a or b)
        // 3. S = a + b: 0 moves
        // 4. S in (a + b, maxVal + limit]: 1 move (replace either a or b)
        // 5. S in (maxVal + limit, 2 * limit]: 2 moves (replace both a and b)

        // Using difference array to update these ranges:
        // Initially, assume 2 moves for all S in [2, 2 * limit]
        diff[2] += 2;
        
        // Range [minVal + 1, 2 * limit]: reduce 1 move (2 -> 1)
        diff[minVal + 1] -= 1;
        
        // At S = a + b: reduce 1 move (1 -> 0)
        diff[a + b] -= 1;
        
        // Range [a + b + 1, 2 * limit]: add 1 move (0 -> 1)
        diff[a + b + 1] += 1;
        
        // Range [maxVal + limit + 1, 2 * limit]: add 1 move (1 -> 2)
        diff[maxVal + limit + 1] += 1;
    }

    let minMovesRequired = n; // Max moves possible is n (2 moves per pair)
    let currentMoves = 0;

    for (let s = 2; s <= 2 * limit; s++) {
        currentMoves += diff[s];
        minMovesRequired = Math.min(minMovesRequired, currentMoves);
    }

    return minMovesRequired;
};

// Test Cases
function test() {
    const testCases = [
        { nums: [1, 2, 4, 3], limit: 4, expected: 1 },
        { nums: [1, 2, 2, 1], limit: 2, expected: 2 },
        { nums: [1, 2, 1, 2], limit: 2, expected: 0 },
    ];

    testCases.forEach(({ nums, limit, expected }, index) => {
        const result = minMoves(nums, limit);
        console.log(`Test Case ${index + 1}: nums=[${nums}], limit=${limit} | Expected: ${expected}, Got: ${result}`);
        console.assert(result === expected, `Test Case ${index + 1} Failed`);
    });
}

test();
