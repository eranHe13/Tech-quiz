import { useGame } from '../context/GameContext';

const SummaryComponent = () => {
  const { answers, getStatistics } = useGame();
  const stats = getStatistics();
  
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="glass-strong rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300">
          <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-3">
            {stats.totalQuestions}
          </div>
          <div className="text-white font-assistant text-lg font-semibold">
            שאלות שנענו
          </div>
        </div>
        
        <div className="glass-strong rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300">
          <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-3">
            {stats.correctAnswers}
          </div>
          <div className="text-white font-assistant text-lg font-semibold">
            תשובות נכונות
          </div>
        </div>
        
        <div className="glass-strong rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300">
          <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-3">
            {stats.averageTime}
          </div>
          <div className="text-white font-assistant text-lg font-semibold">
            שניות בממוצע
          </div>
        </div>
      </div>
      
      {/* Accuracy Badge */}
      <div className="glass-strong rounded-3xl p-10 mb-10 text-center transform hover:scale-105 transition-all duration-300">
        <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 mb-3">
          {stats.accuracy}%
        </div>
        <div className="text-2xl font-assistant font-bold text-white">
          דיוק
        </div>
      </div>
      
      {/* Detailed Results Table */}
      <div className="glass-strong rounded-3xl overflow-hidden">
        <div className="p-8">
          <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6 font-assistant">
            פירוט התשובות
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="glass border-b-2 border-white/50">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-bold text-white font-assistant">
                  #
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold text-white font-assistant">
                  שאלה
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold text-white font-assistant">
                  התשובה שלך
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold text-white font-assistant">
                  תשובה נכונה
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-white font-assistant">
                  סטטוס
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/30">
              {answers.map((answer, index) => (
                <tr key={index} className={answer.isCorrect ? 'bg-green-400/20' : 'bg-red-400/20'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-assistant font-semibold">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-white font-alef">
                    {answer.question}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-200 font-assistant">
                    {answer.userAnswer}
                  </td>
                  <td className="px-6 py-4 text-sm text-white font-assistant font-semibold">
                    {answer.correctAnswer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-2xl">
                    {answer.isCorrect ? '✅' : '❌'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SummaryComponent;

