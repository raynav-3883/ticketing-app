import { routes } from "../graph/graphData.js";
import { buildGraph, dijkstra } from "../graph/dijkstra.js";

export function getCheapest(req, res) {
  const { source, destination } = req.query;

  const graph = buildGraph(routes);

  const result = dijkstra(graph, source, destination, "cost");

  res.json({
    type: "CHEAPEST",
    ...result
  });
}
