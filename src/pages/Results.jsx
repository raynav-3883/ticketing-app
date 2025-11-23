import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { dummyRoutes } from "../data/dummyRoutes";
import RouteResults from "../components/RouteResults";
import TravelMap from "../components/TravelMap";
import AIAssistant from "../components/AIAssistant";

const Results = () => {
  const [searchParams] = useSearchParams();
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  useEffect(() => {
    setTimeout(() => {
      const match = dummyRoutes.find(
        (r) =>
          r.from.toLowerCase() === from?.toLowerCase() &&
          r.to.toLowerCase() === to?.toLowerCase()
      );
      setRoutes(match ? match.routes : []);
      setLoading(false);
    }, 1000);
  }, [from, to]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/30 to-purple-800/40 text-white py-10">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-8">
          Results for {from} → {to}
        </h1>

        {loading ? (
          <p className="text-center text-blue-300 text-lg">
            🔍 Searching best routes...
          </p>
        ) : routes.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Route list */}
            <div className="lg:col-span-2">
              <RouteResults routes={routes} loading={loading} />
            </div>

            {/* Map + AI Assistant */}
            <div className="lg:col-span-1 space-y-6">
              <TravelMap routes={routes} />
              <AIAssistant />
            </div>
          </div>
        ) : (
          <p className="text-center text-red-400 font-semibold">
            ⚠️ No routes found for this journey. Try “Patna → Srinagar”.
          </p>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-sm border-t border-white/10 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl font-semibold text-blue-400">
                VoyageNet
              </span>
              <span className="text-gray-400 text-sm">
                Smart travel routes powered by AI + Network Graph
              </span>
            </div>
            <span className="text-gray-400 text-sm">
              © 2025 VoyageNet. All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Results;
