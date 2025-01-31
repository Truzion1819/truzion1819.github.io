

const audio = document.querySelector('audio.Explode');
const audio2 = document.querySelector('audio.OhNo');

const timerButton = document.getElementById('timerButton');




import player from "./player.js";
import Enemy from "./Enemy.js";
import BulletController from "./BulletController.js";
//import equationIndex from './player.js'
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const button = document.querySelector("button.full");
const timerDisplay = document.getElementById("timer");
export let gameStarted = false;



let isIncorrect = false;
export let equations = ["6+3", "5+5","2+2", "4*2", "12+2", "3*5", "18+5","16+3", 
    "10-3", "7*3", "10 * 3", "29-3","2 * 3", "5 * 5", "21+7",
      "15 *3","59-7", "9+3", "3 * 3", "28 * 2","11 * 4", "28 +3","50-10"];

      console.log("Initial equations:", equations);

let equationIndex = 0;
let timeRemaining = 100; // this is my initial time 
let attempts = 3;
let a = 360;
let b = 0; 
let speed = 2;

button.addEventListener('click', toggleFullscreen);

canvas.width = 800;
canvas.height = 700;

const father = new Image();
father.src  = 'pixelrat1.png';
const baby = new Image(); 
baby.src = 'pixelbabyrat.png';
const heart = new Image();
heart.src = "pixel-heart.webp";

function drawTimer() {
    ctx.font = "50px Arial";
    ctx.fillStyle = 'white';
    if(timeRemaining > 0) {
        ctx.fillText(timeRemaining, 50, 50);
    } else {
        ctx.fillText("Time's Up!", 50, 50);
    }
}
export function updateTimer() {
    if (timeRemaining > 0) {
        gameStarted = true;
        timeRemaining--;
        timerDisplay.textContent = timeRemaining;
        setTimeout(updateTimer, 1000); // Update every second
    }
}

timerButton.addEventListener("click", ()=>{
  drawTimer(); // Initial drawing
})






const bulletController = new BulletController(canvas); 
const Player = new player(
    canvas.width/2.2, 
    canvas.height/1.3, 
    bulletController,
    //equations[2]
);







const enemies = [
    new Enemy (0,230, "rgb(188,74,60)", 9), 
    new Enemy (100,230, "rgb(188,74,60)", 8), 
    new Enemy (200,230, "rgb(188,74,60)", 15), 
    new Enemy (300,230, "rgb(188,74,60)", 4), 
    new Enemy (400,230, "rgb(188,74,60)", 10), 
    new Enemy (500,230, "rgb(188,74,60)", 19), 
    new Enemy (600,230, "rgb(188,74,60)", 23),
    new Enemy (700,230, "rgb(188,74,60)", 14), 

    new Enemy (50,190, "rgb(188,74,60)", 28), 
   new Enemy (150,190, "rgb(188,74,60)", 30), 
  new Enemy (250,190, "rgb(188,74,60)", 7), 
    new Enemy (350,190, "rgb(188,74,60)", 21), 
   new Enemy (450,190, "rgb(188,74,60)", 6), 
   new Enemy (550,190, "rgb(188,74,60)", 25), 
    new Enemy (650,190, "rgb(188,74,60)", 26), 
    
   
    new Enemy (0,150, "rgb(188,74,60)", 52), 
    new Enemy (100,150, "rgb(188,74,60)", 9), 
    new Enemy (200,150, "rgb(188,74,60)", 40), 
    new Enemy (300,150, "rgb(188,74,60)", 56), 
    new Enemy (400,150, "rgb(188,74,60)", 44), 
    new Enemy (500,150, "rgb(188,74,60)", 31), 
    new Enemy (600,150, "rgb(188,74,60)", 12), 
    new Enemy (700,150, "rgb(188,74,60)", 45), 
];

function gameLoop() {
    if (timeRemaining > 0) {
        if(attempts == 0) {
            timeRemaining = 0;
        }
        setCommonStyle();
        ctx.fillStyle = "black";  
        ctx.fillRect (0, 0, canvas.width, canvas.height);
        bulletController.draw(ctx);
        Player.draw(ctx); 
        ctx.drawImage(father,0,400);
        ctx.drawImage(baby,a,b,150,180);
    
        
        ctx.drawImage(heart,600,0,50,50);
        ctx.drawImage(heart,650,0,50,50);
        ctx.drawImage(heart,700,0,50,50);
        console.log(Player, equations)

        enemies.forEach((enemy) => {
            if (!enemy.destroyed && bulletController.collideWith(enemy)) {
                console.log('collide', enemy)
                console.log(enemy.health, eval(Player.equation))

                if(enemy.health == eval(Player.equation)) { //this is the correct enemy
                    enemy.destroy();
                    enemy.takeDamage(1);
                    equationIndex++; 
                    Player.index = equationIndex;
                    Player.equation = equations[equationIndex]; 
                    console.log(Player, equations)
                    //console.log('equal:', enemy.health, eval(Player.equation))
                    const index = enemies.indexOf(enemy);
                    //g = (equationIndex + 1);
                    
                    //equations[2];
                    enemies.splice(index,1);
                    audio.currentTime = 0;
                audio.play();
                image.src="pixelrat1.png"
                    return;
                } else { //incorrect
                    isIncorrect = true;
                    attempts -= 1;
                    setTimeout(() => {
                        isIncorrect = false;
                    }, 1000);
                }
                
            } else {
            enemy.draw(ctx);
            if(isIncorrect){
                ctx.fillStyle = 'white';
                ctx.font = "25px Arial"
                ctx.fillText ('incorrect', 10, 550);
                audio2.currentTime = 0;
                audio2.play();
                father.src="pixelrat2.png";
            }
            }

            if (equations.length == 0){
                b += speed;

                if (b + baby.width > canvas.width || b < 0) {
                speed = -speed;
                }
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle="black";
                ctx.fillRect (0, 0, canvas.width, canvas.height);
        
                ctx.font = "100px A"
                ctx.fillStyle = "red";
                ctx.fillText ('YOU WIN', 100, 300);}

                //// i dotn want you win to immeditely show up but it does th
        });
        drawTimer()
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle="black";
        ctx.fillRect (0, 0, canvas.width, canvas.height);

      
        ctx.font = "100px A"
        ctx.fillStyle = "red";
        ctx.fillText ('GAME OVER', 100, 300);
    }
    if(attempts == 2){
        ctx.fillStyle="black";
        ctx.fillRect(600,0,50,50);
    }
    if(attempts == 1){
        ctx.fillStyle="black";
        ctx.fillRect(600,0,50,50);
        ctx.fillStyle="black";
        ctx.fillRect(650,0,50,50);
    }
    

    
}

function setCommonStyle() {
    ctx.shadowColor="#d53";
    ctx.shadowBlur = 20;
    ctx.lineJoin ="bevel";
    ctx.lineWidth = 5;
}
setInterval(gameLoop, 1000 / 60);

function toggleFullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        canvas.requestFullscreen();
    }
}





 // ask teacher why my img elements arent showing up when i put canvas into full screen 
 // do i have to add the images in full screen by 