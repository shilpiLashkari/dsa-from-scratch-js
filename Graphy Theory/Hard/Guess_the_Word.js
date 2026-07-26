/**
 * 843. Guess the Word
 *
 * Uses minimax bucket sizing to select each guess.
 *
 * @param {string[]} words
 * @param {Master} master
 * @return {void}
 */
function findSecretWord(words, master) {
  const matchingCharacters = (first, second) => {
    let matches = 0;

    for (let index = 0; index < first.length; index += 1) {
      matches += first[index] === second[index] ? 1 : 0;
    }

    return matches;
  };

  let candidates = [...words];

  for (let attempt = 0; attempt < 10 && candidates.length > 0; attempt += 1) {
    let guess = candidates[0];
    let smallestLargestBucket = Number.POSITIVE_INFINITY;

    for (const word of words) {
      const buckets = new Array(7).fill(0);

      for (const candidate of candidates) {
        buckets[matchingCharacters(word, candidate)] += 1;
      }

      const largestBucket = Math.max(...buckets);

      if (largestBucket < smallestLargestBucket) {
        smallestLargestBucket = largestBucket;
        guess = word;
      }
    }

    const matches = master.guess(guess);

    if (matches === guess.length) {
      return;
    }

    candidates = candidates.filter(
      (candidate) => matchingCharacters(guess, candidate) === matches,
    );
  }
}

module.exports = { findSecretWord };
