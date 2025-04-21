import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

const DiceRoll = ({ onRollComplete, isPlayerTurn }) => {
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState(null);
  const diceRef = useRef(null);
  const animationRef = useRef(null);

  const rollDice = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    const randomResult = Math.floor(Math.random() * 6) + 1;
    
    // Reset any existing animation
    if (animationRef.current) {
      animationRef.current.pause();
    }

    // Create new animation
    animationRef.current = anime({
      targets: diceRef.current,
      rotateX: [0, 720],
      rotateY: [0, 720],
      scale: [1, 1.2, 1],
      duration: 1000,
      easing: 'easeOutElastic(1, .5)',
      complete: () => {
        setResult(randomResult);
        setIsRolling(false);
        onRollComplete(randomResult);
      }
    });
  };

  useEffect(() => {
    if (isPlayerTurn && !isRolling) {
      rollDice();
    }
  }, [isPlayerTurn]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div 
        ref={diceRef}
        className="w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center text-2xl font-bold cursor-pointer transform-gpu"
        onClick={!isRolling ? rollDice : undefined}
      >
        {result || '?'}
      </div>
      <div className="text-sm text-gray-600">
        {isRolling ? 'Rolling...' : isPlayerTurn ? 'Your turn to roll!' : 'Waiting for AI...'}
      </div>
    </div>
  );
};

export default DiceRoll; 