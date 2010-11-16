if (typeof(require) !== 'undefined') {
  // commonjs
  require('../test-harness')
    .run('./test/core')
    .run('./test/extra');
} else if (typeof(load) !== 'undefined') {
  // jsc
  load('test-harness.js')
    .run('./test/core.js')
    .run('./test/extra.js');
}
