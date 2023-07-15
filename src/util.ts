/** Finds the first number that resides at the given path. */
export function fromPath(p: boolean[]): bigint {
  p = p.map(b => !b); // flip
  p.reverse(); // reverse
  let n = fromBinary(p); // to number
  n++; // increment
  return n;
}

/** Obtain the shortest path to given number. */
export function toPath(n: bigint): boolean[] {
  n--; // decrement
  let p = toBinary(n); // from binary
  p.reverse(); // reverse
  p = p.map(b => !b); // flip
  return p;
}

/** Find the number from its binary representation. */
export function fromBinary(b: boolean[]): bigint {
  let ans = 0n;
  b.forEach(isSet => {
    ans <<= 1n;
    if (isSet) ans++;
  });
  return ans;
}

/** Obtain the binary representation of a number. */
export function toBinary(n: bigint): boolean[] {
  const ans: boolean[] = [];
  while (n !== 0n) {
    ans.unshift((n & 1n) === 1n);
    n >>= 1n;
  }
  return ans;
}

/** Find if a given number is a power of two. */
export function isPower2(n: bigint): boolean {
  if (n === 0n) {
    return true;
  } else {
    return (n & (n - 1n)) === 0n;
  }
}
