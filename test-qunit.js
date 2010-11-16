if (typeof(require) !== 'undefined') {
  // commonjs
  
  var assert = require("assert");
  
  try {
    var narwhal = require('narwhal');
  } catch (e) {}
  
  if (narwhal) {
    var tests = {};
    exports.test = function (name, fn) {
      tests['test '+name] = fn;
    };
    exports.ok = function (value, name) {
      assert.ok(value, name);
    };
    exports.export_tests = function (local_exports) {
      for (var test in tests) {
        local_exports[test] = tests[test]
      }
      tests = {};
    };
  } else {
    // node, ringo
    var tests = {};
      
    if (typeof(print) === 'undefined') {
      // node
      var sys = require('sys');
      var print = function (s) {
        sys.print(s+"\n");
      }
    }
    
    exports.test = function (name, fn) {
      tests['test '+name] = fn;
    };
    exports.ok = function (value, name) {
      try {
        assert.ok(value, name);
      } catch (e) {
        if (e.name === "AssertionError") {
          print("    FAIL: "+name);
        }
        throw e;
      }
    };
    exports.export_tests = function (local_exports) {
      print("+ Running");
      var passes = 0, fails = 0, errors = 0;
      for (var test in tests) {
        print("  + Running test "+test);
        try {
          tests[test]();
          passes++;
        } catch (e) {
          if (e.name === "AssertionError") {
            fails++;
          } else {
            errors++;
          }
        }
      }
      print("Passes: "+passes+", Fails: "+fails+", Errors: "+errors);
      tests = {};
    };
  }
} else if (typeof(load) !== 'undefined') {
  // jsc
  (function () {
    var AssertionError = {};
    var tests = {};
    return {
      test: function (name, fn) {
        tests['test '+name] = fn;
      },
      ok: function (value, name) {
        if (!value) {
          print("    FAIL: "+name);
          throw AssertionError;
        }
      },
      export_tests: function () {
        print("+ Running");
        var passes = 0, fails = 0, errors = 0;
        for (var test in tests) {
          print("  + Running test "+test);
          try {
            tests[test]();
            passes++;
          } catch (e) {
            if (e === AssertionError) {
              fails++;
            } else {
              errors++;
            }
          }
        }
        print("Passes: "+passes+", Fails: "+fails+", Errors: "+errors);
        tests = {};
      }
    };
  })();
}
