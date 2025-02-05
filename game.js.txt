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

// Configuración del canvas
canvas.width = 800;
canvas.height = 600;

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
        obstacles[i].y += 3;
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

// Función para manejar los controles del jugador
function movePlayer(event) {
    if (event.key === "ArrowLeft" && playerX > 0) {
        playerX -= playerSpeed;
    }
    if (event.key === "ArrowRight" && playerX < canvas.width - playerWidth) {
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
            alert("¡Juego Terminado! Tu puntuación es: " + score);
            resetGame();
        }
    }
}

// Función para reiniciar el juego
function resetGame() {
    playerX = canvas.width / 2 - playerWidth / 2;
    playerY = canvas.height - playerHeight - 10;
    obstacles = [];
    score = 0;
}

// Función de animación principal
function gameLoop() {
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

// Evento de teclas para mover al jugador
window.addEventListener("keydown", movePlayer);

// Comenzar el juego
gameLoop();
