const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const uuidv4 = () => crypto.randomUUID();
const llmData = require('../data/llms');
const LLM = require('../models/LLM');

// In-memory battle storage (in production, use database)
const activeBattles = new Map();

// Battle class to manage battle state
class Battle {
  constructor(player1LLM, player2LLM) {
    this.id = uuidv4();
    this.player1 = new LLM(player1LLM);
    this.player2 = new LLM(player2LLM);
    this.currentTurn = 1; // 1 for player1, 2 for player2
    this.turnCount = 0;
    this.status = 'active'; // active, finished
    this.winner = null;
    this.battleLog = [];
    this.createdAt = new Date();
    
    // Reset both LLMs for battle
    this.player1.resetForBattle();
    this.player2.resetForBattle();
  }

  // Determine turn order based on speed
  determineTurnOrder(move1, move2) {
    // Priority moves go first
    if (move1.effect === 'priority' && move2.effect !== 'priority') {
      return 'player1';
    }
    if (move2.effect === 'priority' && move1.effect !== 'priority') {
      return 'player2';
    }
    
    // Otherwise, faster LLM goes first
    if (this.player1.stats.speed > this.player2.stats.speed) {
      return 'player1';
    } else if (this.player2.stats.speed > this.player1.stats.speed) {
      return 'player2';
    } else {
      // Same speed, random
      return Math.random() < 0.5 ? 'player1' : 'player2';
    }
  }

  // Execute a move
  executeMove(attacker, defender, move) {
    let damage = 0;
    let effect = null;
    
    if (move.category !== 'status') {
      damage = attacker.calculateDamage(move, defender);
      const fainted = defender.takeDamage(damage);
      
      if (fainted) {
        this.status = 'finished';
        this.winner = attacker === this.player1 ? 1 : 2;
      }
    }

    // Apply move effects
    if (move.effect) {
      effect = this.applyMoveEffect(attacker, defender, move);
    }

    return {
      damage,
      effect,
      defenderHP: defender.currentHP,
      defenderHPPercent: defender.getHPPercentage(),
      fainted: defender.isFainted()
    };
  }

  // Apply special move effects
  applyMoveEffect(attacker, defender, move) {
    const effects = {
      'lowers_accuracy': () => {
        defender.stats.accuracy = (defender.stats.accuracy || 100) * 0.8;
        return 'Accuracy lowered!';
      },
      'boosts_defense': () => {
        attacker.stats.defense *= 1.2;
        return 'Defense boosted!';
      },
      'random_power': () => {
        const multiplier = 0.5 + Math.random();
        return `Power varied by ${Math.round(multiplier * 100)}%!`;
      },
      'confusion': () => {
        defender.applyStatusEffect({ type: 'confusion', duration: 3 });
        return 'Confused by the roast!';
      },
      'stat_boost_all': () => {
        Object.keys(attacker.stats).forEach(stat => {
          if (stat !== 'hp') {
            attacker.stats[stat] *= 1.1;
          }
        });
        return 'All stats boosted by knowledge!';
      },
      'speed_boost': () => {
        attacker.stats.speed *= 1.3;
        return 'Speed greatly increased!';
      }
    };

    if (effects[move.effect]) {
      return effects[move.effect]();
    }
    
    return null;
  }

  // Process a full turn with both players' moves
  processTurn(move1, move2) {
    this.turnCount++;
    
    const firstPlayer = this.determineTurnOrder(move1, move2);
    const secondPlayer = firstPlayer === 'player1' ? 'player2' : 'player1';
    
    const firstAttacker = firstPlayer === 'player1' ? this.player1 : this.player2;
    const firstDefender = firstPlayer === 'player1' ? this.player2 : this.player1;
    const firstMove = firstPlayer === 'player1' ? move1 : move2;
    
    const secondAttacker = secondPlayer === 'player1' ? this.player1 : this.player2;
    const secondDefender = secondPlayer === 'player1' ? this.player2 : this.player1;
    const secondMove = secondPlayer === 'player1' ? move1 : move2;

    // First move
    const firstResult = this.executeMove(firstAttacker, firstDefender, firstMove);
    
    const turnResult = {
      turnNumber: this.turnCount,
      firstMove: {
        player: firstPlayer,
        llm: firstAttacker.name,
        move: firstMove.name,
        result: firstResult
      },
      secondMove: null,
      battleStatus: this.status,
      winner: this.winner
    };

    // Add to battle log
    this.battleLog.push(`${firstAttacker.name} used ${firstMove.name}!`);
    if (firstResult.damage > 0) {
      this.battleLog.push(`Dealt ${firstResult.damage} damage!`);
    }
    if (firstResult.effect) {
      this.battleLog.push(firstResult.effect);
    }

    // Second move (only if battle is still active)
    if (this.status === 'active' && !firstDefender.isFainted()) {
      const secondResult = this.executeMove(secondAttacker, secondDefender, secondMove);
      
      turnResult.secondMove = {
        player: secondPlayer,
        llm: secondAttacker.name,
        move: secondMove.name,
        result: secondResult
      };

      this.battleLog.push(`${secondAttacker.name} used ${secondMove.name}!`);
      if (secondResult.damage > 0) {
        this.battleLog.push(`Dealt ${secondResult.damage} damage!`);
      }
      if (secondResult.effect) {
        this.battleLog.push(secondResult.effect);
      }
    }

    return turnResult;
  }

  // Get current battle state
  getBattleState() {
    return {
      id: this.id,
      player1: {
        ...this.player1,
        hpPercentage: this.player1.getHPPercentage()
      },
      player2: {
        ...this.player2,
        hpPercentage: this.player2.getHPPercentage()
      },
      currentTurn: this.currentTurn,
      turnCount: this.turnCount,
      status: this.status,
      winner: this.winner,
      battleLog: this.battleLog.slice(-10), // Last 10 messages
      createdAt: this.createdAt
    };
  }
}

// Start a new battle
router.post('/start', (req, res) => {
  try {
    const { player1Id, player2Id } = req.body;
    
    const player1LLM = llmData.find(llm => llm.id === player1Id);
    const player2LLM = llmData.find(llm => llm.id === player2Id);
    
    if (!player1LLM || !player2LLM) {
      return res.status(400).json({
        success: false,
        error: 'Invalid LLM IDs provided'
      });
    }

    const battle = new Battle(player1LLM, player2LLM);
    activeBattles.set(battle.id, battle);
    
    res.json({
      success: true,
      message: 'Battle started!',
      data: battle.getBattleState()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to start battle',
      message: error.message
    });
  }
});

// Execute a turn
router.post('/:battleId/turn', (req, res) => {
  try {
    const battle = activeBattles.get(req.params.battleId);
    
    if (!battle) {
      return res.status(404).json({
        success: false,
        error: 'Battle not found'
      });
    }

    if (battle.status !== 'active') {
      return res.status(400).json({
        success: false,
        error: 'Battle is not active'
      });
    }

    const { move1Id, move2Id } = req.body;
    
    // Find moves
    const move1 = battle.player1.moves.find(move => move.id === move1Id);
    const move2 = battle.player2.moves.find(move => move.id === move2Id);
    
    if (!move1 || !move2) {
      return res.status(400).json({
        success: false,
        error: 'Invalid move IDs provided'
      });
    }

    const turnResult = battle.processTurn(move1, move2);
    
    res.json({
      success: true,
      data: {
        turnResult,
        battleState: battle.getBattleState()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to process turn',
      message: error.message
    });
  }
});

// Get battle state
router.get('/:battleId', (req, res) => {
  try {
    const battle = activeBattles.get(req.params.battleId);
    
    if (!battle) {
      return res.status(404).json({
        success: false,
        error: 'Battle not found'
      });
    }

    res.json({
      success: true,
      data: battle.getBattleState()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get battle state',
      message: error.message
    });
  }
});

// Get all active battles
router.get('/', (req, res) => {
  try {
    const battles = Array.from(activeBattles.values()).map(battle => ({
      id: battle.id,
      player1: battle.player1.name,
      player2: battle.player2.name,
      status: battle.status,
      turnCount: battle.turnCount,
      winner: battle.winner,
      createdAt: battle.createdAt
    }));

    res.json({
      success: true,
      count: battles.length,
      data: battles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get battles',
      message: error.message
    });
  }
});

// AI vs AI battle (automated)
router.post('/ai-battle', (req, res) => {
  try {
    const { llm1Id, llm2Id } = req.body;
    
    const player1LLM = llmData.find(llm => llm.id === llm1Id) || llmData[Math.floor(Math.random() * llmData.length)];
    const player2LLM = llmData.find(llm => llm.id === llm2Id) || llmData[Math.floor(Math.random() * llmData.length)];
    
    const battle = new Battle(player1LLM, player2LLM);
    
    // Simulate battle automatically
    while (battle.status === 'active' && battle.turnCount < 50) { // Max 50 turns
      // Choose random moves for both players
      const move1 = battle.player1.moves[Math.floor(Math.random() * battle.player1.moves.length)];
      const move2 = battle.player2.moves[Math.floor(Math.random() * battle.player2.moves.length)];
      
      battle.processTurn(move1, move2);
    }
    
    // Store the completed battle
    activeBattles.set(battle.id, battle);
    
    res.json({
      success: true,
      message: 'AI battle completed!',
      data: battle.getBattleState()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to run AI battle',
      message: error.message
    });
  }
});

module.exports = router;
