import {ecf, ecfToN, length, reducedSequence, sequence} from './collatz';
export const collatz = {
  ecf,
  ecfToN,
  length,
  reducedSequence,
  sequence,
} as const;

import {pathExtension, prefixIterate} from './iterative';
export const iterative = {
  pathExtension,
  prefixIterate,
} as const;

import {findNature, getRootDirections, prefixFind as pippf} from './piptree';
export const piptree = {
  findNature,
  getRootDirections,
  prefixFind: pippf,
} as const;

import {nextInPath, prefixFind as rippf} from './riptree';
export const riptree = {
  nextInPath,
  prefixFind: rippf,
} as const;

import {fromBinary, fromPath, isPower2, toBinary, toPath} from './util';
export const util = {
  fromBinary,
  fromPath,
  isPower2,
  toBinary,
  toPath,
} as const;

import {add, find, iterate, mapFromNum, mapToNum} from './prefix';
export const prefix = {
  add,
  find,
  iterate,
  mapFromNum,
  mapToNum,
} as const;
