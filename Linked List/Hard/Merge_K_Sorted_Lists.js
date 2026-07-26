/**
 * LeetCode 23: Merge k Sorted Lists
 *
 * Keep the current head of every non-empty list in a min-heap. Repeatedly append
 * the smallest node and insert its successor.
 *
 * Time Complexity: O(n log k)
 * Space Complexity: O(k)
 */

class MinHeap {
  constructor() {
    this.values = [];
  }

  push(node) {
    this.values.push(node);
    let index = this.values.length - 1;

    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.values[parent].val <= node.val) break;
      this.values[index] = this.values[parent];
      index = parent;
    }

    this.values[index] = node;
  }

  pop() {
    const minimum = this.values[0];
    const last = this.values.pop();
    if (this.values.length === 0) return minimum;

    let index = 0;
    this.values[0] = last;

    while (true) {
      let smallest = index;
      const left = index * 2 + 1;
      const right = left + 1;

      if (left < this.values.length && this.values[left].val < this.values[smallest].val) smallest = left;
      if (right < this.values.length && this.values[right].val < this.values[smallest].val) smallest = right;
      if (smallest === index) break;

      [this.values[index], this.values[smallest]] = [
        this.values[smallest],
        this.values[index],
      ];
      index = smallest;
    }

    return minimum;
  }
}

/**
 * @param {Array<ListNode|null>} lists
 * @return {ListNode|null}
 */
var mergeKLists = function (lists) {
  const heap = new MinHeap();
  for (const head of lists) if (head !== null) heap.push(head);

  const dummy = { val: 0, next: null };
  let tail = dummy;

  while (heap.values.length > 0) {
    const node = heap.pop();
    if (node.next !== null) heap.push(node.next);
    tail = tail.next = node;
  }

  return dummy.next;
};

module.exports = { mergeKLists };
