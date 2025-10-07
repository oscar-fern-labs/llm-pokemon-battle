const express = require('express');
const router = express.Router();
const llmData = require('../data/llms');
const LLM = require('../models/LLM');

// Get all available LLMs
router.get('/', (req, res) => {
  try {
    const llms = llmData.map(data => new LLM(data));
    res.json({
      success: true,
      count: llms.length,
      data: llms
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch LLMs',
      message: error.message
    });
  }
});

// Get a specific LLM by ID
router.get('/:id', (req, res) => {
  try {
    const llmInfo = llmData.find(llm => llm.id === req.params.id);
    
    if (!llmInfo) {
      return res.status(404).json({
        success: false,
        error: 'LLM not found'
      });
    }

    const llm = new LLM(llmInfo);
    res.json({
      success: true,
      data: llm
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch LLM',
      message: error.message
    });
  }
});

// Get LLM by type
router.get('/type/:type', (req, res) => {
  try {
    const filteredLLMs = llmData.filter(llm => 
      llm.type === req.params.type || llm.secondaryType === req.params.type
    );
    
    const llms = filteredLLMs.map(data => new LLM(data));
    
    res.json({
      success: true,
      count: llms.length,
      data: llms
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to filter LLMs by type',
      message: error.message
    });
  }
});

// Get random LLMs for battle
router.get('/random/:count', (req, res) => {
  try {
    const count = parseInt(req.params.count) || 1;
    const maxCount = Math.min(count, llmData.length);
    
    // Shuffle and select random LLMs
    const shuffled = [...llmData].sort(() => 0.5 - Math.random());
    const selectedLLMs = shuffled.slice(0, maxCount);
    
    const llms = selectedLLMs.map(data => new LLM(data));
    
    res.json({
      success: true,
      count: llms.length,
      data: llms
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get random LLMs',
      message: error.message
    });
  }
});

// Get LLM stats comparison
router.get('/compare/:id1/:id2', (req, res) => {
  try {
    const llm1Data = llmData.find(llm => llm.id === req.params.id1);
    const llm2Data = llmData.find(llm => llm.id === req.params.id2);
    
    if (!llm1Data || !llm2Data) {
      return res.status(404).json({
        success: false,
        error: 'One or both LLMs not found'
      });
    }

    const llm1 = new LLM(llm1Data);
    const llm2 = new LLM(llm2Data);
    
    // Calculate type effectiveness
    const llm1Advantage = llm1.getTypeEffectiveness(llm1.type, llm2.type);
    const llm2Advantage = llm2.getTypeEffectiveness(llm2.type, llm1.type);
    
    res.json({
      success: true,
      data: {
        llm1: {
          ...llm1,
          typeAdvantage: llm1Advantage
        },
        llm2: {
          ...llm2,
          typeAdvantage: llm2Advantage
        },
        prediction: llm1Advantage > llm2Advantage ? llm1.name : 
                   llm2Advantage > llm1Advantage ? llm2.name : 'Even match'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to compare LLMs',
      message: error.message
    });
  }
});

module.exports = router;
