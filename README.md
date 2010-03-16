# GraphJS

**GraphJS** is a simple Javascript library for manipulating undirected [graphs](http://en.wikipedia.org/wiki/Graph_\(mathematics\)).

Your graphs may have self edges and weighted edges, but not multiedges or directed edges.

## Usage

### Creating, reading, updating, and deleting edges (CRUD)

    var g = new Graph();
    
    g.set('a', 'b', 3); # creates edge (a, b) with weight 3
    g.get('a', 'b'); # returns 3
    
    g.set('a', 'b', 3); # changes (a, b) weight to 4
    g.get('a', 'b'); # returns 4
    
    g.del('a', 'b'); # removes edge (a, b)
    g.get('a', 'b'); # returns undefined

### Constructing graphs from data

    new Graph({
      a: ['b', 'c'],
      c: ['d'],
    }); # triangle with vertices a, b, and c
    
    new Graph({
      a: {b: 2},
      b: {c: 3},
    }); # path with vertices a, b, c and weights (a, b) = 2, (b, c) = 3

### Degree, size, order, and adjacency

    var g = new Graph({
      a: ['b'],
      b: ['c'],
    }); # path with vertices a, b, c
    
    g.degree('a'); # returns 1
    g.degree('b'); # returns 2
    g.degree('c'); # returns 1
    
    g.size(); # returns 2, the number of edges
    
    g.order(); # returns 3, the number of vertices
    
    for (v in g.adj('b')) {
      # v = a, c (in no particular order)
    }

### Copying

    var g = new Graph({
      a: ['b', 'c'],
      c: ['d'],
    });
    
    var h = g.copy(); # an independent copy of g

## Tests

GraphJS is packaged with [jqUnit](http://code.google.com/p/jqunit/) tests. To run the tests, load the `graphjs/test/test.html` page in your favorite browser.

### Example

  Tests completed in 42 milliseconds.
  0 tests of 85 failed.
