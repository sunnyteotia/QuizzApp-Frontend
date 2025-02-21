"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Trophy, User, Star, ListOrdered } from "lucide-react";
export default function LeaderboardPage() {
    const { quizId } = useParams(); // ✅ Correctly get the quizId
    const [leaderboard, setLeaderboard] = useState([]);

    const getAuthToken = () => sessionStorage.getItem("authToken");
    const router = useRouter();
    useEffect(() => {
        const token = sessionStorage.getItem("token");

    if (!token) {
      router.push("/register"); // Redirect if no token found
    }
        async function fetchLeaderboard() {
            try {
                const response = await fetch(`https://quizapp-2-ui7y.onrender.com/api/leaderboard/${quizId}`, {
                    headers: { Authorization: `Bearer ${getAuthToken()}` },
                });

                const data = await response.json();
                setLeaderboard(data.data || []);
            } catch (error) {
                console.error("Error fetching leaderboard:", error);
            }
        }

        if (quizId) {
            fetchLeaderboard();
        }
    }, [quizId]);

    return (
        <div className="flex flex-col items-center justify-center p-6">
      <div className="w-full md:w-3/4 lg:w-1/2 bg-white shadow-xl rounded-lg p-6 border border-gray-200 animate-fade-in">
        <h1 className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2">
          <Trophy className="text-yellow-500" /> Leaderboard
        </h1>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-900 text-white text-lg">
              <th className="p-3 text-left">Rank</th>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length > 0 ? (
              leaderboard.map((entry, index) => (
                <tr
                  key={entry.userId}
                  className={`text-lg ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200 transition-all duration-200`}
                >
                  <td className="p-3 flex items-center gap-2 font-semibold">
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
                  </td>
                  <td className="p-3 flex items-center gap-2 font-medium">
                    <User className="text-blue-500" /> {entry.username}
                  </td>
                  <td className="p-3 font-bold">{entry.score} pts</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center p-4 font-semibold text-gray-500">
                  No attempts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    );
}
