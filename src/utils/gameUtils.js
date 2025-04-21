import anime from 'animejs';

// Shuffle array using Fisher-Yates algorithm
export const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Get a random stat to compare
export const getRandomStat = () => {
  const stats = ['strength', 'speed', 'magic'];
  const randomIndex = Math.floor(Math.random() * stats.length);
  return stats[randomIndex];
};

// Format date for display
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

// Get stat color based on value
export const getStatColor = (value) => {
  if (value >= 9) return 'bg-success-500';
  if (value >= 7) return 'bg-accent-500';
  if (value >= 5) return 'bg-warning-500';
  return 'bg-error-500';
};

// Get stat icon based on stat type
export const getStatIcon = (stat) => {
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

// Anime.js animations
export const animateElement = (element, options) => {
  return anime({
    targets: element,
    ...options,
    easing: 'easeInOutQuad',
  });
};

export const animateEntrance = (element) => {
  return animateElement(element, {
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 600,
  });
};

export const animateCardFlip = (element, isFlipped) => {
  return animateElement(element, {
    rotateY: isFlipped ? [0, 180] : [180, 0],
    duration: 800,
  });
};

export const animateWinner = (element) => {
  return animateElement(element, {
    scale: [1, 1.05],
    duration: 400,
  });
};