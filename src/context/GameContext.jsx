import { createContext, useContext, useState, useEffect } from 'react';
import questionsData from '../assets/data.json'; 

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  // Questions data
  const [questions, setQuestions] = useState([]);
  
  // Game state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // Array of { questionId, question, userAnswer, correctAnswer, isCorrect, timeSpent }
  const [questionStartTime, setQuestionStartTime] = useState(null);
  const [isGameActive, setIsGameActive] = useState(false);
  
  // Load questions and config on mount
  useEffect(() => {
    setQuestions(questionsData);
    
  }, []);
  
  // Start a new game
  const startGame = () => {
    setIsGameActive(true);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setQuestionStartTime(Date.now());
  };
  
  // Get current question
  const getCurrentQuestion = () => {
    if (currentQuestionIndex >= questions.length) {
      // Loop back to beginning
      return questions[currentQuestionIndex % questions.length];
    }
    return questions[currentQuestionIndex];
  };
  
  // Submit an answer
  const submitAnswer = (userAnswer) => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return;
    
    const timeSpent = Date.now() - questionStartTime;
    const isCorrect = userAnswer === currentQuestion.answer;
    
    const answerRecord = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      userAnswer,
      correctAnswer: currentQuestion.answer,
      isCorrect,
      timeSpent,
    };
    
    setAnswers(prev => [...prev, answerRecord]);
    
    // Move to next question
    setCurrentQuestionIndex(prev => prev + 1);
    setQuestionStartTime(Date.now());
  };
  
  // End the game
  const endGame = () => {
    setIsGameActive(false);
  };
  
  // Reset game
  const resetGame = () => {
    setIsGameActive(false);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setQuestionStartTime(null);
  };
  
  // Calculate statistics
  const getStatistics = () => {
    const totalQuestions = answers.length;
    const correctAnswers = answers.filter(a => a.isCorrect).length;
    const totalTime = answers.reduce((sum, a) => sum + a.timeSpent, 0);
    const averageTime = totalQuestions > 0 ? (totalTime / totalQuestions / 1000).toFixed(2) : 0;
    
    return {
      totalQuestions,
      correctAnswers,
      averageTime,
      accuracy: totalQuestions > 0 ? ((correctAnswers / totalQuestions) * 100).toFixed(1) : 0,
    };
  };
  
  const value = {
    questions,
    
    currentQuestionIndex,
    answers,
    isGameActive,
    startGame,
    getCurrentQuestion,
    submitAnswer,
    endGame,
    resetGame,
    getStatistics,
    questionStartTime,
  };
  
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

