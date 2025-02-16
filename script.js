const containerEingabe = document.getElementById("containerEingabe");
const inputText = document.getElementById("inputText");
const containerGesamt = document.getElementById("containerGesamt");
const containerOben = document.getElementById("containerOben");
const containerTitel = document.getElementById("containerTitel");
const outputTitel = document.getElementById("outputTitel");
const containerTonart = document.getElementById("containerTonart");
const outputTonart = document.getElementById("outputTonart");
const containerUnten = document.getElementById("containerUnten");
const outputText = document.getElementById("outputText");
const buttonLinks = document.getElementById("buttonLinks");
const buttonRechts = document.getElementById("buttonRechts");
const buttonSpace = document.getElementById("buttonSpace");
const ritterKuno = document.getElementById("ritterKuno");
const buttonEinfachTusch = document.getElementById("EinfachTusch");
const buttonDreifachTusch = document.getElementById("DreifachTusch");
const buttonPrinz = document.getElementById("Prinz");
const buttonBauer = document.getElementById("Bauer");
const buttonJungfrau = document.getElementById("Jungfrau");
const buttonProsit = document.getElementById("Prosit");
const buttonHappyBirthday = document.getElementById("HappyBirthday");
const autoCheck = document.getElementById("AutomatikButton");
const tastatur = document.getElementById("tastatur");
const buttonABC = document.getElementsByClassName("ABC");
const buttonZahl = document.getElementsByClassName("zahl");
const buttonLeer = document.getElementById("space");
const buttonZurück = document.getElementById("back");
const buttonReturn = document.getElementById("return");


function MusikStueck(id, nummer, titel, tonart, mappe) {
  this.id = id;
  this.nummer = nummer;
  this.titel = titel;
  this.tonart = tonart;
  this.mappe = mappe;
}

let musikSammlung = [MusikStueck];
let msFilterNummer = [MusikStueck];
let msFilterTitel = [MusikStueck];
let msGeladen = [MusikStueck];

inputText.addEventListener("keydown", endInput);

for (b of buttonABC) {
  b.addEventListener("onclick", updateInput);
  b.addEventListener("mousedown", updateInput);
}
for (b of buttonZahl) {
  b.addEventListener("onclick", updateInput);
  b.addEventListener("mousedown", updateInput);
}

buttonLeer.addEventListener("onclick", updateInput);
buttonLeer.addEventListener("mousedown", updateInput);
buttonZurück.addEventListener("onclick", updateInput);
buttonZurück.addEventListener("mousedown", updateInput);
buttonReturn.addEventListener("onclick", updateInput);
buttonReturn.addEventListener("mousedown", updateInput);

buttonLinks.addEventListener("onclick", nachLinks);
buttonLinks.addEventListener("mousedown", nachLinks);

buttonRechts.addEventListener("onclick", nachRechts);
buttonRechts.addEventListener("mousedown", nachRechts);

outputText.addEventListener("touchend", startInput);
outputText.addEventListener("mousedown", startInput);

outputTitel.addEventListener("touchend", startInput);
outputTitel.addEventListener("mousedown", startInput);

ritterKuno.addEventListener("onclick", startInput);
ritterKuno.addEventListener("mousedown", startInput);

autoCheck.addEventListener("onclick", automatikEinaus);
autoCheck.addEventListener("mousedown", automatikEinaus);

function updateInput(e) {
  console.log(e);
  const t = e.srcElement.textContent
  if (t === "Z E I G E N") {
    endInput();
  } else if (t === "CLEAR" && t != "") {
    const str = String(inputText.value);
    const strShorter = str.slice(0, str.length - 1);
    inputText.value = strShorter;
  } else {
    inputText.value = inputText.value + t;
  }
}

function automatikEinaus(e) {
  if (autoCheck.style.backgroundColor === "red") {
    autoCheck.style.backgroundColor = "green";
    autoCheck.textContent = "Automatik ist an";
    autoCheck.style.fontWeight = "normal";
    musikSammlung = msGeladen;
  } else {
    autoCheck.style.backgroundColor = "red";
    autoCheck.textContent = "Freitext ohne Automatik";
    autoCheck.style.fontWeight = "normal";
    musikSammlung = [];
  }
};

async function getText(file) {
  let myText = "";
  let myObject = await fetch(file);
  myText = await myObject.text();
  return myText;
}

async function musikSammlungErstellen() {
  let _musikSammlung = [];
  let _musikStueckeQuellText = await getText("musikstueckequelle.csv");
  let _musikStueckeArray = _musikStueckeQuellText.split("\n");
  for (msText of _musikStueckeArray) {
    let msArray = msText.split(";");
    let _musikStueck = new MusikStueck(
      msArray[0],
      msArray[1],
      msArray[2],
      msArray[3],
      msArray[4]
    );
    _musikSammlung.push(_musikStueck);
  }
  msGeladen = _musikSammlung;
  musikSammlung = _musikSammlung;
  msFilterTitel = _musikSammlung;
}

buttonEinfachTusch.addEventListener("touchend", displayEinfachTusch);
buttonEinfachTusch.addEventListener("mousedown", displayEinfachTusch);
function displayEinfachTusch() {
  inputText.value = "1 X TUSCH";
  displayText();
}
buttonDreifachTusch.addEventListener("touchend", displayDreifachTusch);
buttonDreifachTusch.addEventListener("mousedown", displayDreifachTusch);
function displayDreifachTusch() {
  inputText.value = "3 X TUSCH";
  displayText();
}
buttonPrinz.addEventListener("touchend", displayPrinz);
buttonPrinz.addEventListener("mousedown", displayPrinz);
function displayPrinz() {
  inputText.value = "3";
  displayText();
}
buttonBauer.addEventListener("touchend", displayBauer);
buttonBauer.addEventListener("mousedown", displayBauer);
function displayBauer() {
  inputText.value = "68";
  displayText();
}
buttonJungfrau.addEventListener("touchend", displayJungfrau);
buttonJungfrau.addEventListener("mousedown", displayJungfrau);
function displayJungfrau() {
  inputText.value = "33";
  displayText();
}
buttonProsit.addEventListener("touchend", displayProsit);
buttonProsit.addEventListener("mousedown", displayProsit);
function displayProsit() {
  inputText.value = "PROSIT";
  displayText();
}
buttonHappyBirthday.addEventListener("touchend", displayHappyBirthday);
buttonHappyBirthday.addEventListener("mousedown", displayHappyBirthday);
function displayHappyBirthday() {
  inputText.value = "Happy Birthday";
  displayText();
}

function endInput(e) {
  tastaturHide();
  inputText.value = String(inputText.value).toUpperCase();
  inputText.value = String(inputText.value).trim();
  if (inputText.value === "") {
    inputText.value = "KUNO";
  }
  if (inputText.value === "T") {
    inputText.value = "1 x TUSCH";
  }
  if (String(inputText.value).startsWith("TT")) {
    inputText.value = "3 x TUSCH";
  }
  if (inputText.value === "H") {
    inputText.value = "Happy Birthday";
  }
  if (inputText.value === "P") {
    inputText.value = "3";
  }
  if (inputText.value === "B") {
    inputText.value = "68";
  }
  if (inputText.value === "J") {
    inputText.value = "33";
  }
  if (inputText.value === "K") {
    inputText.value = "KUNO";
    ritterKuno.hidden = false;
  }
  //      check ob eine evtl. eingegebene Zahl zu einer Nummer eines MS passt - dann darf sie nicht in der folgenden Suchfunktion verwendet werden
  msFilterNummer = musikSammlung.filter((m) => String(m.nummer) === String(inputText.value));

  msFilterTitel = musikSammlung;
  if (msFilterNummer.length === 0) {
    msFilterTitel = musikSammlung.filter((m) => m.titel.toUpperCase().includes(inputText.value));
    buttonSpace.textContent = "..." + inputText.value + "...";
    buttonSpace.style.display = "flex";
    for (m of msFilterTitel) {
      inputText.value = m.nummer;
      if (m.nummer === "Anhang") {
        inputText.value = m.titel.toUpperCase();
      }
      if (m.nummer === "KG Blau-Weiß Fischenich") {
        inputText.value = "";
      }
      break;
    }
  }
  if (msFilterTitel.length > 1 && msFilterTitel !== musikSammlung) {
    buttonRechts.style.backgroundColor = "green";
    buttonLinks.style.backgroundColor = "red";
  } else if (msFilterTitel.length !== 1) {
    buttonSpace.textContent = " ";
    buttonSpace.style.display = "none";
  }
  inputText.hidden = true;
  displayText();
}

function displayText() {
  if (inputText.value === "KUNO") {
    ritterKuno.hidden = false;
    containerGesamt.hidden = true;
    containerUnten.hidden = true;
    buttonLinks.hidden = true;
    buttonRechts.hidden = true;
    buttonSpace.hidden = true;
  }

  tastaturHide();

  containerGesamt.hidden = false;
  containerOben.hidden = false;
  containerTitel.hidden = false;
  containerTonart.hidden = false;

  containerUnten.hidden = false;
  outputText.hidden = false;
  outputTitel.hidden = false;
  outputTonart.hidden = false;

  containerEingabe.hidden = true;
  inputText.hidden = true;

  outputTitel.textContent = "";
  outputTitel.style.color = "black";
  outputTitel.style.backgroundColor = "white";
  containerTitel.style.backgroundColor = "white";

  outputTonart.textContent = "";
  outputTonart.style.color = "black";
  outputTonart.style.backgroundColor = "white";
  containerTonart.style.backgroundColor = "white";

  outputText.textContent = "";

  inputText.value = String(inputText.value).trimEnd();

  for (m of musikSammlung) {
    if (
      String(m.nummer).toUpperCase() === String(inputText.value).toUpperCase()
    ) {
      if (String(m.mappe).startsWith("gelb")) {
        containerTitel.style.backgroundColor = "yellow";
        outputTitel.style.backgroundColor = "yellow";
        outputTitel.style.color = "black";
        containerTonart.style.backgroundColor = "yellow";
        outputTonart.style.backgroundColor = "yellow";
        outputTonart.style.color = "black";
      } else if (String(m.mappe).startsWith("grün")) {
        containerTitel.style.backgroundColor = "green";
        outputTitel.style.backgroundColor = "green";
        outputTitel.style.color = "white";
        containerTonart.style.backgroundColor = "green";
        outputTonart.style.backgroundColor = "green";
        outputTonart.style.color = "white";
      } else if (String(m.mappe).startsWith("blau")) {
        containerTitel.style.backgroundColor = "blue";
        outputTitel.style.backgroundColor = "blue";
        outputTitel.style.color = "white";
        containerTonart.style.backgroundColor = "blue";
        outputTonart.style.backgroundColor = "blue";
        outputTonart.style.color = "white";
      }

      if (m.titel !== " " && m.titel !== "") {
        let fontGroesse = 1;
        do {
          fontGroesse = fontGroesse + 1;
          outputTitel.style.fontSize = `${fontGroesse}px`;
          outputTitel.style.fontFamily = "Times";
          outputTitel.style.overflowWrap = "normal";
          outputTitel.textContent = m.titel;
        } while (
          (outputTitel.clientHeight < containerTitel.clientHeight) &
          (outputTitel.clientWidth <= containerTitel.clientWidth)
        );
        fontGroesse = fontGroesse + 20;
        outputTitel.style.fontSize = `${fontGroesse}px`;
      }
      if (m.tonart !== " ") {
        let fontGroesse = 1;
        do {
          fontGroesse = fontGroesse + 1;
          outputTonart.style.fontSize = `${fontGroesse}px`;
          outputTonart.style.fontFamily = "Times";
          outputTonart.style.overflowWrap = "normal";
          outputTonart.textContent = m.tonart;
        } while (
          (outputTonart.clientHeight < containerTonart.clientHeight) &
          (outputTonart.clientWidth <= containerTonart.clientWidth)
        );
        fontGroesse = fontGroesse + 30;
        outputTonart.style.fontSize = `${fontGroesse}px`;
      }
      break;
    }
  }

  if (inputText.value !== "KUNO") {
    outputText.textContent = inputText.value;
    let fontGroesse = 1;
    do {
      fontGroesse = fontGroesse + 1;
      outputText.style.fontSize = `${fontGroesse}px`;
      outputText.style.fontFamily = "Times";
      outputText.style.overflowWrap = "normal";
      // outputText.style.hyphens = "auto";
      outputText.textContent = inputText.value;
    } while (
      (outputText.clientHeight < containerGesamt.clientHeight) &
      (outputText.clientWidth <= containerGesamt.clientWidth)
    );
    fontGroesse = fontGroesse - 1;
    outputText.style.fontSize = `${fontGroesse}px`;
    outputText.textContent = inputText.value;
  }
}

function startInput() {
  tastaturShow();
  ritterKuno.hidden = true;
  containerGesamt.hidden = true;
  containerOben.hidden = true;
  containerTitel.hidden = true;
  containerTonart.hidden = true;
  containerUnten.hidden = true;
  outputText.hidden = true;
  outputTitel.hidden = true;
  outputTonart.hidden = true;
  containerEingabe.hidden = false;
  inputText.hidden = false;

  buttonLinks.style.backgroundColor = "white";
  buttonRechts.style.backgroundColor = "white";

  outputText.textContent = "";
  outputTitel.textContent = "";
  outputTonart.textContent = "";

  buttonSpace.textContent = " ";
  buttonSpace.style.display = "none";

  inputText.value = "";

  containerOben.style.backgroundColor = "white";
  containerTitel.style.backgroundColor = "white";
  containerTonart.style.backgroundColor = "white";
  containerUnten.style.backgroundColor = "white";
  outputTitel.style.backgroundColor = "white";
  outputTonart.style.backgroundColor = "white";
  outputText.style.backgroundColor = "rgba(1, 1, 1, 0.001)";
  containerUnten.style.backgroundColor = "white";

  outputTitel.style.color = "black";
  outputTonart.style.color = "black";
  outputText.style.color = "black";

  msFilterTitel = musikSammlung;
}

function nachRechts() {
  if (msFilterTitel.length === 1) {
    msFilterTitel = musikSammlung;
  }
  // Verarbeiten einer Zahl, die nicht als Nummer eines MS vorkommt
  if (
    parseFloat(inputText.value) > 0 &&
    parseFloat(inputText.value) < 1000 &&
    musikSammlung.filter((e) => e.nummer === inputText.value).length === 0
  ) {
    msFilterTitel = musikSammlung;
    let i = parseFloat(inputText.value);
    while (i >= 0) {
      const arrayTemp = musikSammlung.filter((e) => parseFloat(e.nummer) === i);
      if (arrayTemp.length > 0) {
        inputText.value = arrayTemp[0].nummer;
        break;
      }
      i = i - 1;
    }
  }
  let index = 0;
  for (m of msFilterTitel) {
    if (
      String(inputText.value) === String(m.nummer) ||
      String(inputText.value) === String(m.titel).toUpperCase()
    ) {
      // alert("! "+inputText.value);
      index = msFilterTitel.indexOf(m);
      // alert("index"+index);
      // alert("msFiTiLength:"+msFilterTitel.length);
      if (index < msFilterTitel.length - 1) {
        inputText.value = msFilterTitel[index + 1].nummer;
        // alert("msFiTi.index..index+1..index+2.nummer"+musikSammlung[index].nummer + "/"+musikSammlung[index+1].nummer + "/"+musikSammlung[index+2].nummer);
      }
      if (msFilterTitel[index + 1].nummer === "Anhang") {
        inputText.value = msFilterTitel[index + 1].titel.toUpperCase();
      }
      displayText();
      break;
    }
  }
  if (buttonRechts.style.backgroundColor !== "green") {
    buttonSpace.textContent = " ";
    buttonSpace.style.display = "none";
  }
}

function nachLinks() {
  if (msFilterTitel.length === 1) {
    msFilterTitel = musikSammlung;
  }
  if (
    parseFloat(inputText.value) > 0 &&
    parseFloat(inputText.value) < 1000 &&
    musikSammlung.filter((e) => e.nummer === inputText.value).length === 0
  ) {
    msFilterTitel = musikSammlung;
    let i = parseFloat(inputText.value);
    while (i <= musikSammlung[musikSammlung.length - 1].nummer) {
      const arrayTemp = musikSammlung.filter((e) => parseFloat(e.nummer) === i);
      if (arrayTemp.length > 0) {
        inputText.value = arrayTemp[0].nummer;
        break;
      }
      i = i + 1;
    }
  }

  let index = 0;
  for (m of msFilterTitel) {
    if (
      inputText.value === String(m.nummer) ||
      inputText.value === String(m.titel).toUpperCase()
    ) {
      index = msFilterTitel.indexOf(m);
      if (index > 0) {
        inputText.value = msFilterTitel[index - 1].nummer;
      }
      if (msFilterTitel[index - 1].nummer === "Anhang") {
        inputText.value = msFilterTitel[index - 1].titel.toUpperCase();
      }
      displayText();
      break;
    }
  }
  if (buttonLinks.style.backgroundColor !== "red") {
    buttonSpace.textContent = " ";
    buttonSpace.style.display = "none";
  }
}

function tastaturHide() {
  for (b of buttonABC) {
    b.hidden = true;
  }
  for (b of buttonZahl) {
    b.hidden = true;
  }
  buttonLeer.hidden = true;
  buttonZurück.hidden = true;
  buttonReturn.hidden = true;
}

function tastaturShow() {
  for (b of buttonABC) {
    b.hidden = false;
  }
  for (b of buttonZahl) {
    b.hidden = false;
  }
  buttonLeer.hidden = false;
  buttonZurück.hidden = false;
  buttonReturn.hidden = false;
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("service-worker.js")
      .then((registration) => {
        console.log(
          "Service Worker registriert mit Scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.log("Service Worker Registrierung fehlgeschlagen:", error);
      });
  });
}

if (navigator.storage && navigator.storage.persist) {
  navigator.storage.persisted().then((persistent) => {
    if (persistent) {
      console.log("Storage will not be cleared except by explicit user action");
    } else {
      console.log("Storage may be cleared by the UA under storage pressure.");
    }
  });
}

// Ende

