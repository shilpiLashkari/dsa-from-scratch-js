/**
 * Minimum Score of a Path Between Two Cities (LeetCode 2492)
 *
 * You are given n cities and a list of undirected roads. Each road has a
 * distance. The score of a path is the maximum distance among the roads used
 * in that path. Find the minimum possible score of a path from city 1 to city n.
 *
 * Example:
 * Input: n = 4, roads = [[1,2,2],[2,3,4],[3,4,6],[1,4,8]]
 * Output: 6
 *
 * Explanation:
 * The path 1 -> 2 -> 3 -> 4 uses edges with maximum weight 6,
 * which is smaller than the direct route 1 -> 4 with weight 8.
 *
 * Approach:
 * Sort roads by weight and connect cities incrementally with a Disjoint Set
 * Union (Union-Find) structure. The moment city 1 and city n become connected,
 * the current road weight is the minimum possible bottleneck.
 *
 * Time Complexity: O(m log m), where m is the number of roads
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

var minScore = function (n, roads) {
  roads.sort((firstRoad, secondRoad) => firstRoad[2] - secondRoad[2]);

  const dsu = new DisjointSetUnion(n);

  for (const [firstCity, secondCity, weight] of roads) {
    dsu.union(firstCity - 1, secondCity - 1);

    if (dsu.find(0) === dsu.find(n - 1)) {
      return weight;
    }
  }

  return 0;
};

/**
 * Notes:
 * 1. We process roads from the lightest to the heaviest.
 * 2. As soon as cities 1 and n become connected, the current edge weight
 *    is the smallest possible bottleneck that still allows a path.
 * 3. This is the classic minimum bottleneck path problem.
 */

// Example usage
// console.log(minScore(4, [[1, 2, 2], [2, 3, 4], [3, 4, 6], [1, 4, 8]]));
// Output: 6
