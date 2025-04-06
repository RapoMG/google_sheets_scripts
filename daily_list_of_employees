function sort() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var dataRange = spreadsheet.getRange("B2:B10"); // posible range of an id to sort

  dataRange.sort({column: 2, ascending: true});
}

function findNumber(){
  // source - sheet with data
  const sourceSheet = SpreadsheetApp.getActive().getSheetByName("Arkusz1");  
  let sourceRange = sourceSheet.getRange("A1:A18"); // searched area

  //copy columns
  let name = 2
  let cash = 3
  let bag = 4
  let err = 1

  // target - sheet to fill
  const targetSheet = SpreadsheetApp.getActive().getSheetByName("Arkusz2");
  let i = 2 // starting line
  
  //past columns
  let nameField = 1
  let cashField = 3
  let bagField = 4
  
  while (true){
    let searchValues = targetSheet.getRange(i,2); // cell with searched id
    let searchFor = searchValues.getValue();  // get id
    if (searchFor == ""){break;}; // if moves to empty field 

    // searching id
    let found = sourceRange.createTextFinder(searchFor).findNext(); //find id line
    if( found == null){
      i++;
      continue;}; // if meets unused id
    let k = found.getRow()
    
    let nameValue = sourceSheet.getRange(k,name).getValue();
    let cashValue = sourceSheet.getRange(k,cash).getValue();
    let bagNo = sourceSheet.getRange(k,bag).getValue();

    //past lines
    targetSheet.getRange(i,nameField).setValue(nameValue);
    targetSheet.getRange(i,cashField).setValue(cashValue);
    targetSheet.getRange(i,bagField).setValue(bagNo);

    i++;
  }
}

function fillForm(){
  sort()
  findNumber()
}
