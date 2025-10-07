const express = require('express');
const router = express.Router();
const llmData = require('../data/llms');

// Game stats and information
router.get('/stats', (req, res) => {
  try {
    const stats = {
      totalLLMs: llmData.length,
      companies: [...new Set(llmData.map(llm => llm.company))],
      types: [...new Set(llmData.flatMap(llm => [llm.type, llm.secondaryType].filter(Boolean)))],
      averageStats: {
        hp: Math.round(llmData.reduce((sum, llm) => sum + llm.stats.hp, 0) / llmData.length),
        attack: Math.round(llmData.reduce((sum, llm) => sum + llm.stats.attack, 0) / llmData.length),
        defense: Math.round(llmData.reduce((sum, llm) => sum + llm.stats.defense, 0) / llmData.length),
        specialAttack: Math.round(llmData.reduce((sum, llm) => sum + llm.stats.specialAttack, 0) / llmData.length),
        specialDefense: Math.round(llmData.reduce((sum, llm) => sum + llm.stats.specialDefense, 0) / llmData.length),
        speed: Math.round(llmData.reduce((sum, llm) => sum + llm.stats.speed, 0) / llmData.length)
      }
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get game stats',
      message: error.message
    });
  }
});

// Get type effectiveness chart
router.get('/type-chart', (req, res) => {
  try {
    const typeChart = {
      'reasoning': {
        'conversational': 1.2,
        'creative': 1.0,
        'multimodal': 0.8,
        'edgy': 1.5,
        'opensource': 1.0,
        'efficient': 1.1,
        'speed': 0.9
      },
      'conversational': {
        'reasoning': 0.8,
        'creative': 1.2,
        'multimodal': 1.0,
        'edgy': 0.7,
        'opensource': 1.1,
        'efficient': 1.0,
        'speed': 1.0
      },
      'creative': {
        'reasoning': 1.0,
        'conversational': 0.8,
        'multimodal': 1.3,
        'edgy': 1.0,
        'opensource': 1.0,
        'efficient': 0.9,
        'speed': 0.8
      },
      'multimodal': {
        'reasoning': 1.2,
        'conversational': 1.0,
        'creative': 0.7,
        'edgy': 1.0,
        'opensource': 0.9,
        'efficient': 1.0,
        'speed': 1.1
      },
      'edgy': {
        'reasoning': 0.7,
        'conversational': 1.3,
        'creative': 1.0,
        'multimodal': 1.0,
        'opensource': 0.8,
        'efficient': 1.0,
        'speed': 1.2
      },
      'opensource': {
        'reasoning': 1.0,
        'conversational': 0.9,
        'creative': 1.0,
        'multimodal': 1.1,
        'edgy': 1.2,
        'efficient': 1.0,
        'speed': 0.9
      },
      'efficient': {
        'reasoning': 0.9,
        'conversational': 1.0,
        'creative': 1.1,
        'multimodal': 1.0,
        'edgy': 1.0,
        'opensource': 1.0,
        'speed': 1.3
      },
      'speed': {
        'reasoning': 1.1,
        'conversational': 1.0,
        'creative': 1.2,
        'multimodal': 0.9,
        'edgy': 0.8,
        'opensource': 1.1,
        'efficient': 0.7
      }
    };

    res.json({
      success: true,
      data: typeChart,
      legend: {
        2.0: 'Super Effective',
        1.5: 'Very Effective', 
        1.2: 'Effective',
        1.0: 'Normal Damage',
        0.8: 'Not Very Effective',
        0.7: 'Weak',
        0.5: 'Barely Effective'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get type chart',
      message: error.message
    });
  }
});

// Get leaderboard (top LLMs by stats)
router.get('/leaderboard', (req, res) => {
  try {
    const { stat = 'total' } = req.query;
    
    let sortedLLMs;
    
    if (stat === 'total') {
      sortedLLMs = [...llmData].sort((a, b) => {
        const totalA = Object.values(a.stats).reduce((sum, val) => sum + val, 0);
        const totalB = Object.values(b.stats).reduce((sum, val) => sum + val, 0);
        return totalB - totalA;
      });
    } else if (['hp', 'attack', 'defense', 'specialAttack', 'specialDefense', 'speed'].includes(stat)) {
      sortedLLMs = [...llmData].sort((a, b) => b.stats[stat] - a.stats[stat]);
    } else {
      return res.status(400).json({
        success: false,
        error: 'Invalid stat parameter'
      });
    }

    const leaderboard = sortedLLMs.map((llm, index) => ({
      rank: index + 1,
      name: llm.name,
      company: llm.company,
      type: llm.type,
      statValue: stat === 'total' ? 
        Object.values(llm.stats).reduce((sum, val) => sum + val, 0) : 
        llm.stats[stat],
      stats: llm.stats
    }));

    res.json({
      success: true,
      sortedBy: stat,
      data: leaderboard
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get leaderboard',
      message: error.message
    });
  }
});

// Get matchup predictions
router.get('/matchup/:id1/:id2', (req, res) => {
  try {
    const llm1 = llmData.find(llm => llm.id === req.params.id1);
    const llm2 = llmData.find(llm => llm.id === req.params.id2);
    
    if (!llm1 || !llm2) {
      return res.status(404).json({
        success: false,
        error: 'One or both LLMs not found'
      });
    }

    // Simple prediction algorithm
    const llm1Total = Object.values(llm1.stats).reduce((sum, val) => sum + val, 0);
    const llm2Total = Object.values(llm2.stats).reduce((sum, val) => sum + val, 0);
    
    // Factor in type effectiveness
    const LLM = require('../models/LLM');
    const tempLLM1 = new LLM(llm1);
    const tempLLM2 = new LLM(llm2);
    
    const llm1TypeAdvantage = tempLLM1.getTypeEffectiveness(llm1.type, llm2.type);
    const llm2TypeAdvantage = tempLLM2.getTypeEffectiveness(llm2.type, llm1.type);
    
    const llm1Score = llm1Total * llm1TypeAdvantage;
    const llm2Score = llm2Total * llm2TypeAdvantage;
    
    const totalScore = llm1Score + llm2Score;
    const llm1WinChance = Math.round((llm1Score / totalScore) * 100);
    const llm2WinChance = 100 - llm1WinChance;

    res.json({
      success: true,
      data: {
        llm1: {
          name: llm1.name,
          winChance: llm1WinChance,
          totalStats: llm1Total,
          typeAdvantage: llm1TypeAdvantage,
          strengths: getTopStats(llm1.stats),
          type: llm1.type
        },
        llm2: {
          name: llm2.name,
          winChance: llm2WinChance,
          totalStats: llm2Total,
          typeAdvantage: llm2TypeAdvantage,
          strengths: getTopStats(llm2.stats),
          type: llm2.type
        },
        prediction: llm1WinChance > llm2WinChance ? llm1.name : llm2.name,
        confidence: Math.abs(llm1WinChance - llm2WinChance)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to analyze matchup',
      message: error.message
    });
  }
});

// Helper function to get top stats
function getTopStats(stats) {
  return Object.entries(stats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([stat, value]) => ({ stat, value }));
}

// Get battle tips
router.get('/tips/:id', (req, res) => {
  try {
    const llm = llmData.find(llm => llm.id === req.params.id);
    
    if (!llm) {
      return res.status(404).json({
        success: false,
        error: 'LLM not found'
      });
    }

    const tips = generateBattleTips(llm);

    res.json({
      success: true,
      data: {
        llm: llm.name,
        tips: tips
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get battle tips',
      message: error.message
    });
  }
});

// Generate battle tips based on LLM characteristics
function generateBattleTips(llm) {
  const tips = [];
  
  // Stats-based tips
  if (llm.stats.speed > 100) {
    tips.push(`${llm.name} is very fast! Use speed to your advantage with priority moves.`);
  }
  if (llm.stats.hp > 95) {
    tips.push(`${llm.name} has high HP. Use tanky strategies and wear down opponents.`);
  }
  if (llm.stats.specialAttack > 110) {
    tips.push(`${llm.name} has powerful special attacks. Focus on special moves for maximum damage.`);
  }
  
  // Type-based tips
  const typeStrategies = {
    'reasoning': 'Use analytical moves to lower opponent accuracy and find weaknesses.',
    'conversational': 'Engage opponents with dialogue-based attacks to confuse them.',
    'creative': 'Unpredictable creative moves can catch opponents off-guard.',
    'multimodal': 'Use versatility to adapt to any situation mid-battle.',
    'edgy': 'High-risk, high-reward attacks work best with this rebellious type.',
    'opensource': 'Community support makes you stronger - use collaborative moves.',
    'efficient': 'Conserve energy and use precise, calculated attacks.',
    'speed': 'Strike first and strike fast - speed is your greatest weapon.'
  };
  
  if (typeStrategies[llm.type]) {
    tips.push(typeStrategies[llm.type]);
  }
  
  // Move-based tips
  if (llm.moves.some(move => move.effect)) {
    tips.push(`${llm.name} has special moves with unique effects. Time them strategically!`);
  }
  
  return tips.slice(0, 3); // Return top 3 tips
}

module.exports = router;
