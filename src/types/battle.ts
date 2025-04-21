export interface Card {
  id: string;
  name: string;
  attack: number;
  defense: number;
  cost: number;
  imageUrl?: string;
  description?: string;
}

export interface Player {
  id: string;
  name: string;
  health: number;
  deck: Card[];
  hand: Card[];
  field: Card[];
}

export interface BattleState {
  player1: Player;
  player2: Player;
  currentTurn: string;
  turnNumber: number;
  isGameOver: boolean;
  winner: string | null;
}

export type BattleAction = 
  | { type: 'PLAY_CARD'; playerId: string; cardId: string; position: number }
  | { type: 'END_TURN' }
  | { type: 'START_GAME' }
  | { type: 'DRAW_CARD'; playerId: string }; 