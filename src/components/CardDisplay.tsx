import React from 'react';
import { motion } from 'framer-motion';
import { Card, Stat } from '../types';
import StatBar from './StatBar';

interface CardDisplayProps {
  card: Card | null;
  isFlipped: boolean;
  highlightStat?: Stat | null;
  isWinner?: boolean;
}

const CardDisplay: React.FC<CardDisplayProps> = ({
  card,
  isFlipped,
  highlightStat = null,
  isWinner = false,
}) => {
  // If no card, show back of card
  if (!card) {
    return (
      <div className="w-64 h-96 rounded-lg bg-gradient-to-br from-primary-700 to-primary-900 shadow-lg flex items-center justify-center">
        <span className="text-white text-xl font-bold">?</span>
      </div>
    );
  }

  return (
    <motion.div
      className={`relative w-64 h-96 rounded-lg overflow-hidden shadow-lg ${
        isWinner ? 'ring-4 ring-accent-400' : ''
      }`}
      initial={{ rotateY: isFlipped ? 180 : 0 }}
      animate={{ rotateY: isFlipped ? 0 : 180 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ perspective: 1000 }}
    >
      {isWinner && (
        <motion.div
          className="absolute top-0 right-0 z-10 bg-accent-500 text-white px-2 py-1 text-sm font-bold"
          initial={{ y: -30 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          WINNER
        </motion.div>
      )}

      <div className="absolute inset-0 bg-gradient-to-br from-primary-700 to-primary-900 flex flex-col">
        {/* Card Header with Name */}
        <div className="text-center p-2 bg-primary-800">
          <h3 className="text-white font-bold truncate">{card.name}</h3>
        </div>

        {/* Card Image */}
        <div className="relative w-full h-40 overflow-hidden">
          <img
            src={card.img}
            alt={card.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>

        {/* Card Stats */}
        <div className="p-3 bg-white flex-grow flex flex-col">
          <StatBar 
            label="strength" 
            value={card.strength} 
            highlighted={highlightStat === 'strength'} 
          />
          <StatBar 
            label="speed" 
            value={card.speed} 
            highlighted={highlightStat === 'speed'} 
          />
          <StatBar 
            label="magic" 
            value={card.magic} 
            highlighted={highlightStat === 'magic'} 
          />
        </div>
      </div>
    </motion.div>
  );
};

export default CardDisplay;