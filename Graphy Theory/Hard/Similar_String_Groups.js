class UnionFind {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, index) => index);
    this.rank = new Array(size).fill(0);
    this.components = size;
  }

  find(node) {
    if (node !== this.parent[node]) {
      this.parent[node] = this.find(this.parent[node]);
    }

    return this.parent[node];
  }

  union(first, second) {
    let firstRoot = this.find(first);
    let secondRoot = this.find(second);

    if (firstRoot === secondRoot) {
      return;
    }

    if (this.rank[firstRoot] < this.rank[secondRoot]) {
      [firstRoot, secondRoot] = [secondRoot, firstRoot];
    }

    this.parent[secondRoot] = firstRoot;

    if (this.rank[firstRoot] === this.rank[secondRoot]) {
      this.rank[firstRoot] += 1;
    }

    this.components -= 1;
  }
}

/**
 * 839. Similar String Groups
 *
 * Time: O(words^2 * word length)
 * Space: O(words)
 *
 * @param {string[]} strs
 * @return {number}
 */
function numSimilarGroups(strs) {
  const unionFind = new UnionFind(strs.length);

  const areSimilar = (first, second) => {
    let differences = 0;

    for (let index = 0; index < first.length; index += 1) {
      if (first[index] !== second[index]) {
        differences += 1;

        if (differences > 2) {
          return false;
        }
      }
    }

    return differences === 0 || differences === 2;
  };

  for (let first = 0; first < strs.length; first += 1) {
    for (let second = first + 1; second < strs.length; second += 1) {
      if (areSimilar(strs[first], strs[second])) {
        unionFind.union(first, second);
      }
    }
  }

  return unionFind.components;
}

module.exports = { numSimilarGroups };
