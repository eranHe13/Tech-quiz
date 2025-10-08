import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import SummaryComponent from '../components/Summary';

const SummaryPage = () => {
  const navigate = useNavigate();
  const { answers, resetGame } = useGame();
  
  useEffect(() => {
    // If no answers, redirect to home
    if (answers.length === 0) {
      navigate('/');
    }
  }, [answers.length, navigate]);
  
  const handlePlayAgain = () => {
    resetGame();
    navigate('/');
  };
  
  if (answers.length === 0) {
    return null;
  }
  
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 mb-4 font-assistant drop-shadow-lg">
            סיכום המשחק
          </h1>
          <p className="text-white text-2xl font-assistant font-semibold drop-shadow-lg">
            הנה התוצאות שלך 🎉
          </p>
        </div>
        
        {/* Summary Component */}
        <SummaryComponent />
        
        {/* Action Buttons */}
        <div className="mt-12 flex justify-center gap-4">
          <button
            onClick={handlePlayAgain}
            className="glass-strong hover:glass text-white text-2xl font-bold py-5 px-14 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-purple-400 font-assistant border-2 border-white/50"
          >
            <span className="drop-shadow-lg">
              שחק שוב 🎮
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;

