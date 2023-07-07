import {piptreePrefixFind, prefixIterate} from '../src';

describe('path-indexed prefix tree', () => {
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
      const pf = piptreePrefixFind(test.n);
      expect(pf).toEqual(test.pf);
      // should be even
      expect(prefixIterate(test.n, pf) % 1n).toEqual(0n);
    }
  });
});
