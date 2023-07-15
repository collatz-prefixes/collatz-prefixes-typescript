import {generatePaths} from '../src/generators';

describe('generators', () => {
  it('should generate paths', () => {
    const cases: {len: number; paths: boolean[][]}[] = [
      {len: 1, paths: [[false], [true]]},
      // prettier-ignore
      {len: 2, paths: [[false, false], [false, true], [true, false], [true, true]]},
    ];
    for (const test of cases) {
      const paths = generatePaths(test.len);
      expect(paths.length).toEqual(test.paths.length);
      for (let i = 0; i < paths.length; i++) {
        expect(paths[i]).toEqual(test.paths[i]);
      }
    }
  });
});
