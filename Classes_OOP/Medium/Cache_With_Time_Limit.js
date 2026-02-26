// Problem: Cache With Time Limit
// Write a class that allows getting and setting key-value pairs, however a time until expiration is associated with each key.
// The class has three public methods:
// - set(key, value, duration): accepts an integer key, an integer value, and a duration in milliseconds. Once the duration has elapsed, the key should be inaccessible. The method should return true if the same un-expired key already existed and false otherwise. Both the value and duration should be overwritten if the key already exists.
// - get(key): if an un-expired key exists, it should return the associated value. Otherwise it should return -1.
// - count(): returns the count of un-expired keys.
//
// Example 1:
// Input: 
// actions = ["TimeLimitedCache", "set", "get", "count", "get"]
// values = [[], [1, 42, 100], [1], [], [1]]
// timeDelays = [0, 0, 50, 50, 150]
// Output: [null, false, 42, 1, -1]
// Explanation:
// At t=0, the cache is constructed.
// At t=0, a key-value pair (1: 42) is added with a time limit of 100ms. The value doesn't exist so false is returned.
// At t=50, key=1 is requested and the value of 42 is returned.
// At t=50, count() is called and there is one active key in the cache.
// At t=100, key=1 expires for the first time.
// At t=150, get(1) is called but -1 is returned because the cache is empty.

// Solution:

var TimeLimitedCache = function () {
    this.cache = new Map();
};

/** 
 * @param {number} key
 * @param {number} value
 * @param {number} duration time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function (key, value, duration) {
    const keyExists = this.cache.has(key);

    if (keyExists) {
        clearTimeout(this.cache.get(key).timerId);
    }

    const timerId = setTimeout(() => {
        this.cache.delete(key);
    }, duration);

    this.cache.set(key, { value, timerId });

    return keyExists;
};

/** 
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function (key) {
    if (this.cache.has(key)) {
        return this.cache.get(key).value;
    }
    return -1;
};

/** 
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function () {
    return this.cache.size;
};

// Notes:
// - I store the data in a `Map` because it allows quick access.
// - The trick is that I store an object `{ value, timerId }`.
// - Whenever I set a key, I schedule its self-destruction using `setTimeout`.
// - If the key is overwritten before it expires, I carefully cancel the old self-destruction timer using `clearTimeout`.
// - Time Complexity: O(1) for all operations.
