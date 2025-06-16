# Pacman Space Adventure: A Math-Learning Space Blaster Game

Pacman Space Adventure is an interactive browser-based game that combines classic arcade shooting mechanics with educational math challenges. Players control a Pacman-themed spaceship, shooting down enemy ships while collecting power-ups that trigger math problems, making learning fun and engaging.

The game features smooth controls and responsive gameplay, with players navigating their spaceship through a star-filled space environment. As players destroy enemy ships, they earn points and occasionally face math multiplication challenges that offer bonus points for correct answers. The game balances arcade action with educational content, making it suitable for both entertainment and learning purposes.

## Repository Structure
```
.
├── game.js         # Core game logic including player controls, enemy spawning, and math problems
├── index.html      # Main entry point and game UI structure
└── style.css       # Game styling and visual presentation
```

## Usage Instructions
### Prerequisites
- Modern web browser with HTML5 Canvas support
- JavaScript enabled
- Minimum screen resolution of 800x600 pixels

### Installation
1. Clone the repository or download the files:
```bash
git clone [repository-url]
```

2. Navigate to the project directory:
```bash
cd pacman-space-adventure
```

3. Open index.html in a web browser:
- **MacOS/Linux**:
```bash
open index.html    # MacOS
xdg-open index.html    # Linux
```
- **Windows**: Double-click index.html or drag it into your browser

### Quick Start
1. Open the game in your browser
2. Use arrow keys to move the spaceship
3. Press spacebar to shoot at enemy ships
4. Collect green power-ups to trigger math problems
5. Solve math problems correctly to earn bonus points

### More Detailed Examples
**Basic Movement and Shooting**
```javascript
// Use arrow keys for movement
ArrowUp    - Move up
ArrowDown  - Move down
ArrowLeft  - Move left
ArrowRight - Move right

// Press spacebar to shoot
Spacebar   - Fire bullets
```

**Scoring System**
- Destroying enemy ships: 10 points
- Math problem bonus: Points = number1 × number2 × 10

### Troubleshooting
**Game Not Responding**
- Ensure JavaScript is enabled in your browser
- Check if the browser supports HTML5 Canvas
- Try refreshing the page
- Clear browser cache and reload

**Performance Issues**
- Close other browser tabs and applications
- Check browser console (F12) for error messages
- Reduce browser extensions
- Ensure hardware acceleration is enabled in browser settings

## Data Flow
The game operates on a continuous loop that handles player input, updates game state, and renders the display.

```ascii
[Player Input] -> [Game State Update] -> [Collision Detection] -> [Score Update] -> [Render Display]
      ↑                                                                                  |
      |                                                                                 |
      └─────────────────────────────── [Game Loop] ──────────────────────────────────┘
```

Key Component Interactions:
1. Player input triggers spaceship movement and bullet firing
2. Game loop continuously updates enemy and power-up positions
3. Collision detection system checks for hits between:
   - Bullets and enemies
   - Player and enemies
   - Player and power-ups
4. Math problem system activates on power-up collection
5. Score system updates based on destroyed enemies and solved math problems
6. Rendering system draws all game objects on the canvas
7. Lives system monitors player health and game over conditions