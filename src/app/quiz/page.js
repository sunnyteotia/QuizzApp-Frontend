"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, ArrowRight } from "lucide-react";
export default function QuizPage() {
    const [quizzes, setQuizzes] = useState([]);
    const router = useRouter();

    const getAuthToken = () => sessionStorage.getItem("token");

    useEffect(() => {
        const token = sessionStorage.getItem("token");

    if (!token) {
      router.push("/register"); // Redirect if no token found
    }
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
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-600 via-purple-500 to-indigo-700">
      <h1 className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg">
        Available Quizzes
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {quizzes.map((quiz) => (
          <Card
            key={quiz._id}
            className="p-6 bg-white shadow-lg rounded-lg transition transform hover:scale-105 hover:shadow-xl"
          >
            <CardHeader className="text-xl font-bold flex items-center gap-2">
              <PlayCircle className="text-blue-500" />
              {quiz.title}
            </CardHeader>

            <CardContent className="flex justify-center">
              <Button
                onClick={() => router.push(`/quiz/${quiz._id}`)}
                className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:bg-blue-600 hover:shadow-lg active:scale-95"
              >
                <span>Start Quiz</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>

    );
}
