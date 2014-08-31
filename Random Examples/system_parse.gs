// A bot that auto responds when certain system messages are sent.
// Author: Sean Hoyt (Deadman96385)
// Editor: Chris Walker (whoiscwalker)
var botId = "your bot id here";
function sendText(text){
  UrlFetchApp.fetch("https://api.groupme.com/v3/bots/post", {"method":"post", "payload":'{"bot_id":"' + botId + '","text":"' + text + '"}'})
}

function doPost(e){
  var post = JSON.parse(e.postData.getDataAsString());
  var text = post.text;
  var user_id = post.user_id; // Used to tell if its system sending the message (returns 0)

// Rejoined a group
  if (text.indexOf("has rejoined the") > -1 && user_id == 0){
     sendText("Welcome back");

// Joined a group
  }else if(text.indexOf("has joined the") > -1 && user_id == 0){
     sendText("Welcome to Hell!");

// Left a group
  }else if(text.indexOf("has left the") > -1 && user_id == 0){
     sendText("Cya sucker");

// Changed NickName
  }else if(text.indexOf("changed name to") > -1 && user_id == 0){
     sendText("I liked the old one better");
  }
}

//required method for google script
function doGet(){}
