"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // For success/error messages
  const router = useRouter(); // Used to navigate after register

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // Clear previous messages

    try {
      const response = await fetch("https://quizapp-2-ui7y.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage("Registration successful! 🎉");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      setMessage("Error registering. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 animate-fade-in">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl p-6 bg-white transition-transform duration-300 hover:scale-105">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">
            Create Account
          </CardTitle>
          <p className="text-gray-500">Join Quizzy and test your knowledge!</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" />
              <Input
                name="username"
                type="text"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                className="pl-10 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" />
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="pl-10 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="pl-10 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>

          {/* Success/Error Message */}
          {message && (
            <p
              className={`mt-4 text-center ${
                message.includes("successful") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          {/* Redirect to Login */}
          <p className="mt-4 text-center text-gray-600">
            Already have an account? 
            <Link href="/login" className="text-blue-600 hover:underline ml-1">
              Log in here
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
