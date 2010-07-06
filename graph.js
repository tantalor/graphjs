(function ()
{
  var ANTIEDGE = false;
  
  var Graph = function (graph) {
    this._graph = {} // {u: {v: edge, ...}, ...}
    this._degree = {} // {u: degree, ...}
    this._indegree = {} // {u: degree, ...}
    this._vertices = []; // [u, v, ...]
    this._size = 0;
    
    if (graph)
    {
      // copy input graph
      for (var u in graph)
      {
        var adj = graph[u];
        if (adj.constructor === Object)
        {
          for (var v in adj)
          {
            this.set(u, v, adj[v]);
          }
        } else if (adj.constructor === Array)
        {
          for (var i = 0; i < adj.length; i++)
          {
            this.set(u, adj[i]);
          }
        }
      }
    }
  }
  
  Graph.prototype.copy = function ()
  {
    return new Graph(this._graph);
  }
  
  Graph.prototype.adj = function (u)
  {
    return this._graph[u];
  }
  
  Graph.prototype.get = function (u, v)
  {
    if (this._graph[u])
      return this._graph[u][v];
  }
  
  Graph.prototype.has = function (u, v)
  {
    return this.get(u, v) !== undefined;
  }
  
  Graph.prototype.degree = function (u)
  {
    return this._degree[u];
  }
  
  Graph.prototype.indegree = function (u)
  {
    return this._indegree[u];
  }
  
  Graph.prototype.size = function ()
  {
    return this._size;
  }
  
  Graph.prototype.order = function ()
  {
    return this._vertices.length;
  }
  
  Graph.prototype.each = function (f)
  {
    for (var i = 0; i < this._vertices.length; i++)
    {
      if (f.call(this, this._vertices[i], i) === false)
        break;
    }
  }
  
  Graph.prototype.grep = function (f)
  {
    var vertices = [];
    this.each(function (v, i)
    {
      if (f.call(this, v, i))
        vertices.push(v);
    });
    return vertices;
  }
  
  Graph.prototype.set = function (u, v, edge)
  {
    // take an undefined edge as simply 'true' for convenience
    if (edge === undefined)
      edge = true;
    
    // increment/decrement size
    if (edge !== ANTIEDGE && !this.has(u, v) && !this.has(v, u))
    {
      this._size++;
    } else if (edge === ANTIEDGE && (this.has(u, v) || this.has(v, u)))
    {
      this._size--;
    }
    
    // set/unset edges and increment/decrement degrees
    _set.call(this, u, v, edge);
    _set.call(this, v, u, edge);
    
    return edge;
  }
  
  Graph.prototype.dir = function (u, v, edge)
  {
    // take an undefined edge as simply 'true' for convenience
    if (edge === undefined)
      edge = true;
    
    // increment/decrement size
    if (edge !== ANTIEDGE && !(this.has(u, v) || this.has(v, u)))
    {
      this._size++;
    } else if (edge === ANTIEDGE && this.has(u, v) && !this.has(v, u))
    {
      this._size--;
    }
    
    // set/unset edge and increment/decrement degree
    _set.call(this, u, v, edge);
    
    return edge;
  }
  
  Graph.prototype.drop = function (v)
  {
    if (!(v in this._degree))
      return false;
    
    // remove adjacent edges
    for (var u in this.adj(v))
    {
      this.del(v, u);
    }
    
    // remove from vertex list
    for (var i = 0; i < this._vertices.length; i++)
    {
      if (this._vertices[i] === v)
      {
        this._vertices.splice(i, 1);
        break;
      }
    }
    
    // remove from degree indexes
    delete this._degree[v];
    delete this._indegree[v];
    
    return true;
  }
  
  Graph.prototype.del = function (u, v)
  {
    // remove vertex
    if (v === undefined)
      return this.drop(u);
    
    // remove edge
    return this.set(u, v, ANTIEDGE);
  }
  
  Graph.prototype.deldir = function (u, v)
  {
    return this.dir(u, v, ANTIEDGE);
  }
    
  function _set (u, v, edge)
  {
    // add to vertex list if the degree is unknown
    if (!(u in this._degree))
    {
      this._vertices.push(u);
      this._degree[u] = this._indegree[u] = 0;
    }
    
    if (!(v in this._degree))
    {
      this._vertices.push(v);
      this._degree[v] = this._indegree[v] = 0;
    }
    
    // we are setting an edge
    if (edge !== ANTIEDGE)
    {
      // we have a *new* edge
      if (!this.has(u, v))
      {
        this._degree[u]++;
        this._indegree[v]++;
      }
      
      // add to adjacency list
      this._graph[u] = this._graph[u] || {};
      this._graph[u][v] = edge;
    }
    // we are deleting an existing edge
    else if (this.has(u, v))
    {
      // remove from adjacency list
      delete this._graph[u][v];
      this._degree[u]--;
      this._indegree[v]--;
    }
  }
  
  // add to global scope
  if (typeof(window) !== 'undefined') {
    window.Graph = Graph;
  } else if (typeof(exports) !== 'undefined') {
    exports.Graph = Graph;
  }
}());
