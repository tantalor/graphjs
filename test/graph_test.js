with (jqUnit)
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
    ok(g.get(1, 2) === undefined,
      "Deleted edge is undefined.");
    ok(g.get(2, 1) === undefined,
      "Reverse of edge is also undefined.");
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
    ok(g.get(1, 2) === undefined,
      "Deleted edge is undefined.");
    ok(g.get(2, 1) === undefined,
      "Reverse of edge is also undefined.");
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
    ok(g.get(2, 3) === undefined,
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
    ok(g.get(1, 2) === undefined,
      "Original graph does not have deleted edge.")
    ok(h.get(1, 2) == 3,
      "Copied graph has deleted edge with weight.");
  });
  
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
}
