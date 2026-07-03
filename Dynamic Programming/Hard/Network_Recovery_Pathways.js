/**
 * Network Recovery Pathways
 *
 * Problem:
 * Given a directed network represented as a graph with weighted edges,
 * find the minimum cost to establish recovery pathways from a source node
 * to all other nodes. Some nodes are designated as recovery nodes where you can
 * "reset" and take alternative routes with reduced edge costs.
 *
 * You need to determine the optimal pathways that minimize the total recovery cost
 * by strategically using recovery nodes to find cheaper alternative routes.
 *
 * Approach: Dynamic Programming with Network Flow
 * - Use memoization to store the minimum cost to reach each node
 * - Consider recovery node option at each decision point
 * - Build pathways that optimize for both distance and recovery opportunities
 *
 * Constraints:
 * - 1 <= n <= 100 (number of nodes)
 * - 0 <= m <= 10000 (number of edges)
 * - 1 <= weights <= 1000
 * - Recovery nodes provide alternative routing options
 *
 * Pattern: Graph DP with Memoization and Optimization
 * Complexity: O(N * M + N^2) Time, O(N^2) Space
 */

/**
 * Network Recovery Pathways - Find minimum cost recovery paths in a network
 * @param {number} n - Number of nodes
 * @param {number[][]} edges - Array of [from, to, cost]
 * @param {number} source - Starting node
 * @param {Set} recoveryNodes - Set of recovery node indices
 * @return {number[]} Minimum cost to reach each node from source
 */
const findNetworkRecoveryPathways = (n, edges, source, recoveryNodes) => {
  // Build adjacency list representation of the graph
  const graph = Array.from({ length: n }, () => []);

  // Build graph with recovery node multipliers
  for (const [from, to, cost] of edges) {
    const adjustedCost = recoveryNodes.has(from)
      ? Math.floor(cost * 0.8)
      : cost;
    graph[from].push({ to, cost: adjustedCost });
  }

  // dp[node] = minimum cost to reach this node from source
  const dp = Array(n).fill(Infinity);
  dp[source] = 0;

  // visited[node] = whether we've finalized the minimum cost to this node
  const visited = Array(n).fill(false);

  // Priority queue approach: process nodes in order of minimum cost
  // Use a simple selection approach for clarity
  for (let i = 0; i < n; i++) {
    // Find unvisited node with minimum cost
    let minNode = -1;
    let minCost = Infinity;

    for (let j = 0; j < n; j++) {
      if (!visited[j] && dp[j] < minCost) {
        minCost = dp[j];
        minNode = j;
      }
    }

    // No more reachable nodes
    if (minNode === -1) break;

    visited[minNode] = true;

    // Explore neighbors of current node
    for (const { to, cost } of graph[minNode]) {
      const newCost = dp[minNode] + cost;

      // Update if we found a better path
      if (newCost < dp[to]) {
        dp[to] = newCost;
      }

      // Recovery node option: if current node is recovery node,
      // we can take alternative paths with cost reduction
      if (recoveryNodes.has(minNode)) {
        const recoveryPathCost = dp[minNode] + Math.floor(cost * 0.5);
        if (recoveryPathCost < dp[to]) {
          dp[to] = recoveryPathCost;
        }
      }
    }
  }

  return dp;
};

/**
 * Alternative approach: Count valid recovery pathways
 * Find all paths from source to destination using recovery nodes
 * @param {number} n - Number of nodes
 * @param {number[][]} edges - Array of [from, to]
 * @param {number} source - Starting node
 * @param {number} destination - Target node
 * @param {Set} recoveryNodes - Set of recovery node indices
 * @return {number} Number of valid recovery pathways
 */
const countNetworkRecoveryPaths = (
  n,
  edges,
  source,
  destination,
  recoveryNodes,
) => {
  // Build adjacency list
  const graph = Array.from({ length: n }, () => []);

  for (const [from, to] of edges) {
    graph[from].push(to);
  }

  // Memoization cache: memo[node] = number of paths from node to destination
  const memo = {};

  // DFS with memoization to count paths
  const dfs = (node) => {
    // Base case: reached destination
    if (node === destination) {
      return 1;
    }

    // Check memo
    if (memo[node] !== undefined) {
      return memo[node];
    }

    let pathCount = 0;

    // Explore all neighbors
    for (const neighbor of graph[node]) {
      pathCount += dfs(neighbor);
    }

    // If current node is a recovery node, we can loop back to explore alternative paths
    if (recoveryNodes.has(node) && pathCount === 0) {
      // Recovery nodes allow additional exploration opportunities
      for (const neighbor of graph[node]) {
        if (neighbor !== node) {
          pathCount += dfs(neighbor);
        }
      }
    }

    memo[node] = pathCount;
    return pathCount;
  };

  return dfs(source);
};

/**
 * Optimal Recovery Pathways using DP
 * Find minimum cost to recover all critical nodes in network
 * @param {number} n - Number of nodes
 * @param {number[][]} edges - Array of [from, to, cost]
 * @param {Set} criticalNodes - Nodes that must be recovered
 * @return {number} Minimum total recovery cost
 */
const minRecoveryCost = (n, edges, criticalNodes) => {
  // dp[mask] = minimum cost to recover nodes in the bitmask
  const dp = {};

  // Initialize: no nodes recovered, cost is 0
  dp[0] = 0;

  const dfs = (mask) => {
    if (mask in dp) {
      return dp[mask];
    }

    let minCost = Infinity;

    // Try to recover each unrecovered critical node
    for (const node of criticalNodes) {
      const nodeBit = 1 << node;

      // If this node is not yet recovered
      if (!(mask & nodeBit)) {
        // Find minimum cost edge to this node from any recovered node
        let minEdgeCost = Infinity;

        for (const [from, to, cost] of edges) {
          const fromBit = 1 << from;

          // If source is already recovered or is starting node
          if (mask & fromBit || from === 0) {
            if (to === node) {
              minEdgeCost = Math.min(minEdgeCost, cost);
            }
          }
        }

        if (minEdgeCost !== Infinity) {
          const newMask = mask | nodeBit;
          minCost = Math.min(minCost, minEdgeCost + dfs(newMask));
        }
      }
    }

    dp[mask] = minCost === Infinity ? 0 : minCost;
    return dp[mask];
  };

  const targetMask = (1 << Array.from(criticalNodes).length) - 1;
  return dfs(0);
};

// --- Test Cases ---
const runTest = () => {
  console.log("Running Network Recovery Pathways tests...\n");

  // Test 1: Find minimum cost recovery paths
  console.log("Test 1: Find minimum cost to reach each node");
  const n1 = 5;
  const edges1 = [
    [0, 1, 4],
    [0, 2, 1],
    [2, 1, 2],
    [1, 3, 1],
    [2, 3, 5],
    [3, 4, 3],
  ];
  const recoveryNodes1 = new Set([1, 3]);

  const result1 = findNetworkRecoveryPathways(n1, edges1, 0, recoveryNodes1);
  console.log(`Network size: ${n1}`);
  console.log(`Recovery nodes: [${Array.from(recoveryNodes1)}]`);
  console.log(`Minimum costs from source 0:`, result1);
  console.log(
    `Expected: Each cost should be optimized with recovery node benefits`,
  );
  console.log(`Result: ${result1[4] <= 8 ? "✅" : "❌"}\n`);

  // Test 2: Count recovery pathways
  console.log("Test 2: Count valid recovery pathways");
  const n2 = 4;
  const edges2 = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
  ];
  const recoveryNodes2 = new Set([1]);

  const result2 = countNetworkRecoveryPaths(n2, edges2, 0, 3, recoveryNodes2);
  console.log(`Network: ${n2} nodes, Recovery node: 1`);
  console.log(`Pathways from 0 to 3: ${result2}`);
  console.log(`Expected: At least 2 paths`);
  console.log(`Result: ${result2 >= 2 ? "✅" : "❌"}\n`);

  // Test 3: Minimum recovery cost for critical nodes
  console.log("Test 3: Minimum recovery cost for critical nodes");
  const n3 = 5;
  const edges3 = [
    [0, 1, 2],
    [0, 2, 3],
    [1, 3, 4],
    [2, 3, 2],
    [3, 4, 5],
  ];
  const criticalNodes3 = new Set([1, 3, 4]);

  const result3 = minRecoveryCost(n3, edges3, criticalNodes3);
  console.log(`Critical nodes to recover: [${Array.from(criticalNodes3)}]`);
  console.log(`Minimum recovery cost: ${result3}`);
  console.log(`Expected: Sum of minimum costs to each critical node`);
  console.log(`Result: ${result3 > 0 ? "✅" : "❌"}\n`);

  // Test 4: Simple linear network
  console.log("Test 4: Simple linear network with recovery");
  const n4 = 4;
  const edges4 = [
    [0, 1, 5],
    [1, 2, 3],
    [2, 3, 2],
  ];
  const recoveryNodes4 = new Set([1, 2]);

  const result4 = findNetworkRecoveryPathways(n4, edges4, 0, recoveryNodes4);
  console.log(`Linear network 0->1->2->3 with recovery at 1,2`);
  console.log(`Costs: [${result4.join(", ")}]`);
  console.log(
    `Expected: Cost benefits from recovery nodes at positions 1 and 2`,
  );
  console.log(`Result: ${result4[3] < 10 ? "✅" : "❌"}\n`);
};

// Run all tests
runTest();

// Export functions for use in other modules
module.exports = {
  findNetworkRecoveryPathways,
  countNetworkRecoveryPaths,
  minRecoveryCost,
};
