import {prefix_add, prefix_iter} from './prefix';
import {NTOP} from './util';

// overflows for numbers like 25
export function iterative_path_extension(n: bigint, prefix_finder: (p: boolean[]) => number[]): number[] {
  const p: boolean[] = NTOP(n);
  let pf: number[] = prefix_finder(p);
  let x: bigint = prefix_iter(n, pf);
  while (x !== 1n) {
    p.push(true);
    pf = prefix_finder(p);
    x = prefix_iter(n, pf);
  }
  return pf;
}

export function iterative_prefix(n: bigint, prefix_finder: (n: bigint) => number[]): number[] {
  let ans: number[] = [];
  let pf: number[] = [];

  // eslint-disable-next-line no-constant-condition
  while (true) {
    pf = prefix_finder(n);
    ans = prefix_add(ans, pf);
    n = prefix_iter(n, pf);
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
