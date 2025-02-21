"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

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
            <Card className="w-full md:w-3/4 lg:w-1/2 bg-white shadow-lg p-6">
                <CardHeader className="text-2xl font-bold text-center">Leaderboard</CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-1/6">Rank</TableHead>
                                <TableHead className="w-2/6">User</TableHead>
                                <TableHead className="w-1/6">Score</TableHead>
                                <TableHead className="w-2/6">Total Attempts</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leaderboard.length > 0 ? (
                                leaderboard.map((entry, index) => (
                                    <TableRow key={entry.userId}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{entry.username}</TableCell>
                                        <TableCell>{entry.score}</TableCell>
                                        <TableCell>{entry.attempts}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">
                                        No attempts yet.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
