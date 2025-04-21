import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { BattleState, BattleAction, Card, Player } from '../types/battle';

const initialState: BattleState = {
  player1: {
    id: 'player1',
    name: 'Player 1',
    health: 20,
    deck: [],
    hand: [],
    field: []
  },
  player2: {
    id: 'player2',
    name: 'Player 2',
    health: 20,
    deck: [],
    hand: [],
    field: []
  },
  currentTurn: 'player1',
  turnNumber: 0,
  isGameOver: false,
  winner: null
};

function battleReducer(state: BattleState, action: BattleAction): BattleState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        turnNumber: 1,
        isGameOver: false,
        winner: null
      };
    
    case 'PLAY_CARD': {
      const player = state[action.playerId as keyof Pick<BattleState, 'player1' | 'player2'>];
      const cardIndex = player.hand.findIndex(card => card.id === action.cardId);
      
      if (cardIndex === -1) return state;
      
      const newHand = [...player.hand];
      const [card] = newHand.splice(cardIndex, 1);
      const newField = [...player.field];
      newField.splice(action.position, 0, card);
      
      return {
        ...state,
        [action.playerId]: {
          ...player,
          hand: newHand,
          field: newField
        }
      };
    }
    
    case 'END_TURN': {
      const nextPlayer = state.currentTurn === 'player1' ? 'player2' : 'player1';
      return {
        ...state,
        currentTurn: nextPlayer,
        turnNumber: state.turnNumber + 1
      };
    }
    
    case 'DRAW_CARD': {
      const player = state[action.playerId as keyof Pick<BattleState, 'player1' | 'player2'>];
      if (player.deck.length === 0) return state;
      
      const newDeck = [...player.deck];
      const [card] = newDeck.splice(0, 1);
      
      return {
        ...state,
        [action.playerId]: {
          ...player,
          deck: newDeck,
          hand: [...player.hand, card]
        }
      };
    }
    
    default:
      return state;
  }
}

const BattleContext = createContext<{
  state: BattleState;
  dispatch: React.Dispatch<BattleAction>;
} | null>(null);

export function BattleProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(battleReducer, initialState);
  
  return (
    <BattleContext.Provider value={{ state, dispatch }}>
      {children}
    </BattleContext.Provider>
  );
}

export function useBattle() {
  const context = useContext(BattleContext);
  if (!context) {
    throw new Error('useBattle must be used within a BattleProvider');
  }
  return context;
} 