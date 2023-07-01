import {prefixFind} from './prefix';
import {ISPOW2, PTON, NTOP} from './util';

/**
 * Generate possible paths up to the given length (inclusive)
 * @param len length of the path
 * @returns list of paths
 */
export function pathGenerate(len: number): boolean[][] {
  if (len !== 1) {
    const a: boolean[][] = pathGenerate(len - 1);
    for (let i = 0; i < a.length; ++i) {
      if (a[i].length === len - 1) {
        const x: boolean[] = JSON.parse(JSON.stringify(a[i]));
        const y: boolean[] = JSON.parse(JSON.stringify(a[i]));
        x.push(false);
        y.push(true);
        a.push(x);
        a.push(y);
      }
    }
    return a;
  } else {
    return [[false], [true]];
  }
}

/**
 * Finds the next number that resides at the path of `n`.
 *
 * The path is also given, as `n` can be in different paths (see path extension)
 */
export function riptreeNextInPath(n: bigint, p: boolean[]): bigint {
  return n + 2n ** BigInt(p.length);
}

/**
 * Finds the prefix of a number, or a number at the given path.
 *
 * We obtain the next number in that path with n + 2^|p|.
 * Then we look at the prefix of these two numbers.
 *
 * Note that sometimes the prefix of one number might fall short because the other one reached 1.
 * However, we can extend such cases by looping 1 -> 1 and extending the respectiveECF.
 */
export function riptreePrefixFind(input: bigint | boolean[]): number[] {
  // typechecking and assigning
  let p: boolean[], n: bigint;
  if (typeof input === 'bigint') {
    n = input;
    p = NTOP(n);
  } else {
    p = input;
    n = PTON(p);
  }

  // edge case: power of two
  if (ISPOW2(n)) {
    let ans = 0;
    while (n > 1n) {
      n >>= 1n;
      ans++;
    }
    return [ans];
  }

  return prefixFind(n, riptreeNextInPath(n, p));
}
