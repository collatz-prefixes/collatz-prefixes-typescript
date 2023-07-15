import {iterate} from './prefix';
import {fromPath, fromBinary, isPower2, toPath} from './util';

/**
 * Finds the nature of a path.
 *
 * @param p path
 * @param pf prefix
 * @param rpf root prefix
 * @returns nature
 */
export function findNature(p: boolean[], pf: number[], rpf: number): boolean {
  const n: bigint = fromPath(p);
  const iter_res: bigint = iterate(n, pf.concat(rpf + 1));
  return (iter_res & 1n) === 0n;
}

/**
 * Finds the path from root to the node indexed by p in PIPTree, with the path length of the root node being equal to |p|.
 *
 * It starts from the target, and in a loop either does `m/2` or `(m-1)/2` until it reaches 1.
 * This gives the path from that number to root, so we reverse that to obtain the road from path to target.
 *
 * NOTE: There could be a faster way to do this by just looking at the path. The number of 0s gives you the level. The direction can be read from the binary representation, [0, 1, 1] is like [R],
 * [1, 1, 1] is [R, R], [1, 0, 1] is [L, R] etc.
 *
 * @param p path
 * @returns list of directions
 */
export function getRootDirections(p: boolean[]): boolean[] {
  const ans: boolean[] = [];
  let i: bigint = fromBinary(p);
  while (i > 1n) {
    if ((i & 1n) === 0n) {
      i = i >> 1n;
      ans.push(false); // left
    } else {
      i = (i - 1n) >> 1n;
      ans.push(true); // right
    }
  }
  ans.reverse();
  return ans;
}

/**
 * Finds the prefix of a number using PIPTree properties.
 * @param input an integer or a path
 * @returns prefix
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
  }

  // find directions from root to p
  const dir: boolean[] = getRootDirections(p);

  // calculate the root prefix
  const rpf: number = p.length - 1;

  // calculate the root number
  const r: bigint = 1n << BigInt(rpf);

  // calculate the root path [0, 0, ..., 0, 1]
  const rp = Array.from({length: p.length}).fill(false);
  rp[rp.length - 1] = true;

  // start from the root and work your way to the target
  let cur_n: bigint = r;
  let cur_p: boolean[] = JSON.parse(JSON.stringify(rp));
  let cur_pf: number[] = [rpf];

  dir.forEach(d => {
    // find nature of current node
    const nat: boolean = findNature(cur_p, cur_pf, rpf);

    // minus 1 everything in the prefix
    cur_pf = cur_pf.map(x => x - 1);

    if (d) {
      // if BAD and RIGHT, append root prefix
      if (nat === false) {
        cur_pf.push(rpf);
      }

      // div 2
      cur_n = cur_n >> 1n;

      // go to the right child
      cur_p.push(true);
      cur_p = cur_p.slice(1);
    } else {
      // if GOOD and LEFT, append root prefix
      if (nat === true) {
        cur_pf.push(rpf);
      }

      // div 2 and plus root
      cur_n = (cur_n >> 1n) + r;

      // go to the left child
      cur_p.push(false);
      cur_p = cur_p.slice(1);
    }
  });

  return cur_pf;
}
