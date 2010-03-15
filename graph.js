(function () {
  var Graph = function (graph) {
    this.graph = {} // {u: {v: edge, ...}, ...}
    this.degree = {} // {u: degree, ...}
    this.vertices = []; // [u, v, ...]
    this.size = 0;
    
    if (graph)
    {
      // copy input graph
      for (var u in graph)
      {
        for (var v in graph[u])
        {
          this.set(u, v, graph[u][v]);
        }
      }
    }
  }
  
  Graph.prototype.adj = function (u)
  {
    return this.graph[u];
  }
  
  Graph.prototype.get = function (u, v)
  {
    if (this.graph[u])
      return this.graph[u][v];
  }
  
  Graph.prototype.set = function (u, v, edge)
  {
  	// take an undefined edge as simply 'true' for convenience
  	edge = (edge === undefined ? true : edge);
  	
  	// increment/decrement size
	  if (edge && !(this.graph[u] && this.graph[u][v]))
	  {
	    this.size++;
	  } else if (!edge && this.graph[u] && this.graph[u][v])
	  {
	    this.size--;
	  }
	  
  	// set/unset edges and increment/decrement degrees
  	_set(this, u, v, edge);
  	_set(this, v, u, edge);
  	
  	return edge;
  }
  
  Graph.prototype.del = function (u, v)
  {
  	this.set(u, v, false); // false is the edge annihilator
  }
  
  function _set (g, u, v, e)
  {
  	// add to vertex list if the degree is unknown
  	if (!g.degree[u])
  	{
  	  g.vertices.push(u);
  		g.degree[u] = 0;
  	}
  	
  	// we are setting an edge
  	if (e)
  	{
  		// we have a *new* edge
  		if(!g.graph[u] || !g.graph[u][v])
  		{
  			g.degree[u]++;
  		}
  		
  		// add to adjacency list
  		g.graph[u] = g.graph[u] || {};
  		g.graph[u][v] = e;
  	}
  	// we are deleting an existing edge
  	else if(g.graph[u] && g.graph[u][v])
  	{
  		// remove from adjacency list
  		delete g.graph[u][v];
  		g.degree[u]--;
  	}
  }
  
  // add to global scope
  window.Graph = Graph;
}());
