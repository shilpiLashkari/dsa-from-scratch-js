/**
 * LeetCode 36: Valid Sudoku
 *
 * Track the digits already used in every row, column, and 3x3 box. Any repeated
 * digit makes the partially filled board invalid.
 *
 * Time Complexity: O(1) for the fixed 9x9 board
 * Space Complexity: O(1)
 */

/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
  const rows = Array.from({ length: 9 }, () => new Set());
  const columns = Array.from({ length: 9 }, () => new Set());
  const boxes = Array.from({ length: 9 }, () => new Set());

  for (let row = 0; row < 9; row++) {
    for (let column = 0; column < 9; column++) {
      const value = board[row][column];
      if (value === ".") continue;

      const box = Math.floor(row / 3) * 3 + Math.floor(column / 3);

      if (
        rows[row].has(value) ||
        columns[column].has(value) ||
        boxes[box].has(value)
      ) {
        return false;
      }

      rows[row].add(value);
      columns[column].add(value);
      boxes[box].add(value);
    }
  }

  return true;
};

if (require.main === module) {
  const valid = [
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"],
  ];
  const invalid = valid.map((row) => [...row]);
  invalid[0][0] = "8";
  const tests = [
    [valid, true],
    [invalid, false],
  ];

  tests.forEach(([board, expected], index) => {
    const actual = isValidSudoku(board);
    if (actual !== expected) {
      throw new Error(`Test ${index + 1}: expected ${expected}, received ${actual}`);
    }
    console.log(`Test ${index + 1}: PASSED`);
  });
}

module.exports = { isValidSudoku };
