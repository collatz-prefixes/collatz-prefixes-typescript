import {collatz_ECF, collatz_ECF_to_n, collatz_length, collatz_sequence} from '../src';
import {prefix_add, prefix_find, prefix_iter} from '../src';
import {riptree_prefix_find, piptree_prefix_find} from '../src';
import {NTOP, PTON, NTOB, BTON, ISPOW2} from '../src';
import {iterative_path_extension, iterative_prefix} from '../src';

const n = BigInt(Math.floor(Math.random() * 10000));
const m = BigInt(Math.floor(Math.random() * 10000));

describe(`tests (n: ${n.toString()}, m: ${m.toString()})`, () => {
  describe('utility', () => {
    it('should correctly convert between binary and decimals', () => {
      expect(6n).toEqual(BTON([true, true, false]));
      expect([true, true, false]).toEqual(NTOB(6n));
    });

    it('should correctly convert between path and numbers', () => {
      expect(PTON(NTOP(n))).toEqual(n);
    });

    it('should correctly check if a number is power of two', () => {
      // edge
      expect(ISPOW2(0n)).toBeFalsy();
      expect(ISPOW2(1n)).toBeTruthy();

      expect(ISPOW2(16n)).toBeTruthy();
      expect(ISPOW2(14n)).toBeFalsy();
    });
  });

  describe('collatz', () => {
    let ecf: number[];

    beforeAll(() => {
      ecf = collatz_ECF(n);
      expect(collatz_ECF_to_n(ecf)).toEqual(n);
      expect(collatz_length(n) + 1).toEqual(collatz_sequence(n).length);
    });

    it('should correctly iterate the ECF', () => {
      expect(prefix_iter(n, ecf)).toEqual(1n);
    });
  });

  describe('prefixes', () => {
    let pf: number[];

    beforeAll(() => {
      pf = prefix_find(n, m);
    });

    it('should find prefix commutatively', () => {
      expect(pf).toEqual(prefix_find(m, n));
    });

    it('should correctly iterate prefix', () => {
      if (pf.length !== 0) {
        // result should be odd number
        expect(prefix_iter(n, pf) & 1n).toEqual(1n);
      }
      expect(prefix_iter(3n, [0, 1, 5])).toEqual(1n);
    });

    it('should correctly add prefixes', () => {
      expect(prefix_add([0, 1, 2, 3], [2, 3, 4])).toEqual([0, 1, 2, 5, 6, 7]);
    });
  });

  describe('riptree', () => {
    it('should compute prefix correctly', () => {
      const pf: number[] = riptree_prefix_find(n);
      if (pf.length !== 0) {
        // result should be odd number
        expect(prefix_iter(n, pf) & 1n).toEqual(1n);
      }
    });
  });

  describe('riptree', () => {
    it('should compute prefix correctly', () => {
      const pf: number[] = piptree_prefix_find(n);
      if (pf.length !== 0) {
        // result should be odd number
        expect(prefix_iter(n, pf) & 1n).toEqual(1n);
      }
    });
  });

  describe('iterative', () => {
    let ecf: number[];

    beforeAll(() => {
      ecf = collatz_ECF(n);
    });

    it('should compute ECF correctly via prefix', () => {
      expect(ecf).toEqual(iterative_prefix(n, riptree_prefix_find));
      expect(ecf).toEqual(iterative_prefix(n, piptree_prefix_find));
    });

    it('should compute ECF correctly via path extension', () => {
      expect(ecf).toEqual(iterative_path_extension(n, riptree_prefix_find));
      expect(ecf).toEqual(iterative_path_extension(n, piptree_prefix_find));
    });
  });
});
