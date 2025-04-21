// Card name templates for random generation
const cardNamePrefixes = ['Mighty', 'Swift', 'Brave', 'Dark', 'Mystic', 'Royal', 'Shadow', 'Divine', 'Ancient', 'Fierce'];
const cardNameTypes = ['Warrior', 'Mage', 'Knight', 'Archer', 'Dragon', 'Beast', 'Spirit', 'Guardian', 'Wizard', 'Rogue'];

// Card description templates
const cardDescriptions = [
  'A powerful fighter with unmatched strength',
  'Masters the arcane arts with precision',
  'Swift and deadly in combat',
  'Commands the forces of nature',
  'Ancient knowledge flows through their veins',
  'Born from the shadows, strikes from darkness',
  'Blessed by divine powers',
  'A legendary warrior of old',
  'Mystical energies surround this creature',
  'Tactical genius in battle'
];

// Generate random stats within balanced ranges
export const generateRandomStats = () => {
  // Base stats range from 1 to 5
  const baseAttack = Math.floor(Math.random() * 5) + 1;
  const baseDefense = Math.floor(Math.random() * 5) + 1;
  
  // Cost is based on total stats (attack + defense)
  const cost = Math.ceil((baseAttack + baseDefense) / 2);
  
  return {
    attack: baseAttack,
    defense: baseDefense,
    cost: cost
  };
};

// Generate a random card name
export const generateRandomCardName = () => {
  const prefix = cardNamePrefixes[Math.floor(Math.random() * cardNamePrefixes.length)];
  const type = cardNameTypes[Math.floor(Math.random() * cardNameTypes.length)];
  return `${prefix} ${type}`;
};

// Generate a random card description
export const generateRandomDescription = () => {
  return cardDescriptions[Math.floor(Math.random() * cardDescriptions.length)];
};

// Create a complete random card
export const createRandomCard = (id) => {
  const stats = generateRandomStats();
  return {
    id,
    name: generateRandomCardName(),
    description: generateRandomDescription(),
    ...stats
  };
}; 