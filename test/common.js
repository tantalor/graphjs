var assert = require("assert");

var Graph = require("../lib/graph").Graph;
require.load("../lib/graph_extras")({Graph: Graph});

var QUnitCompatibility = {
  QUnit: {
    test: function (name, fn) {
      exports['test '+name] = fn;
    },
    ok: function (value, name) {
      assert.ok(value, name);
    }
  },
  Graph: Graph
};

require.load("./core_tests")(QUnitCompatibility);
require.load("./extra_tests")(QUnitCompatibility);
