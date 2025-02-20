"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      router.push("/register"); // Redirect if no token found
    }
    console.log(token);
  }, [router]);
   
   
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-bold animate-fade-in">
        Welcome to <span className="text-yellow-300">Quizzy</span>!
      </h1>
      <p className="mt-4 text-lg opacity-90">
        Test your knowledge and challenge yourself!
      </p>
      <button
        className="mt-6 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 
        text-black font-semibold rounded-full shadow-md 
        transition-all duration-300 ease-in-out animate-bounce"
        onClick={() => router.push("/quiz")}
      >
        Start Quiz
      </button>
    </div>
  );
}
