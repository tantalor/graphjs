if (typeof(require) !== 'undefined') {
  // commonjs
  
  var assert = require("assert");
  
  try {
    var narwhal = require('narwhal');
  } catch (e) {}
  
  if (narwhal) {
    var tests = {};
    exports.QUnit = {
      test: function (name, fn) {
        tests['test '+name] = fn;
      },
      ok: function (value, name) {
        assert.ok(value, name);
      },
      export_tests: function (local_exports) {
        for (var test in tests) {
          local_exports[test] = tests[test]
        }
      }
    };
  }
  
} else if (typeof(load) !== 'undefined') {
  // jsc
}
