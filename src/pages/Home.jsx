import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

const Home = () => {
  const navigate = useNavigate();
  const { startGame, config } = useGame();
  
  const handleStartGame = () => {
    startGame();
    navigate('/game');
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="text-center max-w-3xl w-full">
        {/* Main Title */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 mb-6 font-assistant drop-shadow-lg">
            {config?.title || 'קיצור טק'}
          </h1>
          <p className="text-2xl md:text-3xl text-white font-semibold font-assistant drop-shadow-lg">
            {config?.subtitle || 'משחק טריוויה למונחי הייטק'}
          </p>
        </div>
        
        {/* Description Card */}
        <div className="glass-strong rounded-3xl p-8 mb-10 transform hover:scale-105 transition-transform duration-300">
          <p className="text-xl text-white leading-relaxed font-assistant">
            {config?.description || 'משחק אינטראקטיבי לבדיקת ידע במונחים, קיצורים וטכנולוגיות מעולם ההייטק וה-AI. תרגול ולמידה מהירה, עם משוב וסטטיסטיקה פשוטה.'}
          </p>
        </div>
        
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass rounded-2xl p-6 transform hover:scale-105 hover:-rotate-1 transition-all duration-300">
            <div className="text-5xl mb-3">🎯</div>
            <h3 className="text-xl font-bold text-white mb-2 font-assistant">
              שאלות מגוונות
            </h3>
            <p className="text-gray-200 text-base font-assistant">
              מאגר שאלות במונחי הייטק ו-AI
            </p>
          </div>
          
          <div className="glass rounded-2xl p-6 transform hover:scale-105 transition-all duration-300">
            <div className="text-5xl mb-3">⚡</div>
            <h3 className="text-xl font-bold text-white mb-2 font-assistant">
              משוב מיידי
            </h3>
            <p className="text-gray-200 text-base font-assistant">
              תשובה נכונה או לא, תדע מיד
            </p>
          </div>
          
          <div className="glass rounded-2xl p-6 transform hover:scale-105 hover:rotate-1 transition-all duration-300">
            <div className="text-5xl mb-3">📊</div>
            <h3 className="text-xl font-bold text-white mb-2 font-assistant">
              סטטיסטיקה
            </h3>
            <p className="text-gray-200 text-base font-assistant">
              עקוב אחר הביצועים שלך
            </p>
          </div>
        </div>
        
        {/* Start Button */}
        <button
          onClick={handleStartGame}
          className="glass-strong hover:glass text-white text-3xl font-bold py-5 px-16 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-3xl focus:outline-none focus:ring-4 focus:ring-purple-400 font-assistant border-2 border-white/50"
        >
          <span className="drop-shadow-lg">
            התחל משחק 🚀
          </span>
        </button>
      </div>
    </div>
  );
};

export default Home;

