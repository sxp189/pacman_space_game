// Game canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let score = 0;
let lives = 3;
let gameActive = true;
let mathProblemActive = false;

// Pacman spaceship
const pacman = {
    x: canvas.width / 2,
    y: canvas.height - 100,
    width: 50,
    height: 50,
    speed: 5,
    dx: 0,
    dy: 0,
    image: new Image()
};
pacman.image.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="yellow"/><polygon points="50,50 100,25 100,75" fill="black"/></svg>';

// Enemies
const enemies = [];
const enemySpeed = 2;
const enemySpawnRate = 0.02;

// Bullets
const bullets = [];
const bulletSpeed = 7;

// Power-ups
const powerUps = [];
const powerUpSpawnRate = 0.005;

// Math problem variables
let currentProblem = {};
let bonusPoints = 0;

// Controls
const keys = {};

// Event listeners
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    
    // Spacebar to shoot
    if (e.key === ' ' && gameActive && !mathProblemActive) {
        shootBullet();
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Submit answer button
document.getElementById('submitAnswer').addEventListener('click', checkAnswer);

// Generate a random math problem
function generateMathProblem() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const answer = num1 * num2;
    
    currentProblem = {
        question: `${num1} × ${num2} = ?`,
        answer: answer,
        bonusPoints: num1 * num2 * 10
    };
    
    document.getElementById('question').textContent = currentProblem.question;
    document.getElementById('answer').value = '';
    document.getElementById('mathProblem').style.display = 'block';
    mathProblemActive = true;
}

// Check the player's answer
function checkAnswer() {
    const playerAnswer = parseInt(document.getElementById('answer').value);
    
    if (playerAnswer === currentProblem.answer) {
        score += currentProblem.bonusPoints;
        document.getElementById('score').textContent = score;
    }
    
    document.getElementById('mathProblem').style.display = 'none';
    mathProblemActive = false;
}

// Create an enemy
function createEnemy() {
    const enemy = {
        x: Math.random() * (canvas.width - 30),
        y: -30,
        width: 30,
        height: 30,
        color: 'red'
    };
    enemies.push(enemy);
}

// Create a power-up
function createPowerUp() {
    const powerUp = {
        x: Math.random() * (canvas.width - 20),
        y: -20,
        width: 20,
        height: 20,
        color: 'green'
    };
    powerUps.push(powerUp);
}

// Shoot a bullet
function shootBullet() {
    const bullet = {
        x: pacman.x + pacman.width / 2 - 2.5,
        y: pacman.y,
        width: 5,
        height: 10,
        color: 'yellow'
    };
    bullets.push(bullet);
}

// Update game objects
function update() {
    if (!gameActive || mathProblemActive) return;
    
    // Move Pacman
    if (keys['ArrowLeft'] && pacman.x > 0) {
        pacman.x -= pacman.speed;
    }
    if (keys['ArrowRight'] && pacman.x < canvas.width - pacman.width) {
        pacman.x += pacman.speed;
    }
    if (keys['ArrowUp'] && pacman.y > 0) {
        pacman.y -= pacman.speed;
    }
    if (keys['ArrowDown'] && pacman.y < canvas.height - pacman.height) {
        pacman.y += pacman.speed;
    }
    
    // Move bullets
    bullets.forEach((bullet, index) => {
        bullet.y -= bulletSpeed;
        
        // Remove bullets that go off screen
        if (bullet.y < 0) {
            bullets.splice(index, 1);
        }
    });
    
    // Spawn enemies
    if (Math.random() < enemySpawnRate) {
        createEnemy();
    }
    
    // Move enemies
    enemies.forEach((enemy, index) => {
        enemy.y += enemySpeed;
        
        // Remove enemies that go off screen
        if (enemy.y > canvas.height) {
            enemies.splice(index, 1);
        }
    });
    
    // Spawn power-ups
    if (Math.random() < powerUpSpawnRate) {
        createPowerUp();
    }
    
    // Move power-ups
    powerUps.forEach((powerUp, index) => {
        powerUp.y += enemySpeed;
        
        // Remove power-ups that go off screen
        if (powerUp.y > canvas.height) {
            powerUps.splice(index, 1);
        }
    });
    
    // Check for collisions
    checkCollisions();
}

// Check for collisions between game objects
function checkCollisions() {
    // Check bullet-enemy collisions
    bullets.forEach((bullet, bulletIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
            if (isColliding(bullet, enemy)) {
                // Remove bullet and enemy
                bullets.splice(bulletIndex, 1);
                enemies.splice(enemyIndex, 1);
                
                // Increase score
                score += 10;
                document.getElementById('score').textContent = score;
                
                // Trigger math problem with 10% chance
                if (Math.random() < 0.1) {
                    generateMathProblem();
                }
            }
        });
    });
    
    // Check pacman-enemy collisions
    enemies.forEach((enemy, index) => {
        if (isColliding(pacman, enemy)) {
            // Remove enemy
            enemies.splice(index, 1);
            
            // Decrease lives
            lives--;
            document.getElementById('lives').textContent = lives;
            
            // Check game over
            if (lives <= 0) {
                gameActive = false;
                alert('Game Over! Your score: ' + score);
            }
        }
    });
    
    // Check pacman-powerup collisions
    powerUps.forEach((powerUp, index) => {
        if (isColliding(pacman, powerUp)) {
            // Remove power-up
            powerUps.splice(index, 1);
            
            // Trigger math problem
            generateMathProblem();
        }
    });
}

// Check if two objects are colliding
function isColliding(obj1, obj2) {
    return obj1.x < obj2.x + obj2.width &&
           obj1.x + obj1.width > obj2.x &&
           obj1.y < obj2.y + obj2.height &&
           obj1.y + obj1.height > obj2.y;
}

// Draw game objects
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background (space)
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw stars
    ctx.fillStyle = 'white';
    for (let i = 0; i < 100; i++) {
        ctx.beginPath();
        ctx.arc(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * 2,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }
    
    // Draw Pacman spaceship
    ctx.drawImage(pacman.image, pacman.x, pacman.y, pacman.width, pacman.height);
    
    // Draw bullets
    ctx.fillStyle = 'yellow';
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
    
    // Draw enemies
    ctx.fillStyle = 'red';
    enemies.forEach(enemy => {
        ctx.beginPath();
        ctx.arc(
            enemy.x + enemy.width / 2,
            enemy.y + enemy.height / 2,
            enemy.width / 2,
            0,
            Math.PI * 2
        );
        ctx.fill();
    });
    
    // Draw power-ups
    ctx.fillStyle = 'green';
    powerUps.forEach(powerUp => {
        ctx.beginPath();
        ctx.arc(
            powerUp.x + powerUp.width / 2,
            powerUp.y + powerUp.height / 2,
            powerUp.width / 2,
            0,
            Math.PI * 2
        );
        ctx.fill();
    });
}

// Game loop
function gameLoop() {
    if (gameActive) {
        update();
        draw();
    }
    requestAnimationFrame(gameLoop);
}

// Start the game when the page loads
window.onload = function() {
    // Initialize the game
    document.getElementById('score').textContent = score;
    document.getElementById('lives').textContent = lives;
    
    // Start the game loop
    gameLoop();
};