// graph/dijkstra.js

export function buildGraph(routes) {
  const graph = {};

  // Create empty lists for ALL nodes (source + destinations)
  routes.forEach(r => {
    if (!graph[r.source]) graph[r.source] = [];
    if (!graph[r.destination]) graph[r.destination] = []; 
  });

  // Now push edges
  routes.forEach(r => {
    graph[r.source].push({
      node: r.destination,
      cost: r.cost,
      time: r.time,
      mode: r.mode,
      weight: r.weight ?? r.cost
    });
  });

  return graph;
}


export function dijkstra(graph, start, end, weightType) {
  const distances = {};
  const visited = {};
  const previous = {};

  // Create all nodes with infinite weight
  Object.keys(graph).forEach(node => {
    distances[node] = Infinity;
    previous[node] = null;
  });

  // Set start distance to 0
  distances[start] = 0;

  while (true) {
    let current = null;

    // Find nearest unvisited node
    Object.keys(distances).forEach(node => {
      if (!visited[node] && (current === null || distances[node] < distances[current])) {
        current = node;
      }
    });

    if (current === null || current === end) break;

    visited[current] = true;

    (graph[current] || []).forEach(neighbor => {
      const weight = neighbor[weightType];
      const newDist = distances[current] + weight;

      if (newDist < distances[neighbor.node]) {
        distances[neighbor.node] = newDist;
        previous[neighbor.node] = {
          node: current,
          mode: neighbor.mode,
          cost: neighbor.cost,
          time: neighbor.time
        };
      }
    });
  }

  // Build final route
  const path = [];
  let node = end;

  while (node && previous[node]) {
    const prev = previous[node];

    path.unshift({
      from: prev.node,
      to: node,
      mode: prev.mode,
      cost: prev.cost,
      time: prev.time
    });

    node = prev.node;
  }

  return {
    path,
    totalWeight: distances[end]
  };
}
