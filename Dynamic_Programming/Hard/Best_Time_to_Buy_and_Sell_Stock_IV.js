/**
 * 188. Best Time to Buy and Sell Stock IV
 *
 * Time: O(n * k)
 * Space: O(k)
 *
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(k, prices) {
  const days = prices.length;

  if (k === 0 || days < 2) {
    return 0;
  }

  if (k >= Math.floor(days / 2)) {
    let profit = 0;

    for (let day = 1; day < days; day += 1) {
      profit += Math.max(0, prices[day] - prices[day - 1]);
    }

    return profit;
  }

  const buy = new Array(k + 1).fill(Number.NEGATIVE_INFINITY);
  const sell = new Array(k + 1).fill(0);

  for (const price of prices) {
    for (let transaction = 1; transaction <= k; transaction += 1) {
      buy[transaction] = Math.max(
        buy[transaction],
        sell[transaction - 1] - price,
      );
      sell[transaction] = Math.max(
        sell[transaction],
        buy[transaction] + price,
      );
    }
  }

  return sell[k];
}

module.exports = { maxProfit };
