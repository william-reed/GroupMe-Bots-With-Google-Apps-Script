//lets keep track of some users sales

var dataMap = new DataMap('https://docs.google.com/spreadsheets/d/1qA3tcO1Wl0f1ccqwezEyP7-lo1CNbjqr_a5kMaNlzk4/edit');

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
var botId = "19f76e34578b8da260a59d3819";
//sends text to the group chat
function sendText(text){
  UrlFetchApp.fetch("https://api.groupme.com/v3/bots/post", {"method":"post", "payload":'{"bot_id":"' + botId + '","text":"' + text + '"}'})
}

function doGet() {}