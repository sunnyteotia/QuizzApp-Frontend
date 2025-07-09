
"use client"
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Simulate token check (in real app, you'd handle navigation differently)
    const token = "demo-token"; // For demo purposes
    console.log(token);
    
    // Trigger entrance animation
    setTimeout(() => setIsLoaded(true), 100);
    
    // Generate floating particles
    const newParticles = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="h-screen relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      {/* Animated background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-purple-500/20 animate-pulse"></div>
      
      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-white/30 rounded-full animate-ping"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            transform: `scale(${particle.size / 4})`,
          }}
        ></div>
      ))}

      {/* Geometric shapes */}
      <div className="absolute top-20 left-20 w-32 h-32 border-4 border-yellow-300/30 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
      <div className="absolute top-40 right-32 w-24 h-24 border-4 border-pink-300/30 rotate-45 animate-bounce" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 left-40 w-20 h-20 border-4 border-cyan-300/30 rounded-lg animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
        
        {/* Logo/Icon area */}
        <div className={`mb-8 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}`}>
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
              <span className="text-4xl font-bold text-white">Q</span>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>

        {/* Main title */}
        <h1 className={`text-6xl md:text-7xl font-extrabold text-center mb-4 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          Welcome to{' '}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              Quizzy
            </span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-yellow-300 to-pink-400 rounded-full transform scale-x-0 animate-[scaleX_0.8s_ease-out_1s_forwards]"></div>
          </span>
          !
        </h1>

        {/* Subtitle */}
        <p className={`text-xl md:text-2xl text-center mb-8 opacity-90 max-w-2xl transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-90' : 'translate-y-20 opacity-0'}`} style={{ animationDelay: '0.4s' }}>
          Test your knowledge, challenge your mind, and discover how much you really know!
        </p>

        {/* Feature highlights */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ animationDelay: '0.6s' }}>
          <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            🧠 Mind-bending Questions
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            ⚡ Lightning Fast
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            🏆 Track Your Progress
          </div>
        </div>

        {/* Start button */}
        <button
          className={`group relative px-12 py-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-black font-bold text-xl rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-3xl ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
          style={{ animationDelay: '0.8s' }}
          onClick={() => alert("Quiz starting soon!")}
        >
          {/* Button glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 opacity-75 blur-xl group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Button content */}
          <span className="relative z-10 flex items-center gap-3">
            Start Quiz
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
              <span className="text-sm">▶</span>
            </div>
          </span>
          
          {/* Button ripple effect */}
          <div className="absolute inset-0 rounded-full bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
        </button>

        {/* Pulsing call-to-action */}
        <div className={`mt-8 text-center transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ animationDelay: '1s' }}>
          <p className="text-sm opacity-70 animate-pulse">
            Ready to test your limits? 🚀
          </p>
        </div>
      </div>

      {/* Bottom decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
      
      {/* Floating question marks */}
      <div className="absolute top-1/4 left-1/4 text-6xl opacity-10 animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}>?</div>
      <div className="absolute top-1/3 right-1/4 text-4xl opacity-10 animate-bounce" style={{ animationDelay: '2s', animationDuration: '4s' }}>?</div>
      <div className="absolute bottom-1/4 left-1/3 text-5xl opacity-10 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}>?</div>
    </div>
  );
}