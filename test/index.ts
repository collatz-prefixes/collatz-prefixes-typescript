// eslint-disable-next-line node/no-unpublished-import
import test from 'ava';
import {collatz_ECF, collatz_ECF_to_n, collatz_length, collatz_sequence} from '../src/collatz';
import {prefix_add, prefix_find, prefix_iter} from '../src/prefix';
import {riptree_prefix_find} from '../src/riptree';
import {piptree_prefix_find} from '../src/piptree';
import {NTOP, PTON, NTOB, BTON, ISPOW2} from '../src/util';
import {iterative_path_extension, iterative_prefix} from '../src/iterative';

// TODO: generate an array of random values for this, and run tests for each

const n = BigInt(Math.floor(Math.random() * 10000));
const m = BigInt(Math.floor(Math.random() * 10000));

console.log(`Using n: ${n} and m: ${m}\n`);

test('Utility', t => {
  t.is(6n, BTON([true, true, false]));
  t.deepEqual([true, true, false], NTOB(6n));
  t.true(ISPOW2(16n));
  t.false(ISPOW2(14n));
});

test('Collatz', t => {
  const ecf: number[] = collatz_ECF(n);
  t.is(1n, prefix_iter(n, ecf), 'Prefix iteration over own ECF should result in 1.');
  t.is(n, collatz_ECF_to_n(ecf));
  t.is(collatz_length(n) + 1, collatz_sequence(n).length);
});

test('Prefixes', t => {
  const pf: number[] = prefix_find(n, m);
  t.deepEqual(pf, prefix_find(m, n), 'Prefix finding should be symmetric');
  if (pf.length !== 0) t.is(1n, prefix_iter(n, pf) & 1n, 'Prefix iteration should result in odd number.');
  t.is(1n, prefix_iter(3n, [0, 1, 5]));
  t.deepEqual([0, 1, 2, 5, 6, 7], prefix_add([0, 1, 2, 3], [2, 3, 4]));
});

test('RIPTree', t => {
  const p: boolean[] = NTOP(n);
  const pf: number[] = riptree_prefix_find(n);
  t.is(n, PTON(p));
  t.is(1n, prefix_iter(n, pf) & 1n, 'Prefix iteration should result in odd number.');
});

test('PIPTree', t => {
  const pf: number[] = piptree_prefix_find(n);
  t.is(1n, prefix_iter(n, pf) & 1n, 'Prefix iteration should result in odd number.');
  t.deepEqual(pf, riptree_prefix_find(n));
});

test.serial('Iterative', t => {
  const ecf: number[] = collatz_ECF(n);
  let ecfrip: number[], ecfpip: number[];

  ecfrip = iterative_prefix(n, riptree_prefix_find);
  ecfpip = iterative_prefix(n, piptree_prefix_find);
  t.deepEqual(ecf, ecfrip);
  t.deepEqual(ecf, ecfpip);

  ecfrip = iterative_path_extension(n, riptree_prefix_find);
  ecfpip = iterative_path_extension(n, piptree_prefix_find);
  t.deepEqual(ecf, ecfrip);
  t.deepEqual(ecf, ecfpip);
});
