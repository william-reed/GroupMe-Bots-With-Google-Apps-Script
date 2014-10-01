//see https://github.com/wreed12345/GroupMe-Google-Apps-Script-Examples/wiki/Data-Saving 
//for a more detailed explanation
//lets keep track of some users sales

var dataMap = new DataMap('your spreadsheet link here. under same account as google apps script one');

function doPost(e) {
  var post = JSON.parse(e.postData.getDataAsString());
  var text = post.text;
  var name = post.name;
  
  if(text.toLowerCase().substring(0, 5) == "!sale"){
    madeSale(name);
  }else if(text.toLowerCase().substring(0, 9) == "!my sales"){
    getSales(name);
  }
}

function madeSale(name){
  var currentSales = parseInt(dataMap.get(name));
  if(dataMap.get(name) == undefined)
    currentSales = 0;
  currentSales ++;
  dataMap.set(name, currentSales.toString());
}

function getSales(name){
  var currentSales = dataMap.get(name);
  sendText(name + " has made " + currentSales.toString() + " sales!");
}

//your bot id
var botId = "your bot id here";
//sends text to the group chat
function sendText(text){
  UrlFetchApp.fetch("https://api.groupme.com/v3/bots/post", {"method":"post", "payload":'{"bot_id":"' + botId + '","text":"' + text + '"}'})
}

function doGet() {}
