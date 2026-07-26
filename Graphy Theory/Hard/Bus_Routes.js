/**
 * 815. Bus Routes
 *
 * Time: O(total route stops)
 * Space: O(total route stops)
 *
 * @param {number[][]} routes
 * @param {number} source
 * @param {number} target
 * @return {number}
 */
function numBusesToDestination(routes, source, target) {
  if (source === target) {
    return 0;
  }

  const stopToRoutes = new Map();

  for (let route = 0; route < routes.length; route += 1) {
    for (const stop of routes[route]) {
      if (!stopToRoutes.has(stop)) {
        stopToRoutes.set(stop, []);
      }

      stopToRoutes.get(stop).push(route);
    }
  }

  if (!stopToRoutes.has(source) || !stopToRoutes.has(target)) {
    return -1;
  }

  const queue = [source];
  const visitedStops = new Set([source]);
  const visitedRoutes = new Set();
  let front = 0;
  let buses = 0;

  while (front < queue.length) {
    const levelEnd = queue.length;
    buses += 1;

    while (front < levelEnd) {
      const stop = queue[front];
      front += 1;

      for (const route of stopToRoutes.get(stop) ?? []) {
        if (visitedRoutes.has(route)) {
          continue;
        }

        visitedRoutes.add(route);

        for (const nextStop of routes[route]) {
          if (nextStop === target) {
            return buses;
          }

          if (!visitedStops.has(nextStop)) {
            visitedStops.add(nextStop);
            queue.push(nextStop);
          }
        }
      }
    }
  }

  return -1;
}

module.exports = { numBusesToDestination };
