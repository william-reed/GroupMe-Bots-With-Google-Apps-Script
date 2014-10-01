//you need a custom search engine setup with Google. Enable image search in the setup.
//and an api key. Both are free
//100 queries a day limit from Google
//
//example !image pamala anderson
//will return first image from Google Image search.
//Need a Google API ID with the Custom Search Enabled
//https://code.google.com/apis/console
//Custom Search Engine
////google search engine id https://www.google.com/cse/create/new


var botId = "Your bot ID";
function sendText(text){
  UrlFetchApp.fetch("https://api.groupme.com/v3/bots/post", {"method":"post", "payload":'{"bot_id":"' + botId + '","text":"' + text + '"}'})
}

function doPost(e){
	var post = JSON.parse(e.postData.getDataAsString());
	var text = post.text;

	 if(text.toLowerCase().substring(0, 6) == "!image"){
		var query = text.slice(6);
		sendText(image(query).toString());
     }
}


function image(query) {

    //how many results do you want returned
    var results = 1;
    //on or off for safe images (no porn etc when on)
    var safe = 'off';
   //your google api key
    var api_key = 'API_KEY';

   //google search engine id https://www.google.com/cse/create/new
    var search_engine_id = 'CSE ID';


 var theUrl = 'https://www.googleapis.com/customsearch/v1?q='
  + query + '&safe='+ safe + '&num=' + results + '&cx='
  + search_engine_id + '&searchType=image&key=' + api_key;



  try {
    var response = UrlFetchApp.fetch(theUrl);
    var json = response.getContentText();
    var data = JSON.parse(response);
    //return only the first result
    var link = data.items[0].link;
  }
  catch (Exception)
  {
    Logger.log(Exception);
    var link = 'You pushed me too far, too fast';
  }

    return link;

}


function doGet(){}
