/**
 * Problem: Minimum Initial Energy to Finish Tasks
 * Difficulty: Hard
 * Topic: Array, Greedy, Sorting
 * 
 * You are given an array tasks where tasks[i] = [actuali, minimumi]:
 * - actuali is the actual amount of energy you spend to finish the i-th task.
 * - minimumi is the minimum amount of energy you require to begin the i-th task.
 * 
 * For example, if the task is [10, 12] and your current energy is 11, you cannot 
 * start this task. However, if your current energy is 13, you can complete 
 * this task, and your energy will become 3.
 * 
 * You can finish the tasks in any order you like.
 * Return the minimum initial amount of energy you will need to finish all the tasks.
 */

/**
 * Calculates the minimum initial energy required to complete all tasks.
 * 
 * @param {number[][]} tasks - Array of [actual, minimum] energy pairs.
 * @returns {number} - The minimum initial energy needed.
 * 
 * Time Complexity: O(N log N) - due to sorting the tasks array.
 * Space Complexity: O(1) or O(N) - depending on the sort implementation's space.
 */
function minimumEffort(tasks) {
  // Greedy Strategy: Sort tasks by the "overhead" (minimum - actual) in descending order.
  // Tasks that require significantly more energy to start than they consume should 
  // be tackled earlier to make use of the higher initial energy.
  tasks.sort((a, b) => (b[1] - b[0]) - (a[1] - a[0]));

  let initialEnergy = 0;
  let currentEnergy = 0;

  for (const [actual, minimum] of tasks) {
    // If current energy is less than the minimum required for the task
    if (currentEnergy < minimum) {
      // Add the deficit to our initial energy budget
      initialEnergy += (minimum - currentEnergy);
      // Update current energy to the minimum required to start
      currentEnergy = minimum;
    }
    // Spend the actual energy required for the task
    currentEnergy -= actual;
  }

  return initialEnergy;
}

// --- Test Cases ---

function runTests() {
  const testCases = [
    {
      tasks: [[1, 2], [2, 4], [4, 8]],
      expected: 8,
      description: "Example 1"
    },
    {
      tasks: [[1, 3], [2, 4], [10, 11], [10, 12], [8, 9]],
      expected: 32,
      description: "Example 2"
    },
    {
      tasks: [[1, 7], [2, 8], [3, 9], [4, 10], [5, 11], [6, 12]],
      expected: 27,
      description: "Example 3"
    },
    {
      tasks: [[5, 5], [1, 2], [3, 4]],
      expected: 9,
      description: "Tasks with zero overhead"
    },
    {
      tasks: [[10, 10]],
      expected: 10,
      description: "Single task"
    }
  ];

  console.log("Running Tests for Minimum Initial Energy to Finish Tasks...\n");

  testCases.forEach((tc, index) => {
    const result = minimumEffort(tc.tasks);
    const passed = result === tc.expected;
    console.log(`Test ${index + 1}: ${tc.description}`);
    console.log(`  Expected: ${tc.expected}, Got: ${result}`);
    console.log(`  Status: ${passed ? "✅ PASSED" : "❌ FAILED"}\n`);
  });
}

// Run the tests
runTests();

module.exports = minimumEffort;
