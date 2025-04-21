import React, { useEffect, useState } from 'react';
import { useBattle } from '../context/BattleContext';
import DiceRoll from '../components/DiceRoll';
import { determineDiceRollWinner } from '../utils/battleUtils';
import '../styles/BattlePage.css';

export function BattlePage() {
  const { state, dispatch } = useBattle();
  const { player1, player2, currentTurn, turnNumber, isGameOver, winner } = state;
  const [diceResults, setDiceResults] = useState({ player: null, ai: null });
  const [isDiceRolling, setIsDiceRolling] = useState(false);

  // Auto-draw cards at the beginning of each turn
  useEffect(() => {
    if (turnNumber > 0 && !isGameOver) {
      dispatch({ type: 'DRAW_CARD', playerId: currentTurn });
    }
  }, [currentTurn, turnNumber, isGameOver, dispatch]);

  const handleStartGame = () => {
    setDiceResults({ player: null, ai: null });
    dispatch({ type: 'START_GAME' });
  };

  const handleEndTurn = () => {
    setDiceResults({ player: null, ai: null });
    dispatch({ type: 'END_TURN' });
  };

  const handlePlayCard = (playerId, cardId, position) => {
    if (currentTurn === playerId && !isGameOver) {
      dispatch({ type: 'PLAY_CARD', playerId, cardId, position });
    }
  };

  const handleAttack = (attackerId, attackerCardId, defenderId, defenderCardId = null) => {
    if (currentTurn === attackerId && !isGameOver) {
      setIsDiceRolling(true);
      // The dice roll winner will be determined in handleDiceRollComplete
    }
  };

  const handleDiceRollComplete = (roll) => {
    if (currentTurn === 'player1') {
      setDiceResults(prev => ({ ...prev, player: roll }));
      // Simulate AI roll after a short delay
      setTimeout(() => {
        const aiRoll = Math.floor(Math.random() * 6) + 1;
        setDiceResults(prev => ({ ...prev, ai: aiRoll }));
        
        // Determine the winner after both rolls
        const playerCard = player1.field[0];
        const aiCard = player2.field[0];
        const winner = determineDiceRollWinner(roll, aiRoll, playerCard, aiCard);
        
        // Apply the attack result
        dispatch({
          type: 'ATTACK',
          attackerId: 'player1',
          defenderId: 'player2',
          attackerCardId: playerCard.id,
          defenderCardId: aiCard.id,
          diceWinner: winner
        });
        
        setIsDiceRolling(false);
      }, 1000);
    }
  };

  // Determine if it's the current player's turn
  const isPlayer1Turn = currentTurn === 'player1';
  const isPlayer2Turn = currentTurn === 'player2';

  return (
    <div className="battle-page">
      <div className="battle-info">
        <h2>Turn {turnNumber}</h2>
        {isGameOver ? (
          <div className="game-over">
            <h3>Game Over!</h3>
            <p>Winner: {winner === 'player1' ? player1.name : player2.name}</p>
            <button onClick={handleStartGame} className="start-game-btn">Play Again</button>
          </div>
        ) : (
          <p>Current Turn: {currentTurn === 'player1' ? player1.name : player2.name}</p>
        )}
      </div>

      {/* Dice Roll Section */}
      {isDiceRolling && (
        <div className="dice-roll-section">
          <div className="dice-container">
            <DiceRoll 
              onRollComplete={handleDiceRollComplete}
              isPlayerTurn={isPlayer1Turn}
            />
            {diceResults.ai !== null && (
              <div className="ai-dice-result">
                AI Roll: {diceResults.ai}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="player-stats">
        <div className={`player player1 ${isPlayer1Turn ? 'active-turn' : ''}`}>
          <h3>{player1.name}</h3>
          <div className="player-info">
            <p>Health: {player1.health}</p>
            <p>Cards in Hand: {player1.hand.length}</p>
            <p>Cards in Deck: {player1.deck.length}</p>
          </div>
          
          {/* Player 1's field */}
          <div className="player-field">
            <h4>Your Field</h4>
            <div className="field-container">
              {player1.field.map((card) => (
                <div 
                  key={card.id} 
                  className="card on-field"
                  onClick={() => isPlayer1Turn && player2.field.length > 0 && 
                    handleAttack('player1', card.id, 'player2', player2.field[0].id)}
                >
                  <h5>{card.name}</h5>
                  <p>ATK: {card.attack} | DEF: {card.defense}</p>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Player 1's hand */}
          {isPlayer1Turn && !isGameOver && (
            <div className="player-hand">
              <h4>Your Hand</h4>
              <div className="cards-container">
                {player1.hand.map((card) => (
                  <div 
                    key={card.id} 
                    className="card"
                    onClick={() => handlePlayCard('player1', card.id, player1.field.length)}
                  >
                    <h5>{card.name}</h5>
                    <p>ATK: {card.attack} | DEF: {card.defense}</p>
                    <p>Cost: {card.cost}</p>
                    <p>{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={`player player2 ${isPlayer2Turn ? 'active-turn' : ''}`}>
          <h3>{player2.name}</h3>
          <div className="player-info">
            <p>Health: {player2.health}</p>
            <p>Cards in Hand: {player2.hand.length}</p>
            <p>Cards in Deck: {player2.deck.length}</p>
          </div>
          
          {/* Player 2's field */}
          <div className="player-field">
            <h4>Opponent's Field</h4>
            <div className="field-container">
              {player2.field.map((card) => (
                <div 
                  key={card.id} 
                  className="card on-field"
                  onClick={() => isPlayer1Turn && player1.field.length > 0 && 
                    handleAttack('player1', player1.field[0].id, 'player2', card.id)}
                >
                  <h5>{card.name}</h5>
                  <p>ATK: {card.attack} | DEF: {card.defense}</p>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Player 2's hand (face down) */}
          {isPlayer2Turn && !isGameOver && (
            <div className="player-hand">
              <h4>Opponent's Hand</h4>
              <div className="cards-container">
                {player2.hand.map((card) => (
                  <div key={card.id} className="card face-down">
                    <div className="card-back" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="battle-controls">
        {turnNumber === 0 ? (
          <button className="start-game-btn" onClick={handleStartGame}>Start Game</button>
        ) : !isGameOver ? (
          <button 
            className="end-turn-btn" 
            onClick={handleEndTurn}
            disabled={isGameOver}
          >
            End Turn
          </button>
        ) : null}
      </div>
    </div>
  );
} 