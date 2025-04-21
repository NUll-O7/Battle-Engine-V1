import React, { createContext, useContext, useState, useEffect } from 'react';
import { shuffleArray } from '../utils/gameUtils';

const GameContext = createContext(undefined);

export const GameProvider = ({ children }) => {
  const [playerName, setPlayerName] = useState('');
  const [deckName, setDeckName] = useState('heroes');
  const [deckData, setDeckData] = useState([]);
  const [aiData, setAiData] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(0);
  const [roundHistory, setRoundHistory] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  // Load deck data when deckName changes
  useEffect(() => {
    const loadDeckData = async () => {
      try {
        const data = await import(`../data/${deckName}.json`);
        setDeckData([...data.default]);
        setAiData([...data.default]);
      } catch (error) {
        console.error('Error loading deck data:', error);
      }
    };

    loadDeckData();
  }, [deckName]);

  const startGame = () => {
    // Shuffle deck data
    setDeckData(shuffleArray([...deckData]));
    setAiData(shuffleArray([...aiData]));
    setPlayerScore(0);
    setAiScore(0);
    setCurrentRound(0);
    setRoundHistory([]);
    setIsGameStarted(true);
    setIsGameOver(false);
  };

  const drawCards = () => {
    if (isGameOver || deckData.length === 0 || aiData.length === 0) {
      return null;
    }

    // Get first card from each deck
    const playerCard = deckData[0];
    const aiCard = aiData[0];

    // Remove cards from decks
    setDeckData(prev => prev.slice(1));
    setAiData(prev => prev.slice(1));

    return { playerCard, aiCard };
  };

  const compareCards = (playerCard, aiCard, stat) => {
    let winner;
    let newPlayerScore = playerScore;
    let newAiScore = aiScore;

    if (playerCard[stat] > aiCard[stat]) {
      winner = 'player';
      newPlayerScore += 1;
      setPlayerScore(newPlayerScore);
    } else if (playerCard[stat] < aiCard[stat]) {
      winner = 'ai';
      newAiScore += 1;
      setAiScore(newAiScore);
    } else {
      winner = 'draw';
    }

    // Add to round history
    const roundResult = {
      playerCard,
      aiCard,
      stat,
      winner,
      playerScore: newPlayerScore,
      aiScore: newAiScore
    };

    setRoundHistory(prev => [...prev, roundResult]);
    setCurrentRound(prev => prev + 1);

    // Check if game is over
    if (newPlayerScore >= 5 || newAiScore >= 5) {
      setIsGameOver(true);
    }
  };

  const resetGame = () => {
    setPlayerName('');
    setDeckName('heroes');
    setPlayerScore(0);
    setAiScore(0);
    setCurrentRound(0);
    setRoundHistory([]);
    setIsGameStarted(false);
    setIsGameOver(false);
  };

  // Mock API functions for leaderboard
  const fetchLeaderboard = async () => {
    try {
      // In a real app, this would be an API call
      const storedLeaderboard = localStorage.getItem('battleCards_leaderboard');
      if (storedLeaderboard) {
        setLeaderboard(JSON.parse(storedLeaderboard));
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const saveScore = async () => {
    try {
      // Create new leaderboard entry
      const entry = {
        name: playerName,
        score: playerScore,
        date: new Date().toISOString()
      };

      // Get existing leaderboard
      const storedLeaderboard = localStorage.getItem('battleCards_leaderboard');
      let updatedLeaderboard = [];
      
      if (storedLeaderboard) {
        updatedLeaderboard = JSON.parse(storedLeaderboard);
      }
      
      // Add new entry and sort
      updatedLeaderboard.push(entry);
      updatedLeaderboard.sort((a, b) => b.score - a.score);
      
      // Save to localStorage
      localStorage.setItem('battleCards_leaderboard', JSON.stringify(updatedLeaderboard));
      setLeaderboard(updatedLeaderboard);
      
      return true;
    } catch (error) {
      console.error('Error saving score:', error);
      return false;
    }
  };

  const value = {
    playerName,
    setPlayerName,
    deckName,
    setDeckName,
    deckData,
    aiData,
    playerScore,
    aiScore,
    currentRound,
    roundHistory,
    isGameOver,
    isGameStarted,
    drawCards,
    compareCards,
    resetGame,
    startGame,
    leaderboard,
    fetchLeaderboard,
    saveScore
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
}; 