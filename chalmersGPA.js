var parent = document.getElementsByClassName("box ListingOfResults-ascx")[0].childNodes[1];
var tables = Array.prototype.slice.call(parent.getElementsByTagName("table"), 0);

var grandTotalCredits = 0;
var grandTotalCompareVal = 0;

for (var i = 0; i < tables.length; i++) {
  var table = tables[i];
  var bolds = Array.prototype.slice.call(table.getElementsByTagName("tbody")[0].getElementsByTagName("b"), 0);
  var rows = [];

  // Remove every other element and get parent <tr>
  for (var i = 0; i < bolds.length - 2; i += 1) {
    bolds.splice(i, 1);
    rows.push(bolds[i].parentElement.parentElement);
  }

  var totalCredits = 0;
  var totalCompareVal = 0;
  rows.forEach(function(row) {
    var grade = parseInt(row.getElementsByTagName("td")[3].textContent);

    if (!isNaN(parseInt(grade))) {
      var credits = parseFloat(row.getElementsByTagName("td")[2].textContent.replace(",", "."));
      totalCredits += credits;
      totalCompareVal += (credits * parseInt(grade));
    }
  });

  var lastRow = table.rows[table.rows.length - 1];
  var cell = lastRow.childNodes[1];

  var bold = document.createElement("b");
  bold.innerHTML = "SNITTBETYG: &nbsp;";
  var span = document.createElement("span");
  span.innerHTML = totalCompareVal / totalCredits;

  cell.appendChild(bold);
  cell.appendChild(span);

  grandTotalCredits += totalCredits;
  grandTotalCompareVal += totalCompareVal;
}


var bold = document.createElement("b");
bold.innerHTML = "SNITTBETYG: &nbsp;";
var span = document.createElement("span");
span.innerHTML = grandTotalCompareVal / grandTotalCredits;
var br = document.createElement("br");

parent.insertBefore(span, parent.children[6]);
parent.insertBefore(bold, parent.children[6]);
parent.insertBefore(br, parent.children[8]);
