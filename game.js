// Función para iniciar el juego
document.getElementById("startButton").addEventListener("click", () => {
    document.getElementById("startScreen").style.display = "none";
    gameLoop();
});

// Función para reiniciar el juego
document.getElementById("restartButton").addEventListener("click", () => {
    resetGame();
});

// Función para restablecer el juego después de perder
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
