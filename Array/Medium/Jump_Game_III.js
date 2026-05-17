/**
 * Problem: Jump Game III
 * Link: https://leetcode.com/problems/jump-game-iii/
 * 
 * Time Complexity: O(N) - In the worst case, we might visit each index of the array once.
 * Space Complexity: O(N) - We use a queue for BFS and a Set to keep track of visited indices, which can store up to N elements.
 */

/**
 * @param {number[]} arr
 * @param {number} start
 * @return {boolean}
 */
const canReach = function(arr, start) {
    const queue = [start];
    const visited = new Set([start]);
    
    while (queue.length > 0) {
        const curr = queue.shift();
        
        // If we reach an index with value 0, return true
        if (arr[curr] === 0) {
            return true;
        }
        
        const nextJumps = [curr + arr[curr], curr - arr[curr]];
        
        for (const next of nextJumps) {
            // Check if the next index is within bounds and not visited
            if (next >= 0 && next < arr.length && !visited.has(next)) {
                visited.add(next);
                queue.push(next);
            }
        }
    }
    
    return false;
};

// --- Test Cases ---

const test = () => {
    const cases = [
        { arr: [4, 2, 3, 0, 3, 1, 2], start: 5, expected: true },
        { arr: [4, 2, 3, 0, 3, 1, 2], start: 0, expected: true },
        { arr: [3, 0, 2, 1, 2], start: 2, expected: false },
        { arr: [0], start: 0, expected: true },
        { arr: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], start: 0, expected: true },
        { arr: [0, 1, 2], start: 0, expected: true }
    ];

    cases.forEach(({ arr, start, expected }, index) => {
        const result = canReach(arr, start);
        console.assert(result === expected, `Test Case ${index + 1} Failed: arr=[${arr}], start=${start}, expected=${expected}, got=${result}`);
        if (result === expected) {
            console.log(`Test Case ${index + 1} Passed!`);
        }
    });
};

test();
