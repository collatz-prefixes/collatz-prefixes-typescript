import {iterative, collatz, riptree, piptree} from '../src';

describe('iterative methods', () => {
  const cases: {n: bigint}[] = [{n: 1n}, {n: 5n}, {n: 27n}, {n: 38n}, {n: 186438726873n}];

  it('should find ECF via prefix iterations', () => {
    for (const test of cases) {
      const ecf = collatz.ecf(test.n);
      expect(ecf).toEqual(iterative.prefixIterate(test.n, riptree.prefixFind));
      expect(ecf).toEqual(iterative.prefixIterate(test.n, piptree.prefixFind));
    }
  });

  it('should find ECF via path extensions', () => {
    for (const test of cases) {
      const ecf = collatz.ecf(test.n);
      expect(ecf).toEqual(iterative.pathExtension(test.n, riptree.prefixFind));
      expect(ecf).toEqual(iterative.pathExtension(test.n, piptree.prefixFind));
    }
  });
});
