import {collatzECF} from './collatz';

/**
 * Returns the prefix of two numbers.
 *
 * The prefix can be thought of as common prefix of the ECFs.
 * As an example, ECF(3) = [0, 1, 5] and ECF(7) = [0, 1, 2, 4, 7, 11].
 * The common prefix here is [0, 1], thus prefix(3,7) = prefix(7,3) = [0, 1].
 */
export function prefixFind(n: bigint, m: bigint): number[] {
  if (n === m) return collatzECF(n);
  const ans: number[] = [];
  let twos = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if ((n & 1n) === 0n && (m & 1n) === 0n) {
      // both are even
      twos++;
      n = n >> 1n;
      m = m >> 1n;
    } else if ((n & 1n) === 1n && (m & 1n) === 1n) {
      // both are odd
      ans.push(twos);
      n = 3n * n + 1n;
      m = 3n * m + 1n;
    } else break; // different parity
  }
  return ans;
}

/**
 * Iterates a number through a prefix.
 *
 * If the prefix is equal to ECF of the number,
 * the result is expected to be 1.
 */
export function prefixIterate(n: bigint, pf: number[]): bigint {
  if (pf.length === 0) return n;
  n = n / 2n ** BigInt(pf[0]);
  for (let i = 1; i < pf.length; ++i) {
    n = 3n * n + 1n;
    n = n / 2n ** BigInt(pf[i] - pf[i - 1]);
  }
  return n;
}

/** Bijective mapping from a prefix to a number. */
export function prefixMapToNum(pf: number[]): bigint {
  return pf.map(BigInt).reduce((acc, p) => acc + 2n ** p, 0n);
}

/** Bijective mapping from a number to a prefix. */
export function prefixMapFromNum(n: bigint): number[] {
  const ans: number[] = [];
  for (let bitPos = 0; n > 0; bitPos++) {
    if ((n & 1n) === 1n) {
      ans.push(bitPos);
    }
    n >>= 1n;
  }
  return ans;
}

/** Add two prefixes. */
export function prefixAdd(pf1: number[], pf2: number[]): number[] {
  if (pf1.length === 0) {
    return pf2;
  } else if (pf2.length === 0) {
    return pf1;
  } else {
    const pf1last = pf1.pop()!; // ! to show it cant be null
    pf2 = pf2.map(v => v + pf1last);
    pf1 = pf1.concat(pf2);
    return pf1;
  }
}
