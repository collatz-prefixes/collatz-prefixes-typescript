/** Collatz length is the number of iterations it takes to reach n to 1. */
export function length(n: bigint): number {
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
export function sequence(n: bigint): bigint[] {
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
export function reducedSequence(n: bigint): bigint[] {
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
export function ecf(n: bigint): number[] {
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
export function ecfToN(ecf: number[]): bigint {
  let ans = 1n;
  for (let i = ecf.length - 1; i > 0; --i) {
    ans = ans << BigInt(ecf[i] - ecf[i - 1]);
    ans = (ans - 1n) / 3n;
  }
  ans = ans << BigInt(ecf[0]);
  return ans;
}
