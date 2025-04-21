import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGameContext } from '../context/GameContext';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { Swords } from 'lucide-react';

const Home = () => {
  const { setPlayerName, deckName, setDeckName, startGame } = useGameContext();
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate name
    if (!name.trim()) {
      setNameError('Please enter your name');
      return;
    }
    
    // Set context and start game
    setPlayerName(name.trim());
    startGame();
    navigate('/game');
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (nameError && e.target.value.trim()) {
      setNameError('');
    }
  };

  return (
    <motion.div 
      className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-primary-50 to-primary-100 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <motion.div
            className="inline-block mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <Swords className="h-16 w-16 text-primary-600" />
          </motion.div>
          <h1 className="text-3xl font-bold text-primary-800 mb-2">Battle Cards</h1>
          <p className="text-gray-600">Challenge the AI in an epic card battle!</p>
        </div>

        <motion.div 
          className="bg-white p-6 rounded-lg shadow-lg"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-6 text-center">Ready to Play?</h2>
          
          <form onSubmit={handleSubmit}>
            <FormInput
              id="player-name"
              label="Your Name"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your name"
              required
              error={nameError}
            />
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Deck
              </label>
              <div className="grid grid-cols-3 gap-3 mt-2">
                <button
                  type="button"
                  className={`border rounded-md p-3 flex flex-col items-center transition ${
                    deckName === 'heroes' 
                      ? 'bg-primary-100 border-primary-500' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setDeckName('heroes')}
                >
                  <span className="text-xl mb-1">👑</span>
                  <span className="text-sm font-medium">Heroes</span>
                </button>
                <button
                  type="button"
                  className={`border rounded-md p-3 flex flex-col items-center transition ${
                    deckName === 'monsters' 
                      ? 'bg-primary-100 border-primary-500' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setDeckName('monsters')}
                >
                  <span className="text-xl mb-1">👹</span>
                  <span className="text-sm font-medium">Monsters</span>
                </button>
                <button
                  type="button"
                  className={`border rounded-md p-3 flex flex-col items-center transition ${
                    deckName === 'animals' 
                      ? 'bg-primary-100 border-primary-500' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setDeckName('animals')}
                >
                  <span className="text-xl mb-1">🦁</span>
                  <span className="text-sm font-medium">Animals</span>
                </button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              variant="primary" 
              size="lg" 
              fullWidth
              className="mt-4"
            >
              Start Game
            </Button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home; 