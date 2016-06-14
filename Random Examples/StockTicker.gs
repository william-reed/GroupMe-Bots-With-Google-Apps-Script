var botId = "your bot id here";

function sendText(text){
  UrlFetchApp.fetch("https://api.groupme.com/v3/bots/post", {"method":"post", "payload":'{"bot_id":"' + botId + '","text":"' + text + '"}'});
}

//respond to messages sent to the group. Recieved as POST 
function doPost(e){
  var post = JSON.parse(e.postData.getDataAsString());
  var text = post.text;
  var name = post.name
  
  //check if server is running (diagnostics)
  if(text.toLowerCase().substring(0, 7) == "!stock "){
    var tick = text.replace("!stock ", "");
    sendText(stock(tick));
  }
}

function stock(query) {
  var url = 'http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=' + query;
  
  try {
    var response = UrlFetchApp.fetch(url);
    var json = response.getContentText();
    var data = JSON.parse(json);
    
    var lastPrice = data.LastPrice;
    var name = data.Name;
  }
  catch (Exception)
  {
    Logger.log(Exception);
    return ("Error occured");
  }
  return(name + "'s last price: " + lastPrice);
}
