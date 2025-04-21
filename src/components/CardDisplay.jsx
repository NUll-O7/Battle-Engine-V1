import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import StatBar from './StatBar';

const CardDisplay = ({
  card,
  isFlipped,
  highlightStat = null,
  isWinner = false,
}) => {
  // If no card, show back of card
  if (!card) {
    return (
      <div className="w-64 h-96 rounded-lg bg-gradient-to-br from-primary-700 to-primary-900 shadow-lg flex items-center justify-center transform perspective-1000 transition-transform duration-500 card-3d">
        <div className="text-white text-4xl font-bold">?</div>
        <div className="absolute inset-0 bg-primary-500 opacity-10 card-shine"></div>
      </div>
    );
  }

  return (
    <motion.div
      className={`relative w-64 h-96 rounded-lg overflow-hidden shadow-xl transform perspective-1000 transition-all duration-500 card-3d ${
        isWinner ? 'ring-4 ring-accent-400 winner-glow' : ''
      }`}
      animate={{
        rotateY: isFlipped ? 180 : 0,
        scale: isWinner ? 1.05 : 1
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {isWinner && (
        <motion.div
          className="absolute top-0 right-0 z-10 bg-accent-500 text-white px-3 py-1 text-sm font-bold winner-badge"
          initial={{ y: -30 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          WINNER
        </motion.div>
      )}

      <div className="absolute inset-0 bg-gradient-to-br from-primary-700 to-primary-900 flex flex-col card-content">
        {/* Card Header with Name */}
        <div className="text-center p-3 bg-primary-800 border-b-2 border-primary-600">
          <h3 className="text-white font-bold text-lg truncate card-title">{card.name}</h3>
        </div>

        {/* Card Image */}
        <div className="relative w-full h-40 overflow-hidden">
          <img
            src={card.img}
            alt={card.name}
            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        {/* Card Stats */}
        <div className="p-4 bg-gradient-to-br from-white to-gray-100 flex-grow flex flex-col">
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

        {/* Card Shine Effect */}
        <div className="absolute inset-0 bg-white opacity-10 card-shine pointer-events-none"></div>
      </div>
    </motion.div>
  );
};

CardDisplay.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    img: PropTypes.string,
    strength: PropTypes.number,
    speed: PropTypes.number,
    magic: PropTypes.number
  }),
  isFlipped: PropTypes.bool,
  highlightStat: PropTypes.oneOf(['strength', 'speed', 'magic', null]),
  isWinner: PropTypes.bool
};

export default CardDisplay;