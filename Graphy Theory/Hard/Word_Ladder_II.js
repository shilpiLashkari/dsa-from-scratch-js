/**
 * 126. Word Ladder II
 *
 * Builds parent links only for paths in the shortest BFS layers, then
 * reconstructs every shortest sequence from endWord back to beginWord.
 *
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */
function findLadders(beginWord, endWord, wordList) {
  const unvisited = new Set(wordList);

  if (!unvisited.has(endWord)) {
    return [];
  }

  const parents = new Map();
  let level = new Set([beginWord]);

  unvisited.delete(beginWord);

  while (level.size > 0 && !level.has(endWord)) {
    const nextLevel = new Set();

    for (const word of level) {
      const characters = word.split("");

      for (let index = 0; index < characters.length; index += 1) {
        const original = characters[index];

        for (let code = 97; code <= 122; code += 1) {
          characters[index] = String.fromCharCode(code);
          const candidate = characters.join("");

          if (!unvisited.has(candidate)) {
            continue;
          }

          nextLevel.add(candidate);

          if (!parents.has(candidate)) {
            parents.set(candidate, []);
          }

          parents.get(candidate).push(word);
        }

        characters[index] = original;
      }
    }

    for (const word of nextLevel) {
      unvisited.delete(word);
    }

    level = nextLevel;
  }

  if (!level.has(endWord)) {
    return [];
  }

  const sequences = [];
  const path = [endWord];

  function buildPaths(word) {
    if (word === beginWord) {
      sequences.push([...path].reverse());
      return;
    }

    for (const parent of parents.get(word) ?? []) {
      path.push(parent);
      buildPaths(parent);
      path.pop();
    }
  }

  buildPaths(endWord);
  return sequences;
}

module.exports = { findLadders };
