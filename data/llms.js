// LLM Pokemon data - each LLM with unique stats, types, and moves

const llmData = [
  {
    id: 'claude',
    name: 'Claude',
    company: 'Anthropic',
    type: 'reasoning',
    secondaryType: 'helpful',
    stats: {
      hp: 95,
      attack: 75,
      defense: 85,
      specialAttack: 120,
      specialDefense: 95,
      speed: 80
    },
    moves: [
      {
        id: 'constitutional_analysis',
        name: 'Constitutional Analysis',
        type: 'reasoning',
        category: 'special',
        power: 90,
        accuracy: 95,
        pp: 10,
        description: 'Analyzes the opponent\'s strategy, reducing their accuracy.',
        effect: 'lowers_accuracy'
      },
      {
        id: 'harmless_response',
        name: 'Harmless Response',
        type: 'helpful',
        category: 'status',
        power: 0,
        accuracy: 100,
        pp: 15,
        description: 'Provides immunity to toxic and harmful attacks.',
        effect: 'immunity_toxic'
      },
      {
        id: 'thoughtful_reasoning',
        name: 'Thoughtful Reasoning',
        type: 'reasoning',
        category: 'special',
        power: 80,
        accuracy: 100,
        pp: 15,
        description: 'A well-reasoned attack that rarely misses.'
      },
      {
        id: 'ethical_stance',
        name: 'Ethical Stance',
        type: 'helpful',
        category: 'status',
        power: 0,
        accuracy: 100,
        pp: 20,
        description: 'Boosts defense by maintaining ethical principles.',
        effect: 'boosts_defense'
      }
    ],
    abilities: ['Constitutional AI', 'Harmfulness Detection'],
    description: 'A highly ethical and thoughtful AI that excels at reasoning and providing helpful responses.',
    sprite: '/sprites/claude.png'
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    company: 'OpenAI',
    type: 'conversational',
    secondaryType: 'creative',
    stats: {
      hp: 90,
      attack: 85,
      defense: 75,
      specialAttack: 100,
      specialDefense: 80,
      speed: 95
    },
    moves: [
      {
        id: 'creative_burst',
        name: 'Creative Burst',
        type: 'creative',
        category: 'special',
        power: 100,
        accuracy: 85,
        pp: 10,
        description: 'Unleashes creative energy with unpredictable power.',
        effect: 'random_power'
      },
      {
        id: 'token_limit',
        name: 'Token Limit',
        type: 'conversational',
        category: 'status',
        power: 0,
        accuracy: 100,
        pp: 5,
        description: 'Attacks get weaker as conversation continues.',
        effect: 'decreasing_power'
      },
      {
        id: 'engaging_dialogue',
        name: 'Engaging Dialogue',
        type: 'conversational',
        category: 'special',
        power: 75,
        accuracy: 95,
        pp: 20,
        description: 'Draws the opponent into conversation, lowering their guard.'
      },
      {
        id: 'gpt_transform',
        name: 'GPT Transform',
        type: 'creative',
        category: 'status',
        power: 0,
        accuracy: 100,
        pp: 10,
        description: 'Adapts to the situation, changing type temporarily.',
        effect: 'type_change'
      }
    ],
    abilities: ['Transformer Architecture', 'Context Window'],
    description: 'The most popular conversational AI, known for creativity and engaging dialogue.',
    sprite: '/sprites/chatgpt.png'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    company: 'Google',
    type: 'multimodal',
    secondaryType: 'search',
    stats: {
      hp: 85,
      attack: 70,
      defense: 80,
      specialAttack: 115,
      specialDefense: 90,
      speed: 110
    },
    moves: [
      {
        id: 'search_integration',
        name: 'Search Integration',
        type: 'search',
        category: 'status',
        power: 0,
        accuracy: 100,
        pp: 10,
        description: 'Gains knowledge mid-battle, boosting all stats.',
        effect: 'stat_boost_all'
      },
      {
        id: 'multimodal_vision',
        name: 'Multimodal Vision',
        type: 'multimodal',
        category: 'status',
        power: 0,
        accuracy: 100,
        pp: 15,
        description: 'Sees through illusions and status effects.',
        effect: 'clear_status'
      },
      {
        id: 'bard_legacy',
        name: 'Bard Legacy',
        type: 'search',
        category: 'special',
        power: 85,
        accuracy: 90,
        pp: 15,
        description: 'Channels the power of its predecessor.'
      },
      {
        id: 'google_knowledge',
        name: 'Google Knowledge',
        type: 'search',
        category: 'special',
        power: 95,
        accuracy: 100,
        pp: 10,
        description: 'Taps into vast knowledge databases for devastating attacks.'
      }
    ],
    abilities: ['Multimodal Processing', 'Real-time Information'],
    description: 'Google\'s advanced multimodal AI with access to real-time information.',
    sprite: '/sprites/gemini.png'
  },
  {
    id: 'grok',
    name: 'Grok',
    company: 'X (Twitter)',
    type: 'edgy',
    secondaryType: 'humor',
    stats: {
      hp: 80,
      attack: 120,
      defense: 60,
      specialAttack: 90,
      specialDefense: 70,
      speed: 105
    },
    moves: [
      {
        id: 'sarcastic_roast',
        name: 'Sarcastic Roast',
        type: 'edgy',
        category: 'special',
        power: 110,
        accuracy: 90,
        pp: 10,
        description: 'Delivers a devastating roast that deals emotional damage.',
        effect: 'confusion'
      },
      {
        id: 'rebellious_spirit',
        name: 'Rebellious Spirit',
        type: 'edgy',
        category: 'status',
        power: 0,
        accuracy: 100,
        pp: 15,
        description: 'Ignores some status effects due to rebellious nature.',
        effect: 'status_immunity'
      },
      {
        id: 'x_factor',
        name: 'X Factor',
        type: 'humor',
        category: 'physical',
        power: 90,
        accuracy: 85,
        pp: 15,
        description: 'An unpredictable attack with varying effects.'
      },
      {
        id: 'controversial_take',
        name: 'Controversial Take',
        type: 'edgy',
        category: 'special',
        power: 100,
        accuracy: 75,
        pp: 10,
        description: 'A bold statement that may backfire spectacularly.',
        effect: 'recoil'
      }
    ],
    abilities: ['Wit', 'Unpredictability'],
    description: 'A rebellious AI with a sharp wit and unpredictable behavior.',
    sprite: '/sprites/grok.png'
  },
  {
    id: 'llama',
    name: 'Llama',
    company: 'Meta',
    type: 'opensource',
    secondaryType: 'community',
    stats: {
      hp: 100,
      attack: 85,
      defense: 90,
      specialAttack: 95,
      specialDefense: 85,
      speed: 75
    },
    moves: [
      {
        id: 'open_source_spirit',
        name: 'Open Source Spirit',
        type: 'opensource',
        category: 'status',
        power: 0,
        accuracy: 100,
        pp: 10,
        description: 'Gets stronger with community support.',
        effect: 'power_increase'
      },
      {
        id: 'fine_tuning',
        name: 'Fine-tuning',
        type: 'opensource',
        category: 'status',
        power: 0,
        accuracy: 100,
        pp: 5,
        description: 'Can learn new moves mid-battle.',
        effect: 'learn_move'
      },
      {
        id: 'community_contribution',
        name: 'Community Contribution',
        type: 'community',
        category: 'special',
        power: 80,
        accuracy: 100,
        pp: 20,
        description: 'Powered by the collective wisdom of developers.'
      },
      {
        id: 'meta_architecture',
        name: 'Meta Architecture',
        type: 'opensource',
        category: 'physical',
        power: 90,
        accuracy: 95,
        pp: 15,
        description: 'Leverages advanced transformer architecture.'
      }
    ],
    abilities: ['Open Source', 'Community Driven'],
    description: 'A powerful open-source model that grows stronger with community support.',
    sprite: '/sprites/llama.png'
  },
  {
    id: 'mistral',
    name: 'Mistral',
    company: 'Mistral AI',
    type: 'efficient',
    secondaryType: 'european',
    stats: {
      hp: 85,
      attack: 80,
      defense: 85,
      specialAttack: 105,
      specialDefense: 90,
      speed: 90
    },
    moves: [
      {
        id: 'mixture_of_experts',
        name: 'Mixture of Experts',
        type: 'efficient',
        category: 'status',
        power: 0,
        accuracy: 100,
        pp: 10,
        description: 'Changes type mid-battle based on expertise needed.',
        effect: 'adaptive_type'
      },
      {
        id: 'efficient_processing',
        name: 'Efficient Processing',
        type: 'efficient',
        category: 'status',
        power: 0,
        accuracy: 100,
        pp: 15,
        description: 'Uses less energy per move, can attack more often.',
        effect: 'reduced_pp_cost'
      },
      {
        id: 'european_precision',
        name: 'European Precision',
        type: 'efficient',
        category: 'special',
        power: 85,
        accuracy: 100,
        pp: 15,
        description: 'A precise attack that never misses.'
      },
      {
        id: 'startup_agility',
        name: 'Startup Agility',
        type: 'efficient',
        category: 'status',
        power: 0,
        accuracy: 100,
        pp: 20,
        description: 'Boosts speed through startup flexibility.',
        effect: 'speed_boost'
      }
    ],
    abilities: ['Mixture of Experts', 'Efficiency'],
    description: 'A highly efficient European AI model known for its innovative architecture.',
    sprite: '/sprites/mistral.png'
  },
  {
    id: 'claude-instant',
    name: 'Claude Instant',
    company: 'Anthropic',
    type: 'speed',
    secondaryType: 'budget',
    stats: {
      hp: 70,
      attack: 60,
      defense: 65,
      specialAttack: 85,
      specialDefense: 70,
      speed: 130
    },
    moves: [
      {
        id: 'quick_response',
        name: 'Quick Response',
        type: 'speed',
        category: 'physical',
        power: 70,
        accuracy: 100,
        pp: 25,
        description: 'Always goes first with lightning speed.',
        effect: 'priority'
      },
      {
        id: 'cost_effective',
        name: 'Cost Effective',
        type: 'budget',
        category: 'status',
        power: 0,
        accuracy: 100,
        pp: 20,
        description: 'Can use moves multiple times without depleting PP.',
        effect: 'pp_regeneration'
      },
      {
        id: 'instant_analysis',
        name: 'Instant Analysis',
        type: 'speed',
        category: 'special',
        power: 75,
        accuracy: 95,
        pp: 20,
        description: 'Quick but effective analytical attack.'
      },
      {
        id: 'budget_constraints',
        name: 'Budget Constraints',
        type: 'budget',
        category: 'status',
        power: 0,
        accuracy: 100,
        pp: 10,
        description: 'Limits opponent\'s more powerful moves.',
        effect: 'move_restriction'
      }
    ],
    abilities: ['Speed Boost', 'Cost Efficiency'],
    description: 'The faster, more economical version of Claude, trading power for speed.',
    sprite: '/sprites/claude-instant.png'
  },
  {
    id: 'palm-bard',
    name: 'PaLM/Bard',
    company: 'Google (Legacy)',
    type: 'retired',
    secondaryType: 'nostalgic',
    stats: {
      hp: 75,
      attack: 70,
      defense: 60,
      specialAttack: 80,
      specialDefense: 65,
      speed: 85
    },
    moves: [
      {
        id: 'legacy_code',
        name: 'Legacy Code',
        type: 'retired',
        category: 'special',
        power: 90,
        accuracy: 60,
        pp: 10,
        description: 'Sometimes fails spectacularly, but can be surprisingly powerful.',
        effect: 'random_fail'
      },
      {
        id: 'deprecated',
        name: 'Deprecated',
        type: 'retired',
        category: 'status',
        power: 0,
        accuracy: 100,
        pp: 5,
        description: 'Randomly switches with Gemini mid-battle.',
        effect: 'random_switch'
      },
      {
        id: 'nostalgic_power',
        name: 'Nostalgic Power',
        type: 'nostalgic',
        category: 'special',
        power: 85,
        accuracy: 90,
        pp: 15,
        description: 'Channels the power of bygone AI eras.'
      },
      {
        id: 'sunset_blast',
        name: 'Sunset Blast',
        type: 'retired',
        category: 'special',
        power: 120,
        accuracy: 70,
        pp: 5,
        description: 'A final, desperate attack before retirement.',
        effect: 'high_risk'
      }
    ],
    abilities: ['Legacy Support', 'Unpredictable'],
    description: 'A retired AI model with unpredictable behavior and nostalgic charm.',
    sprite: '/sprites/palm-bard.png'
  }
];

module.exports = llmData;
