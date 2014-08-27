//feel free to run this to get a feel for it. just make sure you change the bot id to your own
//when running in your group chat type the command '!save <data>' where <data> is whatever you want to save
//to retrieve your data type '!load'
//The example case provided can be modified to save your data however you desire and load at your will

//useful links
//https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app?hl=es-ES
//https://developers.google.com/apps-script/reference/spreadsheet/sheet?hl=es-ES
//https://developers.google.com/apps-script/reference/document/

//this is the url of your spreadsheet where the data is saved. Make sure your Google Apps Script account and Google Drive
//account are the same so your bot can access your spreadsheet with no problems
var sheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1qA3tcO1Wl0f1ccqwezEyP7-lo1CNbjqr_a5kMaNlzk4/edit');

//respond to any commands
function doPost(e) {
  var post = JSON.parse(e.postData.getDataAsString());
  var text = post.text;
  
  //check if user entered save command or load command
  if(text.toLowerCase().substring(0, 6) == "!save "){
    saveData(text.substring(6, text.length));
  }else if(text.toLowerCase().substring(0, 5) == "!load"){
    sendText(getData());
  }
}

//does the data saving
function saveData(data){
  sheet.getRange("A5").setValue(data);
}

//gets the data
function getData(){
  return data = sheet.getRange("A5").getValue();
}

//your bot id
var botId = "your bot id here";
//sends text to the group chat
function sendText(text){
  UrlFetchApp.fetch("https://api.groupme.com/v3/bots/post", {"method":"post", "payload":'{"bot_id":"' + botId + '","text":"' + text + '"}'})
}

//required methods
function doGet() {}
