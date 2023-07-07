import {toPath, fromPath, toBinary, fromBinary, ISPOW2} from '../src';

describe('utilities', () => {
  it('should do path conversions', () => {
    const cases: {n: bigint; p: boolean[]}[] = [
      {n: 1n, p: []},
      {n: 2n, p: [false]},
      {n: 3n, p: [true, false]},
      {n: 4n, p: [false, false]},
      {n: 5n, p: [true, true, false]},
      {n: 6n, p: [false, true, false]},
      {n: 7n, p: [true, false, false]},
      {n: 9n, p: [true, true, true, false]},
      {n: 10n, p: [false, true, true, false]},
      {n: 12n, p: [false, false, true, false]},
    ];
    for (const test of cases) {
      expect(toPath(test.n)).toEqual(test.p);
      expect(fromPath(test.p)).toEqual(test.n);
    }
  });

  it('should do binary conversions', () => {
    const cases: {n: bigint; b: boolean[]}[] = [
      {n: 1n, b: [true]},
      {n: 3n, b: [true, true]},
      {n: 8n, b: [true, false, false, false]},
      {n: 15n, b: [true, true, true, true]},
    ];
    for (const test of cases) {
      expect(toBinary(test.n)).toEqual(test.b);
      expect(fromBinary(test.b)).toEqual(test.n);
    }
  });

  it('should check power of 2 correctly', () => {
    const cases: {yes: bigint; no: bigint}[] = [
      {yes: 1n, no: 3n},
      {yes: 2n, no: 5n},
      {yes: 4n, no: 7n},
      {yes: 16n, no: 19n},
    ];
    for (const test of cases) {
      expect(ISPOW2(test.yes)).toBeTruthy;
      expect(ISPOW2(test.no)).toBeFalsy;
    }
  });
});
