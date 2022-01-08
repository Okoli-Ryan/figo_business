import { emailValidate } from "./validate.js";
import { parse } from "./vanillaes.js";

const phoneNumberRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.0-9]*$/g;

export function getCSV() {
  var data = [];
  let emailArray = [];
  var rows = document.querySelectorAll("table tr");

  for (var i = 1; i < rows.length; i++) {
    var row = [],
      cols = rows[i].querySelectorAll("td, th");

    emailArray.push(cols[5].innerHTML);
    for (var j = 1; j < cols.length; j++) {
      // Validation

      if (!cols[j].innerText || cols[j].innerText === "") {
        $(".toast-body").html(
          `Element at row ${i} column ${j} cannot be empty`
        );
        $(".toast").toast("show");
        return;
      }

      if (j === 3 && !phoneNumberRegex.test(cols[j].innerText)) {
        // console.log(
        //   `"Phone Number" at row ${i} ${cols[j].innerText} is invalid. Format: +234...`
        // );
        $(".toast-body").html(
          `"Phone Number" at row ${i} is invalid. Format: +234...`
        );
        $(".toast").toast("show");
        return;
      }

      if (j === 4 && !phoneNumberRegex.test(cols[j].innerText)) {
        // console.log(
        //   `"Work Phone Number" at row ${i} ${cols[j].innerText} is invalid. Format: +234...`
        // );
        $(".toast-body").html(
          `"Work Phone Number" at row ${i} is invalid. Format: +234...`
        );
        $(".toast").toast("show");
        return;
      }
      row.push(cols[j].innerText);
    }

    data.push(`"${row.join(",")}"`);
  }

  if (!emailValidate(emailArray)) return;

  let result = data.join("\n");

  console.log(parse(result + "\n"));
}
