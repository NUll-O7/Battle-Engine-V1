import React, { createContext, useContext, useReducer } from 'react';
import { createRandomCard } from '../utils/cardUtils';

// Create initial decks with random cards
const createInitialDeck = () => {
  const deck = [];
  for (let i = 0; i < 5; i++) {
    deck.push(createRandomCard(`card${i + 1}`));
  }
  return deck;
};

const initialState = {
  player1: {
    id: 'player1',
    name: 'Player 1',
    health: 20,
    deck: createInitialDeck(),
    hand: [],
    field: []
  },
  player2: {
    id: 'player2',
    name: 'Player 2',
    health: 20,
    deck: createInitialDeck(),
    hand: [],
    field: []
  },
  currentTurn: 'player1',
  turnNumber: 0,
  isGameOver: false,
  winner: null
};

/**
 * @param {import('../types/battle').BattleState} state
 * @param {import('../types/battle').BattleAction} action
 * @returns {import('../types/battle').BattleState}
 */
function battleReducer(state, action) {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        turnNumber: 1,
        isGameOver: false,
        winner: null,
        player1: {
          ...state.player1,
          health: 20,
          deck: createInitialDeck(),
          hand: [],
          field: []
        },
        player2: {
          ...state.player2,
          health: 20,
          deck: createInitialDeck(),
          hand: [],
          field: []
        }
      };
    
    case 'PLAY_CARD': {
      const player = state[action.playerId];
      const cardIndex = player.hand.findIndex(card => card.id === action.cardId);
      
      if (cardIndex === -1) return state;
      
      const newHand = [...player.hand];
      const [card] = newHand.splice(cardIndex, 1);
      const newField = [...player.field];
      newField.splice(action.position, 0, card);
      
      // Check for game over after playing a card
      const updatedState = {
        ...state,
        [action.playerId]: {
          ...player,
          hand: newHand,
          field: newField
        }
      };
      
      return checkGameOver(updatedState);
    }
    
    case 'END_TURN': {
      const nextPlayer = state.currentTurn === 'player1' ? 'player2' : 'player1';
      // Only increment turn number when player1's turn ends
      const newTurnNumber = state.currentTurn === 'player1' ? state.turnNumber + 1 : state.turnNumber;
      
      return {
        ...state,
        currentTurn: nextPlayer,
        turnNumber: newTurnNumber
      };
    }
    
    case 'DRAW_CARD': {
      const player = state[action.playerId];
      if (player.deck.length === 0) return state;
      
      const newDeck = [...player.deck];
      const [card] = newDeck.splice(0, 1);
      
      // Generate a new random card to replace the drawn one
      const newCard = createRandomCard(`card${Date.now()}`);
      
      const updatedState = {
        ...state,
        [action.playerId]: {
          ...player,
          deck: [...newDeck, newCard],
          hand: [...player.hand, card]
        }
      };
      
      return checkGameOver(updatedState);
    }
    
    case 'ATTACK': {
      const { attackerId, defenderId, attackerCardId, defenderCardId, diceWinner } = action;
      const attacker = state[attackerId];
      const defender = state[defenderId];
      
      const attackerCard = attacker.field.find(card => card.id === attackerCardId);
      const defenderCard = defender.field.find(card => card.id === defenderCardId);
      
      if (!attackerCard || !defenderCard) return state;
      
      // Determine damage based on dice roll winner
      let damage = 0;
      if (diceWinner === attackerId) {
        // Attacker wins dice roll - full damage
        damage = Math.max(0, attackerCard.attack - defenderCard.defense);
      } else if (diceWinner === defenderId) {
        // Defender wins dice roll - half damage
        damage = Math.max(0, Math.floor((attackerCard.attack - defenderCard.defense) / 2));
      } else {
        // Draw - quarter damage
        damage = Math.max(0, Math.floor((attackerCard.attack - defenderCard.defense) / 4));
      }
      
      // Apply damage to defender's health
      const newDefenderHealth = Math.max(0, defender.health - damage);
      
      // Check if game is over
      const isGameOver = newDefenderHealth === 0;
      const winner = isGameOver ? attackerId : null;
      
      return {
        ...state,
        [defenderId]: {
          ...defender,
          health: newDefenderHealth
        },
        isGameOver,
        winner
      };
    }
    
    default:
      return state;
  }
}

// Helper function to check for game over conditions
function checkGameOver(state) {
  // Check if either player has 0 or less health
  if (state.player1.health <= 0) {
    return {
      ...state,
      isGameOver: true,
      winner: 'player2'
    };
  }
  
  if (state.player2.health <= 0) {
    return {
      ...state,
      isGameOver: true,
      winner: 'player1'
    };
  }
  
  // Check if either player has no cards in deck and hand
  if (state.player1.deck.length === 0 && state.player1.hand.length === 0) {
    return {
      ...state,
      isGameOver: true,
      winner: 'player2'
    };
  }
  
  if (state.player2.deck.length === 0 && state.player2.hand.length === 0) {
    return {
      ...state,
      isGameOver: true,
      winner: 'player1'
    };
  }
  
  return state;
}

const BattleContext = createContext(null);

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export function BattleProvider({ children }) {
  const [state, dispatch] = useReducer(battleReducer, initialState);
  
  return (
    <BattleContext.Provider value={{ state, dispatch }}>
      {children}
    </BattleContext.Provider>
  );
}

/**
 * @returns {{
 *   state: import('../types/battle').BattleState,
 *   dispatch: React.Dispatch<import('../types/battle').BattleAction>
 * }}
 */
export function useBattle() {
  const context = useContext(BattleContext);
  if (!context) {
    throw new Error('useBattle must be used within a BattleProvider');
  }
  return context;
} 