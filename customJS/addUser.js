import { parse } from "./vanillaes.js";
import { createTable, clearTable } from "./createTable.js";

let emailArray = [];
let emailInput = document.querySelector("#email");

$("#form1").on("submit", function (e) {
  console.log("ews");
  e.preventDefault();

  let validEmail = true;

  emailArray.forEach(function (el) {
    if (el.toLowerCase().trim() === emailInput.value) {
      validEmail = false;
      $(".toast-body").html("Email is already in use");
      $(".toast").toast("show");
      return;
    }
  });

  if (!validEmail) return;
  let a = $("#form1").serializeArray();
  let user = "";

  a.forEach(function (el) {
    user += "," + el.value;
  });

  let csvUser = parse(`${user.substring(1)}\n`);

  // clearTable();
  createTable(csvUser, false);
  emailArray.push(emailInput.value);
  $("#form1")[0].reset();
  console.log(csvUser);
});
