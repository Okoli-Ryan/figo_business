import { parse } from "./vanillaes.js";
import { createTable, clearTable } from "./createTable.js";

let emailArray = [];
let emailInput = document.querySelector("#email");

$("#form1").on("submit", function (e) {
  e.preventDefault();

  let validEmail = true;

  emailArray.forEach(function (el) {
    if (el.toLowerCase().trim() === emailInput.value) {
      validEmail = false;
      console.log("email already in use");
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

export function emailValidate(p) {
  let j = 1;
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  for (let i = 0; i < p.length - 1; i++) {
    while (j < p.length) {
      if (p[i] === p[j]) {
        console.log(`index ${i} and ${j} are equal`);
        return false;
      }
      j++;
    }
    j = i + 2;
  }

  for (let i = 0; i < p.length; i++) {
    if (!emailRegex.test(p[i])) {
      console.log(`email at index ${i} is invalid`);
      return false;
    }
  }

  return true;
}
