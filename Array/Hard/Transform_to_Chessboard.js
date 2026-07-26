/**
 * 782. Transform to Chessboard
 *
 * Time: O(n^2)
 * Space: O(1)
 *
 * @param {number[][]} board
 * @return {number}
 */
function movesToChessboard(board) {
  const size = board.length;

  for (let row = 0; row < size; row += 1) {
    for (let column = 0; column < size; column += 1) {
      if (
        (
          board[0][0]
          ^ board[row][0]
          ^ board[0][column]
          ^ board[row][column]
        ) !== 0
      ) {
        return -1;
      }
    }
  }

  let firstRowOnes = 0;
  let firstColumnOnes = 0;
  let rowSwaps = 0;
  let columnSwaps = 0;

  for (let index = 0; index < size; index += 1) {
    firstRowOnes += board[0][index];
    firstColumnOnes += board[index][0];
    rowSwaps += board[index][0] === index % 2 ? 1 : 0;
    columnSwaps += board[0][index] === index % 2 ? 1 : 0;
  }

  if (
    firstRowOnes < Math.floor(size / 2)
    || firstRowOnes > Math.ceil(size / 2)
    || firstColumnOnes < Math.floor(size / 2)
    || firstColumnOnes > Math.ceil(size / 2)
  ) {
    return -1;
  }

  if (size % 2 === 1) {
    if (rowSwaps % 2 === 1) {
      rowSwaps = size - rowSwaps;
    }

    if (columnSwaps % 2 === 1) {
      columnSwaps = size - columnSwaps;
    }
  } else {
    rowSwaps = Math.min(rowSwaps, size - rowSwaps);
    columnSwaps = Math.min(columnSwaps, size - columnSwaps);
  }

  return Math.floor((rowSwaps + columnSwaps) / 2);
}

module.exports = { movesToChessboard };
