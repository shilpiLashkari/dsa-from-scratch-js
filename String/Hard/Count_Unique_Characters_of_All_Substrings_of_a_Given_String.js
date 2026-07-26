/**
 * 828. Count Unique Characters of All Substrings of a Given String
 *
 * Time: O(n)
 * Space: O(unique characters)
 *
 * @param {string} s
 * @return {number}
 */
function uniqueLetterString(s) {
  const positions = new Map();
  let uniqueCount = 0;

  for (let index = 0; index < s.length; index += 1) {
    const character = s[index];
    const [beforePrevious, previous] = positions.get(character) ?? [-1, -1];

    uniqueCount += (previous - beforePrevious) * (index - previous);
    positions.set(character, [previous, index]);
  }

  for (const [beforePrevious, previous] of positions.values()) {
    uniqueCount += (previous - beforePrevious) * (s.length - previous);
  }

  return uniqueCount;
}

module.exports = { uniqueLetterString };
