//Handles the saving of data through a Map like structure
//Saves everything into a spreadsheet
//Stored as key value pairs.

function DataMap(url){
  this.spreadsheet = SpreadsheetApp.openByUrl(url);
  this.sheet = this.spreadsheet.getSheets()[0];
  this.range = this.sheet.getRange(1, 1, this.sheet.getMaxRows(), 2);
  this.values = this.range.getValues();
  this.url = url;
}

//get url
DataMap.prototype.getURL = function(){
    return this.url;
}
 
//sets the url
DataMap.prototype.setURL = function(url){
    this.url = url;
}

//gets a value from its key
DataMap.prototype.get = function(key) {
  for (var row in this.values) {
    if((this.values[row][0] == key)){
      return this.values[row][1];
    }
 }
}

//gets the size of this map
DataMap.prototype.getSize = function () { 
  for(i = 1; i < this.sheet.getMaxRows(); i++){
      if(this.sheet.getRange(i, 1).getValue() == "" && this.sheet.getRange(i, 2).getValue() == "")
      {
        return i - 1;
      }
  }
}

//set a value with its key, value
DataMap.prototype.set = function(key, value) {
  for(j = 1; j < this.sheet.getMaxRows(); j++){
    if(this.sheet.getRange(j, 1).getValue() == key)
    {
      this.sheet.getRange(j, 2).setValue(value);
      return;
    }
  }
  //the key is not existent so add to a new row
  for(i = 1; i < this.sheet.getMaxRows(); i++){
      if(this.sheet.getRange(i, 1).getValue() == "" && this.sheet.getRange(i, 2).getValue() == "")
      {
        this.sheet.getRange(i, 1).setValue(key);
        this.sheet.getRange(i, 2).setValue(value);
        return;
      }
  }
}

//reloads spreedsheet and values
DataMap.prototype.reload = function(){
  this.spreadsheet = SpreadsheetApp.openByUrl(this.url);
  this.sheet = this.spreadsheet.getSheets()[0];
  this.range = this.sheet.getRange(1, 1, this.sheet.getMaxRows(), 2);
  this.values = this.range.getValues();
}
