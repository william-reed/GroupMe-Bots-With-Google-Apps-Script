var botId = "f5faa748cc0ea3bb6d9fca2405";

function sendText(text){
  UrlFetchApp.fetch("https://api.groupme.com/v3/bots/post", {"method":"post", "payload":'{"bot_id":"' + botId + '","text":"' + text + '"}'});
}

function doPost(e){
  var post = JSON.parse(e.postData.getDataAsString());
  var text = post.text;
  var name = post.name
  
  if(text.toLowerCase().substring(0, 7) == "!stock "){
    var tick = text.replace("!stock ", "");
    if (tick == "")
      sendText("Error: No tick was given");
    
    sendText(stock(tick));
    
   }else if (text.toLowerCase() == "!stock") {
     sendText("Error: No tick was given");
   }
}

function stock(query) {
  var url = 'http://finance.yahoo.com/webservice/v1/symbols/' + query + '/quote?format=json';
  
  try {
    var response = UrlFetchApp.fetch(url);
    var json = response.getContentText();
    var data = JSON.parse(json);
    
    var price = data.list.resources[0].resource.fields.price;
    var name = data.list.resources[0].resource.fields.name;
  }
  catch (Exception)
  {
    Logger.log(Exception);
    return ("Error occured");
  }
  return(name + "'s last price: " + price);
}
