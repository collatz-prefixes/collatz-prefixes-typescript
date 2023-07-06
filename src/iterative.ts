import {prefixAdd, prefixIterate} from './prefix';
import {toPath} from './util';

export function iterativePathExtension(n: bigint, prefix_finder: (p: boolean[]) => number[]): number[] {
  const p: boolean[] = toPath(n);
  let pf: number[] = prefix_finder(p);
  while (prefixIterate(n, pf) !== 1n) {
    p.push(true);
    pf = prefix_finder(p);
  }
  return pf;
}

export function iterativePrefix(n: bigint, prefix_finder: (n: bigint) => number[]): number[] {
  let ans: number[] = [];
  let pf: number[] = [];

  // eslint-disable-next-line no-constant-condition
  while (true) {
    pf = prefix_finder(n);
    ans = prefixAdd(ans, pf);
    n = prefixIterate(n, pf);
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
