if (typeof(require) !== 'undefined') {
  // common
  var Harness = require('../test-harness');
  Harness.run('./test/core');
} else if (typeof(load) !== 'undefined') {
  // jsc
  load('test/core.js');
  load('test/extra.js');
}
