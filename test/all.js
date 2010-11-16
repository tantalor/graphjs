if (typeof(require) !== 'undefined') {
  // commonjs
  var Harness = require('../test-harness');
  Harness.run('./test/core');
} else if (typeof(load) !== 'undefined') {
  // jsc
  var Harness = load('test-harness.js');
  Harness.run('test/core.js');
}
