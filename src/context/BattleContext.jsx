import React, { createContext, useContext, useReducer } from 'react';

// Sample cards for initial deck
const sampleCards = [
  { id: 'card1', name: 'Warrior', attack: 5, defense: 3, cost: 3, description: 'A fierce warrior' },
  { id: 'card2', name: 'Archer', attack: 4, defense: 2, cost: 2, description: 'A skilled archer' },
  { id: 'card3', name: 'Mage', attack: 6, defense: 1, cost: 4, description: 'A powerful mage' },
  { id: 'card4', name: 'Knight', attack: 3, defense: 5, cost: 3, description: 'A noble knight' },
  { id: 'card5', name: 'Rogue', attack: 4, defense: 2, cost: 2, description: 'A sneaky rogue' },
  { id: 'card6', name: 'Paladin', attack: 3, defense: 4, cost: 3, description: 'A holy paladin' },
  { id: 'card7', name: 'Dragon', attack: 7, defense: 5, cost: 6, description: 'A fearsome dragon' },
  { id: 'card8', name: 'Goblin', attack: 2, defense: 1, cost: 1, description: 'A small goblin' },
  { id: 'card9', name: 'Elf', attack: 3, defense: 2, cost: 2, description: 'A graceful elf' },
  { id: 'card10', name: 'Dwarf', attack: 2, defense: 4, cost: 2, description: 'A sturdy dwarf' }
];

// Create initial decks by shuffling and duplicating sample cards
const createInitialDeck = () => {
  const shuffled = [...sampleCards].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5); // Start with 5 cards
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
      const updatedState = {
        ...state,
        currentTurn: nextPlayer,
        turnNumber: state.turnNumber + 1
      };
      
      return checkGameOver(updatedState);
    }
    
    case 'DRAW_CARD': {
      const player = state[action.playerId];
      if (player.deck.length === 0) return state;
      
      const newDeck = [...player.deck];
      const [card] = newDeck.splice(0, 1);
      
      const updatedState = {
        ...state,
        [action.playerId]: {
          ...player,
          deck: newDeck,
          hand: [...player.hand, card]
        }
      };
      
      return checkGameOver(updatedState);
    }
    
    case 'ATTACK': {
      const { attackerId, defenderId, attackerCardId, defenderCardId } = action;
      
      // If attacking player directly (no defender card)
      if (!defenderCardId) {
        const attacker = state[attackerId];
        const defender = state[defenderId];
        const attackerCard = attacker.field.find(card => card.id === attackerCardId);
        
        if (!attackerCard) return state;
        
        const newDefenderHealth = defender.health - attackerCard.attack;
        
        const updatedState = {
          ...state,
          [defenderId]: {
            ...defender,
            health: newDefenderHealth
          }
        };
        
        return checkGameOver(updatedState);
      }
      
      // Card vs card combat
      const attacker = state[attackerId];
      const defender = state[defenderId];
      const attackerCard = attacker.field.find(card => card.id === attackerCardId);
      const defenderCard = defender.field.find(card => card.id === defenderCardId);
      
      if (!attackerCard || !defenderCard) return state;
      
      // Apply damage to both cards
      const newAttackerField = attacker.field.map(card => 
        card.id === attackerCardId 
          ? { ...card, defense: card.defense - defenderCard.attack } 
          : card
      ).filter(card => card.defense > 0);
      
      const newDefenderField = defender.field.map(card => 
        card.id === defenderCardId 
          ? { ...card, defense: card.defense - attackerCard.attack } 
          : card
      ).filter(card => card.defense > 0);
      
      const updatedState = {
        ...state,
        [attackerId]: {
          ...attacker,
          field: newAttackerField
        },
        [defenderId]: {
          ...defender,
          field: newDefenderField
        }
      };
      
      return checkGameOver(updatedState);
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