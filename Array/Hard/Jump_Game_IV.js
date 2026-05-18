/**
 * Problem: Jump Game IV (LeetCode 1345)
 * 
 * Given an array of integers arr, you are initially positioned at the first index of the array.
 * 
 * In one step you can jump from index i to index:
 * - i + 1 where: i + 1 < arr.length.
 * - i - 1 where: i - 1 >= 0.
 * - j where: arr[i] == arr[j] and i != j.
 * 
 * Return the minimum number of steps to reach the last index of the array.
 * 
 * Notice that you can not jump outside of the array at any time.
 * 
 * @param {number[]} arr
 * @return {number}
 */
const minJumps = function(arr) {
    const n = arr.length;
    if (n <= 1) return 0;
    
    // Map to store indices of each value
    const graph = new Map();
    for (let i = 0; i < n; i++) {
        if (!graph.has(arr[i])) {
            graph.set(arr[i], []);
        }
        graph.get(arr[i]).push(i);
    }
    
    // Queue for BFS [index]
    let queue = [0];
    let steps = 0;
    const visited = new Set();
    visited.add(0);
    
    while (queue.length > 0) {
        const nextQueue = [];
        
        for (let i = 0; i < queue.length; i++) {
            const curr = queue[i];
            
            // Reached the end
            if (curr === n - 1) {
                return steps;
            }
            
            // Check neighbors: same values, curr - 1, curr + 1
            const neighbors = graph.get(arr[curr]) || [];
            neighbors.push(curr - 1);
            neighbors.push(curr + 1);
            
            for (const neighbor of neighbors) {
                if (neighbor >= 0 && neighbor < n && !visited.has(neighbor)) {
                    visited.add(neighbor);
                    nextQueue.push(neighbor);
                }
            }
            
            // Clear the map for arr[curr] to prevent redundant checks
            // This is crucial to avoid Time Limit Exceeded (TLE)
            graph.delete(arr[curr]);
        }
        
        queue = nextQueue;
        steps++;
    }
    
    return -1; // Should not reach here
};

/*
 * Complexity Analysis:
 * Time Complexity: O(N) where N is the length of the array. We visit each index 
 * at most once. The map clearance `graph.delete(arr[curr])` ensures we don't 
 * iterate over the same values' indices repeatedly.
 * 
 * Space Complexity: O(N) for the graph Map to store indices of each value, 
 * the BFS queue, and the visited Set.
 */

// --------------------------------------------------------
// Test Cases
// --------------------------------------------------------
console.log("Running Jump Game IV Tests...");

const testCases = [
    { arr: [100,-23,-23,404,100,23,23,23,3,404], expected: 3 },
    { arr: [7], expected: 0 },
    { arr: [7,6,9,6,9,6,9,7], expected: 1 },
    { arr: [11, 22, 7, 7, 7, 7, 7, 7, 7, 22, 13], expected: 3 },
    { arr: [1, 2, 3, 4, 5], expected: 4 }
];

testCases.forEach((test, index) => {
    const result = minJumps(test.arr);
    console.log(`Test ${index + 1}: ${result === test.expected ? '✅ Passed' : `❌ Failed (Expected ${test.expected}, Got ${result})`}`);
});
