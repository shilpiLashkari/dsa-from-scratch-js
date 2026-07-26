/**
 * 847. Shortest Path Visiting All Nodes
 *
 * Time: O(n * 2^n)
 * Space: O(n * 2^n)
 *
 * @param {number[][]} graph
 * @return {number}
 */
function shortestPathLength(graph) {
  const nodeCount = graph.length;

  if (nodeCount <= 1) {
    return 0;
  }

  const allVisited = (1 << nodeCount) - 1;
  const queue = [];
  const visited = Array.from(
    { length: nodeCount },
    () => new Set(),
  );
  let front = 0;

  for (let node = 0; node < nodeCount; node += 1) {
    const mask = 1 << node;
    queue.push([node, mask, 0]);
    visited[node].add(mask);
  }

  while (front < queue.length) {
    const [node, mask, distance] = queue[front];
    front += 1;

    for (const neighbor of graph[node]) {
      const nextMask = mask | (1 << neighbor);

      if (nextMask === allVisited) {
        return distance + 1;
      }

      if (!visited[neighbor].has(nextMask)) {
        visited[neighbor].add(nextMask);
        queue.push([neighbor, nextMask, distance + 1]);
      }
    }
  }

  return -1;
}

module.exports = { shortestPathLength };
