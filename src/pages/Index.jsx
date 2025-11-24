import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Navigation,
  TravelExplore,
  SmartToy,
  Hub,
  AutoGraph,
  Psychology,
  Language,
  Timeline
} from "@mui/icons-material";
import SearchForm from "../components/SearchForm";
import RouteResults from "../components/RouteResults";
import TravelMap from "../components/TravelMap";
import AIAssistant from "../components/AIAssistant";
import StatsOverview from "../components/StatsOverview";
import travelHeroImage from "../assets/travel-hero.jpg";
import { dummyRoutes } from "../data/dummyRoutes";
import { Link } from "react-router-dom";
import { useAuth } from "../lib/auth";


const Index = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState(null);

  // Mock route data
  const mockRoutes = [
    {
      type: "fastest",
      price: 245,
      duration: "4h 32m",
      departure: "08:15 AM",
      transfers: 1,
      recommended: true,
      segments: [
        {
          mode: "flight",
          from: "NYC",
          to: "CHI",
          duration: "2h 45m",
          operator: "United Airlines",
          price: 189,
        },
        {
          mode: "train",
          from: "CHI",
          to: "DEN",
          duration: "1h 47m",
          operator: "Amtrak",
          price: 56,
        },
      ],
    },
    {
      type: "cheapest",
      price: 127,
      duration: "8h 15m",
      departure: "06:30 AM",
      transfers: 2,
      recommended: false,
      segments: [
        {
          mode: "bus",
          from: "NYC",
          to: "PHI",
          duration: "2h 30m",
          operator: "Greyhound",
          price: 35,
        },
        {
          mode: "train",
          from: "PHI",
          to: "CHI",
          duration: "4h 45m",
          operator: "Amtrak",
          price: 67,
        },
        {
          mode: "bus",
          from: "CHI",
          to: "DEN",
          duration: "1h 00m",
          operator: "FlixBus",
          price: 25,
        },
      ],
    },
    {
      type: "balanced",
      price: 186,
      duration: "6h 20m",
      departure: "10:45 AM",
      transfers: 1,
      recommended: false,
      segments: [
        {
          mode: "train",
          from: "NYC",
          to: "CHI",
          duration: "4h 30m",
          operator: "Amtrak",
          price: 124,
        },
        {
          mode: "flight",
          from: "CHI",
          to: "DEN",
          duration: "1h 50m",
          operator: "Southwest",
          price: 62,
        },
      ],
    },
  ];
  const navigate = useNavigate();
  const handleSearch = (data) => {
    setSearchData(data);

    // 👇 this will open a new tab with query parameters
    const url = `/results?from=${encodeURIComponent(data.from)}&to=${encodeURIComponent(data.to)}`;
    window.open(url, "_blank");
  };
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-800/30">
      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Hub className="text-3xl text-blue-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  Voyage<span className="text-blue-400">Net</span>
                </h1>
                <p className="text-xs text-sky-500/80 -mt-1">
                  Network-Based Intelligent Travel System
                </p>

              </div>
            </div>
            <div className="hidden md:flex items-center gap-6 text-white/80 text-sm">
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-white/90">{user.name}</span>
                  <button
                    onClick={logout}
                    className="text-sm text-white/80 bg-white/10 px-3 py-1 rounded hover:bg-white/20"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link to="/login" className="text-sm text-white/90 hover:text-white">Login</Link>
                  <Link to="/signup" className="text-sm text-white/90 hover:text-white bg-white/10 px-3 py-1 rounded">Sign up</Link>
                </div>
              )}
              <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                <Language className="text-sm" />
                Global Network
              </span>
              <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                <Psychology className="text-sm" />
                AI Powered
              </span>
              <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                <Timeline className="text-sm" />
                Real-time Data
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        className="relative h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `url(${travelHeroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-blue-900/60" />

        {/* Network Animation Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="relative w-full h-full overflow-hidden">
            {/* Animated network nodes */}
            <div className="absolute top-20 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <div className="absolute top-32 right-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-300" />
            <div className="absolute bottom-32 left-1/3 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse delay-700" />
            <div className="absolute bottom-40 right-1/4 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse delay-500" />

            {/* Connecting lines */}
            <svg className="absolute inset-0 w-full h-full">
              <line x1="25%" y1="20%" x2="50%" y2="50%" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" values="0;10" dur="3s" repeatCount="indefinite" />
              </line>
              <line x1="50%" y1="50%" x2="75%" y2="30%" stroke="rgba(147, 51, 234, 0.3)" strokeWidth="1" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" values="0;10" dur="4s" repeatCount="indefinite" />
              </line>
              <line x1="33%" y1="70%" x2="50%" y2="50%" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" values="0;10" dur="5s" repeatCount="indefinite" />
              </line>
            </svg>
          </div>
        </div>

        <div className="relative h-full flex items-center max-w-6xl mx-auto px-6 pt-16">
          <div className="text-white max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm rounded-2xl border border-white/10">
                <AutoGraph className="text-5xl text-blue-400" />
              </div>
              <div>
                <h1 className="text-6xl font-bold mb-2">
                  Voyage<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">Net</span>
                </h1>
                <div className="flex items-center gap-2 text-lg text-blue-200">
                  <Hub className="text-xl" />
                  <span className="font-semibold">Network-Based Intelligent Travel System</span>
                  <Language className="text-xl ml-2" />
                </div>
              </div>
            </div>

            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Harness the power of our global transportation network with AI-driven route optimization.
              Discover the most efficient paths across multiple transport modes with real-time intelligence.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              <div className="flex flex-col items-center gap-2 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                <Navigation className="text-2xl text-blue-400" />
                <span className="font-semibold">Smart Routing</span>
                <span className="text-xs opacity-75 text-center">AI-optimized pathfinding</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                <SmartToy className="text-2xl text-purple-400" />
                <span className="font-semibold">ML Predictions</span>
                <span className="text-xs opacity-75 text-center">Predictive analytics</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                <Hub className="text-2xl text-cyan-400" />
                <span className="font-semibold">Network Graph</span>
                <span className="text-xs opacity-75 text-center">Connected transport hubs</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                <TravelExplore className="text-2xl text-green-400" />
                <span className="font-semibold">Multi-Modal</span>
                <span className="text-xs opacity-75 text-center">Integrated transport modes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs">Explore Routes</span>
            <div className="w-0.5 h-8 bg-gradient-to-b from-white/60 to-transparent" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Search Form */}
        <div className="relative">
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
          <SearchForm onSearch={handleSearch} />
        </div>

        {/* Stats Overview */}
        {!searchData && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-blue mb-4">
                Network Intelligence in Action
              </h2>
              <p className="text-lg text-black max-w-2xl mx-auto">
                Our advanced algorithms analyze millions of route combinations to deliver optimal travel solutions
              </p>
            </div>
            <StatsOverview />
          </div>
        )}

        {/* Results and Map */}
        {searchData && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Your Optimized Route Network
              </h2>
              <p className="text-lg text-gray-300">
                AI-analyzed routes from {searchData.from} to {searchData.to}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <RouteResults routes={routes} loading={loading} />
              </div>
              <div className="lg:col-span-1 space-y-6">
                <TravelMap routes={routes} />
                <AIAssistant />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-sm border-t border-white/10 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Hub className="text-2xl text-blue-400" />
              <div>
                <div className="text-white font-bold">
                  Voyage<span className="text-blue-400">Net</span>
                </div>
                <div className="text-xs text-gray-400">
                  Powered by Advanced Network Intelligence
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              © 2025 VoyageNet. Connecting the world through intelligent travel.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;