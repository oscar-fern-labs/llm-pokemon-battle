// LLM Pokemon data and battle logic

class LLM {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.company = data.company;
    this.type = data.type;
    this.secondaryType = data.secondaryType || null;
    this.stats = data.stats;
    this.moves = data.moves;
    this.abilities = data.abilities;
    this.description = data.description;
    this.sprite = data.sprite;
    
    // Battle stats
    this.currentHP = this.stats.hp;
    this.level = 50; // Default level
    this.statusEffects = [];
  }

  // Calculate damage based on attack and defense
  calculateDamage(move, target) {
    const attackStat = move.category === 'physical' ? this.stats.attack : this.stats.specialAttack;
    const defenseStat = move.category === 'physical' ? target.stats.defense : target.stats.specialDefense;
    
    // Base damage calculation (simplified Pokemon formula)
    let damage = ((((2 * this.level + 10) / 250) * (attackStat / defenseStat) * move.power) + 2);
    
    // Type effectiveness
    const effectiveness = this.getTypeEffectiveness(move.type, target.type);
    damage *= effectiveness;
    
    // Add some randomness (85-100% of calculated damage)
    damage *= (Math.random() * 0.15 + 0.85);
    
    return Math.floor(damage);
  }

  // Type effectiveness chart (simplified)
  getTypeEffectiveness(attackType, defenseType) {
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

    return typeChart[attackType]?.[defenseType] || 1.0;
  }

  // Take damage
  takeDamage(damage) {
    this.currentHP = Math.max(0, this.currentHP - damage);
    return this.currentHP <= 0;
  }

  // Heal
  heal(amount) {
    this.currentHP = Math.min(this.stats.hp, this.currentHP + amount);
  }

  // Check if fainted
  isFainted() {
    return this.currentHP <= 0;
  }

  // Get HP percentage
  getHPPercentage() {
    return (this.currentHP / this.stats.hp) * 100;
  }

  // Reset for new battle
  resetForBattle() {
    this.currentHP = this.stats.hp;
    this.statusEffects = [];
  }

  // Apply status effect
  applyStatusEffect(effect) {
    this.statusEffects.push(effect);
  }

  // Remove status effect
  removeStatusEffect(effectType) {
    this.statusEffects = this.statusEffects.filter(effect => effect.type !== effectType);
  }
}

module.exports = LLM;
