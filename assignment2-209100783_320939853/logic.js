const playerImageSize = 30;
const bulletImageSizeHeight = 150;
const bulletImageSizeWidth = 30;
const enemyImageSizeHeight = 30;
const enemyImageSizeWidth = 41;
const enemyRowSize = 5;
const enemyColSize = 4;
const playerImageSrc = "resources/player-craft-1-smallest.png.jpg";
const enemyImageSrc = "resources/small-enemy.jpg";
const bulletimgSrc = "resources/laser.png";
var enemyMovmentIntervalSpd;
var enemyInterval = null;
var enemySpaceCraft;
var enemyStepSize = 12;
var playerStepSize = 5;
var playerBorder;
var canvas;
var ctx;
var player;
var playerImage;
var startGameBtn;
var intervalTimer;
var TIME_INTERVAL = 25;
var keysDown = {};
var bullet;
var bulletimg;
var BulletMovmentIntervalSpd;
var MovingBullet= null;
class SpaceCraft {
   constructor(colNumber, rowNumber, speed) {
      this.colNumber = colNumber;
      this.rowNumber = rowNumber;
      this.moveRight = true;
      this.speed = speed;
      this.enemy = new Array(colNumber);
      for (let index = 0; index < this.enemy.length; index++) {
         this.enemy[index] = new Array(rowNumber);
      }
      let lastYPos = 0;
      for (let index = 0; index < this.enemy.length; index++) {
         let element = this.enemy[index];
         let lastXPos = 0;
         for (let enIdx = 0; enIdx < element.length; enIdx++) {
            let enemyP = new Enemy(enemyImageSrc, enemyImageSizeWidth, enemyImageSizeHeight);
            enemyP.x = lastXPos + 20;
            lastXPos += 20 + enemyImageSizeWidth;
            enemyP.y = lastYPos + 20;
            enemyP.rowNumber = index;
            this.enemy[index][enIdx] = enemyP;
         }
         lastYPos += 20 + enemyImageSizeHeight;
      }
   }

   drawSpaceCraft(ctx) {
      for (let index = 0; index < this.enemy.length; index++) {
         let element = this.enemy[index];
         for (let y = 0; y < element.length; y++) {
            let enemyP = element[y];
            if (enemyP.alive) {
               ctx.drawImage(enemyP.image, enemyP.x, enemyP.y);
            }

         }

      }

   }
   getLeftMostBorder() {
      return [this.enemy[0][0].x, this.enemy[0][0].y];
   }
   getRightMostBorder() {
      let enemyShipLastRow = this.enemy[this.enemy.length - 1];
      let enemyShipLastElement = enemyShipLastRow[enemyShipLastRow.length - 1];

      return [enemyShipLastElement.x + enemyImageSizeWidth, enemyShipLastElement.y + enemyImageSizeHeight];
   }
   clearEnemyShip(ctx) {
      // [
      //    [first,e,e,e,e],
      //    [e,e,e,e,e],
      //    [e,e,e,e,last]
      // ]
      let firstEnemyCords = this.getLeftMostBorder();
      let lastEnemyCords = this.getRightMostBorder();

      ctx.clearRect(firstEnemyCords[0], firstEnemyCords[1], lastEnemyCords[0] - firstEnemyCords[0], lastEnemyCords[1] - firstEnemyCords[1]);
   }
   moveEnemiesRight() {
      for (let x = 0; x < this.enemy.length; x++) {
         let element = this.enemy[x];
         for (let y = 0; y < element.length; y++) {
            let enemy = element[y];
            enemy.x += enemyStepSize;

         }
      }
   }
   moveEnemiesLeft() {
      for (let x = 0; x < this.enemy.length; x++) {
         let element = this.enemy[x];
         for (let y = 0; y < element.length; y++) {
            let enemy = element[y];
            enemy.x -= enemyStepSize;

         }
      }
   }
   increaseSpeed() {

   }

   setupEnemy() {
      return 1;
   }

};

class Enemy {
   constructor(imgSrc, imgWidth, imgHeight) {
      this.x = 0;
      this.y = 0;
      this.alive = true;
      this.image = new Image(imgWidth, imgHeight);
      this.image.src = imgSrc;
   }
};

class Player {

   constructor(imagesrc, imgSize, stepSize) {
      this.x;
      this.y;
      this.image = new Image(imgSize, imgSize);
      this.image.src = imagesrc;
      this.hits = 0;
      this.stepSize = stepSize;
      this.score = 0;

   }
   draw(ctx) {
      ctx.drawImage(player.image, player.x, player.y);
   }
   clearAndDrawPlayer(x, y, ctx) {
      ctx.clearRect(x - 20, y - 20, x + playerImageSize, y + playerImageSize);
      ctx.drawImage(player.image, player.x, player.y);
   }
   hitByEnemy() { }

   colisionDetect(obj, objWidth, objHeight) {

   }
}
class Bullet {
   constructor(imagesrc, stepSize) {
      this.x;
      this.y;
      this.image = new Image()
      this.image.src = imagesrc;
      this.stepSize = stepSize;
      this.speed = 30+1;
      this.bulletShot = false;

   }
   draw(ctx) {
      ctx.drawImage(bullet.image, bullet.x, bullet.y-bulletImageSizeHeight-playerImageSize,bulletImageSizeWidth,bulletImageSizeHeight);
   }
   clearAndDrawBullet(x, y, ctx) {
      ctx.clearRect(x, y-bulletImageSizeHeight, bulletImageSizeWidth, bulletImageSizeHeight);
      ctx.drawImage(bullet.image, bullet.x, bullet.y-bulletImageSizeHeight,bulletImageSizeWidth,bulletImageSizeHeight);
   }
}

window.addEventListener('keydown', function (e) {
   keysDown[e.keyCode] = true;
});
window.addEventListener('keyup', function (e) {
   delete keysDown[e.keyCode];
});

function initgame() {

   canvas = document.getElementById("theCanvas");
   ctx = canvas.getContext("2d");
   playerBorder = Math.floor(canvas.height * 0.6)
   if (player == null) {
      player = new Player(playerImageSrc, playerImageSize, playerStepSize);
      console.log("Initialized Player");
   }
   enemySpaceCraft = new SpaceCraft(enemyColSize, enemyRowSize, enemyStepSize);
   bullet = new Bullet(bulletimgSrc, 5);

   startGameBtn = document.getElementById("startButton");
   startGameBtn.addEventListener("click", setUpGame, false);
   console.log("Game Init")
}


function clearCanvas() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function startTimer() {
   intervalTimer = window.setInterval(updatePlayerPosition, TIME_INTERVAL);
   ShootInterval = window.setInterval(ShootDetected, TIME_INTERVAL);
   console.log("Intervals Initiated - startTimer");
} // end function startTimer

// terminate interval timer
function stopTimer() {
   removeEventListener("keydown", function (e) { console.log(e.keyCode); updatePlayerPosition(e.keyCode) }, false);
   window.clearInterval(intervalTimer);
} // end function stopTimer



function setUpGame() {
   stopTimer();
   if (enemyInterval != null) {
      window.clearInterval(enemyInterval);
   }
   clearCanvas();
   console.log("clicked start game");

   player.x = generateRandomNumberInInterval(0, canvas.width - 30);
   player.y = canvas.height - 30
   enemySpaceCraft = new SpaceCraft(enemyColSize, enemyRowSize, enemyStepSize);

   //TODO: SPACESHIPS START FROM LEFT CORNER
   console.log("SetUpgame : Player X:" + player.x);
   console.log("SetUpgame :Player Y:" + player.y);
   console.log("SetUpgame :Player Coordinates reInitialized");
   //Speed
   enemyMovmentIntervalSpd = 60;
   enemyInterval = setInterval(moveEnemeyShip, enemyMovmentIntervalSpd);
   startTimer();
   draw();

}
function drawSpaceCraft() {
   for (let index = 0; index < enemySpaceCraft.enemy.length; index++) {
      let element = enemySpaceCraft.enemy[index];
      for (let y = 0; y < element.length; y++) {
         let enemyP = element[y];
         if(enemyP.alive)
         {ctx.drawImage(enemyP.image, enemyP.x, enemyP.y);}
      }
   }
}


function draw() {
   player.draw(ctx);
   enemySpaceCraft.drawSpaceCraft(ctx);

}
function generateRandomNumberInInterval(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min
}
function ShootDetected() {
   if(bullet.bulletShot==false){
   if ((32 in keysDown)) {
      clearInterval(ShootInterval);
      console.log("Shoot Detected");
      console.log("ShootDetected ! ");
      console.log("ShootDetected : Player_X : "+player.x+" Player_Y:"+player.y);
      bullet.bulletShot = true;
      bullet.x = player.x;
      bullet.y = player.y;
      bullet.draw(ctx);
      BulletMovmentIntervalSpd = 30
      MovingBullet = window.setInterval(MoveBullet,BulletMovmentIntervalSpd);
   }
}
}
function MoveBullet(){
   x_loc = bullet.x;
   y_loc = bullet.y;
   //Bullet Did not cross the Canvas Height
      if (y_loc - bullet.speed >= 0) {
         // console.log("Bullet.y before : " + bullet.y)
         bullet.y = bullet.y-bullet.speed;
         // console.log("Bullet.y after : "+bullet.y)
         bullet.clearAndDrawBullet(x_loc, y_loc, ctx);
         if(BulletCollision())
         {
            bullet.bulletShot = false;
            ctx.clearRect(x_loc, y_loc-bulletImageSizeHeight, bulletImageSizeWidth, bulletImageSizeHeight);
            clearInterval(MovingBullet);
            ShootInterval = window.setInterval(ShootDetected, TIME_INTERVAL);
         }
         //for movement of clearAndDraw
         y_loc = bullet.y+30;
      }
      //Bullet crossed the canvas Height
      else {
         bullet.bulletShot = false;
         clearInterval(MovingBullet);
         ShootInterval = window.setInterval(ShootDetected, TIME_INTERVAL); 
      }
   }

   //While Bullet is moving - check for collision
function BulletCollision()
{
   for (let index = 0; index < enemySpaceCraft.enemy.length; index++) {
      let element = enemySpaceCraft.enemy[index];
      for (let y = 0; y < element.length; y++) {
         let enemyP = element[y];
         if(enemyP.alive)
         {
         if(enemyP.x <= bullet.x+20 && enemyP.x >= bullet.x-20 && enemyP.y <bullet.y+20 && enemyP.y >= bullet.y-20)
         {
            console.log("X Equals");
            console.log("Y Equals");
            enemyP.alive=false;
            return true;
         }
      }
      }
      }
      return false;  
   } 
function updatePlayerPosition() {
   let player_x = player.x;
   let player_y = player.y;
   if ((38 in keysDown)) {
      // arrow up key
      if (player_y - playerStepSize >= playerBorder) {
         player.y -= playerStepSize;
         console.log(playerStepSize);
         player.clearAndDrawPlayer(player_x, player_y, ctx);

      }
   }
   if ((39 in keysDown)) {
      // arrow right key
      if (player_x + playerStepSize <= canvas.width - playerImageSize) {
         player.x += playerStepSize;
         console.log(playerStepSize);
         player.clearAndDrawPlayer(player_x, player_y, ctx);

      }
   }
   if ((40 in keysDown)) {
      // arrow down key
      if (player_y + playerStepSize <= canvas.height - playerImageSize) {
         player.y += playerStepSize;
         console.log(playerStepSize);
         player.clearAndDrawPlayer(player_x, player_y, ctx);
      }
   }
   if ((37 in keysDown)) {
      // arrow left key
      if (player_x - playerStepSize >= 0) {
         player.x -= playerStepSize;
         console.log(playerStepSize);
         player.clearAndDrawPlayer(player_x, player_y, ctx);
      }
   }
   player.clearAndDrawPlayer(player_x, player_y, ctx);
}

function checkCollisionOnRight() {
   let enemyRight = enemySpaceCraft.enemy[0][enemySpaceCraft.enemy[0].length - 1]
   if (enemyRight.x + enemyStepSize + enemyImageSizeWidth > canvas.width) {
      enemySpaceCraft.moveRight = false;
      return false;

   }
   // case the space craft isn't colliding on the right side return true
   return true;

}
function checkCollisionOnLeft() {
   let enemyRight = enemySpaceCraft.enemy[0][0]
   if (enemyRight.x - enemyStepSize < 0) {
      enemySpaceCraft.moveRight = true;
      return false;

   }
   // case the space craft isn't colliding on the left side return true
   return true;

}
function moveEnemeyShip() {
   if (enemySpaceCraft.moveRight) {

      if (checkCollisionOnRight()) {
         // move all enemy x pos right by enemy step size
         enemySpaceCraft.clearEnemyShip(ctx);
         enemySpaceCraft.moveEnemiesRight();
         drawSpaceCraft();
         return true;
      }

   }
   if (!enemySpaceCraft.moveRight) {
      if (checkCollisionOnLeft()) {
         // move all enemy x pos left by enemy step size
         enemySpaceCraft.clearEnemyShip(ctx);
         enemySpaceCraft.moveEnemiesLeft();
         drawSpaceCraft();
      }

   }


}

window.addEventListener("load", initgame, false)
