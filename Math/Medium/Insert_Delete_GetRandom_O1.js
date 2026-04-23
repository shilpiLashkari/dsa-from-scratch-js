/**
 * Insert Delete GetRandom O(1)
 * 
 * Strategy: To achieve O(1) for all operations, we use a combination of a 
 * Map and an Array. The Map stores 'value' to its 'index' in the array, 
 * allowing O(1) insertion and deletion. The Array stores the values 
 * themselves, allowing O(1) random access by picking a random index. 
 * To delete an element in O(1), we swap the target element with the last 
 * element in the array, update the index in the Map, and then pop the array.
 * 
 * Time Complexity: O(1) for insert, remove, and getRandom.
 * Space Complexity: O(N) to store N elements.
 */

class RandomizedSet {
    constructor() {
        this.map = new Map();
        this.list = [];
    }

    /** 
     * @param {number} val
     * @return {boolean}
     */
    insert(val) {
        if (this.map.has(val)) return false;
        this.map.set(val, this.list.length);
        this.list.push(val);
        return true;
    }

    /** 
     * @param {number} val
     * @return {boolean}
     */
    remove(val) {
        if (!this.map.has(val)) return false;
        
        const idx = this.map.get(val);
        const lastVal = this.list[this.list.length - 1];
        
        // Move the last element to the position of the element to be removed
        this.list[idx] = lastVal;
        this.map.set(lastVal, idx);
        
        // Remove the last element
        this.list.pop();
        this.map.delete(val);
        
        return true;
    }

    /**
     * @return {number}
     */
    getRandom() {
        const randomIndex = Math.floor(Math.random() * this.list.length);
        return this.list[randomIndex];
    }
}

// Example Test Cases
const rs = new RandomizedSet();
console.log("Insert 1:", rs.insert(1));      // Expected: true
console.log("Remove 2:", rs.remove(2));      // Expected: false
console.log("Insert 2:", rs.insert(2));      // Expected: true
console.log("Random:", rs.getRandom());      // Expected: 1 or 2
console.log("Remove 1:", rs.remove(1));      // Expected: true
console.log("Insert 2 (again):", rs.insert(2)); // Expected: false
console.log("Random:", rs.getRandom());      // Expected: 2

module.exports = RandomizedSet;
