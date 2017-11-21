var parent = document.getElementsByClassName("box ListingOfResults-ascx")[0].childNodes[1];
var tables = Array.prototype.slice.call(parent.getElementsByTagName("table"), 0);

var accumulatedCredits = 0;
var accumulatedCompareVal = 0;

tables.forEach(function(table) {
  var bolds = Array.prototype.slice.call(table.getElementsByTagName("tbody")[0].getElementsByTagName("b"), 0);
  var rows = [];

  // Remove every other element and get parent row
  for (var i = 0; i < bolds.length - 2; i += 1) {
    bolds.splice(i, 1);
    rows.push(bolds[i].parentElement.parentElement);
  }

  var totalCredits = 0;
  var totalCompareVal = 0;

  /* Loop through rows and calculate GPA for valid values */
  rows.forEach(function(row) {
    var grade = parseInt(row.getElementsByTagName("td")[3].textContent);

    if (!isNaN(parseInt(grade))) {
      var credits = parseFloat(row.getElementsByTagName("td")[2].textContent.replace(",", "."));
      totalCredits += credits;
      totalCompareVal += (credits * parseInt(grade));
    }
  });

  /* Add GPA to end of table if its a valid number */
  if (!isNaN(totalCompareVal / totalCredits)) {
    var lastRow = table.rows[table.rows.length - 1];
    var cell = lastRow.childNodes[1];

    cell.appendChild(createElement("b", "SNITTBETYG: &nbsp;"));
    cell.appendChild(createElement("span", (totalCompareVal / totalCredits).toFixed(1)));

    accumulatedCredits += totalCredits;
    accumulatedCompareVal += totalCompareVal;
  }
});

/* Add total GPA at end of page */
parent.insertBefore(createElement("span", (accumulatedCompareVal / accumulatedCredits).toFixed(1)), parent.children[6]);
parent.insertBefore(createElement("b", "SNITTBETYG: &nbsp;"), parent.children[6]);
parent.insertBefore(createElement("br"), parent.children[8]);

/* Helper method that creates HTML element with content set to innerHTML if specified */
function createElement(type, content) {
  var el = document.createElement(type);
  if (content) {
    el.innerHTML = content;
  }
  return el;
}
