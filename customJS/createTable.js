export function createTable(tableData, hasHeader = true) {
  var table = document.querySelector(".table");
  var tableBody = document.querySelector("tbody");

  let tableDataArray = [],
    heading = [];

  if (hasHeader === true) [heading, ...tableDataArray] = tableData;
  else [...tableDataArray] = tableData;

  let count = 1;

  tableDataArray.forEach(function (rowData) {
    var row = document.createElement("tr");

    let headCheck = 0;

    rowData.forEach(function (cellData) {
      // if (headCheck === 0) {
      //   var col1 = document.createElement("th");
      //   col1.appendChild(document.createTextNode(count));
      //   row.appendChild(col1);
      //   count++;
      //   headCheck++;
      // }

      var cell = document.createElement("td");
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  $("#register").css("display", "block");
  $("#table").editableTableWidget();
}

export function clearTable() {
  const tableBody = document.querySelector("tbody");

  tableBody.innerHTML = null;
}
