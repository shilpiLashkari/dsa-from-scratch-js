/**
 * 818. Race Car
 *
 * Time: O(target log target)
 * Space: O(target)
 *
 * @param {number} target
 * @return {number}
 */
function racecar(target) {
  const memo = new Map([[0, 0]]);

  function minimumInstructions(distance) {
    if (memo.has(distance)) {
      return memo.get(distance);
    }

    const accelerations = Math.ceil(Math.log2(distance + 1));
    const fullDistance = 2 ** accelerations - 1;

    if (fullDistance === distance) {
      memo.set(distance, accelerations);
      return accelerations;
    }

    let best = (
      accelerations
      + 1
      + minimumInstructions(fullDistance - distance)
    );
    const partialDistance = 2 ** (accelerations - 1) - 1;

    for (
      let reverseAccelerations = 0;
      reverseAccelerations < accelerations - 1;
      reverseAccelerations += 1
    ) {
      const reverseDistance = 2 ** reverseAccelerations - 1;
      const remaining = distance - partialDistance + reverseDistance;
      const instructions = (
        accelerations
        + reverseAccelerations
        + 1
        + minimumInstructions(remaining)
      );
      best = Math.min(best, instructions);
    }

    memo.set(distance, best);
    return best;
  }

  return minimumInstructions(target);
}

module.exports = { racecar };
