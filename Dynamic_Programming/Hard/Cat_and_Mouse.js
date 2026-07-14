// Problem: Cat and Mouse (LeetCode #913)
// A game on an undirected graph is played by two players, Mouse and Cat, who alternate turns.
// The graph is given as an adjacency list graph.
// The game starts with Mouse at node 1, Cat at node 2, and the Hole at node 0.
// If Mouse reaches the Hole, it wins. If Cat catches Mouse, it wins.
// If the game reaches a state that has been seen before, it's a draw.
//
// Return 1 if Mouse wins, 2 if Cat wins, or 0 if it's a draw.
//
// Example 1:
// Input: graph = [[2,5],[3],[0,4,5],[1,4,5],[2,3],[0,2,3]] -> Output: 0
//
// Constraints:
// - 3 <= graph.length <= 50
// - graph[i] is a valid adjacency list.
// - Cat cannot enter node 0 (the Hole).

/**
 * @param {number[][]} graph
 * @return {number}
 */
var catMouseGame = function(graph) {
    const n = graph.length;
    // status[m][c][turn] where turn 0 is Mouse, 1 is Cat
    // 0: draw, 1: mouse win, 2: cat win
    const status = Array.from({ length: n }, () => 
        Array.from({ length: n }, () => new Int8Array(3).fill(0))
    );
    
    // tracks how many winning/losing moves are available from each state
    const degrees = Array.from({ length: n }, () => 
        Array.from({ length: n }, () => new Int16Array(3).fill(0))
    );

    const queue = [];

    for (let m = 0; m < n; m++) {
        for (let c = 0; c < n; c++) {
            // Mouse's turn: degree is based on mouse moves
            degrees[m][c][1] = graph[m].length;
            // Cat's turn: degree is based on cat moves (excluding hole)
            degrees[m][c][2] = graph[c].filter(next => next !== 0).length;
        }
    }

    // Known starting win/loss states
    for (let i = 1; i < n; i++) {
        // Mouse in Hole -> Mouse wins
        status[0][i][1] = 1;
        status[0][i][2] = 1;
        queue.push([0, i, 1, 1], [0, i, 2, 1]);
        
        // Cat catches Mouse -> Cat wins
        status[i][i][1] = 2;
        status[i][i][2] = 2;
        queue.push([i, i, 1, 2], [i, i, 2, 2]);
    }

    while (queue.length > 0) {
        const [m, c, t, res] = queue.shift();
        
        // If we found the result for the actual starting state
        if (m === 1 && c === 2 && t === 1) return res;

        const prevTurn = t === 1 ? 2 : 1;
        
        // Check states that can reach the current known state
        const prevStates = [];
        if (prevTurn === 1) { // Mouse's turn previous
            for (const prevM of graph[m]) prevStates.push([prevM, c, 1]);
        } else { // Cat's turn previous
            for (const prevC of graph[c]) {
                if (prevC !== 0) prevStates.push([m, prevC, 2]);
            }
        }

        for (const [pm, pc, pt] of prevStates) {
            if (status[pm][pc][pt] === 0) {
                // If the player who just moved can win, they will take it
                if (res === pt) {
                    status[pm][pc][pt] = res;
                    queue.push([pm, pc, pt, res]);
                } else {
                    // Else, decrement degree. If no other moves left, the player lost
                    degrees[pm][pc][pt]--;
                    if (degrees[pm][pc][pt] === 0) {
                        status[pm][pc][pt] = 3 - pt; // opposite of current turn index
                        queue.push([pm, pc, pt, status[pm][pc][pt]]);
                    }
                }
            }
        }
    }

    return status[1][2][1];
};

// Notes:
// - This is a game theory problem solved with state-space analysis and topological sort (BFS).
// - We use a 3D DP table `status[m][c][turn]` to track known outcomes.
// - Instead of simple recursion, we propagate known winning/losing states backwards using `degrees`.
// - If a player can reach a winning state, that state is marked as won.
// - If all reachable states lead to the player losing, that state is marked as lost.
// - Time Complexity: O(N^3) as there are N^2 * 2 states and each edge is visited at most twice.
// - Space Complexity: O(N^2) for status and degrees.
