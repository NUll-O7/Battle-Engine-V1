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
    <div className="dice-roll-component">
      <div 
        ref={diceRef}
        className={`dice ${isRolling ? 'rolling' : ''}`}
        onClick={!isRolling ? rollDice : undefined}
      >
        <div className="dice-face">
          {result || '?'}
        </div>
      </div>
      <div className="dice-status">
        {isRolling ? 'Rolling...' : isPlayerTurn ? 'Your turn to roll!' : 'Waiting for AI...'}
      </div>
    </div>
  );
};

export default DiceRoll; 