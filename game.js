// Variables del juego
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const playerWidth = 50;
const playerHeight = 50;
const playerSpeed = 5;
let playerX = canvas.width / 2 - playerWidth / 2;
let playerY = canvas.height - playerHeight - 10;
let obstacles = [];
let score = 0;
let gameOver = false;
let difficulty = 3; // Velocidad inicial de los obstáculos

// Configuración del canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Función para dibujar el jugador
function drawPlayer() {
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
}

// Función para dibujar los obstáculos
function drawObstacles() {
    ctx.fillStyle = "#FF0000";
    for (let i = 0; i < obstacles.length; i++) {
        const obs = obstacles[i];
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    }
}

// Función para mover los obstáculos
function moveObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].y += difficulty;
        if (obstacles[i].y > canvas.height) {
            obstacles.splice(i, 1);
            score += 10;
        }
    }
}

// Función para generar nuevos obstáculos
function createObstacle() {
    const width = Math.random() * 50 + 30;
    const x = Math.random() * (canvas.width - width);
    obstacles.push({x, y: -50, width, height: 20});
}

// Función para manejar los controles del jugador con el teclado
function movePlayerKeyboard(event) {
    if (event.key === "ArrowLeft" && playerX > 0) {
        playerX -= playerSpeed;
    }
    if (event.key === "ArrowRight" && playerX < canvas.width - playerWidth) {
        playerX += playerSpeed;
    }
}

// Función para manejar los controles del jugador con el tacto
function movePlayerTouch(event) {
    const touchX = event.changedTouches[0].clientX;
    if (touchX < canvas.width / 2 && playerX > 0) {
        playerX -= playerSpeed;
    } else if (touchX > canvas.width / 2 && playerX < canvas.width - playerWidth) {
        playerX += playerSpeed;
    }
}

// Función para verificar colisiones
function checkCollisions() {
    for (let i = 0; i < obstacles.length; i++) {
        if (playerX < obstacles[i].x + obstacles[i].width &&
            playerX + playerWidth > obstacles[i].x &&
            playerY < obstacles[i].y + obstacles[i].height &&
            playerY + playerHeight > obstacles[i].y) {
            gameOver = true;
            document.getElementById("finalScore").textContent = score;
            document.getElementById("startScreen").style.display = "none";
            document.getElementById("endScreen").style.display = "flex";
            return;
        }
    }
}

// Función para reiniciar el juego
function resetGame() {
    playerX = canvas.width / 2 - playerWidth / 2;
    playerY = canvas.height - playerHeight - 10;
    obstacles = [];
    score = 0;
    difficulty = 3;
    gameOver = false;
    document.getElementById("endScreen").style.display = "none";
    document.getElementById("startScreen").style.display = "flex";
}

// Función de animación principal
function gameLoop() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawObstacles();
    moveObstacles();
    checkCollisions();

    // Mostrar la puntuación
    ctx.fillStyle = "#FFF";
    ctx.font = "20px Arial";
    ctx.fillText("Puntuación: " + score, 10, 30);

    if (Math.random() < 0.02) createObstacle();  // Crear obstáculos aleatorios

    requestAnimationFrame(gameLoop);
}

// Eventos de teclas y botones
document.getElementById("startButton").addEventListener("click", () => {
    document.getElementById("startScreen").style.display = "none";
    gameLoop();
});

document.getElementById("restartButton").addEventListener("click", () => {
    resetGame();
});

// Detectar el toque en dispositivos móviles
canvas.addEventListener("touchstart", movePlayerTouch, false);
canvas.addEventListener("touchmove", movePlayerTouch, false);

// Detectar las teclas para jugar en dispositivos de escritorio
window.addEventListener("keydown", movePlayerKeyboard);

// Ajustar el tamaño del canvas al redimensionar la pantalla
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

