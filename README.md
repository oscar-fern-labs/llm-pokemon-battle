# LLM Pokemon Battle - A Pixel Art Parody Game

## Game Concept
A pixel art Pokemon battle parody featuring major Large Language Models (LLMs) as Pokemon-like creatures, each with unique stats, types, and abilities based on their real-world characteristics.

## Featured LLMs (Pokemon)

### Major LLMs:
1. **Claude** (Anthropic) - Type: Reasoning/Helpful
   - Stats: High Intelligence, Moderate Speed, Good Defense
   - Signature Move: "Constitutional Analysis" (reduces opponent's attack accuracy)
   - Special: "Harmless Response" (immunity to toxic attacks)

2. **ChatGPT** (OpenAI) - Type: Conversational/Creative  
   - Stats: Balanced all-around, High Popularity
   - Signature Move: "Creative Burst" (random powerful attack)
   - Special: "Token Limit" (attacks get weaker over time)

3. **Gemini** (Google) - Type: Multimodal/Search
   - Stats: High Speed, Moderate Attack, Excellent Special Attack
   - Signature Move: "Search Integration" (gains knowledge mid-battle)
   - Special: "Multimodal Vision" (can see through illusions)

4. **Grok** (X/Twitter) - Type: Edgy/Humor
   - Stats: High Attack, Low Defense, Unpredictable
   - Signature Move: "Sarcastic Roast" (deals emotional damage)
   - Special: "Rebellious" (ignores some status effects)

### Niche/Open Source LLMs:
5. **Llama** (Meta) - Type: Open Source/Community
   - Stats: Growing Power, High HP, Community Support
   - Signature Move: "Open Source Spirit" (gets stronger with allies)
   - Special: "Fine-tuning" (can learn new moves mid-battle)

6. **Mistral** - Type: European/Efficient
   - Stats: High Efficiency, Moderate All Stats
   - Signature Move: "Mixture of Experts" (changes type mid-battle)
   - Special: "Efficient Processing" (uses less energy per move)

7. **Claude-Instant** - Type: Speed/Budget
   - Stats: Very High Speed, Lower Power
   - Signature Move: "Quick Response" (always goes first)
   - Special: "Cost Effective" (can use moves multiple times)

8. **PaLM/Bard** (Google Legacy) - Type: Retired/Nostalgic
   - Stats: Unbalanced, Unpredictable
   - Signature Move: "Legacy Code" (sometimes fails spectacularly)
   - Special: "Deprecated" (randomly switches with Gemini)

## Game Features
- Turn-based battle system
- Pixel art graphics (Game Boy/GBA style)
- 8-bit chiptune music
- Type effectiveness system based on LLM characteristics
- Special abilities unique to each LLM
- Battle animations with retro effects
- Multiple battle backgrounds

## Technical Architecture

### Backend (Node.js + Express)
- RESTful API for game state management
- Neon PostgreSQL database for battle logs and stats
- Battle logic engine
- Real-time battle state updates

### Frontend (React + Tailwind v3)
- Pixel art UI components
- Battle screen with animations
- Sound effects and background music
- Responsive design for different screen sizes

### Database Schema
- LLMs table (stats, types, moves)
- Battles table (battle history)
- Moves table (attack details, animations)
- Battle_logs table (turn-by-turn records)

## Development Phases
1. Backend development with battle logic
2. Frontend development with pixel art UI  
3. Integration and testing
4. Deployment and external exposure
5. GitHub repository creation and artefact registration
