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
    y: 700,
    radius: 20,
    color: 'green',
}

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

const baseWidth = canvas.width;
const baseHeight = canvas.height / 5;
const baseX = 0;
const baseY = canvas.height *.8;

ctx.fillStyle = 'grey';
ctx.fillRect(baseX, baseY, baseWidth, baseHeight)
const borderWidth = 5; 
ctx.strokeStyle = 'black'; 
ctx.lineWidth = borderWidth; 
ctx.strokeRect(baseX, baseY, baseWidth, baseHeight);

drawFrog()

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || "ArrowRight"){
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft"){
        leftPressed = true;
    }
}

function keyUpHandler(e){
    if (e.key === "Right" || "ArrowRight"){
        rightPressed = "false";
    }
}