import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGameContext } from '../context/GameContext';
import CardDisplay from '../components/CardDisplay';
import Button from '../components/Button';
import RoundModal from '../components/RoundModal';
import { Card, RoundResult, Stat } from '../types';
import { getRandomStat } from '../utils/gameUtils';
import { Swords, ArrowRight } from 'lucide-react';

const Game: React.FC = () => {
  const { 
    playerName, 
    drawCards, 
    compareCards, 
    isGameOver, 
    isGameStarted,
    playerScore, 
    aiScore, 
    currentRound 
  } = useGameContext();
  
  const [playerCard, setPlayerCard] = useState<Card | null>(null);
  const [aiCard, setAiCard] = useState<Card | null>(null);
  const [selectedStat, setSelectedStat] = useState<Stat | null>(null);
  const [isFlipped, setIsFlipped] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [roundResult, setRoundResult] = useState<RoundResult | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  
  const navigate = useNavigate();

  // If game is not started, redirect to home
  useEffect(() => {
    if (!isGameStarted) {
      navigate('/');
    }
  }, [isGameStarted, navigate]);

  // If game is over, redirect to result
  useEffect(() => {
    if (isGameOver) {
      navigate('/result');
    }
  }, [isGameOver, navigate]);

  const handleDrawCards = () => {
    if (isDrawing) return;
    
    setIsDrawing(true);
    setShowResult(false);
    setIsFlipped(true);
    
    // Reset cards and selected stat
    setPlayerCard(null);
    setAiCard(null);
    setSelectedStat(null);
    setRoundResult(null);
    
    // Draw new cards
    const cards = drawCards();
    if (!cards) {
      setIsDrawing(false);
      return;
    }
    
    // Set cards with a delay
    setTimeout(() => {
      setPlayerCard(cards.playerCard);
      setAiCard(cards.aiCard);
      
      // Select random stat
      const stat = getRandomStat();
      setSelectedStat(stat);
      
      // Flip cards after a delay
      setTimeout(() => {
        setIsFlipped(false);
        
        // Compare cards after they're flipped
        setTimeout(() => {
          compareCards(cards.playerCard, cards.aiCard, stat);
          
          // Show result after comparison
          const result: RoundResult = {
            playerCard: cards.playerCard,
            aiCard: cards.aiCard,
            stat,
            winner: 
              cards.playerCard[stat] > cards.aiCard[stat] 
                ? 'player' 
                : cards.playerCard[stat] < cards.aiCard[stat] 
                  ? 'ai' 
                  : 'draw',
            playerScore: 
              cards.playerCard[stat] > cards.aiCard[stat] 
                ? playerScore + 1 
                : playerScore,
            aiScore: 
              cards.playerCard[stat] < cards.aiCard[stat] 
                ? aiScore + 1 
                : aiScore,
          };
          
          setRoundResult(result);
          setShowResult(true);
          setIsDrawing(false);
        }, 1000);
      }, 1000);
    }, 500);
  };

  return (
    <motion.div 
      className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-primary-50 to-primary-100 p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Game Header */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-primary-800">
              Round {currentRound + 1}
            </h2>
            <p className="text-gray-600">
              {playerName} vs AI - First to 5 points wins!
            </p>
          </div>
          
          <div className="flex items-center space-x-8 mt-4 md:mt-0">
            <div className="text-center">
              <p className="text-sm text-gray-500">Your Score</p>
              <motion.p 
                className="text-2xl font-bold text-primary-700"
                key={playerScore}
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {playerScore}
              </motion.p>
            </div>
            
            <div className="flex items-center">
              <Swords className="h-6 w-6 text-primary-500" />
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-500">AI Score</p>
              <motion.p 
                className="text-2xl font-bold text-primary-700"
                key={aiScore}
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {aiScore}
              </motion.p>
            </div>
          </div>
        </div>
        
        {/* Game Area */}
        <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch space-y-8 md:space-y-0 md:space-x-12">
          {/* Player Card */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium mb-3 text-center">{playerName}</h3>
            <CardDisplay 
              card={playerCard} 
              isFlipped={isFlipped} 
              highlightStat={selectedStat}
              isWinner={roundResult?.winner === 'player'}
            />
          </div>
          
          {/* VS Section */}
          <div className="flex flex-col items-center justify-center">
            <div className="bg-primary-700 text-white rounded-full p-3">
              <Swords className="h-6 w-6" />
            </div>
            
            {selectedStat && !isFlipped && (
              <motion.div 
                className="mt-4 p-2 bg-accent-100 border border-accent-300 rounded-md text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-sm font-medium">Comparing</p>
                <p className="text-lg font-bold capitalize">{selectedStat}</p>
              </motion.div>
            )}
            
            <div className="mt-6">
              <Button 
                onClick={handleDrawCards} 
                disabled={isDrawing}
                variant="accent"
                size="lg"
              >
                {isDrawing ? 'Drawing...' : currentRound === 0 ? 'Draw Cards' : 'Draw Next'}
                {!isDrawing && <ArrowRight className="ml-2 h-5 w-5" />}
              </Button>
            </div>
          </div>
          
          {/* AI Card */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium mb-3 text-center">AI</h3>
            <CardDisplay 
              card={aiCard} 
              isFlipped={isFlipped} 
              highlightStat={selectedStat}
              isWinner={roundResult?.winner === 'ai'}
            />
          </div>
        </div>
      </div>
      
      {/* Round Result Modal */}
      <RoundModal 
        result={roundResult} 
        onClose={() => setShowResult(false)} 
        isVisible={showResult} 
      />
    </motion.div>
  );
};

export default Game;