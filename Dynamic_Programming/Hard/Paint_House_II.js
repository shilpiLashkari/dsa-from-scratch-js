/**
 * 265. Paint House II
 *
 * Time: O(houses * colors)
 * Space: O(colors)
 *
 * @param {number[][]} costs
 * @return {number}
 */
function minCostII(costs) {
  if (costs.length === 0) {
    return 0;
  }

  let previous = new Array(costs[0].length).fill(0);

  for (const houseCosts of costs) {
    let minimum = Number.POSITIVE_INFINITY;
    let secondMinimum = Number.POSITIVE_INFINITY;
    let minimumIndex = -1;

    for (let color = 0; color < previous.length; color += 1) {
      if (previous[color] < minimum) {
        secondMinimum = minimum;
        minimum = previous[color];
        minimumIndex = color;
      } else if (previous[color] < secondMinimum) {
        secondMinimum = previous[color];
      }
    }

    previous = houseCosts.map((cost, color) => (
      cost + (color === minimumIndex ? secondMinimum : minimum)
    ));
  }

  return Math.min(...previous);
}

module.exports = { minCostII };
