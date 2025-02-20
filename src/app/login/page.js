"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // To redirect after login
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Lock } from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // To store API error messages
  const router = useRouter(); // Used to navigate after login

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://quizapp-2-ui7y.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      
      const data = await response.json();
      console.log(data);
      
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save JWT token if returned by the API (optional)
      sessionStorage.setItem("token", data.accessToken);
      // Redirect to the quiz dashboard
      router.push("/quiz");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600">
      <Card className="w-96 shadow-lg border border-gray-200 bg-white p-6 transition-transform duration-300 hover:scale-105">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-bold text-gray-800">
            Login to Quizzy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username Input */}
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-500" />
              <Input
                name="username"
                type="text"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                className="pl-10 focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-500" />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="pl-10 focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                required
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition-transform duration-200 active:scale-95"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Login"}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-indigo-600 hover:underline transition-colors duration-200"
            >
              Sign Up
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
