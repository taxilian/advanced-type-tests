
import * as UnitTests from './UnitTest';

const v: UnitTests.TypeChecks = void 0;
onlyCompileIfPassed(v);

function onlyCompileIfPassed(v: UnitTests.Yes) {}

export {UnitTests};
