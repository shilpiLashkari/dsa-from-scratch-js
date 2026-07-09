/**
 * Path Existence Queries in a Graph I
 *
 * You are given an undirected graph with n nodes and a list of edges. For each
 * query [u, v], determine whether there exists a path from u to v.
 *
 * Example:
 * Input: n = 3, edges = [[1, 2], [2, 3]], queries = [[1, 3], [2, 3], [1, 2]]
 * Output: [true, true, true]
 *
 * Approach:
 * Use a Disjoint Set Union (Union-Find) structure to group all nodes that are
 * connected by the given edges. Once all unions are processed, two nodes are
 * connected if and only if they share the same root.
 *
 * Time Complexity: O((n + m + q) * α(n)) which is effectively O(n + m + q)
 * Space Complexity: O(n)
 *
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[][]} queries
 * @return {boolean[]}
 */
class DisjointSetUnion {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, index) => index);
    this.rank = Array(size).fill(0);
  }

  find(node) {
    if (this.parent[node] !== node) {
      this.parent[node] = this.find(this.parent[node]);
    }
    return this.parent[node];
  }

  union(firstNode, secondNode) {
    const rootFirst = this.find(firstNode);
    const rootSecond = this.find(secondNode);

    if (rootFirst === rootSecond) {
      return false;
    }

    if (this.rank[rootFirst] < this.rank[rootSecond]) {
      this.parent[rootFirst] = rootSecond;
    } else if (this.rank[rootFirst] > this.rank[rootSecond]) {
      this.parent[rootSecond] = rootFirst;
    } else {
      this.parent[rootSecond] = rootFirst;
      this.rank[rootFirst] += 1;
    }

    return true;
  }
}

var pathExistenceQueries = function (n, edges, queries) {
  const dsu = new DisjointSetUnion(n);

  for (const [firstNode, secondNode] of edges) {
    dsu.union(firstNode - 1, secondNode - 1);
  }

  return queries.map(([firstNode, secondNode]) => {
    return dsu.find(firstNode - 1) === dsu.find(secondNode - 1);
  });
};

/**
 * Notes:
 * 1. Each connected component is treated as a single set.
 * 2. Once the graph has been processed, every query becomes a constant-time
 *    check on the DSU roots.
 */

// Example usage
// console.log(pathExistenceQueries(3, [[1, 2], [2, 3]], [[1, 3], [2, 3], [1, 2]]));
// Output: [true, true, true]
