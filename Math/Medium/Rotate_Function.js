/**
 * Rotate Function
 * 
 * Strategy: We use a mathematical relationship between consecutive rotation 
 * values to avoid O(N^2) complexity. 
 * Let S be the sum of all elements in nums.
 * F(0) = 0*A[0] + 1*A[1] + ... + (n-1)*A[n-1]
 * F(1) = 0*A[n-1] + 1*A[0] + ... + (n-1)*A[n-2]
 * F(1) - F(0) = (A[0] + A[1] + ... + A[n-2]) - (n-1)*A[n-1]
 * F(1) - F(0) = (S - A[n-1]) - (n-1)*A[n-1] = S - n*A[n-1]
 * Therefore: F(i) = F(i-1) + S - n*A[n-i]
 * 
 * Time Complexity: O(N) as we traverse the array to get the sum and initial F(0), 
 * and then once more to compute all F(i).
 * Space Complexity: O(1).
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
function maxRotateFunction(nums) {
    const n = nums.length;
    let sum = 0;
    let f = 0;

    for (let i = 0; i < n; i++) {
        sum += nums[i];
        f += i * nums[i];
    }

    let max = f;
    for (let i = 1; i < n; i++) {
        // F(i) = F(i-1) + sum - n * nums[n - i]
        f = f + sum - n * nums[n - i];
        max = Math.max(max, f);
    }

    return max;
}

// Example Test Cases
console.log("Test 1:", maxRotateFunction([4, 3, 2, 6])); // Expected: 26
console.log("Test 2:", maxRotateFunction([100]));        // Expected: 0

module.exports = maxRotateFunction;
