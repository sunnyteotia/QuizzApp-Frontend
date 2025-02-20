"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function QuizPage() {
    const [quizzes, setQuizzes] = useState([]);
    const router = useRouter();

    const getAuthToken = () => sessionStorage.getItem("token");

    useEffect(() => {
        async function fetchQuizzes() {
            try {
                const response = await fetch("https://quizapp-2-ui7y.onrender.com/api/quiz/quizzes", {
                    headers: { Authorization: `Bearer ${getAuthToken()}` },
                });
                const data = await response.json();
                setQuizzes(data.data.quizzes || []);
            } catch (error) {
                console.error("Error fetching quizzes:", error);
            }
        }
        fetchQuizzes();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-6">
            <h1 className="text-3xl font-bold mb-6">Available Quizzes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quizzes.map((quiz) => (
                    <Card key={quiz._id} className="transition transform hover:scale-105 p-6 bg-blue-500 text-white">
                        <CardHeader className="text-xl font-bold">{quiz.title}</CardHeader>
                        <CardContent>
                            <Button
                                onClick={() => router.push(`/quiz/${quiz._id}`)}
                                className="w-full flex items-center gap-2 bg-white text-black"
                            >
                                Start Quiz
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
