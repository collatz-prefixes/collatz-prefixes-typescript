/**
 * Finds the first number that resides at the given path.
 * @param p path
 * @returns number
 */
export function PTON(p: boolean[]): bigint {
  p = FLIP(p);
  p.reverse();
  let n: bigint = BTON(p);
  n++;
  return n;
}

/**
 * Obtain the shortest path to given number.
 * @param n number
 * @returns path
 */
export function NTOP(n: bigint): boolean[] {
  n--;
  let p: boolean[] = NTOB(n);
  p.reverse();
  p = FLIP(p);
  return p;
}

/**
 * Find the number from its binary representation.
 * @param b binary representation
 * @returns number
 */
export function BTON(b: boolean[]): bigint {
  let ans = 0n;
  b.forEach(d => {
    ans <<= 1n;
    if (d) ans++;
  });
  return ans;
}

/**
 * Obtain the binary representation of a number
 * @param n number
 * @returns binary representation
 */
export function NTOB(n: bigint): boolean[] {
  const ans: boolean[] = [];
  while (n !== 0n) {
    ans.unshift((n & 1n) === 1n);
    n >>= 1n;
  }
  return ans;
}

/**
 * Flip the bits in a binary representation.
 * @param b binary representation
 * @returns flipped binary representation
 */
export function FLIP(b: boolean[]): boolean[] {
  return b.map(d => !d);
}

/**
 * Find if a given number is a power of two
 * @param n number
 * @returns true if number is a power of two
 */
export function ISPOW2(n: bigint): boolean {
  return n !== 0n && !(n & (n - 1n));
}

/**
 * Find the smallest power of two greater than or equal to the given number
 * @param n number
 * @returns next power of two
 */
export function NEXTPOW2(n: bigint): bigint {
  if (ISPOW2(n)) return n;
  let p = 1n;
  while (p < n) p <<= 1n;
  return p;
}
