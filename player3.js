let equationIndex = 0;
import { updateTimer, gameStarted, equations } from "./index3.js";

  export default class player{  
 
constructor(x,y, bulletController, equation) {
   this.x = x;
    this.y = y;
    this.bulletController = bulletController;
    this.width = 50;
   this.height = 50;
    this.speed = 4;
    this.index = 0;
   this.equation = equations[this.index]
  
   //establishing this.equation makes the equation inside the square 
   //capable of being changed 
  

    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);
}
 
draw(ctx){
    this.move(); 

    const canon = new Image();
    canon.src = "newCanon.PNG";


   

    ctx.strokeStyle='yellow';
   ctx.strokeRect(this.x, this.y, this.width, this.height);
   ctx.fillStyle='black';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = 'white';
       ctx.font = "25px Arial"
       ctx.fillText (this.equation, this.x, this.y+20);
            
      

    this.shoot();
}

shoot(){
   if(this.shootPressed){
      console.log("shoot");
      if(!gameStarted){
         updateTimer()
      }
      const speed = 5;
      const delay = 7;
      let damage = 1;
      const bulletX = this.x + this.width/2;
      const bulletY = this.y;
     this.bulletController.shoot(bulletX, bulletY, speed, damage, delay);
   }
}

move() {
    if (this.downPressed) {
      this.y += this.speed;
    } 
    if (this.upPressed) {
      this.y -= this.speed;
    }
    if (this.leftPressed) {
      this.x -= this.speed;
    }
    if (this.rightPressed) {
      this.x += this.speed;
    }
   }
  








keydown =(e) => {
     if (e.code === "ArrowUp"){
        this.upPressed = true;
     }
     if (e.code === "ArrowDown"){
        this.downPressed = true;
     }
     if (e.code === "ArrowLeft"){
        this.leftPressed = true;
     }
     if (e.code === "ArrowRight"){
        this.rightPressed = true;
     } 
     if (e.code === "Space"){
      this.shootPressed = true;
     }
    };

keyup =(e) => {
    if (e.code === "ArrowUp"){
       this.upPressed = false;
    }
    if (e.code === "ArrowDown"){
       this.downPressed = false;
    }
    if (e.code === "ArrowLeft"){
       this.leftPressed = false;
    }
    if (e.code === "ArrowRight"){
       this.rightPressed = false;
    } 
    if (e.code === "Space") {
      this.shootPressed = false;
    }
    };
} 