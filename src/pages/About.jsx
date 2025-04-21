import React from 'react';
import { motion } from 'framer-motion';
import { Info, Swords, Heart } from 'lucide-react';

const About = () => {
  return (
    <motion.div 
      className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-primary-50 to-primary-100 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div 
          className="bg-white rounded-lg shadow-lg overflow-hidden mb-8"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-primary-700 p-4 flex items-center">
            <Info className="h-6 w-6 text-white mr-2" />
            <h1 className="text-xl font-bold text-white">About Battle Cards</h1>
          </div>
          
          <div className="p-6">
            <h2 className="text-lg font-semibold text-primary-800 mb-3">
              How to Play
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex">
                <div className="mr-3 flex-shrink-0">
                  <div className="bg-primary-100 text-primary-700 rounded-full h-7 w-7 flex items-center justify-center font-bold">
                    1
                  </div>
                </div>
                <p>
                  <span className="font-medium">Choose Your Deck</span> - Select from Heroes, Monsters, or Animals, each with unique stat distributions.
                </p>
              </div>
              
              <div className="flex">
                <div className="mr-3 flex-shrink-0">
                  <div className="bg-primary-100 text-primary-700 rounded-full h-7 w-7 flex items-center justify-center font-bold">
                    2
                  </div>
                </div>
                <p>
                  <span className="font-medium">Draw Cards</span> - Each round, you and the AI will draw a random card from your chosen deck.
                </p>
              </div>
              
              <div className="flex">
                <div className="mr-3 flex-shrink-0">
                  <div className="bg-primary-100 text-primary-700 rounded-full h-7 w-7 flex items-center justify-center font-bold">
                    3
                  </div>
                </div>
                <p>
                  <span className="font-medium">Compare Stats</span> - A random stat (Strength, Speed, or Magic) will be selected for comparison.
                </p>
              </div>
              
              <div className="flex">
                <div className="mr-3 flex-shrink-0">
                  <div className="bg-primary-100 text-primary-700 rounded-full h-7 w-7 flex items-center justify-center font-bold">
                    4
                  </div>
                </div>
                <p>
                  <span className="font-medium">Score Points</span> - The card with the higher stat value wins the round.
                </p>
              </div>
              
              <div className="flex">
                <div className="mr-3 flex-shrink-0">
                  <div className="bg-primary-100 text-primary-700 rounded-full h-7 w-7 flex items-center justify-center font-bold">
                    5
                  </div>
                </div>
                <p>
                  <span className="font-medium">First to 5 Wins</span> - The game ends when either you or the AI reaches 5 points.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h2 className="text-lg font-semibold text-primary-800 mb-2 flex items-center">
                <Swords className="h-5 w-5 mr-1" />
                Game Stats
              </h2>
              <p className="mb-3">
                Each card has three key stats that determine their battle prowess:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded p-3 bg-white">
                  <div className="font-medium text-primary-800 flex items-center mb-1">
                    <span className="mr-1">💪</span> Strength
                  </div>
                  <p className="text-sm text-gray-600">Raw power and physical might.</p>
                </div>
                
                <div className="border border-gray-200 rounded p-3 bg-white">
                  <div className="font-medium text-primary-800 flex items-center mb-1">
                    <span className="mr-1">⚡</span> Speed
                  </div>
                  <p className="text-sm text-gray-600">Agility, reflexes, and quickness.</p>
                </div>
                
                <div className="border border-gray-200 rounded p-3 bg-white">
                  <div className="font-medium text-primary-800 flex items-center mb-1">
                    <span className="mr-1">✨</span> Magic
                  </div>
                  <p className="text-sm text-gray-600">Mystical abilities and supernatural powers.</p>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold text-primary-800 mb-3 flex items-center">
                <Heart className="h-5 w-5 mr-1 text-error-500" />
                Credits
              </h2>
              <p className="text-gray-600 mb-2">
                Images from <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Pexels</a>.
              </p>
              <p className="text-gray-600 mb-2">
                Icons by <a href="https://lucide.dev" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Lucide</a>.
              </p>
              <p className="text-gray-600">
                Created by Dhruv Soni with React, JavaScript, and Framer Motion.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About; 