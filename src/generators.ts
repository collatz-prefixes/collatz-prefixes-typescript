import {toBinary} from './util';

/** Generate possible paths of the given length. */
export function generatePaths(len: number): boolean[][] {
  return Array.from({length: 1 << len}, (_, n) => {
    const b = toBinary(BigInt(n));
    if (b.length < len) {
      return Array.from({length: len - b.length}, () => false).concat(b);
    } else {
      return b;
    }
  });
}

/** Generate possible prefixes that appear for paths up to the given length. */
export function generatePrefixes(l: number): number[][] {
  if (l !== 1) {
    const a = generatePrefixes(l - 1);
    const b = [...a]; // clone deep
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
