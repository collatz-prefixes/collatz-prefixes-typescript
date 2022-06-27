import {assert} from 'console';
import {collatz_ECF} from './collatz';

/**
 * Returns the prefix of two numbers.
 * The prefix can be thought of as common prefix of the ECFs.
 * As an example, ECF(3) = [0, 1, 5] and ECF(7) = [0, 1, 2, 4, 7, 11].
 * The common prefix here is [0, 1], thus prefix(3,7) = prefix(7,3) = [0, 1].

 * @param n number 1
 * @param m number 2
 * @returns prefix
 */
export function prefix_find(n: bigint, m: bigint): number[] {
  if (n === m) return collatz_ECF(n);
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
 * If the prefix is equal to ECF of the number,
 * the result is expected to be 1.
 *
 * @param n number
 * @param pf prefix
 * @returns result of iterating the number over prefix
 */
export function prefix_iter(n: bigint, pf: number[]): bigint {
  if (pf.length === 0) return n;
  n = n / 2n ** BigInt(pf[0]);
  for (let i = 1; i < pf.length; ++i) {
    assert((n & 1n) === 1n);
    n = 3n * n + 1n;
    n = n / 2n ** BigInt(pf[i] - pf[i - 1]);
  }
  return n;
}

/**
 * Returns the ID of the prefix.
 * Every prefix is unique with respect to their ID.
 * The numbers in the prefix actually tell you which bits to to write 1 in the binary representation.
 *
 * @param pf prefix
 * @returns prefix ID
 */
export function prefix_map_to_num(pf: number[]): bigint {
  if (pf.length === 0) return 0n;
  let ans = 0n;
  pf.forEach(p => {
    ans += 2n ** BigInt(p);
  });
  return ans;
}

/**
 * Generate possible prefixes that appear for paths up to the given length.
 *
 * In other words, prefix_generate(length) = all the prefixes that appear in PIPTree(length)
 * n: 1 -> [[0]]
 * n: 2 -> [[0], [1], [0, 1]]
 * n: 3 -> [[0], [1], [0, 1], [2], [0, 2], [1, 2], [0, 1, 2]]
 *
 * @param l maximum length of a prefix array
 * @returns list of prefixes
 */
export function prefix_generate(l: number): number[][] {
  if (l !== 1) {
    const a = prefix_generate(l - 1);
    const b = [...a]; // or cloneDeep(a) by lodash
    for (let i = 0; i < a.length; ++i) {
      a[i].push(l - 1);
      b.push(a[i]);
    }
    b.push([l - 1]);
    return b;
  } else {
    return [[0]];
  }
}

/**
 * Attach two prefixes together.
 * @param pf1 first prefix
 * @param pf2 second prefix
 * @returns prefix
 */
export function prefix_add(pf1: number[], pf2: number[]): number[] {
  if (pf1.length === 0) {
    return pf2;
  } else {
    const pf1last = pf1.pop()!; // ! to show it cant be null
    pf2 = pf2.map(v => v + pf1last);
    pf1 = pf1.concat(pf2);
    return pf1;
  }
}
