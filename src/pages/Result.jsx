import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGameContext } from '../context/GameContext';
import Button from '../components/Button';
import Leaderboard from '../components/Leaderboard';
import { Trophy, RefreshCw, List } from 'lucide-react';

const Result = () => {
  const { 
    playerName, 
    playerScore, 
    aiScore, 
    resetGame, 
    isGameOver,
    fetchLeaderboard,
    saveScore,
    leaderboard
  } = useGameContext();
  
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const navigate = useNavigate();

  // If game is not over, redirect to home
  useEffect(() => {
    if (!isGameOver) {
      navigate('/');
    }
  }, [isGameOver, navigate]);

  useEffect(() => {
    const submitScore = async () => {
      if (!scoreSubmitted && isGameOver) {
        await saveScore();
        setScoreSubmitted(true);
      }
    };

    submitScore();
  }, [isGameOver, saveScore, scoreSubmitted]);

  const handleViewLeaderboard = async () => {
    await fetchLeaderboard();
    setShowLeaderboard(true);
  };

  const handlePlayAgain = () => {
    resetGame();
    navigate('/');
  };

  const isPlayerWinner = playerScore > aiScore;

  return (
    <motion.div 
      className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-primary-50 to-primary-100 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-2xl mx-auto">
        <motion.div 
          className={`bg-white rounded-lg shadow-xl overflow-hidden mb-8 ${
            isPlayerWinner ? 'border-t-8 border-success-500' : 'border-t-8 border-error-500'
          }`}
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="inline-block mb-4"
            >
              {isPlayerWinner ? (
                <div className="bg-success-100 text-success-600 p-3 rounded-full">
                  <Trophy className="h-16 w-16" />
                </div>
              ) : (
                <div className="bg-error-100 text-error-600 p-3 rounded-full">
                  <Trophy className="h-16 w-16" />
                </div>
              )}
            </motion.div>
            
            <h1 className="text-3xl font-bold mb-4">
              {isPlayerWinner 
                ? 'Victory!' 
                : playerScore === aiScore 
                  ? 'It\'s a Draw!' 
                  : 'Defeated!'}
            </h1>
            
            <p className="text-xl text-gray-600 mb-6">
              {isPlayerWinner 
                ? `Congratulations ${playerName}! You have defeated the AI.` 
                : playerScore === aiScore 
                  ? 'You and the AI are evenly matched!' 
                  : 'The AI has emerged victorious this time.'}
            </p>
            
            <div className="flex justify-center items-center space-x-12 mb-6">
              <div className="text-center">
                <p className="text-lg text-gray-500 mb-1">{playerName}</p>
                <motion.p 
                  className="text-4xl font-bold text-primary-700"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {playerScore}
                </motion.p>
              </div>
              
              <div className="text-4xl font-light text-gray-400">vs</div>
              
              <div className="text-center">
                <p className="text-lg text-gray-500 mb-1">AI</p>
                <motion.p 
                  className="text-4xl font-bold text-primary-700"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {aiScore}
                </motion.p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Button 
                onClick={handlePlayAgain} 
                variant="primary"
                size="lg"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Play Again
              </Button>
              
              <Button 
                onClick={handleViewLeaderboard} 
                variant="outline"
                size="lg"
                disabled={showLeaderboard}
              >
                <List className="mr-2 h-5 w-5" />
                {showLeaderboard ? 'Leaderboard Shown' : 'View Leaderboard'}
              </Button>
            </div>
          </div>
        </motion.div>
        
        {showLeaderboard && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Leaderboard entries={leaderboard} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Result; 