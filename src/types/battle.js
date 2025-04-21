/**
 * @typedef {Object} Card
 * @property {string} id
 * @property {string} name
 * @property {number} attack
 * @property {number} defense
 * @property {number} cost
 * @property {string} [imageUrl]
 * @property {string} [description]
 */

/**
 * @typedef {Object} Player
 * @property {string} id
 * @property {string} name
 * @property {number} health
 * @property {Card[]} deck
 * @property {Card[]} hand
 * @property {Card[]} field
 */

/**
 * @typedef {Object} BattleState
 * @property {Player} player1
 * @property {Player} player2
 * @property {string} currentTurn
 * @property {number} turnNumber
 * @property {boolean} isGameOver
 * @property {string|null} winner
 */

/**
 * @typedef {Object} BattleAction
 * @property {"PLAY_CARD"|"END_TURN"|"START_GAME"|"DRAW_CARD"|"ATTACK"} type
 * @property {string} [playerId]
 * @property {string} [cardId]
 * @property {number} [position]
 * @property {string} [attackerId]
 * @property {string} [defenderId]
 * @property {string} [attackerCardId]
 * @property {string} [defenderCardId]
 */

export {}; 