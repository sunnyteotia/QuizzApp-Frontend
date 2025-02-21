"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Trophy, User, Star, ListOrdered } from "lucide-react";
export default function LeaderboardPage() {
    const { quizId } = useParams();
    const [leaderboard, setLeaderboard] = useState([]);

    const getAuthToken = () => sessionStorage.getItem("token");

    useEffect(() => {
        async function fetchLeaderboard() {
            const response = await fetch(`https://quizapp-2-ui7y.onrender.com/api/leaderboard/${quizId}`, {
                headers: {
                    "Authorization": `Bearer ${getAuthToken()}`,
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            console.log(data);
            
            setLeaderboard(data.data.leaderboard || []);
        }
        fetchLeaderboard();
        console.log(leaderboard);
        
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
              {/* Rank with icons */}
              <td className="p-3 font-semibold text-center align-middle">
                {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
              </td>

              {/* User info (Fixed alignment) */}
              <td className="p-3 flex items-center gap-3 align-middle">
                <User className="text-blue-500 w-5 h-5" /> {/* Fixed size */}
                <span className="font-medium">{entry.username}</span>
              </td>

              {/* Score */}
              <td className="p-3 font-bold text-center align-middle">{entry.score} pts</td>
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
