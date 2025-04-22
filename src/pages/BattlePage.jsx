import React, { useState, useEffect } from 'react';
import { useBattle } from '../context/BattleContext';
import CardAnimation from '../components/CardAnimation';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/BattlePage.css';

const BattlePage = () => {
  const { state, dispatch } = useBattle();
  const [selectedCard, setSelectedCard] = useState(null);
  const [lastPlayedPosition, setLastPlayedPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    dispatch({ type: 'START_GAME' });
  }, [dispatch]);

  const handleCardClick = (card) => {
    if (state.currentTurn === 'player1' && state.player1.hand.includes(card)) {
      if (!state.lastPlayedCard || 
          card.attack === state.lastPlayedCard.attack || 
          card.defense === state.lastPlayedCard.defense) {
        setSelectedCard(card);
        setLastPlayedPosition({ x: window.innerWidth / 2 - 64, y: window.innerHeight / 2 - 96 });
        dispatch({ type: 'PLAY_CARD', playerId: 'player1', cardId: card.id });
      }
    }
  };

  const handleEndTurn = () => {
    dispatch({ type: 'END_TURN' });
  };

  const renderPlayerHand = (player, isCurrentPlayer) => {
    const hand = player.hand;
    const startX = (window.innerWidth - (hand.length * 40)) / 2;
    const y = isCurrentPlayer ? window.innerHeight - 200 : 50;

    return (
      <div className="relative w-full h-48">
        {hand.map((card, index) => (
          <CardAnimation
            key={card.id}
            card={card}
            isPlaying={selectedCard?.id === card.id}
            position={{
              x: startX + (index * 40),
              y: y
            }}
            onClick={() => isCurrentPlayer && handleCardClick(card)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Player 2 (AI) */}
        <div className="mb-8">
          <div className="text-white text-xl mb-4">AI Player</div>
          {renderPlayerHand(state.player2, false)}
        </div>

        {/* Game Board */}
        <div className="relative h-96 mb-8 bg-gray-800 rounded-lg shadow-xl">
          <AnimatePresence>
            {state.lastPlayedCard && (
              <CardAnimation
                card={state.lastPlayedCard}
                isPlaying={true}
                position={lastPlayedPosition}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Player 1 */}
        <div>
          <div className="text-white text-xl mb-4">Your Turn</div>
          {renderPlayerHand(state.player1, true)}
        </div>

        {/* Game Controls */}
        <div className="mt-8 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg"
            onClick={handleEndTurn}
          >
            End Turn
          </motion.button>
        </div>

        {/* Game Status */}
        <div className="mt-4 text-center text-white">
          {state.isGameOver ? (
            <div className="text-2xl font-bold">
              {state.winner === 'player1' ? 'You Win!' : 'AI Wins!'}
            </div>
          ) : (
            <div>Turn {state.turnNumber}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BattlePage; 