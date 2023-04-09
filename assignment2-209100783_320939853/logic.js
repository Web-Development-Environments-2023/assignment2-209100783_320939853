const playerImageSize = 30;
const bulletImageSizeHeight = 100;
const bulletImageSizeWidth = 15;
const enemyImageSizeHeight = 30;
const enemyImageSizeWidth = 41;
const enemyBulletImageSizeHeight = 100;
const enemyBulletImageSizewidth = 15;
const enemyRowSize = 5;
const enemyColSize = 4;
const playerImageSrc = "resources/player-craft-1-smallest.png.jpg";
const enemyImageSrc = "resources/small-enemy.jpg";
const bulletimgSrc = "resources/laser.png";
const enemyBulletimgsrc = "resources/bullet_bad.png";
const bulletCollisionIntervalSpeed = 0.25;
var bulletCollisionInterval;
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

var EnemyBulletFirst;
var EnemyBulletSecond;
var MovingFirstEnemyBullet;
var MovingSecondEnemyBullet;
var EnemyBulletFirstCollision;
var EnemyBulletSecondCollision;
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

   constructor() {
      this.x;
      this.startx;
      this.y;
      this.image = new Image(playerImageSize, playerImageSize);
      this.image.src = playerImageSrc;
      this.hits = 0;
      this.stepSize = playerStepSize;
      this.score = 0;
      this.username;

   }
   draw(ctx) {
      ctx.drawImage(player.image, player.x, player.y);
   }
   clearAndDrawPlayer(x, y, ctx) {
      ctx.clearRect(x - 20, y - 20, x + playerImageSize, y + playerImageSize);
      ctx.drawImage(player.image, player.x, player.y);
   }
   clear(ctx)
   {
      ctx.clearRect(this.x, this.y, playerImageSize, playerImageSize);
   }
   hitByEnemy() { }

   colisionDetect(obj, objWidth, objHeight) {

   }
}
//TODO : rearrange code 
class Bullet {
   constructor(imagesrc, stepSize) {
      this.x;
      this.y;
      this.image = new Image()
      this.image.src = imagesrc;
      this.stepSize = stepSize;
      this.speed = 15;
      this.bulletShot = false;

   }
   draw(ctx) {
      ctx.drawImage(bullet.image, bullet.x, bullet.y-playerImageSize,bulletImageSizeWidth,bulletImageSizeHeight);
   }
   clearAndDrawBullet(x, y, ctx) {
      ctx.clearRect(x, y, bulletImageSizeWidth, bulletImageSizeHeight);
      this.draw(ctx);
   }
   clear(ctx){
      ctx.clearRect(this.x, this.y, bulletImageSizeWidth, bulletImageSizeHeight);
   }
}
class EnemyBullet{
   constructor(imagesrc)
   {
      this.x;
      this.y;
      this.image = new Image();
      this.image.src = imagesrc;
      this.speed = 15;
      this.alive = false;
   }
   draw(ctx)
   {
      ctx.drawImage(this.image,this.x, this.y, enemyBulletImageSizewidth,enemyBulletImageSizeHeight);
   }
   clearAndDrawEnemyBullet(x, y, ctx)
   {
      ctx.clearRect(x, y, enemyBulletImageSizewidth,enemyBulletImageSizeHeight);
      this.draw(ctx);
   }
   clear(ctx){
      ctx.clearRect(this.x, this.y, bulletImageSizeWidth, bulletImageSizeHeight);
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
  
   enemySpaceCraft = new SpaceCraft(enemyColSize, enemyRowSize, enemyStepSize);
   bullet = new Bullet(bulletimgSrc, 5);

   //Initialize Enemy Bullets
   EnemyBulletFirst = new EnemyBullet(enemyBulletimgsrc);
   EnemyBulletSecond = new EnemyBullet(enemyBulletimgsrc);
   EnemyBulletMovementIntervalSpd = 30;

   startGameBtn = document.getElementById("startButton");
   startGameBtn.addEventListener("click", setUpGame, false);

   // init Lead Bord with event 
   dispatchEvent(new Event("getusertable"));
   console.log("Game Init")
   document.getElementById("logoutbtn").addEventListener("click",logoutgame,false);

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
   player.startx = player.x;
   player.y = canvas.height - 30;
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
         console.log("ShootDetected : Player_X : "+player.x+" Player_Y:"+player.y);
         bullet.bulletShot = true;
         bullet.x = player.x;
         bullet.y = player.y - bulletImageSizeHeight;
         bullet.draw(ctx);
         BulletMovmentIntervalSpd = 30;
         MovingBullet = window.setInterval(MoveBulletPlayer,BulletMovmentIntervalSpd);
         bulletCollisionInterval = window.setInterval(BulletCollision,bulletCollisionIntervalSpeed);
      }
   }
}
function GenerateRandomSpaceShipinInterval()
{
   row = Math.floor(Math.random() * enemyRowSize);
   col = Math.floor(Math.random() * enemyColSize);
   return [col,row];
}
function RandomSpaceShip()
{
   let arr = GenerateRandomSpaceShipinInterval();
   col = arr[0];
   row = arr[1];
   let RandEnemyShip = enemySpaceCraft.enemy[col][row];
   //IF EnemyShip is Dead => It cant shoot.
   while(RandEnemyShip.alive == false)
   {
      arr = GenerateRandomSpaceShipinInterval();
      col = arr[0];
      row = arr[1];
      RandEnemyShip = enemySpaceCraft.enemy[col][row];
   }
   return RandEnemyShip;
}
//Conditions for Shooting EnemyBulletFirst
function FirstBulletConditions()
{
   if(EnemyBulletFirst.alive == false && (EnemyBulletSecond.alive==false || (EnemyBulletSecond.alive && EnemyBulletSecond.y + enemyBulletImageSizeHeight>= 0.75*canvas.height)))
   {
      return true;
   }
   return false;
}
//Conditions for Shooting EnemyBulletSecond
function SecondBulletConditions()
{
   if(EnemyBulletFirst.alive == true && EnemyBulletSecond.alive == false)
   {
      if(EnemyBulletFirst.y + enemyBulletImageSizeHeight >= 0.75*canvas.height)
      {
         return true;
      }
   }
   return false;
}
function ShootEnemiesBullets(){
   if(FirstBulletConditions())
   {
      let RandEnemyShip = RandomSpaceShip();
      EnemyBulletFirst.x = RandEnemyShip.x;
      EnemyBulletFirst.y = RandEnemyShip.y;
      EnemyBulletFirst.alive = true;
      EnemyBulletFirst.draw(ctx);
      MovingFirstEnemyBullet = window.setInterval(MoveEnemyFirstBullet,EnemyBulletMovementIntervalSpd);
      console.log("Shooting Bullet#1");
      EnemyBulletFirstCollision = window.setInterval(CollisionEnemyBulletFirst, EnemyBulletMovementIntervalSpd);
   }
   if(SecondBulletConditions())
   {  
         let RandEnemyShip2 = RandomSpaceShip();
         EnemyBulletSecond.x = RandEnemyShip2.x;
         EnemyBulletSecond.y = RandEnemyShip2.y;
         EnemyBulletSecond.alive = true;
         EnemyBulletSecond.draw(ctx);
         MovingSecondEnemyBullet = window.setInterval(MoveEnemySecondBullet,EnemyBulletMovementIntervalSpd);
         console.log("Shooting Bullet#2");
         EnemyBulletSecondCollision = window.setInterval(CollisionEnemyBulletSecond, EnemyBulletMovementIntervalSpd);
   }
}
function MoveEnemyFirstBullet()
{
   x_loc = EnemyBulletFirst.x;
   y_loc = EnemyBulletFirst.y;
   if(y_loc + EnemyBulletFirst.speed <= canvas.height)
   {
      EnemyBulletFirst.y = EnemyBulletFirst.y + EnemyBulletFirst.speed;
      EnemyBulletFirst.clearAndDrawEnemyBullet(x_loc, y_loc, ctx);
   }
   else
   {
      clearInterval(MovingFirstEnemyBullet);
      EnemyBulletFirst.alive = false;
   }
}
function MoveEnemySecondBullet()
{
   x_loc = EnemyBulletSecond.x;
   y_loc = EnemyBulletSecond.y;
   if(y_loc + EnemyBulletSecond.speed <= canvas.height)
   {
      EnemyBulletSecond.y = EnemyBulletSecond.y + EnemyBulletSecond.speed;
      EnemyBulletSecond.clearAndDrawEnemyBullet(x_loc, y_loc, ctx);
   }
   else
   {
      clearInterval(MovingSecondEnemyBullet);
      EnemyBulletSecond.alive = false;
   }
}
function EnemyCollisionConditions(enemyBullet)
{
   if((enemyBullet.x >= player.x - 5)&& (enemyBullet.x + enemyBulletImageSizewidth <= player.x + playerImageSize + 5) && ( enemyBullet.y + enemyBulletImageSizeHeight <= player.y +playerImageSize) && (enemyBullet.y + enemyBulletImageSizeHeight >= player.y -5))
   {return true;}
   return false;
}
function CollisionEnemyBulletFirst(){
   if(EnemyCollisionConditions(EnemyBulletFirst))
   {
      console.log("HIT! By First");
      PlayerHit();
   }
}
function CollisionEnemyBulletSecond(){
   if(EnemyCollisionConditions(EnemyBulletSecond))
   {
      console.log("HIT! By Second");
      PlayerHit();
   }
}
function BulletCollision()
{
   for (let index = 0; index < enemySpaceCraft.enemy.length; index++) {
      let element = enemySpaceCraft.enemy[index];
      for (let y = 0; y < element.length; y++) {
         let enemyP = element[y];
         if(enemyP.alive && CheckLowerEnemiesDead(index,y))
         {
            if((enemyP.x - 5 <= bullet.x) && (enemyP.x + enemyImageSizeWidth + 5 >= bullet.x + bulletImageSizeWidth) && (enemyP.y + enemyImageSizeHeight >= bullet.y) && (enemyP.y <= bullet.y))
            {
               enemyP.alive=false;
               stopBulletInterval();
               return true;
            }
         }
      }
   }
   return false;  
} 
function MoveBulletPlayer(){
   x_loc = bullet.x;
   y_loc = bullet.y;
   if (y_loc - bullet.speed > 0) {
      bullet.y = bullet.y-bullet.speed;   
         bullet.clearAndDrawBullet(x_loc, y_loc, ctx);
      }
      else {
         stopBulletInterval(MovingBullet);
      }
   }
   function stopBulletInterval(){
      clearInterval(bulletCollisionInterval);
      clearInterval(MovingBullet);
      ShootInterval = window.setInterval(ShootDetected, TIME_INTERVAL);
      bullet.bulletShot = false;
      bullet.clear(ctx);
      ctx.clearRect(0,0,canvas.width, 20);

}
function CheckLowerEnemiesDead(index, enIndex)
{
   let enemyCraft = enemySpaceCraft.enemy;
   for(let y = index+1; y <enemyCraft.length;y++)
   {
      if(enemyCraft[y][enIndex].alive)
      {
         return false;
      }
   }
   return true;
}

function PlayerHit()
{
   EnemyBulletSecond.alive = false;
   EnemyBulletSecond.clear(ctx);
   EnemyBulletFirst.alive = false;
   EnemyBulletFirst.clear(ctx);
   player.clear(ctx);
   player.x = player.startx;
   player.y = player.y = canvas.height - 30;
   //Clear All Shooting Intervals
   clearInterval(MovingFirstEnemyBullet);
   clearInterval(EnemyBulletFirstCollision);
   clearInterval(MovingSecondEnemyBullet);
   clearInterval(EnemyBulletSecondCollision);

   //TODO : Add Stats
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
   //Start Enemies Bullets Shooting
   ShootEnemiesBullets();
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
/* ------------------------------- */

function registerUser(userTable,username){
   // this function is called when a new user is register and return the new HashMap {username : player}
   let tempPlayer = new Player();
   tempPlayer.username = username;
   userTable.set(username,tempPlayer)
   return userTable;

}


function verifiedUser(obj){
   //obj.usertable = userPlayerTable, obj.username = username
   //  this function is called only when a user gained access to the game with right user name and password
   // that means that he is already registered and exsits in the userTable hashmap
   // this function initialize the game and the leadbord
   let userPlayerTable = obj.usertable;
   let username = obj.username;
   player = userPlayerTable.get(username);
   initgame();
}







function updatePlayerScore(amount){
   player.score += amount;
   let score = document.getElementById("score_"+player.username);
   score.innerText = player.score;

}




function createUserTableRow(val,key,map){
   
   let table = document.getElementById("scoreBordTable");
   if (document.getElementById(val.username) == null){
      let tr = document.createElement("tr");
      tr.id = val.username;
      let tdPlayer = document.createElement("td");
      let tdScore = document.createElement("td");
      tdPlayer.id = "user_"+val.username
      tdScore.id = "score_"+val.username


      tdPlayer.innerText = val.username;
      tdScore.innerText = val.score;
      tr.appendChild(tdPlayer);
      tr.appendChild(tdScore);
      table.appendChild(tr);
   }


}
function getPlayersTable(){
	// $.getScript("front-end.js", function(){
 	// 	 return getPlayersTable();
	// });
}

function createLeadBord(usertable_out){
   
   let userTable = usertable_out;
   userTable.forEach(createUserTableRow);

}

function initAdminPlayer(username){
   // this function only invoke when the game first started;
   let ply = new Player();
   ply.username = username;
   window.removeEventListener("defaultUsr",function(e){},false);
   dispatchEvent(new CustomEvent("returnplayer",{detail:ply}))
}

// window.addEventListener("load", initgame, false)
window.addEventListener("defaultUsr",function(e){
   initAdminPlayer(e.detail)
},false);

// this is event handler when a user has benn verified
window.addEventListener("verifeduser",function(e){
   verifiedUser(e.detail);
},false);

window.addEventListener("usertable",function(e){
   createLeadBord(e.detail);

})
function logoutgame(){
   savePlayerStats();
   stopTimer();
   clearCanvas();
   document.getElementById("gamePage").style.display = "none";
   document.getElementById("welcomePage").style.display = "grid";

}
function savePlayerStats(){
   //TODO implement this
}

