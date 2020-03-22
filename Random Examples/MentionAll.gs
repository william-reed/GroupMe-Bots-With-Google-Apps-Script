// An example for some basic Google Apps Script / Bot stuff

var botId = "your bot id here";
var accessToken = "your access token here";
function sendText(text) {
  UrlFetchApp.fetch("https://api.groupme.com/v3/bots/post", {"method":"post", "payload":'{"bot_id":"' + botId + '","text":"' + text + '"}'})
}

function sendImage(text, imageURL) {
  UrlFetchApp.fetch("https://api.groupme.com/v3/bots/post", {"method":"post", "payload":'{"bot_id":"' + botId + '","text":"' + text + '","attachments":[{"type":"image","url":"' + imageURL + '"}]}'})
}

// Will include the "message" parameter appended after the "username" string, with the "username" parameter bolded
// Mentioning a user by using an invalid ID (like 0) allows you to bold text without mentioning an actual user
function mentionUser(message, username, userId) {
  UrlFetchApp.fetch("https://api.groupme.com/v3/bots/post", {"method":"post", "payload":`{"bot_id": "${botId}","text": "@${username} ${message}", "attachments": [{"type": "mentions", "loci": [[0, ${username.length}]], "user_ids": [" ${userId}"]}]}`});
}
// Mentions every user in the group
function mentionAll(message, groupId) {
  mentionUsers(message, getGroupMembers(groupId));
}
// Mentions all users in the array "userIds"
function mentionUsers(message, userIds) {
  var userIdsStr = "[";
  var lociString = "[";
  for (var i = 0; i < userIds.length; i++) {
    userIdsStr += userIds[i];
    lociString += "[0,0]";
    if (i + 1 < userIds.length) {
      userIdsStr += ", ";
      lociString += ", ";
    } else {
      userIdsStr += "]";
      lociString += "]";
    }
  }
  
  UrlFetchApp.fetch("https://api.groupme.com/v3/bots/post", {"method":"post", "payload":`{"bot_id":"${botId}","text": "${message}", "attachments": [{"type": "mentions", "loci": ${lociString}, "user_ids": ${userIdsStr}}]}`});
}

// Returns the name of the group by group ID
function getGroupName(groupId) {
  var result = JSON.parse(UrlFetchApp.fetch("https://api.groupme.com/v3/groups?token=" + accessToken));
  var response = result.response;
  for (var i = 0; i < response.length; i++) {
    if (response[i].id == groupId) {
      return response[i].name;
    }
  }
  // Default; return "Group" just so that we don't have to deal with null values
  return "Group";
}
// Returns an array of user IDs for each member in the group
function getGroupMembers(groupId) {
  var result = JSON.parse(UrlFetchApp.fetch("https://api.groupme.com/v3/groups/" + groupId + "?token=" + accessToken));
  var response = result.response;
  var userIds = [];
  for (var i = 0; i < response.members.length; i++) {
    userIds.push(response.members[i].user_id);
  }
  return userIds;
}

// Respond to messages sent to the group. Recieved as POST 
function doPost(e) {
  var post = JSON.parse(e.postData.getDataAsString());
  var text = post.text; // The raw text provided by the message
  var name = post.name; // The user's nickname in this group
  var userId = post.user_id; // Useful for identification purposes
  var groupId = post.group_id; // The unique ID of the group
  
  // Used to ignore bots and the GroupMe system/calendar
  if (post.sender_type == "bot" || userId == "0" || userId == "calendar") {
    return;
  }
  
  // Used to get the user IDs of mentioned users (mentioned users are those who are pinged by using "@[username]")
  // There are several types of attachments, including mentions, images, locations, and emojis
  var mentionIds = [];
  for (var i = 0; i < post.attachments.length; i++) {
    if (post.attachments[i].type == "mentions") {
      // This attachment is a mention, time to grab all the user IDs from it
      for (var j = 0; j < post.attachments[0].user_ids.length; i++) {
        mentionIds.push(post.attachments[0].user_ids[j]);
      }
    }
  }
  
  // If a user sends a message starting with "@everyone", the bot will repeat the message, but mention everyone in the group 
  // so they all get pinged
  if (text.substring(0, 9) == "@everyone") {
    var message = text.substring(text.indexOf(' '));
    mentionAll("@everyone " + message, groupId);
  }
}
