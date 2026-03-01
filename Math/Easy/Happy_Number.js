// Problem: Happy Number
// Write an algorithm to determine if a number n is happy.
// A happy number is a number defined by the following process:
// Starting with any positive integer, replace the number by the sum of the squares of its digits.
// Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
// Those numbers for which this process ends in 1 are happy.
// Return true if n is a happy number, and false if not.

// Example 1:
// Input: n = 19
// Output: true
// Explanation:
// 1^2 + 9^2 = 82
// 8^2 + 2^2 = 68
// 6^2 + 8^2 = 100
// 1^2 + 0^2 + 0^2 = 1

// Example 2:
// Input: n = 2
// Output: false

// Constraints:
// 1 <= n <= 2^31 - 1

/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
    const getNext = (number) => {
        let totalSum = 0;
        while (number > 0) {
            let digit = number % 10;
            totalSum += digit * digit;
            number = Math.floor(number / 10);
        }
        return totalSum;
    };

    let slow = n;
    let fast = getNext(n);

    while (fast !== 1 && slow !== fast) {
        slow = getNext(slow);
        fast = getNext(getNext(fast));
    }

    return fast === 1;
};

// Notes:
// - We use Floyd's Cycle-Finding Algorithm (Two Pointers) to detect cycles.
// - If there's a cycle that doesn't include 1, the fast pointer will eventually meet the slow pointer.
// - If the number is happy, the fast pointer will reach 1.
// - This approach uses O(1) space, whereas using a Hash Set would use O(log N) space.
// - Time Complexity: O(log N) - The number of digits decreases at each step.
// - Space Complexity: O(1) - Constant space used.

module.exports = { isHappy };
