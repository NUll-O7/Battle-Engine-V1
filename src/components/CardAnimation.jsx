import React from 'react';
import { motion } from 'framer-motion';

const CardAnimation = ({ card, isPlaying, position }) => {
  const cardVariants = {
    initial: { 
      scale: 0.8,
      opacity: 0,
      y: 50
    },
    inHand: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    playing: {
      scale: [1, 1.2, 1],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 0.5,
        times: [0, 0.5, 0.8, 1]
      }
    }
  };

  const getCardColor = (name) => {
    if (name.includes('Red')) return 'bg-red-500';
    if (name.includes('Blue')) return 'bg-blue-500';
    if (name.includes('Green')) return 'bg-green-500';
    if (name.includes('Yellow')) return 'bg-yellow-500';
    if (name.includes('Black')) return 'bg-gray-800';
    return 'bg-gray-500';
  };

  return (
    <motion.div
      className={`relative w-32 h-48 rounded-xl shadow-lg ${getCardColor(card.name)}`}
      variants={cardVariants}
      initial="initial"
      animate={isPlaying ? "playing" : "inHand"}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: isPlaying ? 10 : 1
      }}
    >
      <div className="p-4 text-white">
        <h3 className="text-lg font-bold mb-2">{card.name}</h3>
        <div className="flex justify-between">
          <div className="text-center">
            <span className="text-2xl font-bold">{card.attack}</span>
            <p className="text-sm">ATK</p>
          </div>
          <div className="text-center">
            <span className="text-2xl font-bold">{card.defense}</span>
            <p className="text-sm">DEF</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CardAnimation; 