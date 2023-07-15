import {add, iterate} from './prefix';
import {toPath} from './util';

export function pathExtension(n: bigint, prefixFinder: (p: boolean[]) => number[]): number[] {
  const p: boolean[] = toPath(n);
  let pf: number[] = prefixFinder(p);
  while (iterate(n, pf) !== 1n) {
    p.push(true);
    pf = prefixFinder(p);
  }
  return pf;
}

export function prefixIterate(n: bigint, prefixFinder: (n: bigint) => number[]): number[] {
  let ans: number[] = [];
  let pf: number[] = [];

  // eslint-disable-next-line no-constant-condition
  while (true) {
    pf = prefixFinder(n);
    ans = add(ans, pf);
    n = iterate(n, pf);
    if (n === 1n) {
      return ans;
    } else {
      n = 3n * n + 1n;
      if (ans.length !== 0) {
        ans.push(ans[ans.length - 1]);
      }
    }
  }
}
