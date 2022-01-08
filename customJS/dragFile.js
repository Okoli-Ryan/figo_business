const dropArea = document.querySelector(".drop-area");
import { parse } from "./vanillaes.js";
import { clearTable, createTable } from "./createTable.js";

["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  dropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

["dragenter", "dragover"].forEach((eventName) => {
  dropArea.addEventListener(eventName, highlight, false);
});
["dragleave", "drop"].forEach((eventName) => {
  dropArea.addEventListener(eventName, unhighlight, false);
});

function highlight(e) {
  dropArea.classList.add("highlight");
}

function unhighlight(e) {
  dropArea.classList.remove("highlight");
}

export function handleFileSelect(evt, dropped = true) {
  let files = null;
  if (dropped) files = evt.target.files;
  // FileList object
  else files = evt.dataTransfer.files;
  // use the 1st file from the list

  let f = files[0];

  let reader = new FileReader();

  // Closure to capture the file information.
  reader.onload = (function (theFile) {
    return function (e) {
      const parsed = parse(e.target.result);
      // console.log(parsed);
      if (parsed.length > 100) {
        $(".toast").toast("show");
        return;
      }
      clearTable();
      createTable(parsed);
    };
  })(f);

  // Read in the image file as a data URL.
  reader.readAsText(f);
}

dropArea.addEventListener(
  "drop",
  function (e) {
    handleFileSelect(e, false);
  },
  false
);
