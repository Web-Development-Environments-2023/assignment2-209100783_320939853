const usersTablePasswords = new Map();
const userToRegisteredPlayer = new Map();
var loadDefaultUserEvent;
var usernameInput;
var passwordInput;
var loginPagebtn;
var registerPagebtn;
var loginbtn;
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
   let password = String(passwordInput.value).replace(" ","");
 
   if(usersTablePasswords.has(usename)){
      let tmppass = usersTablePasswords.get(usename);
      if (password == tmppass) {
         validUser(usename);
         
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
function validUser(username){
   dispatchEvent(new CustomEvent("verifeduser",{detail:
      {
      "usertable":userToRegisteredPlayer,
      "username":username
      }
   }));
   console.log("user has been valideate and game has been init");
   document.getElementById("gamePage").style.display = "grid";
   document.getElementById('')
   document.getElementById("loginPage").style.display = "none"

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
