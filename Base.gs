//an example for some basic Google Apps Script / Bot stuff

var botId = "your bot id here";
function sendText(text){
  UrlFetchApp.fetch("https://api.groupme.com/v3/bots/post", {"method":"post", "payload":'{"bot_id":"' + botId + '","text":"' + text + '"}'})
}

function sendImage(text, imageURL){
  UrlFetchApp.fetch("https://api.groupme.com/v3/bots/post", {"method":"post", "payload":'{"bot_id":"' + botId + '","text":"' + text + '","attachments":[{"type":"image","url":"' + imageURL + '"}]}'})
}

//respond to messages sent to the group. Recieved as POST 
function doPost(e){
  var post = JSON.parse(e.postData.getDataAsString());
  var text = post.text;
  var name = post.name
  
  //check if server is running (diagnostics)
  if(text.toLowerCase().substring(0, 3) == "!hi"){
    sendText("Hello, " + name);
  }
}

//send a message every hour see https://developers.google.com/apps-script/reference/script/clock-trigger-builder
ScriptApp.newTrigger("sendTimelyMessage").timeBased().everyHours(1).create();

function sendTimelyMessage(){
  sendText("It has been one hour");
}
