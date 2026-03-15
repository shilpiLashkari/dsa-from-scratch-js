// Problem: Fancy Sequence (LeetCode 1622)

// Write an API that generates fancy sequences using the append, addAll, and multAll operations.
// 
// Implement the Fancy class:
// - Fancy() Initializes the object with an empty sequence.
// - void append(val) Appends an integer val to the end of the sequence.
// - void addAll(inc) Increments all existing values in the sequence by an integer inc.
// - void multAll(m) Multiplies all existing values in the sequence by an integer m.
// - int getIndex(idx) Gets the current value at index idx (0-indexed) of the sequence modulo 10^9 + 7. If the index is greater or equal than the length of the sequence, return -1.

const MOD = 1000000007n;

var Fancy = function() {
    this.seq = [];
    this.add = 0n;
    this.mult = 1n;
};

// Helper: modular exponentiation (base^exp % mod)
Fancy.prototype.modPow = function(base, exp) {
    let res = 1n;
    base = base % MOD;
    while (exp > 0n) {
        if (exp % 2n === 1n) res = (res * base) % MOD;
        base = (base * base) % MOD;
        exp /= 2n;
    }
    return res;
};

// Helper: modular inverse using Fermat's Little Theorem since MOD is prime
// inv(a) = a^(MOD-2) % MOD
Fancy.prototype.modInverse = function(n) {
    return this.modPow(n, MOD - 2n);
};

/** 
 * @param {number} val
 * @return {void}
 */
Fancy.prototype.append = function(val) {
    const v = BigInt(val);
    // We want a stored value 'x' such that (x * mult + add) % MOD == val % MOD
    // x * mult = (val - add) % MOD
    // x = (val - add) * modInverse(mult) % MOD
    
    // Ensure positive modulo result
    let adjustedVal = (v - this.add) % MOD;
    if (adjustedVal < 0n) {
        adjustedVal += MOD;
    }

    const x = (adjustedVal * this.modInverse(this.mult)) % MOD;
    this.seq.push(x);
};

/** 
 * @param {number} inc
 * @return {void}
 */
Fancy.prototype.addAll = function(inc) {
    this.add = (this.add + BigInt(inc)) % MOD;
};

/** 
 * @param {number} m
 * @return {void}
 */
Fancy.prototype.multAll = function(m) {
    const mBig = BigInt(m);
    this.mult = (this.mult * mBig) % MOD;
    this.add = (this.add * mBig) % MOD;
};

/** 
 * @param {number} idx
 * @return {number}
 */
Fancy.prototype.getIndex = function(idx) {
    if (idx >= this.seq.length) {
        return -1;
    }
    const val = (this.seq[idx] * this.mult + this.add) % MOD;
    return Number(val);
};

// Notes:
// - A naive implementation simulating the operations would result in Time Limit Exceeded (TLE)
//   because `addAll` and `multAll` would take O(N) time where N is the current sequence length.
// - We can optimize this using an affine transformation y = a*x + b, where `a` is a global multiplier
//   and `b` is a global adder.
// - When adding `inc`, the new transformation is y = a*x + (b + inc). So we just update `add += inc`.
// - When multiplying by `m`, the new transformation is y = m*(a*x + b) = (m*a)*x + (m*b).
//   So we update `mult *= m` and `add *= m`.
// - When appending `val`, we need to find an underlying value `x` that yields `val` when the 
//   current transformation is applied. Applying the inverse operations gives us:
//   x = (val - add) * (mult^-1) % MOD.
// - Since MOD (10^9 + 7) is prime, we can find the modular inverse using Fermat's Little Theorem:
//   a^(p-1) ≡ 1 (mod p) => a * a^(p-2) ≡ 1 (mod p) => a^-1 ≡ a^(p-2) (mod p).
// - Time Complexity:
//   - append: O(log MOD) due to modular exponentiation.
//   - addAll, multAll, getIndex: O(1).
// - Space Complexity: O(N) where N is the number of appended elements.

module.exports = { Fancy };
