// routes/balanced.js

import { routes } from "../graph/graphData.js";
import { buildGraph, dijkstra } from "../graph/dijkstra.js";

export function getBalanced(req, res) {
  const { source, destination } = req.query;

  // Balanced = time + cost (simple mixed weight)
  const weightedRoutes = routes.map(r => ({
    ...r,
    weight: r.time + r.cost
  }));

  const graph = buildGraph(weightedRoutes);

  const result = dijkstra(graph, source, destination, "weight");

  res.json({
    type: "BALANCED",
    ...result
  });
}
