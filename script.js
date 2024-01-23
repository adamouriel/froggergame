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
const baseY = canvas.height *.8;

const obstacles = [];
const obstacleWidth = 50;
const obstacleGap = 150;
const obstacleInterval = 500;


function drawFrog(){
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

function drawBase(){
ctx.fillStyle = 'grey';
ctx.fillRect(baseX, baseY, baseWidth, baseHeight)
const borderWidth = 5; 
ctx.strokeStyle = 'black'; 
ctx.lineWidth = borderWidth; 
ctx.strokeRect(baseX, baseY, baseWidth, baseHeight);
}

function drawObstacles() {
    obstacles.forEach(obstacle => {
        ctx.fillStyle = 'red';
        ctx.fillRect(obstacle.x, 0, obstacleWidth, obstacle.top);
        ctx.fillRect(obstacle.x, canvas.height - obstacle.bottom, obstacleWidth, obstacle.bottom);
    });
}

function updateObstacles() {
    if (obstacles.length === 0 || obstacles[obstacles.length - 1].x < canvas.width - obstacleInterval) {
        let top = Math.floor(Math.random() * (canvas.width - obstacleGap));
        let bottom = canvas.width - top - obstacleGap;
        obstacles.push({y: canvas.height, top, bottom});
    }
    
    obstacles.forEach(obstacle => obstacle.x -= 2);

    if (obstacles.length > 0 && obstacles[0].x < -obstacleWidth) {
        obstacles.shift();
    }
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBase();
    drawFrog();
    if (rightPressed){
        frog.x = Math.min(frog.x + 20, canvas.width - 30)
    } else if (leftPressed){
        if (frog.x - 37 > 0){
        frog.x = Math.max(frog.x - 20, 0)}
    } else if (upPressed){
        if (frog.y-50 > 0){
        frog.y = Math.min(frog.y - 20, canvas.height - 100)}
    } else if (downPressed){
        frog.y = Math.min(frog.y + 20, canvas.height - 45)
    }
    updateObstacles();
    drawObstacles();
    requestAnimationFrame(draw);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight"){
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft"){
        leftPressed = true;
    } else if (e.key === "Up" || e.key === "ArrowUp") {
        upPressed = true;
    } else if (e.key === "Down" || e.key === "ArrowDown") {
        downPressed = true;
    }
}

function keyUpHandler(e){
    if (e.key === "Right" || e.key === "ArrowRight"){
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft"){
        leftPressed = false
    } else if (e.key === "Up" || e.key === "ArrowUp") {
        upPressed = false;
    } else if (e.key === "Down" || e.key === "ArrowDown") {
        downPressed = false;
    }
}

draw()