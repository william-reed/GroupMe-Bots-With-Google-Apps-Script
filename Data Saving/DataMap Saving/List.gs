//Handles the saving of data through a List structure
//Stores everything in a google spreadsheet.
//
//****UNTESTED***** Please report any errors or submit your own pull request. 9/5/15

function DataMap(url){
  this.spreadsheet = SpreadsheetApp.openByUrl(url);
  this.sheet = this.spreadsheet.getSheets()[0];
  this.range = this.sheet.getRange(1, 1, this.sheet.getMaxRows(), 1);
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

//gets the size of this list
DataMap.prototype.getSize = function () { 
  for(i = 1; i < this.sheet.getMaxRows(); i++){
      if(this.sheet.getRange(i, 1).getValue() == "")
      {
        return i - 1;
      }
  }
}

//gets a value from its key. keys start at 1 due to google drive
DataMap.prototype.get = function(key) {
  if(key < 1) {
    throw "Key minimum value must start at 1"
  }
  return this.values[key][1];
}

//adds a value to the end of the list
DataMap.prototype.add = function(value) {
  for(i = 1; i < this.sheet.getMaxRows(); i++){
      if(this.sheet.getRange(i, 1).getValue() == "")
      {
        this.sheet.getRange(i, 1).setValue(key);
        return;
      }
  }
}

//TODO: add remove function, and add at specific index

//reloads spreedsheet and values
DataMap.prototype.reload = function(){
  this.spreadsheet = SpreadsheetApp.openByUrl(this.url);
  this.sheet = this.spreadsheet.getSheets()[0];
  this.range = this.sheet.getRange(1, 1, this.sheet.getMaxRows(), 1);
  this.values = this.range.getValues();
}
