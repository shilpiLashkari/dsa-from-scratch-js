/**
 * LeetCode 158: Read N Characters Given read4 II - Call Multiple Times
 *
 * Preserve unread characters from the most recent read4 call inside the closure
 * so later read calls consume them before requesting more input.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

/**
 * @param {function(character[]): number} read4
 * @return {function(character[], number): number}
 */
var solution = function (read4) {
  const cache = new Array(4);
  let cacheIndex = 0;
  let cacheSize = 0;

  return function (buf, n) {
    let written = 0;

    while (written < n) {
      if (cacheIndex === cacheSize) {
        cacheSize = read4(cache);
        cacheIndex = 0;
        if (cacheSize === 0) break;
      }

      buf[written++] = cache[cacheIndex++];
    }

    return written;
  };
};

module.exports = { solution };
