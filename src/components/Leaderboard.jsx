import React from 'react';
import { motion } from 'framer-motion';
import { formatDate } from '../utils/gameUtils';
import { Trophy } from 'lucide-react';

const Leaderboard = ({ entries, loading = false }) => {
  if (loading) {
    return (
      <div className="p-4 text-center">
        <p>Loading leaderboard...</p>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="p-4 text-center">
        <p>No scores recorded yet. Be the first!</p>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-primary-700 text-white p-3 flex items-center justify-center">
        <Trophy className="h-5 w-5 mr-2" />
        <h2 className="text-lg font-bold">Leaderboard</h2>
      </div>
      
      <motion.div 
        className="p-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="grid grid-cols-12 font-medium text-gray-500 text-sm py-2 border-b">
          <div className="col-span-2 text-center">Rank</div>
          <div className="col-span-5">Player</div>
          <div className="col-span-3 text-center">Score</div>
          <div className="col-span-2 text-right">Date</div>
        </div>
        
        {entries.slice(0, 10).map((entry, index) => (
          <motion.div 
            key={index} 
            className={`grid grid-cols-12 py-2 border-b ${
              index === 0 ? 'bg-accent-50' : index <= 2 ? 'bg-gray-50' : ''
            }`}
            variants={item}
          >
            <div className="col-span-2 text-center font-bold">
              {index === 0 ? (
                <span className="inline-block bg-accent-500 text-white w-6 h-6 rounded-full text-center">
                  1
                </span>
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <div className="col-span-5 font-medium truncate">{entry.name}</div>
            <div className="col-span-3 text-center font-bold text-primary-700">{entry.score}</div>
            <div className="col-span-2 text-right text-sm text-gray-500">{formatDate(entry.date)}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Leaderboard; 