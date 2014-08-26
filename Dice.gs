//a simple program that uses the '!dice' command to return a dice number
var botId = "your bot id here";
function sendText(text){
  UrlFetchApp.fetch("https://api.groupme.com/v3/bots/post", {"method":"post", "payload":'{"bot_id":"' + botId + '","text":"' + text + '"}'})
}

//respond to messages sent to the group. Recieved as POST
//this method is automatically called whenever the Web App's (to be) URL is called
function doPost(e){
  var post = JSON.parse(e.postData.getDataAsString());
  var text = post.text;
  
  //check if user entered '!dice' command
  if(text.toLowerCase().substring(0, 5) == "!dice"){
    sendText(rollDice().toString());
  }
}

//get the random number
function rollDice(){
 return Math.floor(Math.random() * (6 - 1 + 1)) + 1;
}
