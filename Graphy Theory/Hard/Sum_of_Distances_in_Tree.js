/**
 * 834. Sum of Distances in Tree
 *
 * Time: O(n)
 * Space: O(n)
 *
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
function sumOfDistancesInTree(n, edges) {
  const graph = Array.from({ length: n }, () => []);

  for (const [first, second] of edges) {
    graph[first].push(second);
    graph[second].push(first);
  }

  const parent = new Array(n).fill(-1);
  const order = [0];

  for (let index = 0; index < order.length; index += 1) {
    const node = order[index];

    for (const neighbor of graph[node]) {
      if (neighbor === parent[node]) {
        continue;
      }

      parent[neighbor] = node;
      order.push(neighbor);
    }
  }

  const subtreeSize = new Array(n).fill(1);
  const distances = new Array(n).fill(0);

  for (let index = n - 1; index > 0; index -= 1) {
    const node = order[index];
    const parentNode = parent[node];
    subtreeSize[parentNode] += subtreeSize[node];
    distances[parentNode] += distances[node] + subtreeSize[node];
  }

  for (let index = 1; index < n; index += 1) {
    const node = order[index];
    distances[node] = distances[parent[node]] + n - 2 * subtreeSize[node];
  }

  return distances;
}

module.exports = { sumOfDistancesInTree };
