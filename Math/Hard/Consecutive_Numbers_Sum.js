/**
 * 829. Consecutive Numbers Sum
 *
 * Time: O(sqrt(n))
 * Space: O(1)
 *
 * @param {number} n
 * @return {number}
 */
function consecutiveNumbersSum(n) {
  let representations = 0;

  for (
    let length = 1;
    (length * (length - 1)) / 2 < n;
    length += 1
  ) {
    const remaining = n - (length * (length - 1)) / 2;

    if (remaining % length === 0) {
      representations += 1;
    }
  }

  return representations;
}

module.exports = { consecutiveNumbersSum };
