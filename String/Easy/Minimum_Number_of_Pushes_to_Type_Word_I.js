function minimumPushes(word) {
  let pushes = 0;

  for (let index = 0; index < word.length; index += 1) {
    pushes += Math.floor(index / 8) + 1;
  }

  return pushes;
}

module.exports = { minimumPushes };
