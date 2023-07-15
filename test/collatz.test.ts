import {collatz} from '../src';

describe('collatz functions', () => {
  it('should have correct ECF ~ number conversions', () => {
    const cases: {n: bigint; ecf: number[]}[] = [
      {n: 1n, ecf: [0]},
      {n: 16n, ecf: [4]},
      {n: 3n, ecf: [0, 1, 5]},
      {n: 12n, ecf: [2, 3, 7]},
      // prettier-ignore
      {n: 27n, ecf: [0, 1, 3, 4, 5, 6, 7, 9, 11, 12, 14, 15, 16, 18, 19, 20, 21, 23, 26, 27, 28, 30, 31, 33, 34, 35, 36, 37, 38, 41, 42, 43, 44, 48, 50, 52, 56, 59, 60, 61, 66, 70]},
    ];
    for (const test of cases) {
      const ecf = collatz.ecf(test.n);
      expect(ecf).toEqual(test.ecf);
      expect(collatz.ecfToN(ecf)).toEqual(test.n);
    }
  });

  it('should have correct sequences', () => {
    const cases: {n: bigint; seq: bigint[]; rseq: bigint[]}[] = [
      {n: 1n, seq: [1n], rseq: [1n]},
      {n: 8n, seq: [8n, 4n, 2n, 1n], rseq: [8n, 1n]},
      {n: 5n, seq: [5n, 16n, 8n, 4n, 2n, 1n], rseq: [5n, 1n]},
      // prettier-ignore
      {n: 28n, seq: [28n, 14n, 7n, 22n, 11n, 34n, 17n, 52n, 26n, 13n, 40n, 20n, 10n, 5n, 16n, 8n, 4n, 2n, 1n], rseq: [28n, 7n, 11n, 17n, 13n, 5n, 1n]},
      // prettier-ignore
      {n: 27n, seq: [27n, 82n, 41n, 124n, 62n, 31n, 94n, 47n, 142n, 71n, 214n, 107n, 322n, 161n, 484n, 242n, 121n, 364n, 182n, 91n, 274n, 137n, 412n, 206n, 103n, 310n, 155n, 466n, 233n, 700n, 350n, 175n, 526n, 263n, 790n, 395n, 1186n, 593n, 1780n, 890n, 445n, 1336n, 668n, 334n, 167n, 502n, 251n, 754n, 377n, 1132n, 566n, 283n, 850n, 425n, 1276n, 638n, 319n, 958n, 479n, 1438n, 719n, 2158n, 1079n, 3238n, 1619n, 4858n, 2429n, 7288n, 3644n, 1822n, 911n, 2734n, 1367n, 4102n, 2051n, 6154n, 3077n, 9232n, 4616n, 2308n, 1154n, 577n, 1732n, 866n, 433n, 1300n, 650n, 325n, 976n, 488n, 244n, 122n, 61n, 184n, 92n, 46n, 23n, 70n, 35n, 106n, 53n, 160n, 80n, 40n, 20n, 10n, 5n, 16n, 8n, 4n, 2n, 1n], rseq: [27n, 41n, 31n, 47n, 71n, 107n, 161n, 121n, 91n, 137n, 103n, 155n, 233n, 175n, 263n, 395n, 593n, 445n, 167n, 251n, 377n, 283n, 425n, 319n, 479n, 719n, 1079n, 1619n, 2429n, 911n, 1367n, 2051n, 3077n, 577n, 433n, 325n, 61n, 23n, 35n, 53n, 5n, 1n]},
    ];
    for (const test of cases) {
      expect(collatz.sequence(test.n)).toEqual(test.seq);
      expect(collatz.length(test.n)).toEqual(test.seq.length - 1);
      expect(collatz.reducedSequence(test.n)).toEqual(test.rseq);
    }
  });
});
