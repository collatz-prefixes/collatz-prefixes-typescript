/** Collatz length is the number of iterations it takes to reach n to 1. */
export function collatzLength(n: bigint): number {
  let ans = 0;
  while (n > 1n) {
    ans++;
    if ((n & 1n) === 0n) {
      n >>= 1n;
    } else {
      n = 3n * n + 1n;
    }
  }
  return ans;
}

/** Collatz Sequence is the array of numbers seen during iterations until 1 is reached. */
export function collatzSequence(n: bigint): bigint[] {
  const ans: bigint[] = [];
  while (n > 1n) {
    ans.push(n);
    if ((n & 1n) === 0n) {
      n >>= 1n;
    } else {
      n = 3n * n + 1n;
    }
  }
  ans.push(1n);
  return ans;
}

/** Reduced Collatz Sequence is the array of odd numbers seen during iterations until 1 is reached */
export function collatzReducedSequence(n: bigint): bigint[] {
  const ans: bigint[] = [];
  if ((n & 1n) === 0n) ans.push(n);
  while (n > 1n) {
    if ((n & 1n) === 0n) {
      n >>= 1n;
    } else {
      ans.push(n);
      n = 3n * n + 1n;
    }
  }
  ans.push(1n);
  return ans;
}

/** Find **ECF** (Exponential Canonical Form) of a number. */
export function collatzECF(n: bigint): number[] {
  let twos = 0;
  const ans: number[] = [];
  while (n > 1n) {
    if ((n & 1n) === 0n) {
      twos++;
      n >>= 1n;
    } else {
      ans.push(twos);
      n = 3n * n + 1n;
    }
  }
  ans.push(twos);
  return ans;
}

/** Compute a number from it's ECF. */
export function collatzECFtoN(ecf: number[]): bigint {
  let ans = 1n;
  for (let i = ecf.length - 1; i > 0; --i) {
    ans = ans << BigInt(ecf[i] - ecf[i - 1]);
    ans = (ans - 1n) / 3n;
  }
  ans = ans << BigInt(ecf[0]);
  return ans;
}

/** Find **ICF** (Inverse Canonical Form) of a number. */
export function collatzICF(n: bigint): [number, number][] {
  const ecf: number[] = collatzECF(n);
  const ans: [number, number][] = [];
  let powThree = ecf.length - 1;
  ans.push([ecf[ecf.length - 1], powThree]);
  for (let i = ecf.length - 2; i >= 0; --i) {
    ans.push([ecf[i], powThree]);
    powThree--;
  }
  return ans;
}

/**
 * Compute a number from it's ICF.
 *
 * Due to high exponents this may not be always accurate to the decimals,
 * but we round it up anyways.
 */
export function collatzICFtoN(icf: [number, number][]): bigint {
  let ans: number = Math.pow(2, icf[0][0]) / Math.pow(3, icf[0][1]);
  for (let i = 1; i < icf.length; ++i) {
    ans -= Math.pow(2, icf[i][0]) / Math.pow(3, icf[i][1]);
  }
  return BigInt(ans);
}
