import {assert} from 'console';
import {collatz_ECF} from './collatz';
import {iterative_path_extension, iterative_prefix} from './iterative';
import {piptree_prefix_find} from './piptree';
import {riptree_prefix_find} from './riptree';

const n = 775325342332n;
const ecfstr = JSON.stringify(collatz_ECF(n));
const ecfrip_path = JSON.stringify(
  iterative_path_extension(n, riptree_prefix_find)
);
const ecfrip_pf = JSON.stringify(iterative_prefix(n, riptree_prefix_find));
const ecfpip_path = JSON.stringify(
  iterative_path_extension(n, piptree_prefix_find)
);
const ecfpip_pf = JSON.stringify(iterative_prefix(n, piptree_prefix_find));

console.log('ECF:', ecfstr);
assert(ecfstr === ecfrip_path);
assert(ecfstr === ecfrip_pf);
assert(ecfstr === ecfpip_path);
assert(ecfstr === ecfpip_pf);
