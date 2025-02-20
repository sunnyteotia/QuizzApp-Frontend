"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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
        <div className="p-6 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
            <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-lg">
                {leaderboard.length > 0 ? (
                    <ul>
                        {leaderboard.map((user, index) => (
                            <li key={user.userId} className="p-2 border-b flex justify-between">
                                <span>{index + 1}. {user.username}</span>
                                <span>{user.score} pts</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No leaderboard data available</p>
                )}
            </div>
        </div>
    );
}
