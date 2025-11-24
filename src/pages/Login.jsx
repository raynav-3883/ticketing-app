// src/pages/Login.jsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { Hub, Lock, Mail } from "@mui/icons-material";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [err, setErr] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await login({ email, password });
      nav("/", { replace: true });
    } catch (error) {
      setErr(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/60 to-purple-900/80 flex items-center justify-center px-4">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 items-center">
        {/* Left: Brand / Story */}
        <div className="hidden md:flex flex-col gap-6 text-white">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Hub className="text-4xl text-blue-400" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Voyage<span className="text-blue-400">Net</span>
              </h1>
              <p className="text-sm text-blue-200/80">
                Network-Based Intelligent Travel System
              </p>
            </div>
          </div>

          <p className="text-base text-gray-200/90 leading-relaxed">
            Sign in to access AI-driven route planning, multi-modal journeys and
            real-time network intelligence. Your personalised travel dashboard
            is just one step away.
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur border border-white/15">
              <p className="font-semibold text-blue-200 mb-1">Smart Routing</p>
              <p className="text-gray-200/80 text-xs">
                Compare fastest, cheapest and balanced paths in seconds.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur border border-white/15">
              <p className="font-semibold text-purple-200 mb-1">AI Insights</p>
              <p className="text-gray-200/80 text-xs">
                Get intelligent suggestions on when and how to travel.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur border border-white/15">
              <p className="font-semibold text-cyan-200 mb-1">Global Network</p>
              <p className="text-gray-200/80 text-xs">
                Explore interconnected hubs across multiple transport modes.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur border border-white/15">
              <p className="font-semibold text-emerald-200 mb-1">
                Real-time View
              </p>
              <p className="text-gray-200/80 text-xs">
                Stay updated with dynamic network conditions and delays.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Login card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl shadow-blue-900/40 p-8 md:p-10 text-white">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-blue-200/80 mb-2">
              Welcome back
            </p>
            <h2 className="text-3xl font-bold mb-1">Sign in to your hub</h2>
            <p className="text-sm text-gray-200/80">
              Use your registered email and password to access VoyageNet.
            </p>
          </div>

          <form className="space-y-5" onSubmit={onSubmit}>
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-100">
                Email address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Mail className="text-gray-300 text-base" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white/10 border border-white/25 text-sm placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-100">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Lock className="text-gray-300 text-base" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white/10 border border-white/25 text-sm placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                  required
                />
              </div>
            </div>

            {/* Error message */}
            {err && (
              <div className="text-sm text-red-300 bg-red-500/10 border border-red-500/40 rounded-xl px-3 py-2">
                {err}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 text-sm font-semibold tracking-wide shadow-lg shadow-blue-900/40 hover:shadow-xl hover:brightness-110 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {loading ? "Signing you in..." : "Login to VoyageNet"}
            </button>
          </form>

          {/* Footer links */}
          <div className="mt-6 text-xs text-gray-200/80 flex items-center justify-between gap-3">
            <span>
              New to VoyageNet?{" "}
              <Link
                to="/signup"
                className="text-blue-300 hover:text-blue-200 font-semibold"
              >
                Create an account
              </Link>
            </span>
            <button className="text-gray-300 hover:text-white">
              Forgot password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
