const usersTablePasswords = new Map();
const userToRegisteredPlayer = new Map();
const strings = new Map();
var loadDefaultUserEvent;
var usernameInput;
var passwordInput;
var loginPagebtn;
var registerPagebtn;
var loginbtn;
var backHomebtn;
var submitBtn ;
var isShootingkeyselected = false;
//
var CurrUserName;
//
var configbtn;
//
var ShootingKeyCode;
//
var minutes;
var seconds;
//
var volumecontrol
var volLevel
//
var TimerVal;
var TimerInput;
//
var CurrentlyDisplayed =document.getElementById("welcomePage"); ;
function addEventListenersForAllbtns(){
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

   backHomebtn = document.getElementById("BackHomebtn");
   backHomebtn.addEventListener("click",backHome,false);

   configbtn = document.getElementById("SaveConfigBtn");
   configbtn.addEventListener("click",Configuration, false);

   submitBtn = document.getElementById("submitform");
   submitBtn.addEventListener("click",verifyRegisterDetails,false);

   ///////////

   volumecontrol = document.getElementById("volumeControl");
   volumecontrol.addEventListener("change",changevolume,false);
   volLevel = document.getElementById("volumeLevel");

   document.getElementById("ShootingKeyInput").addEventListener("dblclick",() =>{
      document.getElementById("ShootingKeyInput").value = "";
   },false);

}
function initbtns(){
   menubtns();
   putConstStrings();
   setUpStrings();
   addEventListenersForAllbtns();
   mutemusic();
   setDialogText();
   // setup hart images src //
   let images = document.getElementsByClassName("hartimg");
   for (let index = 0; index < images.length; index++) {
      const element = images[index];
      element.src = "resources/heart2.gif";
   }

   usersTablePasswords.set("p","testuser");
   initDefaultPlayer("p");
   CurrentlyDisplayed = document.getElementById("welcomePage");

}
function loginPage(){
   
   let page = document.getElementById("loginPage");
   let pastPage = document.getElementById("welcomePage");
   pastPage.style.backgroundImage = "url('resources/editedpar2background.gif')";
   setTimeout(()=>{
      pastPage.style.display = "none";
      page.style.display = "grid";
      CurrentlyDisplayed = page;
      pastPage.style.backgroundImage = "url('resources/editedpar1background.gif')";
   },"1500");
  
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
   CurrentlyDisplayed = document.getElementById("registerPage");
   setDateInputDefault();
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
         notValidUser();
      }
   }
   else{
      notValidUser();
   }
}
function validUser(){
   //Here -> Move To Configuration Screen
   ConfigurationPage();
   console.log("user has been valideate and game has been init");
}
function PrintTimerBeautifully(TimerInput)
{
   let TimerIntVal = parseInt(TimerInput.value)
   console.log(TimerIntVal)
   minutes = Math.floor(TimerIntVal/60);
   seconds = TimerIntVal % 60 
   if(minutes != 10)
   {
      if(seconds > 9)
      {TimerVal.value = "0"+minutes+":"+seconds}
      else{TimerVal.value = "0"+minutes+":0"+seconds}
   }
   else{TimerVal.value = "10:00"}
   
}
function ConfigurationPage()
{
   //Restore Configuration Input Values to Original
   document.getElementById("ShootingKeyInput").value = "Enter Shooting Key"
   document.getElementById("appt").value = '360';
   volumecontrol.value = "0"
   volLevel.textContent  = "Level is 0.0 %";
   //Remove Login Page
   document.getElementById("configlocation").style.display = "grid";
   document.getElementById("loginPage").style.display = "none"
   CurrentlyDisplayed = document.getElementById("configlocation");
   TimerVal = document.getElementById("value")
   TimerInput = document.getElementById("appt")
   PrintTimerBeautifully(TimerInput)
   TimerInput.addEventListener("input", (event) => {
   PrintTimerBeautifully(TimerInput)})
   //Init Configuration Page
   //At this meantime - there's event listener waiting for ConfigurationValidation. Configbtn ^above^
}
function ShootingKeyConfigurationValidation()
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
function ConfigurationValidation()
{
   if(ShootingKeyConfigurationValidation())
   {
      return true;
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
      document.getElementById("configlocation").style.display = "none";
      document.getElementById("gamePage").style.display = "grid";
      CurrentlyDisplayed = document.getElementById("gamePage");
   }
   else
   {
      //Try Again 
      if(!ShootingKeyConfigurationValidation())
      {
         window.alert("The Shooting Key You Chose is illegal.\nShooting Key Must Be One Key Press, Length Cant Be longer than 1.\n Shooting Key Must be a Letter (a-z) or SpaceBar.\n Please Try Again.");
      }
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
   alert("the password or the username isn't valid\nPlease try again");
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
function Login_Button()
{
   CurrentlyDisplayed.style.display = "none";
   logoutgame();
   loginPage();
}
function Home_Button()
{  
   // document.getElementById("menubtn1").style.transform = 'rotate(180deg)';
   document.getElementById("welcomePage").style.display = "grid";
   if(CurrentlyDisplayed != null){CurrentlyDisplayed.style.display = 'none';}
   CurrentlyDisplayed = document.getElementById("welcomePage");
   logoutgame();
}
function Register_Button()
{
   if(CurrentlyDisplayed != null){CurrentlyDisplayed.style.display = 'none';}
   logoutgame();
   registerPage();
}
function backHome(){
   setUpStrings();
   document.getElementById("registerPage").style.display = "none";
   CurrentlyDisplayed.style.display = "none";
   document.getElementById("welcomePage").style.display = "grid";
   CurrentlyDisplayed = document.getElementById("welcomePage");
}
function setUpStrings(){
   let inputs = ["usernameInput","passwordInput","passwordVerifyInput","firstNameInput","lastNameInput","emailInput","birthDateInput"]
   for (let index = 0; index < inputs.length; index++) {
      const element = inputs[index];
      document.getElementById(element).value = strings.get(element);
   }
}

function putConstStrings(){
   strings.set("usernameInput","Enter User Name")
   strings.set("passwordInput","12345")
   strings.set("passwordVerifyInput","12345")
   strings.set("firstNameInput","Enter first name")
   strings.set("lastNameInput","Enter last name")
   strings.set("emailInput","Enter email")
}
function setDateInputDefault(){
   const currentDate = new Date();

   // Format the date as "YYYY-MM-DD"
   const year = currentDate.getFullYear();
   const month = String(currentDate.getMonth() + 1).padStart(2, '0');
   const day = String(currentDate.getDate()).padStart(2, '0');
   const formattedDate = `${year}-${month}-${day}`;
 
   // Set the default value of the input type date
   let dateInput = document.getElementById("birthDateInput");
   dateInput.value = formattedDate;

   dateInput.max = formattedDate;

}



function verifyRegisterDetails(){
   let inputOK = true;
   let listNotValidInputs = [] ;
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;
   const nameRegex = /^[^0-9]*$/;
   
   let username = document.getElementById("usernameInput").value;
   let password = document.getElementById("passwordInput").value;
   let passworVerify = document.getElementById("passwordVerifyInput").value;
   let firstName = document.getElementById("firstNameInput").value;
   let lastName = document.getElementById("lastNameInput").value;
   let email = document.getElementById("emailInput").value;
   
   if (usersTablePasswords.has(username)) {
      inputOK = false;
      listNotValidInputs.push("This username already exist as a player");
   }
   if (!passwordRegex.test(password)){
      inputOK = false;
      listNotValidInputs.push("password isn't valid  Shuld contain Numbers And [A-Z][a-z] characters at least 8 long");
   }
   if (passworVerify != password){
      inputOK = false;
      listNotValidInputs.push("Passwords doesn't match");
   }
   if (!nameRegex.test(firstName)){
      inputOK = false;
      listNotValidInputs.push("Firts Name Sholdn't contain any numbers");
   }
   
   if (!nameRegex.test(lastName)){
      inputOK = false;
      listNotValidInputs.push("Last Name Sholdn't contain any numbers");

   }
   if (!emailRegex.test(email)){
      inputOK = false;
      listNotValidInputs.push("This is not a valid email address");
   }

   
   if(!inputOK){
      let message = "";
      for (let index = 0; index < listNotValidInputs.length; index++) {
         const element = listNotValidInputs[index];
         message+= element+"\n"
         
      }
      alert("One or many inputs are wrong :\n"+message)
      
      return false;
   }
   usersTablePasswords.set(username,password);
   dispatchEvent(new CustomEvent("userhasregistered",{detail:
      {
      "userTable":userToRegisteredPlayer,
      "userName":username
      }
   }));
   alert("Sucessfully Registered\nNow login with the username and the password to start the game");
   backHome();


}

function mutemusic() {
   let music = document.getElementsByClassName("music");
   for (let index = 0; index < music.length; index++) {
      const element = music[index];
      element.volume = 0;
      element.pause();
   }
   volLevel.textContent  = "Level is 0.0 %";
   
}
function mutemain() {
   let maimusic = document.getElementById("mainMusic");
   maimusic.pause();
   maimusic.currentTime = 0;
}
function changevolume(){
   let musics = document.getElementsByClassName("music");
   for (let index = 0; index < musics.length; index++) {
      const element = musics[index];
      element.volume = volumecontrol.value;
      // element.play();
      
   }
   document.getElementById("mainMusic").play();
   setTimeout(mutemain, 1500);
   volLevel.textContent  = "Level is "+volumecontrol.value + " %";
}
// TODO implement this
function menubtns(){
  document.getElementById("menubtn1").addEventListener("click",function (e){
   Home_Button();
  },false)
  document.getElementById("menubtn2").addEventListener("click",function (e){
   Login_Button();
  },false)
  document.getElementById("menubtn3").addEventListener("click",function (e){
   Register_Button();
  },false)
  document.getElementById("menubtn4").addEventListener("click",function (e){
   Modal_About();
  },false)
}
function Modal_About()
{
   let Modal_Window = document.getElementById("About_Modal")
   Modal_Window.showModal();
   //Event Listeners For Closing Window (ESC / X / Mouse Click)
   document.getElementById("Close_Modal").addEventListener("click",function(e){
      Modal_Window.close();})
   document.getElementById("Close_Modal").addEventListener("keydown",function(e){if (e.keyCode === 27){
      Modal_Window.close();}})
   //This is Hard Coded Because I'm Moron - So If We're Interested in changing the content -> Make Sure You're Giving each object id ( In Modal ) and enter it here to this long IF. 
   Modal_Window.addEventListener('click', function(e){
      if (e.target.id !== 'Modal_DIV' && e.target.id!=='menubtn4' && e.target.id !=='Dialog_Header' && e.target.id !=='DialogH2' && e.target.id !== 'DIALOGMAIN') {
         Modal_Window.close();}})
}
function setDialogText(){
   let dig = document.getElementById("DIALOGMAIN");
   dig.innerHTML  = "Authors : Mark Tseytlin, Eitan Goldshtein \<br >\
   <br />Tesytlin@post.bgu.ac.il,  eitag@post.bgu.ac.il\
   <br /><br /> Game Instructions : You have to Shoot all enemy spaces without being hitted 3 times, movement is through arrow keys, shooting key can be configured by yourself in pre game settings.\
   <br /><br />Special Implementations : \
   <br />1.We've configured Game screen to show you Best Records Table - Try yourself break the record !\
   <br />2.You Can Manage Volume Level through Configuration screen !\
   <br /><br />jQuery Plugin : We've been using jQuery for small purposes (managing Canvas properties through JS modules), but our code mainly not using jQuery.\
   <br /><br /> Difficulties during the Assignment :\
   <br />1.Initiating User Array Storage - We would wish to work with DB for managing users easier.\
   <br />2.Game Physics - We didnt take in account how much precision is required for The bullet shooting mechanism and collision detection, it was challenging.\
   <br />3.Designing : We're being Technical persons and we're suffering from lack of designing creativity, we made our best efforts to make the site look playable and pleasant!\
   <br /><br />Enjoy The Game ! ";
}
//this is event handel that handel return of a new player to set in the table usually when new user register
window.addEventListener("returnplayer",function(e){
   setUserInTable(e.detail)
   },false);

window.addEventListener("load",initbtns,false);

window.addEventListener("getusertable",function(){
   dispatchEvent(new CustomEvent("usertable",{detail:userToRegisteredPlayer}));
});
window.addEventListener("getthetableback",function(e){
   let details = e.detail;
   userToRegisteredPlayer.set(details.userName,details.userOBJ);
});
