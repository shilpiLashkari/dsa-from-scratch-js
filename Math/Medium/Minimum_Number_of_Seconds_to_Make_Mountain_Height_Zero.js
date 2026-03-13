// Problem: Minimum Number of Seconds to Make Mountain Height Zero (LeetCode 3296)

// You are given an integer mountainHeight and an array workerTimes.
// A worker i can reduce the mountain height by x units in workerTimes[i] * (1 + 2 + ... + x) seconds.
// All workers work simultaneously.
// Return the minimum number of seconds to make mountainHeight zero.

/**
 * @param {number} mountainHeight
 * @param {number[]} workerTimes
 * @return {number}
 */
var minNumberOfSeconds = function (mountainHeight, workerTimes) {
    /**
     * Helper to check if it's possible to reduce mountainHeight to zero within 'time' seconds.
     */
    const check = (time) => {
        let totalReduced = 0;
        for (let t of workerTimes) {
            // We need to find the max x such that t * x * (x + 1) / 2 <= time
            // x^2 + x - (2 * time / t) <= 0
            // Using quadratic formula: x = (-b + sqrt(b^2 - 4ac)) / 2a
            // a = 1, b = 1, c = -(2 * time / t)
            // x = (-1 + sqrt(1 + 8 * time / t)) / 2
            let x = Math.floor((-1 + Math.sqrt(1 + (8 * time) / t)) / 2);
            totalReduced += x;
            if (totalReduced >= mountainHeight) return true;
        }
        return totalReduced >= mountainHeight;
    };

    let low = 0;
    // Estimate upper bound: Worst case - one worker with max time clears the whole mountain.
    // Max workerTimes[i] = 10^6, Max mountainHeight = 10^5
    // Time = 10^6 * (10^5 * 10^5) / 2 = 5 * 10^15 approx.
    let high = 1e16; 
    let result = high;

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (check(mid)) {
            result = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    return result;
};

// Notes:
// - The workers operate simultaneously, so we look for the minimum 'T' such that the total height reduced is >= mountainHeight.
// - This is a Binary Search on Answer problem.
// - The quadratic formula simplifies the calculation of how much height a worker can reduce in 'T' seconds.
// - Time Complexity: O(W * log(MaxTime)), where W is the number of workers.
// - Space Complexity: O(1).

module.exports = { minNumberOfSeconds };
