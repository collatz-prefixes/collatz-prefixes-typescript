import {util, riptree, prefix} from '../src';

describe('recursive index-parity tree', () => {
  it('should find prefix', () => {
    const cases: {n: bigint; pf: number[]}[] = [
      {n: 1n, pf: [0]},
      {n: 2n, pf: [1]},
      {n: 8n, pf: [3]},
      {n: 5n, pf: [0]},
      {n: 3n, pf: [0, 1]},
      {n: 7n, pf: [0, 1, 2]},
      {n: 27n, pf: [0, 1, 3, 4]},
      {n: 321n, pf: [0, 2, 4]},
      {n: 322n, pf: [1, 3, 5, 6, 8]},
    ];
    for (const test of cases) {
      const pf = riptree.prefixFind(test.n);
      expect(pf).toEqual(test.pf);
      // should be odd
      expect(prefix.iterate(test.n, pf) % 1n).toEqual(0n);
    }
  });

  it('should find next number at path', () => {
    const cases: {n: bigint; k: bigint}[] = [
      {n: 1n, k: 2n},
      {n: 2n, k: 4n},
      {n: 3n, k: 7n},
      {n: 5n, k: 13n},
      {n: 7n, k: 15n},
    ];
    for (const test of cases) {
      expect(riptree.nextInPath(test.n, util.toPath(test.n))).toEqual(test.k);
    }
  });
});
