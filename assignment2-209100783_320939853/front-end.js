const usersTablePasswords = new Map();
const userToRegisteredPlayer = new Map();
var loadDefaultUserEvent;
var usernameInput;
var passwordInput;
var loginPagebtn;
var registerPagebtn;
var loginbtn;
//
var CurrUserName;
//
var configbtn;
//
var ShootingKeyCode;
function initbtns(){
   loginPagebtn = document.getElementById("moveToLoginPage");
   loginPagebtn.addEventListener("click",loginPage,false);

   registerPagebtn = document.getElementById("registerbtn");
   registerPagebtn.addEventListener("click",registerPage,false);

   
   usernameInput = document.getElementById("username");
   usernameInput.addEventListener("dblclick",clearLogintbtnText,false);
   
   passwordInput = document.getElementById("password");
   passwordInput.addEventListener("dblclick",clearPasswordbtnText,false);

   loginbtn = document.getElementById("loginbtn");
   loginbtn.addEventListener("click",verifyCredentials,false);

   configbtn = document.getElementById("SaveConfigBtn");
   configbtn.addEventListener("click",Configuration, false);

   
   


   usersTablePasswords.set("p","testuser");
   
   initDefaultPlayer("p");

}
function loginPage(){
   let page = document.getElementById("loginPage");
   let pastPage = document.getElementById("welcomePage");
   pastPage.style.display = "none";
   page.style.display = "grid";
}
function clearPasswordbtnText(){
   passwordInput.value = "";
}
function clearLogintbtnText(){
   usernameInput.value = "";

}
function registerPage(){
   document.getElementById("welcomePage").style.display = "none";
   document.getElementById("registerPage").style.display = "grid";
}

function verifyCredentials(){
   let usename = String(usernameInput.value).replace(" ","");
   CurrUserName = usename;
   let password = String(passwordInput.value).replace(" ","");
 
   if(usersTablePasswords.has(usename)){
      let tmppass = usersTablePasswords.get(usename);
      if (password == tmppass) {
         validUser();
         
      }
      else{
         // TODO implement this
         notValidUser();
      }
   }
   else{
      // TODO implement this
      notValidUser();
   }
}
function validUser(){
   //Here -> Move To Configuration Screen
   ConfigurationPage();
   console.log("user has been valideate and game has been init");
}
function ConfigurationPage()
{
   //Remove Login Page
   document.getElementById("configurationPage").style.display = "grid";
   document.getElementById("loginPage").style.display = "none"
   //Init Configuration Page
   //At this meantime - there's event listener waiting for ConfigurationValidation. Configbtn ^above^
}
function ConfigurationValidation()
{
   let ShootingKey = document.getElementById("ShootingKeyInput").value;
   if(ShootingKey.length == 1)
   {
      ShootingKeyCode = getKeyCode(ShootingKey);
      console.log("ShootingKey : " + ShootingKey +" ShootingKeyCode : " + ShootingKeyCode);
      if(ShootingKeyCode >= 65 && ShootingKeyCode <= 90 || ShootingKeyCode == 32)
      {
         return true;
      }
   }
   return false;
}
function Configuration()
{
   //if all Configuration Parameters are Right ----> 
   if(ConfigurationValidation())
   {
      //Go To Game
      dispatchEvent(new CustomEvent("verifeduser",{detail:
         {
         "usertable":userToRegisteredPlayer,
         "username":CurrUserName
         }
      }));
      document.getElementById("configurationPage").style.display = "none";
      document.getElementById("gamePage").style.display = "grid";
   }
   else
   {
      //Try Again 
      window.alert("The Shooting Key You Chose is illegal.\nShooting Key Must Be One Key Press, Length Cant Be longer than 1.\n Shooting Key Must be a Letter (a-z) or SpaceBar.\n Please Try Again.");
   }
}
function getKeyCode(char) {
   let keyCode = char.charCodeAt(0);
   if(keyCode > 90) {  // 90 is keyCode for 'z'
     return keyCode - 32;
   }
   return keyCode;
 }
function notValidUser(){
}

function setUserInTable(player){
   userToRegisteredPlayer.set(player.username,player);

}

function getUserPlayers(){
   return userToRegisteredPlayer;
}
function initDefaultPlayer(usename){
   // this function only ivoked to the default user 
   dispatchEvent(new CustomEvent("defaultUsr",{ detail:usename}));
}
//this is event handel that handel return of a new player to set in the table usually when new user register
window.addEventListener("returnplayer",function(e){
   setUserInTable(e.detail)
   },false);

window.addEventListener("load",initbtns,false);

window.addEventListener("getusertable",function(){
   dispatchEvent(new CustomEvent("usertable",{detail:userToRegisteredPlayer}));
});
