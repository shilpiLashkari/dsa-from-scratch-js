/**
 * 780. Reaching Points
 *
 * Time: O(log(max(tx, ty)))
 * Space: O(1)
 *
 * @param {number} sx
 * @param {number} sy
 * @param {number} tx
 * @param {number} ty
 * @return {boolean}
 */
function reachingPoints(sx, sy, tx, ty) {
  while (tx > sx && ty > sy) {
    if (tx > ty) {
      tx %= ty;
    } else {
      ty %= tx;
    }
  }

  if (tx === sx && ty === sy) {
    return true;
  }

  if (tx === sx && ty >= sy) {
    return (ty - sy) % sx === 0;
  }

  if (ty === sy && tx >= sx) {
    return (tx - sx) % sy === 0;
  }

  return false;
}

module.exports = { reachingPoints };
