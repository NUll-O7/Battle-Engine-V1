/**
 * @typedef {Object} Card
 * @property {number} id
 * @property {string} name
 * @property {string} img
 * @property {number} strength
 * @property {number} speed
 * @property {number} magic
 */

/**
 * @typedef {'strength' | 'speed' | 'magic'} Stat
 */

/**
 * @typedef {Object} RoundResult
 * @property {Card} playerCard
 * @property {Card} aiCard
 * @property {Stat} stat
 * @property {'player' | 'ai' | 'draw'} winner
 * @property {number} playerScore
 * @property {number} aiScore
 */

/**
 * @typedef {Object} LeaderboardEntry
 * @property {number} [id]
 * @property {string} name
 * @property {number} score
 * @property {string} date
 */

/**
 * @typedef {'heroes' | 'monsters' | 'animals'} DeckName
 */

export {}; 