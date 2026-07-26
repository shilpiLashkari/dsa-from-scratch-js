/**
 * LeetCode 52: N-Queens II
 *
 * Place queens row by row while tracking occupied columns and diagonals.
 *
 * Time Complexity: O(n!)
 * Space Complexity: O(n)
 */

/**
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function (n) {
  const columns = new Set();
  const descendingDiagonals = new Set();
  const ascendingDiagonals = new Set();
  let solutionCount = 0;

  const place = (row) => {
    if (row === n) {
      solutionCount++;
      return;
    }

    for (let column = 0; column < n; column++) {
      const descending = row - column;
      const ascending = row + column;

      if (
        columns.has(column) ||
        descendingDiagonals.has(descending) ||
        ascendingDiagonals.has(ascending)
      ) {
        continue;
      }

      columns.add(column);
      descendingDiagonals.add(descending);
      ascendingDiagonals.add(ascending);
      place(row + 1);
      columns.delete(column);
      descendingDiagonals.delete(descending);
      ascendingDiagonals.delete(ascending);
    }
  };

  place(0);
  return solutionCount;
};

module.exports = { totalNQueens };
