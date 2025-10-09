import { useState, useMemo } from 'react';

const QuestionCard = ({ question, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  const shuffleArray = (array) => {
    // Fisher-Yates shuffle
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const shuffledOptions = useMemo(() => {
    if (!question) return [];
    return shuffleArray(question.options);
  }, [question]);
  
  if (!question) return null;
  
  const handleAnswerClick = (option) => {
    if (showFeedback) return; // Prevent clicking if already answered
    
    setSelectedAnswer(option);
    setShowFeedback(true);
    
    // Wait for feedback, then proceed to next question
    setTimeout(() => {
      onAnswer(option);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }, 1500);
  };
  
  const isCorrectAnswer = (option) => {
    return showFeedback && option === question.answer;
  };
  
  const isWrongAnswer = (option) => {
    return showFeedback && option === selectedAnswer && option !== question.answer;
  };




  
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="glass-strong rounded-3xl shadow-2xl p-10 transform hover:scale-[1.02] transition-all duration-300">
        {/* Question */}
        <div className="mb-10 text-center">
          <h2 className="text-base text-white  mb-3 font-assistant font-semibold">
            מה משמעות הקיצור?
          </h2>
          <div className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text  text-white font-alef drop-shadow-lg py-2">
            {question.question}
          </div>
        </div>
        
        {/* Options */}
        <div className="space-y-4">
          {shuffledOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(option)}
              disabled={showFeedback}
              className={`w-full p-5 text-center rounded-2xl border-2 font-assistant text-lg font-medium 
                ${isCorrectAnswer(option) 
                  ? 'bg-gradient-to-r from-green-400 to-green-500 border-green-400 text-white shadow-lg scale-105' 
                  : isWrongAnswer(option)
                  ? 'bg-gradient-to-r from-red-400 to-red-500 border-red-400 text-white shadow-lg scale-105'
                  : ' text-white'
                }
                ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <div className="flex items-center justify-between">
                <span className="flex-1">{option}</span>
                {isCorrectAnswer(option) && (
                  <span className="text-3xl mr-3">✅</span>
                )}
                {isWrongAnswer(option) && (
                  <span className="text-3xl mr-3">❌</span>
                )}
              </div>
            </button>
          ))}
        </div>
        
        {/* Feedback message */}
        {showFeedback && (
          <div className={`mt-8 p-6 rounded-2xl text-center font-assistant transform scale-105 transition-all duration-300 ${
            selectedAnswer === question.answer
              ? 'bg-gradient-to-r from-green-400 to-green-500 text-white shadow-xl'
              : 'bg-gradient-to-r from-red-400 to-red-500 text-white shadow-xl'
          }`}>
            {selectedAnswer === question.answer ? (
              <p className="text-2xl font-bold">מעולה! תשובה נכונה 🎉</p>
            ) : (
              <div>
                <p className="text-xl font-bold mb-2">התשובה הנכונה היא:</p>
                <p className="text-lg">{question.answer}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;

