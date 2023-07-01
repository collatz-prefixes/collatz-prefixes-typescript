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
 * Generate possible prefixes that appear for paths up to the given length.
 *
 * In other words, prefix_generate(length) = all the prefixes that appear in PIPTree(length)
 */
export function prefixGenerate(l: number): number[][] {
  if (l !== 1) {
    const a = prefixGenerate(l - 1);
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
