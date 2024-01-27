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
const obstacleHeight = 70;
const logWidth = 300;
const logHeight = 110;
const horizontalSpeed = 5;
const logSpeed = 3;
const maxInterval = 1500;
const minInterval = 1500;
const oceanTop = 0;
const oceanBottom = canvas.height / 4.22;
const grassTop = 0;
const grassBottom = canvas.height * .7 - 755;
let safe = false;
let livesX = 20;
let isWinning = false;
let frogWallpaper = new Image ();
frogWallpaper.src = '4Yxe9lM-funny-3d-wallpaper.jpg'
let logImage = new Image();
logImage.src = 'log.png';
let grassImage = new Image();
grassImage.src = 'river_bank.png';
let oceanImage = new Image();
oceanImage.src = 'background.png';
let frogImage = new Image();
frogImage.src = 'frog.png'
let sandImage = new Image();
sandImage.src = 'sand.jpg'
let baseImage = new Image ();
baseImage.src = 'base.png';
let backgroundMusic = document.getElementById('backgroundMusic');
backgroundMusic.play();

let lives = 3;
let isGameOver = false;


function drawFrog() {
    let frogWidth = 80; 
    let frogHeight = 80; 
    let frogDrawX = frog.x - frogWidth / 2;
    let frogDrawY = frog.y - frogHeight / 2;
    ctx.drawImage(frogImage, frogDrawX, frogDrawY, frogWidth, frogHeight);
}

function drawBase() {
    const increasedBaseHeight = canvas.height / 1.1;
    const newBaseY = canvas.height - increasedBaseHeight; 
    ctx.drawImage(baseImage, baseX, newBaseY, baseWidth, increasedBaseHeight);
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

function spawnLogs() {
    const newLogs = {
        x: canvas.width,
        y: canvas.height * .7 - 630,
        width: logWidth,
        height: logHeight,
    };
    logs.push(newLogs);
    setTimeout(spawnLogs, Math.random() * ((maxInterval * .8) - minInterval) + minInterval)
}

spawnLogs()

function spawnLogs2() {
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
        // // Car body
        ctx.fillStyle = 'red'; 
        ctx.fillRect(obstacle.x, obstacle.y, obstacleWidth, obstacleHeight);

        // Wheels
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(obstacle.x + 20, obstacle.y + obstacleHeight, 10, 0, Math.PI * 2);
        ctx.arc(obstacle.x + obstacleWidth - 20, obstacle.y + obstacleHeight, 10, 0, Math.PI * 2);
        ctx.fill();

        // Windows
        ctx.fillStyle = 'lightgrey';
        ctx.fillRect(obstacle.x + 20, obstacle.y + 10, 50, 30);
        ctx.fillRect(obstacle.x + obstacleWidth - 70, obstacle.y + 10, 50, 30);
    });

    obstacles2.forEach(obstacle => {
        // Car body
        ctx.fillStyle = 'blue'; 
        ctx.fillRect(obstacle.x, obstacle.y, obstacleWidth * 1.4, obstacleHeight);

        // Wheels
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(obstacle.x + 20, obstacle.y + obstacleHeight, 10, 0, Math.PI * 2);
        ctx.arc(obstacle.x + obstacleWidth * 1.4 - 20, obstacle.y + obstacleHeight, 10, 0, Math.PI * 2);
        ctx.fill();

        // Windows
        ctx.fillStyle = 'lightgrey';
        ctx.fillRect(obstacle.x + 30, obstacle.y + 10, 60, 30);
        ctx.fillRect(obstacle.x + obstacleWidth * 1.4 - 90, obstacle.y + 10, 60, 30);
    });

    obstacles3.forEach(obstacle => {
        // Car body
        ctx.fillStyle = 'purple'; 
        ctx.fillRect(obstacle.x, obstacle.y, obstacleWidth * 1.8, obstacleHeight);

        // Wheels
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(obstacle.x + 30, obstacle.y + obstacleHeight, 12, 0, Math.PI * 2);
        ctx.arc(obstacle.x + obstacleWidth * 1.8 - 30, obstacle.y + obstacleHeight, 12, 0, Math.PI * 2);
        ctx.fill();

        // Windows
        ctx.fillStyle = 'lightgrey';
        ctx.fillRect(obstacle.x + 40, obstacle.y + 10, 70, 30);
        ctx.fillRect(obstacle.x + obstacleWidth * 1.8 - 110, obstacle.y + 10, 70, 30);
    });
}
function drawLogs() {
    logs.forEach(log => {
        ctx.drawImage(logImage, log.x, log.y, logWidth, logHeight);
    });
    logs2.forEach(log => {
        ctx.drawImage(logImage, log.x, log.y, logWidth * 1.4, logHeight);
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
        logs2[i].x -= horizontalSpeed;
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

function collision(first, second){
    return !(first.x > second.x + second.width ||
        first.x + first.width < second.x ||
        first.y > second.y + second.height ||
        first.y + first.height < second.y)
}

function checkForOceanLanding() {
    if (frog.y - frog.radius < oceanBottom * .83 && frog.y - frog.radius/2 > grassBottom) {
        console.log('You are above water');
        safe = false;
 
        let frogBoundingBox = {
            x: frog.x - frog.radius,
            y: frog.y - frog.radius,
            width: frog.radius * 2,
            height: frog.radius * 2
        };
 
        let allLogs = logs.concat(logs2);
        for (let log of allLogs) {
            let logBoundingBox = {
                x: log.x,
                y: log.y,
                width: log.width,
                height: log.height + 25
            };
 
            if (collision(frogBoundingBox, logBoundingBox)) {
                frog.x -= logSpeed; 
                safe = true;
                console.log('safe');
                if (frog.x - frog.radius < 0) {
                    handleCollision();
                }
                break; 
            }
        }
 
        if (!safe) {
            console.log('not safe');
            handleCollision();
        }
    }
}
function handleCollision() {
    console.log("oh no")
    frog.x = canvas.width * .5
    frog.y = canvas.height * .87
    lives--
}

function drawLives() {
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)"; 
    ctx.fillRect(0, 0, 100, 50);
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Lives: ' + lives, livesX, 30);
}

function checkIfFrogOnGrass() {
    if (frog.y - frog.radius + 20 > grassTop && frog.y + frog.radius*2.5 < grassBottom) {
        handleWin();
    }
}

function drawWinMessage() {
    ctx.drawImage(frogWallpaper, 0, 0, canvas.width, canvas.height);
    ctx.font = '48px Arial';
    ctx.fillStyle = 'green';
    ctx.textAlign = 'center';
    ctx.fillText('You Win!', canvas.width / 2, canvas.height / 4);
    ctx.font = '24px Arial';
    ctx.fillText('Press Enter to play again', canvas.width / 2, canvas.height / 4 + 50);
}

function handleWin() {
    backgroundMusic.pause();
    let winningMusic = document.getElementById('winningMusic');
    winningMusic.play();
    setTimeout(() => {
        isWinning = true;
        draw();
    }, 4000);
    horizontalSpeed = 5;
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
    backgroundMusic.pause();
    let losingMusic = document.getElementById('losingMusic');
    losingMusic.play()
}

function resetGame() {
    isWinning = false;
    frog.x = canvas.width * .5;
    frog.y = canvas.height * .87;
    isGameOver = false;
    lives = 3;
    livesX = 50;
    obstacles.length = 0;
    obstacles2.length = 0;
    obstacles3.length = 0;
    horizontalSpeed = 5;

    let winningMusic = document.getElementById('winningMusic');
    winningMusic.pause();
    winningMusic.currentTime = 0;

    let losingMusic = document.getElementById('losingMusic');
    if (losingMusic) {
        losingMusic.pause();
        losingMusic.currentTime = 0;
    }

    if (backgroundMusic.paused) {
        backgroundMusic.currentTime = 0;
        backgroundMusic.play();
    }

    requestAnimationFrame(draw);
}

function drawRoad() {
    const roadTop = canvas.height * .7 - 410;
    const roadBottom = canvas.height * .8 + obstacleHeight;
    ctx.fillStyle = 'grey';
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
    ctx.drawImage(sandImage, 0, sandTop, canvas.width, roadTop - sandTop);
}

function drawOcean() {
    const oceanHeight = canvas.height / 1.6;
    ctx.drawImage(oceanImage, 0, 0, canvas.width, oceanHeight);
}

function drawGrass() {
    const grassTop = 0;
    const grassBottom = canvas.height * .5
    ctx.fillStyle = '#0f9d58';
    ctx.drawImage(grassImage, 0, grassTop, canvas.width, grassBottom - grassTop);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawRoad();
        drawSand();
        drawOcean();
        drawGrass();
        drawBase();
        if (isGameOver) {
            drawGameOver();
        } else if (isWinning) {
            drawWinMessage();
        } else {
        drawLogs();
        drawFrog();
        if (rightPressed) {
            frog.x = Math.min(frog.x + 20, canvas.width - 30);
        } else if (leftPressed) {
            frog.x = Math.max(frog.x - 20, 0);
        } else if (upPressed) {
            frog.y = Math.max(frog.y - 15, 0);
        } else if (downPressed) {
            frog.y = Math.min(frog.y + 15, canvas.height - 45);
        }
        checkForOceanLanding();
        updateObstacles();
        drawObstacles();
        checkCollision();
        checkIfFrogOnGrass();
        updateLogs();
        drawLives();
        gameOver();
    }

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
        let losingMusic = document.getElementById('losingMusic');
        if (losingMusic) {
            losingMusic.pause();
            losingMusic.currentTime = 0;
        }    
        winningMusic.currentTime = 0;
        backgroundMusic.currentTime=0;
        backgroundMusic.play();
        resetGame();
        requestAnimationFrame(draw); 
    }
    if (isWinning && e.key === "Enter") {
        let winningMusic = document.getElementById('winningMusic');
        winningMusic.pause();
        winningMusic.currentTime = 0;
        backgroundMusic.currentTime=0;
        backgroundMusic.play();
        resetGame();
        requestAnimationFrame(draw)
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