"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle,Clock, Hash } from "lucide-react";

export default function QuizDetailPage() {
    const { quizId } = useParams(); 
    const [quiz, setQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(30);  // ⏳ Timer starts at 30 sec
    const router = useRouter();
    const optionLabels = ["A", "B", "C", "D"];
    const getAuthToken = () => sessionStorage.getItem("token");
     let questionIndex = currentQuestionIndex;
    useEffect(() => {
        if(!getAuthToken){
            router.push("/register");
        }
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
        <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 font-poppins">
    <Card className="w-full sm:w-4/5 md:w-2/3 lg:w-1/2 bg-white shadow-2xl rounded-lg p-4 sm:p-6 border border-gray-400">
        
        {/* 📜 Quiz Title */}
        <CardHeader className="text-lg sm:text-2xl md:text-3xl font-extrabold text-center text-gray-900">
            {quiz.title}
        </CardHeader>

        <CardContent>
            {/* 🔢 Question Number */}
            <div className="flex items-center text-md sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">
                <Hash className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600 mr-1 sm:mr-2" />
                Question {questionIndex + 1}
            </div>

            {/* ❓ Question Text */}
            <h2 className="text-md sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 text-center sm:text-left">
                {currentQuestion.questionText}
            </h2>

            {/* ⏳ Timer Display with Clock Icon */}
            <div className="mb-4 sm:mb-6 flex items-center justify-center text-md sm:text-xl font-bold text-red-500">
                <Clock className="w-5 sm:w-7 h-5 sm:h-7 mr-1 sm:mr-2 animate-pulse" />
                Time Left: {timeLeft}s
            </div>

            {/* 🟩 Answer Options - Fixed 2x2 Layout on All Screens */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {currentQuestion.options.map((option, index) => (
                    <Button
                        key={index}
                        onClick={() => handleAnswerSelection(option)}
                        className={`w-full text-left flex items-center p-2 sm:p-4 border-2 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md
                            ${
                                selectedAnswer === option
                                    ? option === currentQuestion.correctAnswer
                                        ? "bg-green-600 text-white border-green-800"
                                        : "bg-red-600 text-white border-red-800"
                                    : "bg-white border-gray-500 text-gray-900 hover:border-blue-600 hover:bg-blue-50"
                            }`}
                    >
                        <span className="font-extrabold text-blue-700 mr-1 sm:mr-4 text-sm sm:text-lg">
                            {optionLabels[index]}.
                        </span>
                        <span className="font-bold text-sm sm:text-lg">{option}</span>

                        {/* ✅ ❌ Correct/Wrong Icon */}
                        {selectedAnswer === option && (
                            <span className="ml-auto">
                                {option === currentQuestion.correctAnswer ? (
                                    <CheckCircle className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                                ) : (
                                    <XCircle className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
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
