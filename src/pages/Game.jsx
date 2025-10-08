import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import QuestionCard from '../components/QuestionCard';

const Game = () => {
  const navigate = useNavigate();
  const { isGameActive, getCurrentQuestion, submitAnswer, endGame, answers } = useGame();
  
  useEffect(() => {
    if (!isGameActive) {
      navigate('/');
    }
  }, [isGameActive, navigate]);
  
  const currentQuestion = getCurrentQuestion();
  
  const handleAnswer = (answer) => {
    submitAnswer(answer);
  };
  
  const handleEndGame = () => {
    endGame();
    navigate('/summary');
  };
  
  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center glass-strong rounded-3xl p-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-400 mx-auto mb-6"></div>
          <p className="text-white text-xl font-assistant font-semibold">טוען שאלות...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Game Header */}
        <div className="flex justify-between items-center mb-10">
          <div className="glass rounded-2xl px-8 py-4 transform hover:scale-105 transition-all duration-300">
            <div className="text-sm text-white font-assistant font-semibold">שאלות שנענו</div>
            <div className="text-3xl font-bold text-transparent bg-clip-text text-white">
              {answers.length}
            </div>
          </div>
          
          <button
            onClick={handleEndGame}
            className="glass hover:glass-strong text-white font-bold py-3 px-10 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 font-assistant text-lg border-2 border-red-400/50"
          >
            סיים משחק
          </button>
        </div>
        
        {/* Question Card */}
        <QuestionCard 
          question={currentQuestion} 
          onAnswer={handleAnswer}
        />
        
        {/* Progress Info */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-6 glass-strong rounded-2xl px-10 py-5 transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3">
              <span className="text-green-400 text-2xl">✅</span>
              <span className="text-white font-assistant text-lg font-semibold">
                {answers.filter(a => a.isCorrect).length} נכונות
              </span>
            </div>
            <div className="w-px h-8 bg-gray-400/50"></div>
            <div className="flex items-center gap-3">
              <span className="text-red-400 text-2xl">❌</span>
              <span className="text-white font-assistant text-lg font-semibold">
                {answers.filter(a => !a.isCorrect).length} שגויות
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;

