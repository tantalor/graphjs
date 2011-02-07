if (typeof(require) !== 'undefined') {
  // commonjs
  var QUnit = require('../steel');
  var Graph = require("../lib/graph/extras").Graph;
} else if (typeof(load) !== 'undefined') {
  // jsc
  var QUnit = load('steel.js');
  var Graph = load("lib/graph/extras.js").Graph;
}

with (QUnit)
{
  test('Cartesian product', function ()
  {
    var g = new Graph();
    g.set(1,1);
    g.set(2,2);
    
    var h = new Graph();
    h.set(3, 4);
    h.set(4, 5);
    h.set(5, 3);
    
    var gh = g.cartesian(h);
    
    ok(gh.order() === 6,
      "Order is 6.");
    ok(gh.size() === 12,
      "Size is 12.");
    
    ok([1, 3] in gh.adj([1, 4]),
      "(1,3) adjacent to (1,4).");
    ok([1, 4] in gh.adj([1, 5]),
      "(1,4) adjacent to (1,5).");
    ok([1, 5] in gh.adj([1, 3]),
      "(1,5) adjacent to (1,3).");
    
    ok([2, 3] in gh.adj([2, 4]),
      "(2,3) adjacent to (2,4).");
    ok([2, 4] in gh.adj([2, 5]),
      "(2,4) adjacent to (2,5).");
    ok([2, 5] in gh.adj([2, 3]),
      "(2,5) adjacent to (2,3).");
    
    ok(gh.grep(function (v) {return v in gh.adj(v)}).length === gh.order(),
      "Every vertex adjacent to self.")
  });
  
  test('Cartesian self product', function ()
  {
    var g = new Graph({
      a: ['b'],
      b: ['c'],
      c: ['a'],
    });
    
    var h = g.cartesian(g);
    
    ok(h.size() === 18,
      "Size is 18.");
    ok(h.order() === 9,
      "Order is 9.");
    
    ok(['a', 'b'] in h.adj(['b', 'b']),
      "(a,b) is adjacent to (b,b)");
    ok(['c', 'b'] in h.adj(['b', 'b']),
      "(c,b) is adjacent to (b,b)");
    ok(['b', 'a'] in h.adj(['b', 'b']),
      "(b,a) is adjacent to (b,b)");
    ok(['b', 'c'] in h.adj(['b', 'b']),
      "(b,c) is adjacent to (b,b)");
    
    ok(h.grep(function (v) {return h.degree(v) === 4;}).length === h.order(),
      "Degree of all vertices is 4.");
  });
  
  test('Perterson graph', function ()
  {
    var g = Graph.peterson();
    
    ok(g.order() === 10,
      "Peterson graph has 10 vertices.");    
    ok(g.size() === 15,
      "Peterson graph has 15 edges.");
  })
  
  test('Bipartite double cover', function ()
  {
    var g = Graph.peterson().bipartite_double_cover();
    
    ok(g.order() === 20,
      "Desargues graph has 20 vertices.")
    ok(g.size() === 30,
      "Desargues graph has 30 vertices.")
  });
  
  test('Complete graphs', function ()
  {
    for (var n = 2; n < 5; n++)
    {
      var g = Graph.k(n);
      var size = n*(n-1)/2;
      ok(g.order() === n,
        "K("+n+") has "+n+" vertices.");
      ok(g.size() === size,
        "K("+n+") has "+size+" edges.");
    }
  });
  
  test('Cycles', function ()
  {
    for (var n = 3; n < 6; n++)
    {
      var g = Graph.c(n);
      ok(g.order() === n,
        "C("+n+") has "+n+" vertices.");
      ok(g.size() === n,
        "C("+n+") has "+n+" edges.");
      ok(g.grep(function (v) {return (v+1)%n in g.adj(v);}).length === n,
        "C("+n+") neighbors are adjacent.");
    }
  });
  
  test('Union', function ()
  {
    var g = new Graph({a: ['b', 'c']});
    var h = new Graph({b: ['c']});
    var gh = g.union(h);
    
    ok(gh.get('a', 'b') && gh.get('a', 'c') && gh.get('b', 'c'),
      "All edges exist.");
    ok(gh.order() === 3,
      "Order is 3.");
    ok(gh.size() === 3,
      "Size is 3.");
  });
  
  test('Bipartite testing', function ()
  {
    ok(Graph.k(2).is_bipartite(),
      "K(2) is bipartite.");
      
    ok(!Graph.k(3).is_bipartite(),
      "K(3) is not bipartite.");
    
    var k2k3 = Graph.k(2, ['a', 'b']).union(Graph.k(3, ['c', 'd', 'e']));
    ok(!k2k3.is_bipartite(),
      "K(2) union K(3) is not bipartite.");
    
    ok(Graph.peterson().bipartite_double_cover().is_bipartite(),
      "Desargues graph is bipartite.");
  });
  
  test('Completeness testing', function ()
  {
    ok(!new Graph({a: ['a'], b: ['b']}).is_complete(),
      "Graph with two loops is not complete.");
    
    ok(new Graph().is_complete(),
      "Null graph is complete.");
    
    ok(new Graph({a: ['b', 'c'], b: ['c']}).is_complete(),
      "K(3) is complete.");
  });
  
  test('Cycle testing', function ()
  {
    ok(!new Graph({a: ['b'], b: ['c']}).is_cycle(),
      "Path on a, b, c is not a cycle.");
    
    ok(Graph.c(3).is_cycle(),
      "C(3) is a cycle.");
    
    ok(!Graph.c(3, ['a', 'b', 'c']).union(Graph.c(4, ['d', 'e', 'f', 'g'])).is_cycle(),
      "C(3) union C(4) is not a cycle.")
  });
  
  test('Subgraph of C(4)', function ()
  {
    var g = Graph.c(4, ['a', 'b', 'c', 'd']).subgraph(['a', 'b', 'c']);
    
    ok(!g.is_cycle(),
      "Not a cycle.")
    
    ok(g.order() === 3,
      "Has 3 vertices.");
    
    ok(g.size() === 2,
      "Has 2 edges.");
  });
  
  test('Subgraph of K(4)', function ()
  {
    var g = Graph.k(4, ['a', 'b', 'c', 'd']).subgraph(['a', 'b', 'c']);
    
    ok(g.order() === 3,
      "Has 3 vertices.");
    
    ok(g.is_complete(),
      "Is K(3).");
  });
  
  test('Subgraph testing', function ()
  {
    ok(Graph.c(4).is_subgraph(Graph.k(4)),
      "C(4) is subgraph of K(4)");
    
    ok(!new Graph({a: ['b', 'c']}).is_subgraph(new Graph({b: ['a', 'c']})),
      "Subgraph negative.");
  });
  
  test('Subgraph vertices', function ()
  {
    var a = new Date("1/1/2001");
    var b = new Date("2/2/2002");
    
    var g = new Graph();
    g.set(a, b);
    g.each(function (v)
    {
      ok(v === a || v === b,
        "Vertices of graph match.");
    });
    
    var h = g.subgraph([a, b]);
    h.each(function (v)
    {
      ok(v === a || v === b,
        "Vertices of subgraph match.");
    });
  });
}

if (QUnit.run) QUnit.run(typeof exports !== 'undefined' ? exports : undefined);
