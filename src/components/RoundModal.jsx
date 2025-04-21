import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

const RoundModal = ({ result, onClose, isVisible }) => {
  if (!result) return null;

  const { winner, stat, playerScore, aiScore } = result;

  const getTitle = () => {
    if (winner === 'player') return 'You Win This Round!';
    if (winner === 'ai') return 'AI Wins This Round!';
    return 'It\'s a Draw!';
  };

  const getMessage = () => {
    return `${winner === 'player' ? 'Your' : 'AI\'s'} ${stat} stat was higher!`;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            <div className={`p-4 text-white ${
              winner === 'player' 
                ? 'bg-success-500' 
                : winner === 'ai' 
                  ? 'bg-error-500' 
                  : 'bg-accent-500'
            }`}>
              <h2 className="text-xl font-bold text-center">{getTitle()}</h2>
            </div>

            <div className="p-6">
              {winner !== 'draw' && (
                <p className="text-center mb-4">{getMessage()}</p>
              )}
              
              <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg mb-6">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Your Score</p>
                  <p className="text-2xl font-bold text-primary-700">{playerScore}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">AI Score</p>
                  <p className="text-2xl font-bold text-primary-700">{aiScore}</p>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button onClick={onClose} variant="primary">
                  Continue
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RoundModal; 