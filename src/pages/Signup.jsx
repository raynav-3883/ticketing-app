// src/pages/Signup.jsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { Hub, Mail, Lock, Person } from "@mui/icons-material";

export default function Signup() {
  const { signup } = useAuth();
  const nav = useNavigate();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [err, setErr] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await signup({ name, email, password });
      nav("/", { replace: true });
    } catch (error) {
      setErr(error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/60 to-purple-900/80 flex items-center justify-center px-4">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 items-center">
        {/* Left: Brand / copy */}
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
            Create your VoyageNet account and unlock AI-powered travel
            planning, multi-modal route comparison and intelligent booking
            suggestions tailored to your journey.
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur border border-white/15">
              <p className="font-semibold text-emerald-200 mb-1">Personalized</p>
              <p className="text-gray-200/80 text-xs">
                Save your preferences and get smarter route recommendations.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur border border-white/15">
              <p className="font-semibold text-purple-200 mb-1">Seamless Access</p>
              <p className="text-gray-200/80 text-xs">
                Login from any device and pick up your planning where you left.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur border border-white/15">
              <p className="font-semibold text-cyan-200 mb-1">
                Secure by Design
              </p>
              <p className="text-gray-200/80 text-xs">
                Encrypted authentication and token-based access.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur border border-white/15">
              <p className="font-semibold text-amber-200 mb-1">Future Ready</p>
              <p className="text-gray-200/80 text-xs">
                Built for expansion with upcoming features and modules.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Signup card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl shadow-blue-900/40 p-8 md:p-10 text-white">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-blue-200/80 mb-2">
              Join the network
            </p>
            <h2 className="text-3xl font-bold mb-1">Create your account</h2>
            <p className="text-sm text-gray-200/80">
              It only takes a minute. Start exploring intelligent travel
              routes with VoyageNet.
            </p>
          </div>

          <form className="space-y-5" onSubmit={onSubmit}>
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-100">
                Full name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Person className="text-gray-300 text-base" />
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Saksham Maurya"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white/10 border border-white/25 text-sm placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                  required
                />
              </div>
            </div>

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
                  placeholder="Create a strong password"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white/10 border border-white/25 text-sm placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                  required
                />
              </div>
            </div>

            {/* Error */}
            {err && (
              <div className="text-sm text-red-300 bg-red-500/10 border border-red-500/40 rounded-xl px-3 py-2">
                {err}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 text-sm font-semibold tracking-wide shadow-lg shadow-blue-900/40 hover:shadow-xl hover:brightness-110 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {loading ? "Creating your account..." : "Create VoyageNet account"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-xs text-gray-200/80 flex items-center justify-between gap-3">
            <span>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-300 hover:text-blue-200 font-semibold"
              >
                Log in
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
