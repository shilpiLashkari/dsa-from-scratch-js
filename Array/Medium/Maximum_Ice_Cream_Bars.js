/**
 * Problem: Maximum Ice Cream Bars
 * Difficulty: Medium
 * Pattern: Greedy / Sorting
 *
 * You are given an array of costs where costs[i] is the price of the ith ice cream bar.
 * You have coins coins to buy ice cream bars. Return the maximum number of ice cream bars you can buy.
 *
 * Complexity:
 * - Time: O(N log N) due to sorting the costs array.
 * - Space: O(1) additional space (in-place sort, ignoring input cost).
 */

/**
 * @param {number[]} costs
 * @param {number} coins
 * @return {number}
 */
var maxIceCream = function (costs, coins) {
    costs.sort((a, b) => a - b);

    let count = 0;
    let remaining = coins;

    for (let i = 0; i < costs.length; i++) {
        if (remaining < costs[i]) {
            break;
        }

        remaining -= costs[i];
        count += 1;
    }

    return count;
};

module.exports = maxIceCream;
