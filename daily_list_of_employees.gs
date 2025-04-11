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

function prepareList(sn, r){
  const sourceSheet = SpreadsheetApp.getActive().getSheetByName(sn);  
  const sourceRange = sourceSheet.getRange(r).getValues(); // todays employees list
  const idList = [];

  for (let i=0; i<sourceRange.length;i++){
    if (sourceRange[i][0] == ""){break;}; // empty (last) cell
    idList.push(sourceRange[i][0]);
  };
  return idList;
}

function getData(sn, r, col, ids){
  const sourceSheet = SpreadsheetApp.getActive().getSheetByName(sn);  
  const sourceRange = sourceSheet.getRange(r); // searched area with data
  let results =[]

  let n = 0 // repetition counter

  while (n<ids.length){
    const searchFor = ids[n] 
    results.push([ids[n]]) // push new array to results list

    // searching id
    let found = sourceRange.createTextFinder(searchFor).findNext(); //find id line
    if( found == null){
      let val = "";
      for(let i in col){
        results[n].push(val); // add empty values for not used id
        i++;
        };
      n++;
      continue;  // skip if meets unused id
    };
    
    let k = found.getRow(); // row with searched id
    
    for(let i in col){
      let val = sourceSheet.getRange(k,col[i]).getValue()
      results[n].push(val)
      i++
    };
    n++;
  }  
  return results
}

function fillCells(){}

// main function
function filler(){
  /////// CONFIG ////////
  // Form
  const sfn = "Arkusz2"  // sheet name with form to fill
  const fr = "b2:b10"  // range in that sheet
  const fcol = []
  // Data
  const sdn = "Arkusz1"  // sheet name with source data
  const dr = "A2:A18"  // searched area with data
  const dcol = [2, 3, 4] // colummns with data
  // ( name, cash, bag)
  /////////////////////

  // Functions
  list = prepareList(sfn, fr);
  data = getData(sdn, dr, dcol, list);
  fillCells();
}
