import { Card, Stat } from '../types';

// Shuffle array using Fisher-Yates algorithm
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Get a random stat to compare
export const getRandomStat = (): Stat => {
  const stats: Stat[] = ['strength', 'speed', 'magic'];
  const randomIndex = Math.floor(Math.random() * stats.length);
  return stats[randomIndex];
};

// Format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

// Get stat color based on value
export const getStatColor = (value: number): string => {
  if (value >= 9) return 'bg-success-500';
  if (value >= 7) return 'bg-accent-500';
  if (value >= 5) return 'bg-warning-500';
  return 'bg-error-500';
};

// Get stat icon based on stat type
export const getStatIcon = (stat: Stat): string => {
  switch (stat) {
    case 'strength':
      return '💪';
    case 'speed':
      return '⚡';
    case 'magic':
      return '✨';
    default:
      return '';
  }
};