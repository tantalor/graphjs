with(jqUnit)
{
  test('Graph exists',
  function()
  {
    ok(Graph);
  });

  test('Null get',
  function()
  {
      var g = new Graph();
      ok(g.get(1, 2) == undefined);
  });

  test('Bad delete',
  function()
  {
    var g = new Graph();
    g.del(1, 2);
    ok(g.degree[1] == 0);
    ok(g.degree[2] == 0);
    ok(g.size == 0);
  });

  test('Simple get',
  function()
  {
    var g = new Graph();
    ok(g.set(1, 2, 3) == 3);
    ok(g.get(1, 2) == 3);
  });

  test('Set and get',
  function()
  {
    var g = new Graph();
    g.set(1, 2, 3);
    ok(g.get(1, 2) == 3);
    ok(g.get(2, 1) == 3);
    ok(g.vertices.length == 2);
    ok(g.degree[1] == 1);
    ok(g.degree[2] == 1);
    ok(g.size == 1);
  });

  test('Set and delete',
  function()
  {
    var g = new Graph();
    g.set(1, 2, 3);
    g.del(1, 2);
    ok(g.get(1, 2) == undefined);
    ok(g.get(2, 1) == undefined);
    ok(g.vertices.length == 2);
    ok(g.degree[1] == 0);
    ok(g.degree[2] == 0);
    ok(g.size == 0);
  });

  test('Set and reverse set',
  function()
  {
    var g = new Graph();
    g.set(1, 2, 3);
    g.set(2, 1, 4);
    ok(g.get(1, 2) == 4);
    ok(g.get(2, 1) == 4);
    ok(g.vertices.length == 2);
    ok(g.degree[1] == 1);
    ok(g.degree[2] == 1);
    ok(g.size == 1);
  });

  test('Set and reverse delete',
  function()
  {
    var g = new Graph();
    g.set(1, 2, 3);
    g.del(2, 1);
    ok(g.get(1, 2) == undefined);
    ok(g.get(2, 1) == undefined);
    ok(g.vertices.length == 2);
    ok(g.degree[1] == 0);
    ok(g.degree[2] == 0);
    ok(g.size == 0);
  });

  test('Self edge',
  function()
  {
    var g = new Graph();
    g.set(1, 1, 2);
    ok(g.get(1, 1) == 2);
    ok(g.vertices.length == 1);
    ok(g.degree[1] == 1);
    ok(g.size == 1);
  });

  test('Copy',
  function()
  {
    var g = new Graph({
        pirate: {
            ninja: 'robot'
        }
    });
    ok(g.get('pirate', 'ninja') == 'robot');
    ok(g.get('ninja', 'pirate') == 'robot');
    ok(g.vertices.length == 2);
    ok(g.degree['pirate'] == 1);
    ok(g.degree['ninja'] == 1);
    ok(g.size == 1);
  });

  test('Reverse lookup',
  function()
  {
    var g = new Graph();
    g.set(1, 2, 3);
    g.set(4, 2, 5);
    ok(g.graph[1][2] == 3);
    ok(g.graph[2][1] == 3);
    ok(g.graph[4][2] == 5);
    ok(g.graph[2][4] == 5);
  });

  test('Multiget',
  function()
  {
    var g = new Graph();
    g.set(1, 2);
    g.set(2, 3);
    g.set(3, 1);
    ok(g.get(2, 1));
    ok(g.get(3, 2));
    ok(g.get(1, 3));
    ok(g.size == 3);
  });

  test('Adjacency',
  function()
  {
    var g = new Graph();
    g.set(1, 2);
    ok(1 in g.adj(2));
    ok(2 in g.adj(1));
  });
}
