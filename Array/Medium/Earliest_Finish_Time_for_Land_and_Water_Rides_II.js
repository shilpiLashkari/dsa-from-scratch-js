/**
 * Earliest Finish Time for Land and Water Rides II (LeetCode 3635)
 *
 * Problem Statement:
 * You are given two types of rides: Land and Water.
 * For each type, you have two arrays representing the earliest start time and duration of each ride.
 * You must complete exactly one land ride and one water ride in any order.
 * If you finish one ride, you can start the second ride as soon as it opens (or immediately if it's already open).
 * Return the earliest possible time you can finish both rides.
 * 
 * Note: This is a harder version of "Earliest Finish Time for Land and Water Rides I" with larger constraints (N, M <= 50,000).
 * Our algorithm is fully optimal O(N + M) and easily handles the constraints.
 * 
 * Approach:
 * Greedy O(N + M) time complexity algorithm.
 * Since we want to minimize the overall finish time, the optimal choice for the first ride is always the one that finishes earliest.
 * Let the minimum finish time of any land ride be minLandFinish = min(landStartTime[i] + landDuration[i]).
 * If we take a land ride first, for any water ride j, the completion time is max(minLandFinish, waterStartTime[j]) + waterDuration[j].
 * The optimal sequence of Land -> Water is simply the minimum of this over all water rides j.
 * We apply the same logic for the Water -> Land sequence.
 * Finally, we return the minimum between the two scenarios.
 *
 * @param {number[]} landStartTime
 * @param {number[]} landDuration
 * @param {number[]} waterStartTime
 * @param {number[]} waterDuration
 * @return {number}
 */
var earliestFinishTime = function(landStartTime, landDuration, waterStartTime, waterDuration) {
    let minLandFinish = Infinity;
    for (let i = 0; i < landStartTime.length; i++) {
        minLandFinish = Math.min(minLandFinish, landStartTime[i] + landDuration[i]);
    }

    let minWaterFinish = Infinity;
    for (let j = 0; j < waterStartTime.length; j++) {
        minWaterFinish = Math.min(minWaterFinish, waterStartTime[j] + waterDuration[j]);
    }

    let minTime = Infinity;

    // Option 1: Land -> Water
    for (let j = 0; j < waterStartTime.length; j++) {
        minTime = Math.min(minTime, Math.max(minLandFinish, waterStartTime[j]) + waterDuration[j]);
    }

    // Option 2: Water -> Land
    for (let i = 0; i < landStartTime.length; i++) {
        minTime = Math.min(minTime, Math.max(minWaterFinish, landStartTime[i]) + landDuration[i]);
    }

    return minTime;
};

/*
 * Big O Complexity:
 * Time Complexity: O(N + M), where N is the number of land rides and M is the number of water rides.
 *                  We iterate through the arrays a constant number of times (2 passes).
 * Space Complexity: O(1), as we only use a few variables to store intermediate minimum finish times.
 */

// ==========================================
// Test Cases
// ==========================================
console.log("Running Tests for Earliest Finish Time for Land and Water Rides II...");

// Test 1: Given Example
let lStart = [0, 5], lDur = [2, 1];
let wStart = [2, 0], wDur = [3, 4];
console.log("Test 1:", earliestFinishTime(lStart, lDur, wStart, wDur)); // Expected: 5 

// Test 2: Water first is better
lStart = [10, 15], lDur = [5, 5];
wStart = [0], wDur = [2];
console.log("Test 2:", earliestFinishTime(lStart, lDur, wStart, wDur)); // Expected: 15

// Test 3: Large arrays test logic check
lStart = [0, 10, 20], lDur = [30, 20, 10];
wStart = [5, 15, 25], wDur = [25, 15, 5];
console.log("Test 3:", earliestFinishTime(lStart, lDur, wStart, wDur)); // Expected: 35

console.log("All tests completed.");
