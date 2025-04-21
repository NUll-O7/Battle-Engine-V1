import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGameContext } from '../context/GameContext';
import CardDisplay from '../components/CardDisplay';
import Button from '../components/Button';
import RoundModal from '../components/RoundModal';
import { getRandomStat } from '../utils/gameUtils';
import { Swords, ArrowRight } from 'lucide-react';

const Game = () => {
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
  
  const [playerCard, setPlayerCard] = useState(null);
  const [aiCard, setAiCard] = useState(null);
  const [selectedStat, setSelectedStat] = useState(null);
  const [isFlipped, setIsFlipped] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [roundResult, setRoundResult] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!isGameStarted) {
      navigate('/');
    }
  }, [isGameStarted, navigate]);

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
    setPlayerCard(null);
    setAiCard(null);
    setSelectedStat(null);
    setRoundResult(null);
    
    const cards = drawCards();
    if (!cards) {
      setIsDrawing(false);
      return;
    }

    setTimeout(() => {
      setPlayerCard(cards.playerCard);
      setAiCard(cards.aiCard);
      const stat = getRandomStat();
      setSelectedStat(stat);
      
      setTimeout(() => {
        setIsFlipped(false);
        
        setTimeout(() => {
          compareCards(cards.playerCard, cards.aiCard, stat);
          
          const result = {
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
      className="min-h-[calc(100vh-64px)] game-pattern p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="game-container rounded-lg shadow-md p-4 mb-6 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white">
              Round {currentRound + 1}
            </h2>
            <p className="text-primary-200">
              {playerName} vs AI - First to 5 points wins!
            </p>
          </div>
          
          <div className="flex items-center space-x-8 mt-4 md:mt-0">
            <div className="text-center">
              <p className="text-sm text-primary-200">Your Score</p>
              <motion.p 
                className="text-2xl font-bold text-white"
                key={playerScore}
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {playerScore}
              </motion.p>
            </div>
            
            <div className="flex items-center">
              <Swords className="h-6 w-6 text-primary-300" />
            </div>
            
            <div className="text-center">
              <p className="text-sm text-primary-200">AI Score</p>
              <motion.p 
                className="text-2xl font-bold text-white"
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
        
        <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch space-y-8 md:space-y-0 md:space-x-12">
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium mb-3 text-center text-white">{playerName}</h3>
            <CardDisplay 
              card={playerCard} 
              isFlipped={isFlipped} 
              highlightStat={selectedStat}
              isWinner={roundResult?.winner === 'player'}
            />
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <div className="bg-primary-700 text-white rounded-full p-3 shadow-lg">
              <Swords className="h-6 w-6" />
            </div>
            
            {selectedStat && !isFlipped && (
              <motion.div 
                className="mt-4 p-3 bg-accent-100 border-2 border-accent-300 rounded-md text-center shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-sm font-medium text-accent-700">Comparing</p>
                <p className="text-lg font-bold capitalize text-accent-900">{selectedStat}</p>
              </motion.div>
            )}
            
            <div className="mt-6">
              <Button 
                onClick={handleDrawCards} 
                disabled={isDrawing}
                variant="accent"
                size="lg"
                className="game-button"
              >
                {isDrawing ? 'Drawing...' : currentRound === 0 ? 'Draw Cards' : 'Draw Next'}
                {!isDrawing && <ArrowRight className="ml-2 h-5 w-5" />}
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium mb-3 text-center text-white">AI</h3>
            <CardDisplay 
              card={aiCard} 
              isFlipped={isFlipped} 
              highlightStat={selectedStat}
              isWinner={roundResult?.winner === 'ai'}
            />
          </div>
        </div>
      </div>
      
      <RoundModal 
        result={roundResult} 
        onClose={() => setShowResult(false)} 
        isVisible={showResult} 
      />
    </motion.div>
  );
};

export default Game;