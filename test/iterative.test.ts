import {collatzECF, iterativePrefix, riptreePrefixFind, piptreePrefixFind, iterativePathExtension} from '../src';

describe('iterative methods', () => {
  const cases: {n: bigint}[] = [{n: 1n}, {n: 5n}, {n: 27n}, {n: 38n}, {n: 186438726873n}];

  it('should find ECF via prefix iterations', () => {
    for (const test of cases) {
      const ecf = collatzECF(test.n);
      expect(ecf).toEqual(iterativePrefix(test.n, riptreePrefixFind));
      expect(ecf).toEqual(iterativePrefix(test.n, piptreePrefixFind));
    }
  });

  it('should find ECF via path extensions', () => {
    for (const test of cases) {
      const ecf = collatzECF(test.n);
      expect(ecf).toEqual(iterativePathExtension(test.n, riptreePrefixFind));
      expect(ecf).toEqual(iterativePathExtension(test.n, piptreePrefixFind));
    }
  });
});
