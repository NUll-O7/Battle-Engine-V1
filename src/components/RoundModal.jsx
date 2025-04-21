import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import Button from './Button';

const RoundModal = ({ result, onClose, isVisible }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isVisible && modalRef.current && contentRef.current) {
      // Fade in backdrop
      anime({
        targets: modalRef.current,
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutQuad',
      });

      // Animate modal content
      anime({
        targets: contentRef.current,
        scale: [0.9, 1],
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: 200,
        easing: 'easeOutElastic(1, .5)',
      });
    }
  }, [isVisible]);

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
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 opacity-0"
      style={{ display: isVisible ? 'flex' : 'none' }}
    >
      <div
        ref={contentRef}
        className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full opacity-0"
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
      </div>
    </div>
  );
};

export default RoundModal; 