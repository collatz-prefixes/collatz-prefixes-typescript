import {NTOP, PTON, NTOB, BTON, ISPOW2} from '../src';

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
