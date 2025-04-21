export const determineDiceRollWinner = (playerRoll, aiRoll, playerCard, aiCard) => {
  if (playerRoll > aiRoll) {
    return 'player';
  } else if (aiRoll > playerRoll) {
    return 'ai';
  } else {
    // If it's a draw, compare card stats
    const playerTotal = playerCard.attack + playerCard.defense;
    const aiTotal = aiCard.attack + aiCard.defense;
    
    if (playerTotal > aiTotal) {
      return 'player';
    } else if (aiTotal > playerTotal) {
      return 'ai';
    } else {
      // If stats are also equal, randomly decide
      return Math.random() < 0.5 ? 'player' : 'ai';
    }
  }
}; 