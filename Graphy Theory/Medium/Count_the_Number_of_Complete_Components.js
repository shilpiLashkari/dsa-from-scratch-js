/**
 * Minimum Score of a Path Between Two Cities (LeetCode 2492)
 *
 * You are given n cities and a list of undirected roads. Each road has a
 * distance. The score of a path is the minimum distance among the roads used
 * in that path. Find the minimum possible score of a path from city 1 to city n.
 *
 * Example:
 * Input: n = 4, roads = [[1,2,9],[2,3,6],[2,4,5],[1,4,7]]
 * Output: 5
 *
 * Explanation:
 * The path 1 -> 2 -> 4 uses edges with weights 9 and 5. The minimum weight is 5.
 * We can also traverse 1 -> 4 -> 2 -> 4 to include the edge with weight 5.
 *
 * Approach:
 * Use a Disjoint Set Union (Union-Find) structure to track the minimum edge
 * weight for each connected component. As we union cities, we update the
 * representative root to store the smallest edge weight seen in that component.
 *
 * Time Complexity: O(m * alpha(n)), where m is the number of roads
 * Space Complexity: O(n)
 *
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
class DisjointSetUnion {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, index) => index);
    this.rank = Array(size).fill(0);
    this.minEdge = Array(size).fill(Infinity);
  }

  find(node) {
    if (this.parent[node] !== node) {
      this.parent[node] = this.find(this.parent[node]);
    }
    return this.parent[node];
  }

  union(firstNode, secondNode, weight) {
    const rootFirst = this.find(firstNode);
    const rootSecond = this.find(secondNode);

    const currentMin = Math.min(
      this.minEdge[rootFirst],
      this.minEdge[rootSecond],
      weight,
    );

    if (rootFirst === rootSecond) {
      this.minEdge[rootFirst] = currentMin;
      return false;
    }

    if (this.rank[rootFirst] < this.rank[rootSecond]) {
      this.parent[rootFirst] = rootSecond;
      this.minEdge[rootSecond] = currentMin;
    } else if (this.rank[rootFirst] > this.rank[rootSecond]) {
      this.parent[rootSecond] = rootFirst;
      this.minEdge[rootFirst] = currentMin;
    } else {
      this.parent[rootSecond] = rootFirst;
      this.rank[rootFirst] += 1;
      this.minEdge[rootFirst] = currentMin;
    }

    return true;
  }
}

var minScore = function (n, roads) {
  const dsu = new DisjointSetUnion(n);

  for (const [firstCity, secondCity, weight] of roads) {
    dsu.union(firstCity - 1, secondCity - 1, weight);
  }

  const root = dsu.find(0);
  return dsu.minEdge[root];
};

/**
 * Notes:
 * 1. The score of a path is determined by its absolute absolute minimum edge.
 * 2. Because nodes and edges can be visited multiple times, any edge in the
 * same connected component as city 1 can be part of the path.
 * 3. We maintain the minimum edge weight seen so far inside each root component.
 */
