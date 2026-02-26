// Problem: Event Emitter
// Design an EventEmitter class. This interface is similar (but with some differences) to the one found in Node.js or the DOM Event Target interface. The EventEmitter should allow for subscribing to events and emitting them.
// Your EventEmitter class should have the following two methods:
// - subscribe(eventName, callback): Should return an object with an unsubscribe method that when called removes the callback.
// - emit(eventName, args): Should execute all callbacks associated with the given eventName. Each callback should receive the args array passed to emit. The emit method should return an array of the results of all callback actions.
//
// Example 1:
// Input: actions = ["EventEmitter", "emit", "subscribe", "emit"], values = [[], ["firstEvent", []], ["firstEvent", "function cb1() { return 5; }"], ["firstEvent", [1, 2, 3]]]
// Output: [[], [], ["subscribed"], [5]]
// Explanation:
// const emitter = new EventEmitter();
// emitter.emit("firstEvent"); // [], no callback
// emitter.subscribe("firstEvent", function cb1() { return 5; });
// emitter.emit("firstEvent"); // [5]

// Solution:

class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    /**
     * @param {string} eventName
     * @param {Function} callback
     * @return {Object}
     */
    subscribe(eventName, callback) {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }

        const listeners = this.events.get(eventName);
        listeners.push(callback);

        return {
            unsubscribe: () => {
                const index = listeners.indexOf(callback);
                if (index !== -1) {
                    listeners.splice(index, 1);
                }
            }
        };
    }

    /**
     * @param {string} eventName
     * @param {Array} args
     * @return {Array}
     */
    emit(eventName, args = []) {
        if (!this.events.has(eventName)) {
            return [];
        }

        const listeners = this.events.get(eventName);

        return listeners.map(fn => fn(...args));
    }
}

// Notes:
// - This uses the Observer Pattern, common in event-driven systems.
// - I used a `Map` to link each 'event name' to a list of callback functions.
// - When `emit` is called, I look up the list and run every function in it.
// - When `subscribe` is called, I add the new function to the list and return a way to remove it later.
// - Time Complexity: O(1) to subscribe, O(N) to emit (where N is the number of listeners).
