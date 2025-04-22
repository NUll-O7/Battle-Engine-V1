// Card templates for UNO-style gameplay
const cardTypes = [
  { attack: 1, defense: 1 },
  { attack: 2, defense: 2 },
  { attack: 3, defense: 3 },
  { attack: 4, defense: 4 },
  { attack: 5, defense: 5 }
];

// Card name templates
const cardNameTemplates = [
  "Red Warrior",
  "Blue Mage",
  "Green Knight",
  "Yellow Archer",
  "Black Dragon"
];

// Card description templates
const cardDescriptionTemplates = [
  "A fierce warrior with balanced stats",
  "A powerful mage with equal attack and defense",
  "A noble knight with matching strength",
  "A skilled archer with balanced abilities",
  "A mighty dragon with equal power"
];

// Card image mappings (using placeholder URLs for now)
const cardImageMappings = [
  "/images/cards/red-warrior.jpg",
  "/images/cards/blue-mage.jpg",
  "/images/cards/green-knight.jpg",
  "/images/cards/yellow-archer.jpg",
  "/images/cards/black-dragon.jpg"
];

// Create a complete random card
export const createRandomCard = () => {
  const templateIndex = Math.floor(Math.random() * cardTypes.length);
  const stats = cardTypes[templateIndex];
  
  return {
    id: `card-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name: cardNameTemplates[templateIndex],
    attack: stats.attack,
    defense: stats.defense,
    cost: Math.ceil((stats.attack + stats.defense) / 2),
    imageUrl: cardImageMappings[templateIndex],
    description: cardDescriptionTemplates[templateIndex]
  };
}; 