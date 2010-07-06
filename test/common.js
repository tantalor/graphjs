var assert = require("assert");

var Graph = require("../graph").Graph;
require.load("../graph_extras")({Graph: Graph});

var jqUnitCompatibility = {
  jqUnit: {
    test: function (name, fn) {
      exports['test '+name] = fn;
    },
    ok: function (value, name) {
      assert.ok(value, name);
    }
  },
  Graph: Graph
};

require.load("./core_tests")(jqUnitCompatibility);
require.load("./extra_tests")(jqUnitCompatibility);
