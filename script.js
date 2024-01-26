const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth - 27;
canvas.height = window.innerHeight - 27;

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

const frog = {
    x: canvas.width * .5,
    y: canvas.height * .87,
    radius: 20,
    color: 'green',
}

const baseWidth = canvas.width;
const baseHeight = canvas.height / 5;
const baseX = 0;
const baseY = canvas.height * .8;

const obstacles = [];
const obstacles2 = [];
const obstacles3 = [];
const logs = [];
const logs2 = [];
const obstacleWidth = 150;
const obstacleHeight = 75;
const logWidth = 300;
const logHeight = 75;
const horizontalSpeed = 5;
const logSpeed = 3;
const maxInterval = 1500;
const minInterval = 1500;

let lives = 3;
let isGameOver = false;



function drawFrog() {
    // Body
    ctx.fillStyle = frog.color;
    ctx.beginPath();
    ctx.ellipse(frog.x, frog.y, 20, 30, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    // Eyes
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(frog.x - 8, frog.y - 10, 6, 0, Math.PI * 2);
    ctx.arc(frog.x + 8, frog.y - 10, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    // Pupils
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(frog.x - 8, frog.y - 10, 2, 0, Math.PI * 2);
    ctx.arc(frog.x + 8, frog.y - 10, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    // Hind Legs
    ctx.fillStyle = frog.color;
    ctx.beginPath();
    ctx.ellipse(frog.x - 10, frog.y + 20, 10, 20, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.ellipse(frog.x + 10, frog.y + 20, 10, 20, -Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    // Front Legs
    ctx.beginPath();
    ctx.ellipse(frog.x - 15, frog.y + 15, 8, 16, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.ellipse(frog.x + 15, frog.y + 15, 8, 16, -Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

function drawBase() {
    ctx.fillStyle = 'grey';
    ctx.fillRect(baseX, baseY, baseWidth, baseHeight)
    const borderWidth = 5;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = borderWidth;
    ctx.strokeRect(baseX, baseY, baseWidth, baseHeight);
}

function spawnObstacle() {
    const newObstacle = {
        x: canvas.width,
        y: canvas.height * .68,
        width: obstacleWidth,
        height: obstacleHeight
    };
    obstacles.push(newObstacle);
    setTimeout(spawnObstacle, Math.random() * (maxInterval - minInterval) + minInterval)
}

spawnObstacle()

function spawnObstacle2() {
    const newObstacle2 = {
        x: canvas.width,
        y: canvas.height * .7 - 210,
        width: obstacleWidth,
        height: obstacleHeight,
    };
    obstacles2.push(newObstacle2);
    setTimeout(spawnObstacle2, Math.random() * ((maxInterval * .8) - minInterval) + minInterval)
}

spawnObstacle2()

function spawnObstacle3() {
    const newObstacle3 = {
        x: canvas.width,
        y: canvas.height * .7 - 400,
        width: obstacleWidth,
        height: obstacleHeight,
    };
    obstacles3.push(newObstacle3);
    setTimeout(spawnObstacle3, Math.random() * ((maxInterval * .8) - minInterval) + minInterval)
}

spawnObstacle3()

function spawnLogs(){
    const newLogs = {
        x: canvas.width,
        y: canvas.height * .7 - 620,
        width: logWidth,
        height: logHeight,
    };
    logs.push(newLogs);
    setTimeout(spawnLogs, Math.random() * ((maxInterval * .8) - minInterval) + minInterval)
}

spawnLogs()

function spawnLogs2(){
    const newLogs2 = {
        x: canvas.width,
        y: canvas.height * .7 - 750,
        width: logWidth,
        height: logHeight,
    };
    logs.push(newLogs2);
    setTimeout(spawnLogs2, Math.random() * ((maxInterval * .8) - minInterval) + minInterval)
}

spawnLogs2()

function drawObstacles() {
    obstacles.forEach(obstacle => {
        ctx.fillStyle = 'red';
        ctx.fillRect(obstacle.x, obstacle.y, obstacleWidth, obstacleHeight);
    });
    obstacles2.forEach(obstacle => {
        ctx.fillStyle = 'blue';
        ctx.fillRect(obstacle.x, obstacle.y, obstacleWidth * 1.4, obstacleHeight);
    });
    obstacles3.forEach(obstacle => {
        ctx.fillStyle = 'purple';
        ctx.fillRect(obstacle.x, obstacle.y, obstacleWidth * 1.8, obstacleHeight);
    });
}
function drawLogs() {
    logs.forEach(log => {
        ctx.fillStyle = 'brown';
        ctx.fillRect(log.x, log.y, logWidth, logHeight);
    });
    logs2.forEach(log => {
        ctx.fillStyle = 'brown';
        ctx.fillRect(log.x, log.y, logWidth * 1.4, obstacleHeight);
    });
}

function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= horizontalSpeed;
        if (obstacles[i].x + obstacleWidth < 0) {
            obstacles.splice(i, 1);
        }
    }
    for (let i = obstacles2.length - 1; i >= 0; i--) {
        obstacles2[i].x -= horizontalSpeed * 1.2;
        if (obstacles2[i].x + obstacleWidth * 1.4 < 0) {
            obstacles2.splice(i, 1);
        }
    }
    for (let i = obstacles3.length - 1; i >= 0; i--) {
        obstacles3[i].x -= horizontalSpeed * 1.5;
        if (obstacles3[i].x + obstacleWidth * 1.8 < 0) {
            obstacles3.splice(i, 1);
        }
    }
}
function updateLogs() {
    for (let i = logs.length - 1; i >= 0; i--) {
        logs[i].x -= horizontalSpeed;
        if (logs[i].x + logWidth < 0) {
            logs.splice(i, 1);
        }
    }
    for (let i = logs2.length - 1; i >= 0; i--) {
        logs2[i].x -= horizontalSpeed * 1.2;
        if (logs2[i].x + logWidth * 1.4 < 0) {
            logs2.splice(i, 1);
        }
    }
}

function checkCollision() {
    obstacles.forEach(obstacle => {
        if (frog.x < obstacle.x + obstacle.width &&
            frog.x + frog.radius * 2 > obstacle.x + 15 &&
            frog.y - 26 < obstacle.y + obstacle.height &&
            frog.y + frog.radius * 2 > obstacle.y) {
            handleCollision();
        }
    });
    obstacles2.forEach(obstacle => {
        if (frog.x < obstacle.x + obstacle.width &&
            frog.x + frog.radius * 2 > obstacle.x + 15 &&
            frog.y - 26 < obstacle.y + obstacle.height &&
            frog.y + frog.radius * 2 > obstacle.y) {
            handleCollision();
        }
    });
    obstacles3.forEach(obstacle => {
        if (frog.x < obstacle.x + obstacle.width &&
            frog.x + frog.radius * 2 > obstacle.x + 15 &&
            frog.y - 26 < obstacle.y + obstacle.height &&
            frog.y + frog.radius * 2 > obstacle.y) {
            handleCollision();
        }
    });
}

function handleCollision() {
    frog.x = canvas.width * .5
    frog.y = canvas.height * .87
    lives--
}

function drawLives() {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Lives: ' + lives, 20, 30);
}

function gameOver() {
    if (lives === 0) {
        isGameOver = true
    }
}

function drawGameOver() {
    ctx.font = '48px Arial';
    ctx.fillStyle = 'red';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over. Press Enter To Try Again.', canvas.width / 2, canvas.height / 2);
}

function resetGame() {
    frog.x = canvas.width * .5;
    frog.y = canvas.height * .87;
    isGameOver = false;
    lives = 3;
    obstacles.length = 0;
    obstacles2.length = 0;
    obstacles3.length = 0;
    requestAnimationFrame(draw);
}

function drawRoad() {
    const roadTop = canvas.height * .7 - 410;
    const roadBottom = canvas.height * .8 + obstacleHeight;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, roadTop, canvas.width, roadBottom - roadTop);

    const dottedLineSections = 3;
    const laneMarkingWidth = canvas.width;
    const laneMarkingHeight = 5;
    const spaceBetweenObstacles = 150

    ctx.fillStyle = 'yellow';
    for (let i = 0; i < dottedLineSections; i++) {
        let y = roadTop + i * spaceBetweenObstacles;
        drawDottedLine(0, y, laneMarkingWidth, laneMarkingHeight);
    }
}

function drawDottedLine(startX, startY, lineWidth, lineHeight) {
    const segmentLength = 20;
    const segmentSpace = 10;
    for (let x = startX; x < lineWidth; x += segmentLength + segmentSpace) {
        ctx.fillRect(x, startY, segmentLength, lineHeight);
    }
}
function drawSand() {
    const sandTop = canvas.height / 3.9; 
    const roadTop = canvas.height * .7 - 410; 

    const sandGradient = ctx.createLinearGradient(0, sandTop, 0, roadTop);
    sandGradient.addColorStop(0, '#f2d16b'); 
    sandGradient.addColorStop(1, '#e0c080'); 

    ctx.fillStyle = sandGradient;
    ctx.fillRect(0, sandTop, canvas.width, roadTop - sandTop);
}

function drawOcean() {
    const oceanHeight = canvas.height / 3.9;
    const oceanGradient = ctx.createLinearGradient(0, 0, 0, oceanHeight);
    oceanGradient.addColorStop(0, 'deepskyblue');
    oceanGradient.addColorStop(1, 'dodgerblue');
    ctx.fillStyle = oceanGradient;
    ctx.fillRect(0, 0, canvas.width, oceanHeight);
}

function drawGrass() {
    const grassTop = 0;
    const grassBottom = canvas.height * .7 - 755;
    ctx.fillStyle = '#0f9d58';
    ctx.fillRect(0, grassTop, canvas.width, grassBottom - grassTop);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRoad();
    drawSand();
    drawOcean();
    drawGrass();
    gameOver()
    if (isGameOver) {
        drawGameOver();
        return;
    }
    drawBase();
    drawLogs();
    drawFrog();
    if (rightPressed) {
        frog.x = Math.min(frog.x + 20, canvas.width - 30)
    } else if (leftPressed) {
        if (frog.x - 37 > 0) {
            frog.x = Math.max(frog.x - 20, 0)
        }
    } else if (upPressed) {
        if (frog.y - 50 > 0) {
            frog.y = Math.min(frog.y - 15, canvas.height - 100)
        }
    } else if (downPressed) {
        frog.y = Math.min(frog.y + 15, canvas.height - 45)
    }
    updateObstacles();
    drawObstacles();
    checkCollision();
    updateLogs();
    drawLives();
    requestAnimationFrame(draw);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    } else if (e.key === "Up" || e.key === "ArrowUp") {
        upPressed = true;
    } else if (e.key === "Down" || e.key === "ArrowDown") {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if (isGameOver && e.key === "Enter") {
        resetGame();
        requestAnimationFrame(draw); // Restart the game loop
    }
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    } else if (e.key === "Up" || e.key === "ArrowUp") {
        upPressed = false;
    } else if (e.key === "Down" || e.key === "ArrowDown") {
        downPressed = false;
    }
}

draw()