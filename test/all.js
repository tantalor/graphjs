if (typeof(require) !== 'undefined') {
  // commonjs
  var Harness = require('../test-harness');
  Harness.run('./test/core');
  Harness.run('./test/extra');
} else if (typeof(load) !== 'undefined') {
  // jsc
  var Harness = load('test-harness.js');
  Harness.run('test/core.js');
  Harness.run('test/extra.js');
}
