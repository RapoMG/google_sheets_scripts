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
//////////////////////////////////////////////////////////////////////////////////////

function prepareList(){
  const sn = "Arkusz2"  // sheet name with form to fill
  const r = "b2:b10"  // range in that sheet

  const sourceSheet = SpreadsheetApp.getActive().getSheetByName(sn);  
  const sourceRange = sourceSheet.getRange(r).getValues(); // todays employees list
  const idList = [];

  for (let i=0; i<sourceRange.length;i++){
    if (sourceRange[i][0] == ""){break;}; // empty (last) cell
    idList.push(sourceRange[i][0]);
  };
  return idList;
}

function getData(ids){
  const sourceSheet = SpreadsheetApp.getActive().getSheetByName("Arkusz1");  
  let sourceRange = sourceSheet.getRange("A1:A18"); // searched area with data
  
  //copy columns
  let name = 2
  let cash = 3
  let bag = 4
  const n = 1 // repetition counter

  while (n<=ids.length){
    //let searchValues = targetSheet.getRange(i,2); // cell with searched id
    //let searchFor = searchValues.getValue();  // get id
    if (searchFor == ""){break;}; // if moves to empty field 

    const searchFor = ids[n]
    
    // searching id
    let found = sourceRange.createTextFinder(searchFor).findNext(); //find id line
    if( found == null){
      n++;
      continue;}; // skip if meets unused id
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

function fillCells(){}

// main function
function test(){
  list = prepareList();
  data = getData(list);
  fillCells();

  console.log(list);
  console.log(data);
}
