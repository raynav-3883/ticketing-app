import { routes } from "../graph/graphData.js";
import { buildGraph, dijkstra } from "../graph/dijkstra.js";

export function getFastest(req, res) {
  const { source, destination } = req.query;

  const graph = buildGraph(routes);

  const result = dijkstra(graph, source, destination, "time");

  res.json({
    type: "FASTEST",
    ...result
  });
}
