import {find} from './prefix';
import {toPath, fromPath, isPower2} from './util';

/**
 * Finds the next number that resides at the path of `n`.
 *
 * The path is also given, as `n` can be in different paths (see path extension)
 */
export function nextInPath(n: bigint, p: boolean[]): bigint {
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
export function prefixFind(input: bigint | boolean[]): number[] {
  // typechecking and assigning
  let p: boolean[], n: bigint;
  if (typeof input === 'bigint') {
    n = input;
    p = toPath(n);
  } else {
    p = input;
    n = fromPath(p);
  }

  // edge case: power of two
  if (isPower2(n)) {
    let ans = 0;
    while (n > 1n) {
      n >>= 1n;
      ans++;
    }
    return [ans];
  } else {
    return find(n, nextInPath(n, p));
  }
}
