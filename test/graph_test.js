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
    ok(g.degree[1] === 0,
      "Degree of one vertex is 0.");
    ok(g.degree[2] === 0,
      "Degree of other vertex is 0.");
    ok(g.size === 0,
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
    ok(g.vertices.length === 2,
      "Number of vertices is 2.");
    ok(g.degree[1] === 1,
      "Degree of one vertex is 1.");
    ok(g.degree[2] === 1,
      "Degree of other vertex is 1.");
    ok(g.size === 1,
      "Size is 1.");
  });

  test('Set and delete', function ()
  {
    var g = new Graph();
    g.set(1, 2, 3);
    g.del(1, 2);
    ok(g.get(1, 2) === undefined,
      "Deleted edge is undefined.");
    ok(g.get(2, 1) === undefined,
      "Reverse of edge is also undefined.");
    ok(g.vertices.length === 2,
      "Number of vertices is 2.");
    ok(g.degree[1] === 0,
      "Degree of one vertex is 0.");
    ok(g.degree[2] === 0,
      "Degree of other vertex is 0.");
    ok(g.size === 0,
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
    ok(g.vertices.length === 2,
      "Number of vertices is 2.");
    ok(g.degree[1] === 1,
      "Degree of one vertex is 1.");
    ok(g.degree[2] === 1,
      "Degree of other vertex is 1.");
    ok(g.size === 1,
      "Size is 1.");
  });

  test('Set and reverse delete', function ()
  {
    var g = new Graph();
    g.set(1, 2, 3);
    g.del(2, 1);
    ok(g.get(1, 2) === undefined,
      "Deleted edge is undefined.");
    ok(g.get(2, 1) === undefined,
      "Reverse of edge is also undefined.");
    ok(g.vertices.length === 2,
      "Number of vertices is 2.");
    ok(g.degree[1] === 0,
      "Degree of one vertex is 0.");
    ok(g.degree[2] === 0,
      "Degree of other vertex is 0.");
    ok(g.size === 0,
      "Size is 0.");
  });

  test('Self edge', function ()
  {
    var g = new Graph();
    ok(g.set(1, 1, 2) == 2,
      "Set self edge returns weight.");
    ok(g.get(1, 1) === 2,
      "Get self edge returns weight.");
    ok(g.vertices.length === 1,
      "Number of vertices is 1.");
    ok(g.degree[1] === 1,
      "Degree of vertex is 1.");
    ok(g.size === 1,
      "Size is 1.");
  });

  test('Simple constructor', function ()
  {
    var g = new Graph({pirate: ['ninja', 'robot']});
    console.log(g);
    ok(g.get('pirate', 'ninja') && g.get('pirate', 'robot'),
      "All edges exist.");
    ok(g.vertices.length === 3,
      "Number of vertices is 3.");
    ok(g.degree['pirate'] === 2,
      "Degree of 'pirate' vertex is 2.");
    ok(g.degree['ninja'] === 1,
      "Degree of 'ninja' vertex is 1.");
    ok(g.degree['robot'] === 1,
      "Degree of 'robot' vertex is 1.");
    ok(g.size === 2,
      "Size is 2.");
  });

  test('Constructor with weights', function ()
  {
    var g = new Graph({pirate: {ninja: 'robot'}});
    ok(g.get('pirate', 'ninja') === 'robot',
      "Get in original order has weight 'robot'.");
    ok(g.get('ninja', 'pirate') === 'robot',
      "Get in reversed order has weight 'robot'.");
    ok(g.vertices.length === 2,
      "Number of vertices is 2.");
    ok(g.degree['pirate'] === 1,
      "Degree of 'pirate' vertex is 1.");
    ok(g.degree['ninja'] === 1,
      "Degree of 'ninja' vertex is 1.");
    ok(g.size === 1,
      "Size is 1.");
  });
  
  test('Direct lookup', function ()
  {
    var g = new Graph();
    g.set(1, 2, 3);
    ok(g.graph[1][2] === 3,
      "Graph member can be read in original order.");
    ok(g.graph[2][1] === 3,
      "Graph member can be read in reverse order.");
  });

  test('Multiget', function ()
  {
    var g = new Graph();
    ok(g.set(1, 2) && g.set(2, 3) && g.set(3, 1),
      "Set all edges.");
    ok(g.get(2, 1) && g.get(3, 2) && g.get(1, 3),
      "All edges exist.");
    ok(g.degree[1] == 2 && g.degree[2] == 2 && g.degree[3] == 2,
      "Degree of all vertices is 2.");
    ok(g.vertices.length === 3,
      "Number of vertices is 3.");
    ok(g.size === 3,
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
}
