export interface Card {
  id: number;
  name: string;
  img: string;
  strength: number;
  speed: number;
  magic: number;
}

export type Stat = 'strength' | 'speed' | 'magic';

export interface RoundResult {
  playerCard: Card;
  aiCard: Card;
  stat: Stat;
  winner: 'player' | 'ai' | 'draw';
  playerScore: number;
  aiScore: number;
}

export interface LeaderboardEntry {
  id?: number;
  name: string;
  score: number;
  date: string;
}

export type DeckName = 'heroes' | 'monsters' | 'animals';