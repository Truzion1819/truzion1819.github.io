
const audio = document.querySelector('audio.Explode');
const audio2 = document.querySelector('audio.OhNo');
const audio3 = document.querySelector('audio.trainNoise');
const audio5 = document.querySelector('audio.smash');
const timerButton = document.getElementById('timerButton');






import player from "./player3.js";
import Enemy from "./Enemy3.js";
import BulletController from "./BulletController3.js";
//import equationIndex from './player.js'
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const button = document.querySelector("button.full");

const timerDisplay = document.getElementById("timer");
export let gameStarted = false;



let isIncorrect = false;
export let equations = ["25", 
    "36", "81", "4", "16", "49","169","225", 
    "400","900", "64", "625","1","441", "196"
    ];
  
      console.log("Initial equations:", equations);

let equationIndex = 0;
let timeRemaining = 50; // this is my initial time 
let attempts = 3;
let a = 360;
let b = 0; 
let speed = 2;
let offseta = 360;
let offsetb = 0;
let offsetc = 20;
let offsetd = 440;
let offsete = 360;
let offsetf = 0;



button.addEventListener('click', toggleFullscreen);

canvas.width = 800;
canvas.height = 700;

const imageurls = ['train1.png','train2.png','train3.png','train4.png',
    'train5.png','train6.png','train7.png','train8.png',
     'train9.png','train10.png','train11.png','train12.png','train13.png' ];

let solutions= [5,6,9,2,4,7,13,15]
let solutions2= [20,30,8,25,1,21,14]

const images = [];
const train = new Image();
train.src = 'bettertrain.png';
const father = new Image()
father.src  = 'pixelrat1.png';
const baby = new Image(); 
baby.src = 'pixelbabyrat.png';
const heart = new Image();
heart.src = "pixel-heart.webp";
//let j = Math.floor(Math.random() * solutions.length);

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

//function shuffleArray(solutions){
  // for let = arrayToShuffle.length-1;
 
//}

function shuffleArray(solutions) {

   for (let i = solutions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [solutions[i], solutions[j]] = [solutions[j], solutions[i]];
    }
   //solutions = [9,8,15,4,10,19,23,14]
}

shuffleArray(solutions)
shuffleArray(solutions2)


console.log(solutions)
const enemies = [
    new Enemy (0,230, "rgb(188,74,60)", solutions[1]), 
    new Enemy (100,230, "rgb(188,74,60)", solutions[2]), 
    new Enemy (200,230, "rgb(188,74,60)", solutions[3]), 
    new Enemy (300,230, "rgb(188,74,60)", solutions[4]), 
    new Enemy (400,230, "rgb(188,74,60)", solutions[5]), 
    new Enemy (500,230, "rgb(188,74,60)", solutions[6]), 
    new Enemy (600,230, "rgb(188,74,60)", solutions[7]),
    new Enemy (700,230, "rgb(188,74,60)", solutions[0]), 

    new Enemy (50,190, "rgb(188,74,60)", solutions2[1]), 
    new Enemy (150,190, "rgb(188,74,60)", solutions2[2]), 
    new Enemy (250,190, "rgb(188,74,60)", solutions2[3]), 
    new Enemy (350,190, "rgb(188,74,60)", solutions2[4]), 
    new Enemy (450,190, "rgb(188,74,60)", solutions2[5]), 
    new Enemy (550,190, "rgb(188,74,60)", solutions2[6]), 
    new Enemy (650,190, "rgb(188,74,60)", solutions2[0]), 

  
    new Enemy (800,800, "rgb(0, 0, 0)", ),
];


//window.onload = () => {
   // swapEnemyHealth();
//}// this is gonna initaiate swap once my game ia relaoded 
function gameLoop() {
    if (timeRemaining > 0) {
        if(attempts == 0) {
            timeRemaining = 0;
        }
      
        setCommonStyle();
        ctx.fillStyle = "black";  
        ctx.fillRect (0, 0, canvas.width, canvas.height);
        ctx.drawImage(train,0,280)
        bulletController.draw(ctx);
        Player.draw(ctx); 
        ctx.drawImage(father,20,440);
        ctx.drawImage(baby,a,b,150,180);
        ctx.drawImage(heart,600,0,50,50);
        ctx.drawImage(heart,650,0,50,50);
        ctx.drawImage(heart,700,0,50,50);
       ctx.font = "20px A"
        ctx.fillStyle = "red";
        ctx.fillText ('find the square root of player', 40, 100);

  
        //console.log(Player, equations)


        enemies.forEach((enemy) => {
            if (!enemy.destroyed && bulletController.collideWith(enemy)) {
                //console.log('collide', enemy)
                //console.log(enemy.health, eval(Player.equation));

                if(enemy.health == Math.sqrt(Player.equation)) { //this is the correct enemy
                    enemy.destroy();
                    enemy.takeDamage(1);
                    equationIndex++; 
                    Player.index = equationIndex;
                    Player.equation = equations[equationIndex]; 
                    //console.log(Player, equations)
                    //console.log('equal:', enemy.health, eval(Player.equation))
                    const index = enemies.indexOf(enemy);
                    //g = (equationIndex + 1);
                    father.src= "pixelrat1.png";
                    //equations[2];
                    enemies.splice(index,1);
                    audio.currentTime = 0;
                audio.play();
                audio5.currentTime = 0;
                audio5.play();
               
                    return;
                } else { //incorrect
                    isIncorrect = true;
                    attempts -= 1;
                    audio3.currentTime = 0;
                audio3.play();
                audio2.currentTime = 0;
                audio2.play();
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
                father.src="pixelrat2.png";
                
                offseta = 0.95* 360;
                offsetb =  Math.random() * 2
                ctx.drawImage(baby, offseta, offsetb, 150, 180)
                offsetc = Math.random() * 20;
                offsetd =  0.95 * 440;
                ctx.drawImage (father, offsetc, offsetd);
                
                
            }
            }
            let buttonCreated = false;
            function createNewButton() {
                if (!buttonCreated) {
                    const levelbutton = document.createElement('button');
                    levelbutton.textContent = 'New Level';
                    levelbutton.addEventListener('click', () => {
                        alert('Button clicked!');
                   
                    });
                    document.body.appendChild(levelbutton); }}
          
            if (equationIndex >= equations.length){
                b += speed;

                if (b + baby.width > canvas.width || b < 0) {
                 speed = -speed; 
                   if (b >= 500) {
                    baby.src = "happyfamily.png";
                   }
                }
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle="black";
                ctx.fillRect (0, 0, canvas.width, canvas.height);
                ctx.drawImage(baby,a,b,150,180);

               ctx.font = "100px A"
                ctx.fillStyle = "red";
                ctx.fillText ('YOU WIN', 100, 300);}
                buttonCreated = true; 
                createNewButton();

               
        });
        drawTimer()
    } else {
        if (!gameOverAnimationRunning) {
            gameOverAnimationRunning = true;
            frameIndex = 0; // Reset animation index
            animateTrain(); // Start animation
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle="rgb(0,0,26)";
        ctx.fillRect (0, 0, canvas.width, canvas.height);

 
        offseta = 0.95* 360;
        offsetb =  Math.random() * 2
        ctx.drawImage(baby, offseta, offsetb, 150, 180)
      
        ctx.shadowColor="black";
        ctx.drawImage(train,0,280); /// instead of drawing train here i want to do the image url animation 
        ctx.font = "100px A"
        ctx.fillStyle = "red";
        ctx.fillText ('GAME OVER', 100, 300);
        father.src="pixelrat3.png";       
        ctx.drawImage (father,offsetc,offsetd);

    }
    if(attempts == 2){
        ctx.shadowColor="black";
        ctx.fillStyle="black";
        ctx.fillRect(600,0,50,50);
        ctx.drawimage (father,offsetc,offsetd)
        father.src="pixelrat3.png"; 
    
        
    }
    if(attempts == 1){
        ctx.shadowColor="black";
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
let frameIndex = 0; // Track the current frame
let gameOverAnimationRunning = false;

function animateTrain() {
    if (frameIndex < imageurls.length) {
        train.src = 'train-sequence/' + imageurls[frameIndex];
        frameIndex++;
        setTimeout(animateTrain, 100); // Change image every 100ms
    }

}


 // ask teacher why my img elements arent showing up when i put canvas into full screen 
 // do i have to add the images in full screen by 