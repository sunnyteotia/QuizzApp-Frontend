"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

export default function QuizDetailPage() {
    const { quizId } = useParams(); 
    const [quiz, setQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(30);  // ⏳ Timer starts at 30 sec
    const router = useRouter();

    const getAuthToken = () => sessionStorage.getItem("token");

    useEffect(() => {
        async function fetchQuiz() {
            try {
                const response = await fetch(`https://quizapp-2-ui7y.onrender.com/api/quiz/get/${quizId}`, {
                    headers: { Authorization: `Bearer ${getAuthToken()}` },
                });
                const data = await response.json();
                setQuiz(data.data);
            } catch (error) {
                console.error("Error fetching quiz:", error);
            }
        }
        if (quizId) {
            fetchQuiz();
        }
    }, [quizId]);

    // ⏳ Timer Effect - Decreases every second
    useEffect(() => {
        if (timeLeft === 0) {
            handleAutoSubmit();
            return;
        }
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
    }, [timeLeft]);

    const handleAutoSubmit = () => {
        if (!selectedAnswer) {
            handleAnswerSelection(null); // Auto-submit empty if no answer
        }
    };

    const handleAnswerSelection = (answer) => {
        const correctAnswer = quiz.questions[currentQuestionIndex].correctAnswer;
        const isCorrect = answer === correctAnswer;

        const updatedAnswers = [
            ...answers,
            {
                questionText: quiz.questions[currentQuestionIndex].questionText,
                selectedAnswer: answer,
                isCorrect: isCorrect,
            },
        ];

        setSelectedAnswer(answer);
        setAnswers(updatedAnswers);

        setTimeout(() => {
            if (currentQuestionIndex < quiz.questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedAnswer(null);
                setTimeLeft(30); // ⏳ Reset Timer for next question
            } else {
                saveAttempt(updatedAnswers);
            }
        }, 1000);
    };

    const saveAttempt = async (finalAnswers) => {
        try {
            await fetch("https://quizapp-2-ui7y.onrender.com/api/attempt/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getAuthToken()}`,
                },
                body: JSON.stringify({
                    quizId,
                    answers: finalAnswers,
                }),
            });

            router.push(`/leaderboard/${quizId}`);
        } catch (error) {
            console.error("Error saving attempt:", error);
        }
    };

    if (!quiz) return <div className="text-center mt-10">Loading...</div>;

    const currentQuestion = quiz.questions[currentQuestionIndex];

    return (
        <div className="flex flex-col items-center justify-center p-6">
            <Card className="w-full md:w-2/3 lg:w-1/2 bg-white shadow-lg p-6">
                <CardHeader className="text-2xl font-bold">{quiz.title}</CardHeader>
                <CardContent>
                    <h2 className="text-xl font-semibold mb-4">{currentQuestion.questionText}</h2>

                    {/* ⏳ Timer Display */}
                    <div className="mb-4 text-lg font-bold text-red-500">
                        Time Left: {timeLeft}s
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {currentQuestion.options.map((option, index) => (
                            <Button
                                key={index}
                                onClick={() => handleAnswerSelection(option)}
                                className={`w-full text-left p-3 border rounded-lg ${
                                    selectedAnswer === option
                                        ? option === currentQuestion.correctAnswer
                                            ? "bg-green-500 text-white"
                                            : "bg-red-500 text-white"
                                        : "bg-gray-200"
                                }`}
                            >
                                {option}
                                {selectedAnswer === option && (
                                    <span className="ml-2">
                                        {option === currentQuestion.correctAnswer ? (
                                            <CheckCircle className="inline-block text-white" />
                                        ) : (
                                            <XCircle className="inline-block text-white" />
                                        )}
                                    </span>
                                )}
                            </Button>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
