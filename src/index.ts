
import * as UnitTests from './UnitTest';
import {Yes, Result, TypeChecks, IsTrue} from './UnitTest';

type FinalCheck = IsTrue<TypeChecks>;

const v: FinalCheck = void 0;
assert<Yes>(v);

/**
 * Used to throw a typescript compile error if test results are not what
 * were expected
 * @param v 
 */
function assert<T extends Result = Yes>(v: T) { !!v; }

export {UnitTests, assert};