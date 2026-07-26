/**
 * 127. Word Ladder
 *
 * Time: O(N * L * 26)
 * Space: O(N)
 *
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
function ladderLength(beginWord, endWord, wordList) {
  const unvisited = new Set(wordList);

  if (!unvisited.has(endWord)) {
    return 0;
  }

  const queue = [beginWord];
  let front = 0;
  let transformations = 1;

  unvisited.delete(beginWord);

  while (front < queue.length) {
    const levelEnd = queue.length;

    while (front < levelEnd) {
      const word = queue[front];
      front += 1;

      if (word === endWord) {
        return transformations;
      }

      const characters = word.split("");

      for (let index = 0; index < characters.length; index += 1) {
        const original = characters[index];

        for (let code = 97; code <= 122; code += 1) {
          const replacement = String.fromCharCode(code);

          if (replacement === original) {
            continue;
          }

          characters[index] = replacement;
          const candidate = characters.join("");

          if (unvisited.delete(candidate)) {
            queue.push(candidate);
          }
        }

        characters[index] = original;
      }
    }

    transformations += 1;
  }

  return 0;
}

module.exports = { ladderLength };
