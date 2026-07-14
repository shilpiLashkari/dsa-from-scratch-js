// Problem: Best Time to Buy and Sell Stock III

// You are given an array prices where prices[i] is the price of a given stock on the ith day.
// Find the maximum profit you can achieve. You may complete at most two transactions.
// Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

// Example 1:
// Input: prices = [3,3,5,0,0,3,1,4]
// Output: 6
// Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
// Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.

// Example 2:
// Input: prices = [1,2,3,4,5]
// Output: 4
// Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.

// Example 3:
// Input: prices = [7,6,4,3,1]
// Output: 0
// Explanation: In this case, no transaction is done, i.e. max profit = 0.

// Constraints:
// 1 <= prices.length <= 10^5
// 0 <= prices[i] <= 10^5

/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = (prices) => {
    if (!prices || prices.length < 2) {
        return 0;
    }


    let firstBuy = Infinity;
    let firstSell = 0;
    let secondBuy = Infinity;
    let secondSell = 0;

    for (const price of prices) {
        firstBuy = Math.min(firstBuy, price);
        
        firstSell = Math.max(firstSell, price - firstBuy);
        
        secondBuy = Math.min(secondBuy, price - firstSell);
        
        secondSell = Math.max(secondSell, price - secondBuy);
    }

    return secondSell;
};

// Notes:
// - This problem is an extension of "Best Time to Buy and Sell Stock I".
// - The constraint "at most two transactions" makes it challenging.
// - Dynamic Programming (DP) Approach:
//   - We maintain four variables representing the state after each action (Buy1, Sell1, Buy2, Sell2).
//   - For each price, we decide whether to update our state for the best possible outcome.
//   - Sell1 = max(Sell1, Price - Buy1) -> Standard Buy/Sell once logic.
//   - Buy2 = min(Buy2, Price - Sell1) -> The key trick! We reinvest Sell1 into Buy2.
//   - Sell2 = max(Sell2, Price - Buy2) -> Total profit after two trades.
// - Time Complexity: O(n) - We traverse the prices array once.
// - Space Complexity: O(1) - We only use four variables regardless of input size.
// - This logic can be extended to 'k' transactions using an array of size k.

module.exports = { maxProfit };
