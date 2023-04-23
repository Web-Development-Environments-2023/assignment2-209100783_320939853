const playerImageSize = 30;
const bulletImageSizeHeight = 100;
const bulletImageSizeWidth = 15;
const enemyImageSizeHeight = 50;
const enemyImageSizeWidth = 50;
const enemyBulletImageSizeHeight = 100;
const enemyBulletImageSizewidth = 15;
const enemyRowSize = 5;
const enemyColSize = 4;
// const playerImageSrc = "resources/player-craft-1-smallest.png.jpg";
const playerImageSrc = "resources/ppp_new.png";
const enemyImageSrc = "resources/Enemy_GIF.gif";
const bulletimgSrc = "resources/laser.png";
const enemyBulletimgsrc = "resources/bullet_bad.png";
const bulletCollisionIntervalSpeed = 0.25;
//Intervals
var bulletCollisionInterval;
var enemyMovmentIntervalSpd;
var enemyInterval;
var MovingFirstEnemyBullet;
var MovingSecondEnemyBullet;
var EnemyBulletFirstCollision;
var EnemyBulletSecondCollision;
var ShootInterval;
//
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
//For Life Images
var FirstLife;
var SecondLife;
var ThirdLife;
//Timer
var now;
var timeLeft;
var minutesLeft;
var secondsLeft;
var TimerInterval;
var countDownDate;
var Four_Seconds_For_Increasing;
var IncreaseLimit;
//Game Score Bar
var gscorebar;

// Music
var enemyhitmusic
var playerhitmusic

var UserTable;
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
               ctx.drawImage(enemyP.image, enemyP.x, enemyP.y, enemyImageSizeWidth, enemyImageSizeHeight);
            }
         }

      }

   }
   clearEnemyShip(ctx) {
      ctx.clearRect(0,0,canvas.width,300);
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
      this.image.style.animationPlayState = 'running';
      this.image.src = imgSrc;
      this.width = enemyImageSizeWidth;
      this.height = enemyImageSizeHeight;
   }
};

class Player {

   constructor() {
      this.x;
      this.startx;
      this.y;
      this.image = new Image(playerImageSize, playerImageSize);
      this.image.src = playerImageSrc;
      this.width = playerImageSize;
      this.height = playerImageSize;
      this.hits = 0;
      this.stepSize = playerStepSize;
      this.score = 0;
      this.CurrGameScore = 0;
      this.username;
      this.lazerSoud = document.getElementById("shootingUser");

      // TODO DELETE THIS WHEN FINISH
      this.playerGames = [];
      this.stopLazer();

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
   playLazer(){
      this.lazerSoud.play();
   }
   stopLazer(){
      this.lazerSoud.pause();
      this.lazerSoud.currentTime = 0;
   }
}
//TODO : rearrange code 
class Bullet {
   constructor(imagesrc, stepSize) {
      this.x_start;
      this.y_start;
      this.x_end;
      this.y_end;
      this.image = new Image()
      this.image.src = imagesrc;
      this.stepSize = stepSize;
      this.speed = 15;
      this.bulletShot = false;

   }
   draw(ctx) {
      ctx.drawImage(bullet.image, bullet.x_start, bullet.y_start-playerImageSize,bulletImageSizeWidth,bulletImageSizeHeight);
   }
   clearAndDrawBullet(x, y, ctx) {
      ctx.clearRect(x, y, bulletImageSizeWidth, bulletImageSizeHeight);
      this.draw(ctx);
   }
   clear(ctx){
      ctx.clearRect(this.x_start, this.y_start, bulletImageSizeWidth, bulletImageSizeHeight);
   }
}
class EnemyBullet{
   constructor(imagesrc)
   {
      this.x_start;
      this.y_start;
      this.y_end;
      this.x_end;
      this.image = new Image();
      this.image.src = imagesrc;
      this.speed = 15;
      this.alive = false;
   }
   draw(ctx)
   {
      ctx.drawImage(this.image,this.x_start, this.y_start, enemyBulletImageSizewidth,enemyBulletImageSizeHeight);
   }
   clearAndDrawEnemyBullet(x, y, ctx)
   {
      ctx.clearRect(x, y, enemyBulletImageSizewidth,enemyBulletImageSizeHeight);
      this.draw(ctx);
   }
   clear(ctx){
      ctx.clearRect(this.x_start, this.y_start, bulletImageSizeWidth, bulletImageSizeHeight);
   }

}
function initgame() {
   // TODO reset all fields ( Life , Player Score Current)
   canvas = document.getElementById("theCanvas");
   ctx = canvas.getContext("2d");
   
   playerBorder = Math.floor(canvas.height * 0.6)
  
   enemySpaceCraft = new SpaceCraft(enemyColSize, enemyRowSize, enemyStepSize);
   bullet = new Bullet(bulletimgSrc, 5);

   console.log("Init Game");
   console.log("player Total Game Score  : " + player.score);
   //Init Life Images
   FirstLife=document.getElementById('FirstLifeIMG');
   SecondLife=document.getElementById('SecondLifeIMG');
   ThirdLife=document.getElementById('ThirdLifeIMG');
   //Init game score bar
   gscorebar = document.getElementById('CurrentGameScore');
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

   document.getElementById("comtinueafterloose").addEventListener("click",goBackToGame,false);
   enemyhitmusic =  document.getElementById("enemyhitmusic");
   playerhitmusic = document.getElementById("playerhitmusic");
   
}


function clearCanvas() {
   if (ctx != null){
      ctx.clearRect(0, 0, canvas.width, canvas.height);}
}


function StartIntervals() {
   window.addEventListener('keydown', function (e) {
      keysDown[e.keyCode] = true;
   });
   window.addEventListener('keyup', function (e) {
      delete keysDown[e.keyCode];
   });
   intervalTimer = window.setInterval(updatePlayerPosition, TIME_INTERVAL);
   ShootInterval = window.setInterval(ShootDetected, TIME_INTERVAL);
   enemyInterval = window.setInterval(moveEnemeyShip, enemyMovmentIntervalSpd);
} // end function startTimer

// terminate interval timer
function StopIntervals() {
   removeEventListener('keydown', function (e) { keysDown[e.keyCode] = true; }, false);
   removeEventListener('keyup', function (e) {delete keysDown[e.keyCode];});
   keysDown={};
   if (intervalTimer != null) {
      window.clearInterval(intervalTimer);
   }
   if (ShootInterval != null) {
      window.clearInterval(ShootInterval);
   }
   if (enemyInterval != null) {
      window.clearInterval(enemyInterval);
   }
   if(MovingFirstEnemyBullet != null)
   {clearInterval(MovingFirstEnemyBullet);}

   if(EnemyBulletFirstCollision != null)
   {clearInterval(EnemyBulletFirstCollision);}

   if(MovingSecondEnemyBullet != null)
   {clearInterval(MovingSecondEnemyBullet);}

   if(EnemyBulletSecondCollision != null)
   {clearInterval(EnemyBulletSecondCollision);}

   if(TimerInterval != null)
   {clearInterval(TimerInterval);}
} // end function stopTimer
function VisibleLifeImages()
{
   FirstLife.style.visibility="visible";
   SecondLife.style.visibility="visible";
   ThirdLife.style.visibility="visible";
}
function hiddenLifeImages()
{
   FirstLife.style.visibility="hidden";
   SecondLife.style.visibility="hidden";
   ThirdLife.style.visibility="hidden";
}
function setUpGame() {
   stopMusic();
   VisibleLifeImages();
   StopIntervals();    
   TimerOn();     
   clearCanvas();
   startMusic();
   canvas.width = $("#gameCanvas").width();
   canvas.height = $("#gameCanvas").height() -5;
   console.log("clicked start game");
   // canvas.focus();
   startGameBtn.blur();   
   player.x = generateRandomNumberInInterval(0, canvas.width - 30);
   player.startx = player.x;
   player.y = canvas.height - playerImageSize;
   enemySpaceCraft = new SpaceCraft(enemyColSize, enemyRowSize, enemyStepSize);

   EnemyBulletFirst.alive = false;
   EnemyBulletSecond.alive = false;
   player.CurrGameScore = 0;
   gscorebar.innerText = player.CurrGameScore;
   player.hits = 0;

   //Speed
   enemyMovmentIntervalSpd = 60;
   StartIntervals();
   draw();
   
}
function drawSpaceCraft() {
   for (let index = 0; index < enemySpaceCraft.enemy.length; index++) {
      let element = enemySpaceCraft.enemy[index];
      for (let y = 0; y < element.length; y++) {
         let enemyP = element[y];
         if(enemyP.alive)
         {ctx.drawImage(enemyP.image, enemyP.x, enemyP.y,enemyImageSizeWidth,enemyImageSizeHeight);}
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
      if ((ShootingKeyCode in keysDown)) {
         player.playLazer();
         window.clearInterval(ShootInterval);
         console.log("Shoot Detected");
         bullet.bulletShot = true;
         bullet.x_start = player.x;
         bullet.y_start = player.y - bulletImageSizeHeight;
         bullet.x_end = bullet.x_start + bulletImageSizeWidth;
         bullet.y_end = bullet.y_start + bulletImageSizeHeight;
         bullet.draw(ctx);
         BulletMovmentIntervalSpd = 30;
         MovingBullet = window.setInterval(MoveBulletPlayer,BulletMovmentIntervalSpd);
         bulletCollisionInterval = window.setInterval(BulletCollision,bulletCollisionIntervalSpeed);
         // setTimeout(() => {
         //    player.stopLazer();
         // }, 500);
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
   if(EnemyBulletFirst.alive == false && (EnemyBulletSecond.alive==false || (EnemyBulletSecond.alive && EnemyBulletSecond.y_start + enemyBulletImageSizeHeight>= 0.75*canvas.height)))
   {return true;}
   return false;
}
//Conditions for Shooting EnemyBulletSecond
function SecondBulletConditions()
{
   if(EnemyBulletFirst.alive == true && EnemyBulletSecond.alive == false)
   {
      if(EnemyBulletFirst.y_start + enemyBulletImageSizeHeight >= 0.75*canvas.height)
      {return true;}
   }
   return false;
}
function ShootEnemiesBullets(){
   if(FirstBulletConditions())
   {
      let RandEnemyShip = RandomSpaceShip();
      EnemyBulletFirst.x_start = RandEnemyShip.x;
      EnemyBulletFirst.y_start = RandEnemyShip.y;
      EnemyBulletFirst.y_end = EnemyBulletFirst.y_start + enemyBulletImageSizeHeight;
      EnemyBulletFirst.x_end = EnemyBulletFirst.x_start + enemyBulletImageSizewidth;
      EnemyBulletFirst.alive = true;
      EnemyBulletFirst.draw(ctx);
      MovingFirstEnemyBullet = window.setInterval(MoveEnemyFirstBullet,EnemyBulletMovementIntervalSpd);
      EnemyBulletFirstCollision = window.setInterval(CollisionEnemyBulletFirst, EnemyBulletMovementIntervalSpd);
   }
   if(SecondBulletConditions())
   {  
         let RandEnemyShip2 = RandomSpaceShip();
         EnemyBulletSecond.x_start = RandEnemyShip2.x;
         EnemyBulletSecond.y_start = RandEnemyShip2.y;
         EnemyBulletSecond.y_end = EnemyBulletSecond.y_start + enemyBulletImageSizeHeight;
         EnemyBulletSecond.x_end = EnemyBulletSecond.x_start + enemyBulletImageSizewidth;
         EnemyBulletSecond.alive = true;
         EnemyBulletSecond.draw(ctx);
         MovingSecondEnemyBullet = window.setInterval(MoveEnemySecondBullet,EnemyBulletMovementIntervalSpd);
         EnemyBulletSecondCollision = window.setInterval(CollisionEnemyBulletSecond, EnemyBulletMovementIntervalSpd);
   }
}
function MoveEnemyFirstBullet()
{
   x_loc = EnemyBulletFirst.x_start;
   y_loc = EnemyBulletFirst.y_start;
   if(y_loc + EnemyBulletFirst.speed <= canvas.height)
   {
      EnemyBulletFirst.y_start = EnemyBulletFirst.y_start + EnemyBulletFirst.speed;
      EnemyBulletFirst.y_end = EnemyBulletFirst.y_end + EnemyBulletFirst.speed;
      EnemyBulletFirst.clearAndDrawEnemyBullet(x_loc, y_loc, ctx);
   }
   else
   {
      clearInterval(MovingFirstEnemyBullet);
      clearInterval(EnemyBulletFirstCollision);
      EnemyBulletFirst.alive = false;
   }
}
function MoveEnemySecondBullet()
{
   x_loc = EnemyBulletSecond.x_start;
   y_loc = EnemyBulletSecond.y_start;
   if(y_loc + EnemyBulletSecond.speed <= canvas.height)
   {
      EnemyBulletSecond.y_start = EnemyBulletSecond.y_start + EnemyBulletSecond.speed;
      EnemyBulletSecond.y_end = EnemyBulletSecond.y_end + EnemyBulletSecond.speed;
      EnemyBulletSecond.clearAndDrawEnemyBullet(x_loc, y_loc, ctx);
   }
   else
   {
      clearInterval(MovingSecondEnemyBullet);
      clearInterval(EnemyBulletSecondCollision);
      EnemyBulletSecond.alive = false;
   }
}
function enemyCollisionCondition_1(enemyBullet)
{
   if((enemyBullet.x >= player.x - 5)&& (enemyBullet.x + enemyBulletImageSizewidth <= player.x + playerImageSize + 5) && ( enemyBullet.y + enemyBulletImageSizeHeight <= player.y +playerImageSize) && (enemyBullet.y + enemyBulletImageSizeHeight >= player.y -5))
   {return true;}
   return false;
}
function EnemyCollisionConditions(enemyBullet)
{
   if(enemyCollisionCondition_1(enemyBullet) || CollisionCondition_2(player, enemyBullet) || CollisionCondition_3(player, enemyBullet) || CollisionCondition_4(player,enemyBullet))
   {
      enemyhitmusic.play();
      return true;
   }
   return false;
}
function CollisionEnemyBulletFirst(){
   if(EnemyCollisionConditions(EnemyBulletFirst))
   {
      enemyhitmusic.play();
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
function CollisionCondition_1(enemyP)
{
   if(enemyP.x - 10 <= bullet.x_start && enemyP.x + enemyP.width + 10 >= bullet.x_end)
   {
      if(enemyP.y+ enemyP.height >= bullet.y_start && enemyP.y <= bullet.y_start)
      {
         return true;
      }
   }
   return false;
}
function CollisionCondition_2(obj, bulletS)
{
   if(bulletS.x_start >= obj.x && bulletS.x_start < obj.x + obj.width && bulletS.x_end <= obj.x + obj.width)
   {
      if(((obj.y + obj.height >= bulletS.y_start) && (obj.y <= bulletS.y_start)) || (bulletS.y_end <= obj.y + obj.height && bulletS.y_end >= obj.y))
      {return true;}
   }
   return false;
}

function CollisionCondition_3(obj,bulletS)
{
   if(obj.y >= bulletS.y_start && obj.y + obj.height <= bulletS.y_end)
   {
      //Right
      if(obj.x + obj.width >= bulletS.x_start && obj.x + obj.width <= bulletS.x_end)
      {
         return true;
      }
      //Left
      if(obj.x <= bulletS.x_end && obj.x >= bulletS.x_start)
      {
         return true;
      }
      //Middle 
      if(obj.x < bulletS.x_start && obj.x+obj.width > bulletS.x_end)
      {
         return true;
      }
   }
   return false; 
}
function CollisionCondition_4(obj,bulletS)
{
   if(obj.y < bulletS.y_end && bulletS.y_end < obj.y + obj.height)
   {
      //left
      if(obj.x + obj.width > bulletS.x_end && bulletS.x_end > obj.x)
      {
         return true;
      }
      //right
      if(bulletS.x_start < obj.x + obj.width && bulletS.x_start > obj.x)
      {
         return true;
      }
   }
   return false;
}

function BulletCollision()
{
   for (let index = 0; index < enemySpaceCraft.enemy.length; index++) {
      let element = enemySpaceCraft.enemy[index];
      for (let y = 0; y < element.length; y++) {
         let enemyP = element[y];
         if(enemyP.alive)
         {
            if(CollisionCondition_1(enemyP) || CollisionCondition_2(enemyP,bullet) || CollisionCondition_3(enemyP,bullet) || CollisionCondition_4(enemyP,bullet))
            {
               enemyP.alive=false;
               
               stopBulletInterval();
               PlayerHitReward(index);
               playerhitmusic.play();
               if(SpaceCraftArmyIsDead())
               {
                  console.log("Champion")
                  //Adding Current Player Score to Total Game Score
                  player.score += player.CurrGameScore;
                  player.playerGames.push(player.CurrGameScore);
                  StopGame();
                  createYouLostPage(3);
               }
               return true;
            }
         }
      }
   }
   return false;  
} 
function MoveBulletPlayer(){
   x_loc = bullet.x_start;
   y_loc = bullet.y_start;
   if (y_loc - bullet.speed > 0) {
      bullet.y_start = bullet.y_start-bullet.speed;
      bullet.y_end = bullet.y_end - bullet.speed;

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
function PlayerHitReward(index)
{
   if(index == 3)
   {
      player.CurrGameScore += 5;
   }
   if(index == 2)
   {
      player.CurrGameScore += 10;
   }
   if(index == 1)
   { 
      player.CurrGameScore += 15;
   }
   if(index == 0)
   {
      player.CurrGameScore += 20;
   }
   gscorebar.innerText = player.CurrGameScore;
}
function StopGame()
{
   //Need to return to Init Screen
   //ResetGame
   //ClearIntervals
   StopIntervals();
   TimerOff();
   clearCanvas();
   hiddenLifeImages();
   UpdateTableScore();
   initgame();
   stopMusic();
   //Dispatch Event of Updating Table Score
}
function KillLifeBarImages()
{
   
   console.log("KillLifeBarImages")
   if(player.hits == 1)
   {
      FirstLife.style.visibility="hidden";
   }
   if(player.hits == 2)
   {
      SecondLife.style.visibility="hidden";
   }
   if(player.hits == 3)
   {
      ThirdLife.style.visibility="hidden";
   }
}
function PlayerPenaltyHit()
{
   player.hits += 1;
   //Killing Images
   KillLifeBarImages();
   if(player.hits == 3)
   {
      StopGame();
      stopMusic();
      let endmusic = document.getElementById("endingMusic")
      endmusic.play();
      //Adding Current Player Score to Total Game Score
      player.playerGames.push(player.CurrGameScore);
      player.score += player.CurrGameScore;
      createYouLostPage(0);
   }
}
function destroyPlayerUL(){
   let userul = document.getElementById("youlostpageul");
   while (userul.lastElementChild) {
      userul.removeChild(userul.lastElementChild);
    }
}
function goBackToGame(){
   StopGame();
   stopMusic();
   document.getElementById("gamePage").style.display = "grid";
   document.getElementById("youlostpage").style.display = "none";
   destroyPlayerUL();  
}
function createYouLostPage(flag){
   userul = document.getElementById("youlostpageul");
   imgul = document.getElementById("imageliyoulostimage");
   let eeee = imgul.style.backgroundImage;
   //You Lost
   if(flag == 0){
      imgul.style.backgroundImage= "url(resources/youloseimg.png)"
      imgul.style.width  = '520px';
      imgul.style.height = '290px';
   }
   //You Can do better
   if(flag == 1){
      imgul.style.backgroundImage= "url('resources/You_Can_BetterImg.png')"
      imgul.style.width  = '520px';
      imgul.style.height = '37px';
   }
   //Winner
   if(flag == 2){
      imgul.style.backgroundImage= "url('resources/Winner_IMG2.png')"
      imgul.style.width  = '520px';
      imgul.style.height = '81px';
   }
   //Champion
   if (flag == 3){
      imgul.style.backgroundImage= "url('resources/ChampionIMG2.png')"
      imgul.style.width  = '520px';
      imgul.style.height = '77px';
   }
   for (let index = 0; index < player.playerGames.length; index++) {
      const element = player.playerGames[index];
      var li = document.createElement("li");
      let gamenum = index+1;
      li.appendChild(document.createTextNode("Game# "+gamenum+", Score : "+element))
      userul.appendChild(li);
      let br = document.createElement("br");
      userul.appendChild(br);
      //TODO MAYBE ADD CLASS OR SPECIAL ID;
      //Or Maybe Table ? 
   }

   document.getElementById("gamePage").style.display = "none";
   document.getElementById("youlostpage").style.display = "grid";
}
function PlayerHit()
{
   EnemyBulletSecond.alive = false;
   EnemyBulletSecond.clear(ctx);
   EnemyBulletFirst.alive = false;
   EnemyBulletFirst.clear(ctx);
   player.clear(ctx);
   player.x = player.startx;
   player.y = player.y = canvas.height - playerImageSize;
   //Clear All Shooting Intervals
   clearInterval(MovingFirstEnemyBullet);
   clearInterval(EnemyBulletFirstCollision);
   clearInterval(MovingSecondEnemyBullet);
   clearInterval(EnemyBulletSecondCollision);
   //TODO : Add Stats
   PlayerPenaltyHit();
}
function SpaceCraftArmyIsDead()
{
   console.log("CHECKING DEAD");
   let enemyCraft = enemySpaceCraft.enemy;
   console.log(enemyCraft);
   console.log(enemyCraft.length);
   console.log(enemyCraft[0].length);
   for(let y = 0; y <enemyCraft.length;y++)
   {
      for(let j = 0; j < enemyCraft[y].length; j++)
      {
         if(enemyCraft[y][j].alive)
         {
            return false;
         }
      }
   }
   return true;
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
   // TODO need to dispach event that a user has been registered
   dispatchEvent(new CustomEvent("getthetableback",{detail:
      {
      "userName":username,
      "userOBJ":tempPlayer
      }
   }));
}

function verifiedUser(obj){
   //obj.usertable = userPlayerTable, obj.username = username
   //  this function is called only when a user gained access to the game with right user name and password
   // that means that he is already registered and exsits in the userTable hashmap
   // this function initialize the game and the leadbord
   UserTable = obj.usertable;
   let userPlayerTable = obj.usertable;
   let username = obj.username;
   player = userPlayerTable.get(username);
   initgame();
}

function sortTable() {
      let table = document.getElementById("scoreBordTable");
      let rows = Array.from(table.getElementsByTagName("tr"));
      rows.shift(); // Remove the header row from the array
      rows.sort((row1, row2) => {
        let score1 = parseInt(row1.querySelector("td:last-child").innerText);
        let score2 = parseInt(row2.querySelector("td:last-child").innerText);
        return score2 - score1; // Sort in descending order
      });
      rows.forEach(row => table.appendChild(row)); // Re-append the sorted rows to the table
}
function UpdateTableScore()
{
   let tdScore = document.getElementById("score_"+ player.username);
   tdScore.innerText = player.score;
   sortTable();
}

function createUserTableRow(val,key,map){
   
   let table = document.getElementById("scoreBordTable");
   if (document.getElementById(val.username) == null){
      let tr = document.createElement("tr");
      tr.id = val.username;
      let tdPlayer = document.createElement("td");
      let tdScore = document.createElement("td");
      tdPlayer.id = "user_"+val.username;
      tdScore.id = "score_"+val.username;
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

function logoutgame(){
   savePlayerStats();
   StopIntervals();
   clearCanvas();
   stopMusic();
   document.getElementById("gamePage").style.display = "none";
   document.getElementById("welcomePage").style.display = "grid";
   document.getElementById("username").value = "";
   document.getElementById("password").value = "";
}
function savePlayerStats(){
   //TODO implement this
}
function TimerOn()
{
   let CurrentDate = new Date();
   let CurrentDateMinutes = parseInt(CurrentDate.getMinutes());
   let CurrentDateSeconds = parseInt(CurrentDate.getSeconds());
   CurrentDate.setMinutes(CurrentDateMinutes+minutes,CurrentDateSeconds+seconds);
   countDownDate = CurrentDate.getTime();
   //Refresh Timer each second
   TimerInterval = setInterval(TimerRefresh,1000);
   Four_Seconds_For_Increasing = -1;
   IncreaseLimit = 0;
}
function TimerOff()
{
   clearInterval(TimerInterval);
   document.getElementById("timer").innerHTML = 0+"0:0"+0;
}
function TimerRefresh()
{
   //Current Date
   now = new Date().getTime();
   timeLeft = countDownDate - now;
   minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
   secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);
   //Visualizing Better
   if(secondsLeft<10)
   {document.getElementById("timer").innerHTML = "0"+minutesLeft +":0"+secondsLeft;}
   else
   {document.getElementById("timer").innerHTML = "0"+minutesLeft +":"+secondsLeft;}
   //Stop Game if Timer == 00:00
   if(timeLeft < 0)
   {
      if(player.CurrGameScore < 100)
      {
         
         console.log("You Can Do Better");
         let endmusic = document.getElementById("endingMusic")
         endmusic.play();
         createYouLostPage(1);
      }
      else
      {
         console.log("Winner");
         let endmusic = document.getElementById("endingMusic")
         endmusic.play();
         createYouLostPage(2);
      }
      player.score += player.CurrGameScore;
      player.playerGames.push(player.CurrGameScore);
      StopGame();
   }
   Four_Seconds_For_Increasing +=1;
   if(Four_Seconds_For_Increasing == 4 && IncreaseLimit < 4)
   {
      enemyMovmentIntervalSpd = enemyMovmentIntervalSpd / 1.1;
      clearInterval(enemyInterval);
      enemyInterval = window.setInterval(moveEnemeyShip, enemyMovmentIntervalSpd);
      Four_Seconds_For_Increasing = 0;
      IncreaseLimit +=1;
   }
}
///// music section //////
function startMusic(){
   let musics = document.getElementById("mainMusic");
   musics.play();
   
}
function stopMusic(){
   let musics = document.getElementsByClassName("music");
   for (let index = 0; index < musics.length; index++) {
      const element = musics[index];
      element.pause();
      element.currentTime = 0;
      
   }
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
window.addEventListener("userhasregistered",function(e){
   let details = e.detail;
   let usertable = details.userTable;
   let username = details.userName;
   registerUser(usertable,username);
})
// window.addEventListener("ShootingKeyConfigured", function(e){

// })
