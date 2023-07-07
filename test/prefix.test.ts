import {collatzECF, prefixAdd, prefixFind, prefixIterate, prefixMapFromNum, prefixMapToNum} from '../src';

// Find Prefix by simply comparing the ECFs
function prefixBrute(a: number[], b: number[]): number[] {
  const l = Math.min(a.length, b.length);
  const ans = [];
  for (let i = 0; i < l; i++) {
    if (a[i] === b[i]) {
      ans.push(a[i]);
    } else {
      break;
    }
  }

  return ans;
}

describe('prefix calculations', () => {
  it('should compute prefix of two numbers', () => {
    const cases: {n: bigint; m: bigint}[] = [
      {n: 1n, m: 2n},
      {n: 3n, m: 12n},
      {n: 8n, m: 16n},
      {n: 27n, m: 37n},
    ];
    for (const test of cases) {
      const ecfN = collatzECF(test.n);
      const ecfM = collatzECF(test.m);
      const pf = prefixBrute(ecfN, ecfM);

      expect(prefixFind(test.n, test.m)).toEqual(pf);
      expect(prefixFind(test.m, test.n)).toEqual(pf);
      expect(prefixIterate(test.n, ecfN)).toEqual(1n);
      expect(prefixIterate(test.m, ecfM)).toEqual(1n);
    }
  });

  it('should add prefixes', () => {
    const cases: {pf1: number[]; pf2: number[]; result: number[]}[] = [
      {pf1: [], pf2: [1], result: [1]},
      {pf1: [1], pf2: [], result: [1]},
      {pf1: [2, 4], pf2: [4], result: [2, 8]},
      {pf1: [4], pf2: [2, 4], result: [6, 8]},
      {pf1: [0, 1, 5], pf2: [0, 1, 3], result: [0, 1, 5, 6, 8]},
    ];
    for (const test of cases) {
      expect(prefixAdd(test.pf1, test.pf2)).toEqual(test.result);
    }
  });

  it('should map to and from a prefix', () => {
    const cases: {n: bigint; pf: number[]}[] = [
      {n: 1n, pf: [0]},
      {n: 16n, pf: [4]},
      {n: 27n, pf: [0, 1, 3, 4]},
      {n: 35n, pf: [0, 1, 5]},
      {n: 12n, pf: [2, 3]},
      {n: 190n, pf: [1, 2, 3, 4, 5, 7]},
    ];
    for (const test of cases) {
      expect(prefixMapToNum(test.pf)).toEqual(test.n);
      expect(prefixMapFromNum(test.n)).toEqual(test.pf);
    }
  });
});
