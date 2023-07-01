import {prefixAdd, prefixFind, prefixIterate} from '../src';

describe('prefix', () => {
  let pf: number[];

  beforeAll(() => {
    pf = prefixFind(n, m);
  });

  it('should be commutative', () => {
    expect(pf).toEqual(prefixFind(m, n));
  });

  it('should correctly iterate prefix', () => {
    if (pf.length !== 0) {
      // result should be odd number
      expect(prefixIterate(n, pf) & 1n).toEqual(1n);
    }
    expect(prefixIterate(3n, [0, 1, 5])).toEqual(1n);
  });

  it('should correctly add prefixes', () => {
    expect(prefixAdd([0, 1, 2, 3], [2, 3, 4])).toEqual([0, 1, 2, 5, 6, 7]);
  });
