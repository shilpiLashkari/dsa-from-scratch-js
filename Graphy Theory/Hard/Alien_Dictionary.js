/**
 * 269. Alien Dictionary
 *
 * Time: O(total characters + unique ordering edges)
 * Space: O(unique characters + unique ordering edges)
 *
 * @param {string[]} words
 * @return {string}
 */
function alienOrder(words) {
  const graph = new Map();
  const indegree = new Map();

  for (const word of words) {
    for (const character of word) {
      graph.set(character, graph.get(character) ?? new Set());
      indegree.set(character, indegree.get(character) ?? 0);
    }
  }

  for (let index = 1; index < words.length; index += 1) {
    const previous = words[index - 1];
    const current = words[index];

    if (previous.length > current.length && previous.startsWith(current)) {
      return "";
    }

    const sharedLength = Math.min(previous.length, current.length);

    for (let position = 0; position < sharedLength; position += 1) {
      const before = previous[position];
      const after = current[position];

      if (before === after) {
        continue;
      }

      if (!graph.get(before).has(after)) {
        graph.get(before).add(after);
        indegree.set(after, indegree.get(after) + 1);
      }

      break;
    }
  }

  const queue = [];
  let front = 0;

  for (const [character, degree] of indegree) {
    if (degree === 0) {
      queue.push(character);
    }
  }

  let order = "";

  while (front < queue.length) {
    const character = queue[front];
    front += 1;
    order += character;

    for (const neighbor of graph.get(character)) {
      indegree.set(neighbor, indegree.get(neighbor) - 1);

      if (indegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  return order.length === indegree.size ? order : "";
}

module.exports = { alienOrder };
