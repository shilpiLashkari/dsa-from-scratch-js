/**
 * 793. Preimage Size of Factorial Zeroes Function
 *
 * Time: O(log^2 k)
 * Space: O(1)
 *
 * @param {number} k
 * @return {number}
 */
function preimageSizeFZF(k) {
  const trailingZeroes = (value) => {
    let zeroes = 0;

    while (value > 0) {
      value = Math.floor(value / 5);
      zeroes += value;
    }

    return zeroes;
  };

  const lowerBound = (target) => {
    let left = 0;
    let right = 5 * target + 5;

    while (left < right) {
      const middle = left + Math.floor((right - left) / 2);

      if (trailingZeroes(middle) >= target) {
        right = middle;
      } else {
        left = middle + 1;
      }
    }

    return left;
  };

  return lowerBound(k + 1) - lowerBound(k);
}

module.exports = { preimageSizeFZF };
