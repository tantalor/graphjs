if (typeof(require) !== 'undefined') {
  // commonjs
  var QUnit = require('../test-qunit');
  var Graph = require("../lib/graph_extras").Graph;
} else if (typeof(load) !== 'undefined') {
  // jsc
  var QUnit = load('test-qunit.js');
  var Graph = load("lib/graph.js");
}

with (QUnit)
{
  test('Graph exists', function ()
  {
    ok(Graph,
      "I can find the Graph class.");
  });

  test('Null get', function ()
  {
    var g = new Graph();
    ok(g.get(1, 2) === undefined,
      "Get for unknown edge returns undef.");
    ok(g.has(1, 2) === false,
      "Has for unknown edge returns false.");
  });

  test('Bad delete', function ()
  {
    var g = new Graph();
    g.del(1, 2);
    ok(g.degree(1) === 0,
      "Degree of one vertex is 0.");
    ok(g.degree(2) === 0,
      "Degree of other vertex is 0.");
    ok(g.size() === 0,
      "Size is 0.");
  });

  test('Simple get', function ()
  {
    var g = new Graph();
    ok(g.set(1, 2, 3) === 3,
      "Set returns edge weight.");
    ok(g.get(1, 2) === 3,
      "Get returns edge weight.");
  });

  test('Set and get', function ()
  {
    var g = new Graph();
    g.set(1, 2, 3);
    ok(g.get(1, 2) === 3,
      "Get with original order returns weight.");
    ok(g.get(2, 1) === 3,
      "Get with reveresed order returns weight.");
    ok(g.order() === 2,
      "Number of vertices is 2.");
    ok(g.degree(1) === 1,
      "Degree of one vertex is 1.");
    ok(g.degree(2) === 1,
      "Degree of other vertex is 1.");
    ok(g.size() === 1,
      "Size is 1.");
  });

  test('Set and delete', function ()
  {
    var g = new Graph();
    ok(g.set(1, 2),
      "Added edge.")
    ok(g.del(1, 2) === false,
      "Deleted edge.")
    ok(!g.has(1, 2),
      "Deleted edge doesn't exist.");
    ok(!g.has(2, 1),
      "Reverse of edge also doesn't exist.");
    ok(g.order() === 2,
      "Number of vertices is 2.");
    ok(g.degree(1) === 0,
      "Degree of one vertex is 0.");
    ok(g.degree(2) === 0,
      "Degree of other vertex is 0.");
    ok(g.size() === 0,
      "Size is 0.");
  });

  test('Set and reverse set', function ()
  {
    var g = new Graph();
    g.set(1, 2, 3);
    g.set(2, 1, 4);
    ok(g.get(1, 2) === 4,
      "Get with original order returns new weight.");
    ok(g.get(2, 1) === 4,
      "Get with reversed order returns new weight.");
    ok(g.order() === 2,
      "Number of vertices is 2.");
    ok(g.degree(1) === 1,
      "Degree of one vertex is 1.");
    ok(g.degree(2) === 1,
      "Degree of other vertex is 1.");
    ok(g.size() === 1,
      "Size is 1.");
  });

  test('Set and reverse delete', function ()
  {
    var g = new Graph();
    ok(g.set(1, 2),
      "Added edge.")
    ok(g.del(2, 1) === false,
      "Deleted edge.");
    ok(!g.has(1, 2),
      "Deleted edge doesn't exist.");
    ok(!g.has(2, 1),
      "Reverse of edge also doesn't exist.");
    ok(g.order() === 2,
      "Number of vertices is 2.");
    ok(g.degree(1) === 0,
      "Degree of one vertex is 0.");
    ok(g.degree(2) === 0,
      "Degree of other vertex is 0.");
    ok(g.size() === 0,
      "Size is 0.");
  });

  test('Self edge', function ()
  {
    var g = new Graph();
    ok(g.set(1, 1, 2) == 2,
      "Set self edge returns weight.");
    ok(g.get(1, 1) === 2,
      "Get self edge returns weight.");
    ok(g.order() === 1,
      "Number of vertices is 1.");
    ok(g.degree(1) === 1,
      "Degree of vertex is 1.");
    ok(g.size() === 1,
      "Size is 1.");
  });

  test('Simple constructor', function ()
  {
    var g = new Graph({pirate: ['ninja', 'robot']});
    ok(g.get('pirate', 'ninja') && g.get('pirate', 'robot'),
      "All edges exist.");
    ok(g.order() === 3,
      "Number of vertices is 3.");
    ok(g.degree('pirate') === 2,
      "Degree of 'pirate' vertex is 2.");
    ok(g.degree('ninja') === 1,
      "Degree of 'ninja' vertex is 1.");
    ok(g.degree('robot') === 1,
      "Degree of 'robot' vertex is 1.");
    ok(g.size() === 2,
      "Size is 2.");
  });

  test('Constructor with weights', function ()
  {
    var g = new Graph({pirate: {ninja: 'robot'}});
    ok(g.get('pirate', 'ninja') === 'robot',
      "Get in original order has weight 'robot'.");
    ok(g.get('ninja', 'pirate') === 'robot',
      "Get in reversed order has weight 'robot'.");
    ok(g.order() === 2,
      "Number of vertices is 2.");
    ok(g.degree('pirate') === 1,
      "Degree of 'pirate' vertex is 1.");
    ok(g.degree('ninja') === 1,
      "Degree of 'ninja' vertex is 1.");
    ok(g.size() === 1,
      "Size is 1.");
  });

  test('Multiget', function ()
  {
    var g = new Graph();
    ok(g.set(1, 2) && g.set(2, 3) && g.set(3, 1),
      "Set all edges.");
    ok(g.get(2, 1) && g.get(3, 2) && g.get(1, 3),
      "All edges exist.");
    ok(g.degree(1) == 2 && g.degree(2) == 2 && g.degree(3) == 2,
      "Degree of all vertices is 2.");
    ok(g.order() === 3,
      "Number of vertices is 3.");
    ok(g.size() === 3,
      "Size is 3.");
  });

  test('Adjacency', function ()
  {
    var g = new Graph();
    g.set(1, 2);
    ok(1 in g.adj(2),
      "Vertex 1 is adjacent to vertex 2.");
    ok(2 in g.adj(1),
      "Vertex 2 is adjacent to vertex 1.");
  });
  
  test('Depth-first search', function ()
  {
    var g = new Graph({
      1: [2, 3],
      2: [4, 5],
      3: [6, 7],
    });
    var visited = {};
    function visit (v)
    {
      if (visited[v]) return;
      visited[v] = 1;
      for (var u in g.adj(v)) {
        visit(u);
      };
    }
    visit(1);
    ok(visited[1], "Visited vertex 1.");
    ok(visited[2], "Visited vertex 2.");
    ok(visited[3], "Visited vertex 3.");
    ok(visited[4], "Visited vertex 4.");
    ok(visited[5], "Visited vertex 5.");
    ok(visited[6], "Visited vertex 6.");
    ok(visited[7], "Visited vertex 7.");
  });
  
  test('Breadth-first search', function ()
  {
    var g = new Graph({
      1: [2, 3],
      2: [4, 5],
      3: [6, 7],
    });
    var fringe = [1];
    var visited = {};
    while (fringe.length > 0)
    {
      var v = fringe.shift();
      if (visited[v]) continue;
      visited[v] = 1;
      for (var u in g.adj(v)) {
        fringe.push(u);
      };
    }
    ok(visited[1], "Visited vertex 1.");
    ok(visited[2], "Visited vertex 2.");
    ok(visited[3], "Visited vertex 3.");
    ok(visited[4], "Visited vertex 4.");
    ok(visited[5], "Visited vertex 5.");
    ok(visited[6], "Visited vertex 6.");
    ok(visited[7], "Visited vertex 7.");
  });
  
  test('Simple copy', function ()
  {
    var g = new Graph({
      1: [2, 3],
      2: [3],
    });
    var h = g.copy();
    ok(g.get(2, 3),
      "Original graph has edge.")
    ok(g.del(2, 3) === false,
      "Deleted edge in original graph.");
    ok(!g.has(2, 3),
      "Original graph does not have deleted edge.")
    ok(h.get(2, 3),
      "Copied graph has deleted edge.");
    ok(g.size() == 2,
      "Original graph has size 2.");
    ok(h.size() == 3,
      "Copied graph has size 3.");
    ok(g.degree(2) == 1,
      "Degree of vertex 1 in original is 1.")
    ok(h.degree(2) == 2,
      "Degree of vertex 1 in copy is 2.")
  });
  
  test('Copy with weights', function ()
  {
    var g = new Graph({
      1: {2: 3},
    });
    var h = g.copy();
    ok(g.get(1, 2) === 3,
      "Original graph has edge with weight.")
    ok(g.del(1, 2) === false,
      "Deleted edge in original graph.");
    ok(!g.has(1, 2),
      "Original graph does not have deleted edge.")
    ok(h.get(1, 2) == 3,
      "Copied graph has deleted edge with weight.");
  });
  
  test('Repeated vertices', function ()
  {
    var g = new Graph();
    g.set('a', 'b');
    g.del('a', 'b');
    g.set('a', 'b');
    
    ok(g.order() === 2,
      "Graph has 2 vertices.");
  });
  
  test('Add falsey weight', function ()
  {
    var g = new Graph();
    g.set('a', 'b', 0);
    
    ok(g.size() === 1,
      "Graph has 1 edge.");
  });
  
  test('Remove falsey weight', function ()
  {
    var g = new Graph();
    g.set('a', 'b', 0);
    g.del('a', 'b');
    
    ok(g.size() === 0,
      "Graph has 0 edges.");
  });
  
  test('Add directed edges', function ()
  {
    var g = new Graph();
    g.dir(1, 2);
    
    ok(g.order() === 2,
      "Order is 2.");
    
    ok(g.size() === 1,
      "Size is 1.");
    
    ok(g.has(1, 2),
      "1 ~ 2");
    
    ok(!g.has(2, 1),
      "2 !~ 1");
    
    ok(g.degree(1) === 1,
      "Out degrees of 1 is 1.");
    
    ok(g.degree(2) === 0,
      "Out degrees of 2 is 0.");
    
    ok(g.indegree(1) === 0,
      "Out degrees of 1 is 0.");
    
    ok(g.indegree(2) === 1,
      "Out degrees of 2 is 1.");
  });
  
  test('Remove directed edges', function ()
  {
    var g = new Graph();
    g.set(1, 2);
    g.deldir(2, 1);
    
    ok(g.order() === 2,
      "Order is 2.");
    
    ok(g.size() === 1,
      "Size is 1.");
    
    ok(g.has(1, 2),
      "1 ~ 2");
    
    ok(!g.has(2, 1),
      "2 !~ 1");
    
    ok(g.degree(1) === 1,
      "Out degrees of 1 is 1.");
    
    ok(g.degree(2) === 0,
      "Out degrees of 2 is 0.");
    
    ok(g.indegree(1) === 0,
      "Out degrees of 1 is 0.");
    
    ok(g.indegree(2) === 1,
      "Out degrees of 2 is 1.");
  });
  
  test('Double directed edges', function ()
  {
    var g = new Graph();
    g.dir(1, 2);
    g.dir(2, 1);
    
    ok(g.order() === 2,
      "Order is 2.");
    
    ok(g.size() === 1,
      "Size is 1.");
    
    ok(g.has(1, 2) && g.has(2, 1),
      "1 ~ 2 and 2 ~ 1");
  });
  
  test('Drop vertex', function ()
  {
    // var g = Graph.k(4, ['a', 'b', 'c', 'd']);
    var g = new Graph({
      a: ['b', 'c', 'd'],
      b: ['c', 'd'],
      c: ['d'],
    });
    ok(!g.drop('z'),
      "Can't drop a vertex that isn't in the graph.")
    ok(g.size() === 6 && g.order() === 4,
      "Graph is K(4).");
    ok(g.drop('a'),
      "Dropped a vertex.");
    ok(g.size() === 3 && g.order() === 3,
      "K(4) is now K(3).")
    ok(g.del('b'),
      "Dropped another vertex.");
    ok(g.size() === 1 && g.order() === 2,
      "K(3) is now K(2).")
  });
}

if (QUnit.export_tests) QUnit.export_tests(exports);
if (QUnit.run_tests)    QUnit.run_tests();
