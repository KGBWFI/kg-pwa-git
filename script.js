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
const containerFavoriten = document.getElementById("containerFavoriten");
// const buttonEinfachTusch = document.getElementById("EinfachTusch");
// const buttonDreifachTusch = document.getElementById("DreifachTusch");
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
const leerzeile = document.getElementById("leerzeile");
const speicher = [];
let speicherIndex = 0;
const speicherPlus = document.getElementById("speicherPlus");
const speicherCall = document.getElementById("speicherCall");
const speicherZurück = document.getElementById("speicherZurück");
const speicherZähler = document.getElementById("speicherZähler");
const speicherVor = document.getElementById("speicherVor");
const speicherEntfern = document.getElementById("speicherEntfern");
const speicherVerlassen = document.getElementById("speicherVerlassen");
const speicherLeeren = document.getElementById("speicherLeeren");

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

// inputText.addEventListener("keydown", endInput);

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

containerUnten.addEventListener("touchend", startInput);
containerUnten.addEventListener("mousedown", startInput);

outputTitel.addEventListener("touchend", startInput);
outputTitel.addEventListener("mousedown", startInput);

ritterKuno.addEventListener("onclick", startInput);
ritterKuno.addEventListener("mousedown", startInput);

autoCheck.addEventListener("onclick", automatikEinaus);
autoCheck.addEventListener("mousedown", automatikEinaus);

speicherPlus.addEventListener("onclick", speicherPush);
speicherPlus.addEventListener("mousedown", speicherPush);

speicherCall.addEventListener("onclick", speicherShow);
speicherCall.addEventListener("mousedown", speicherShow);

speicherZurück.addEventListener("onclick", speicherShowBefore);
speicherZurück.addEventListener("mousedown", speicherShowBefore);

speicherVor.addEventListener("onclick", speicherShowNext);
speicherVor.addEventListener("mousedown", speicherShowNext);

speicherEntfern.addEventListener("onclick", speicherRemove);
speicherEntfern.addEventListener("mousedown", speicherRemove);

speicherVerlassen.addEventListener("onclick", speicherLeave);
speicherVerlassen.addEventListener("mousedown", speicherLeave);

speicherLeeren.addEventListener("onclick", speicherClear);
speicherLeeren.addEventListener("mousedown", speicherClear);




function speicherPush() {
  if (inputText.textContent != "" && inputText.style.backgroundColor != "orange") {
    speicher.push(inputText.textContent);
    ++speicherIndex;
    speicherZähler.textContent = speicher.length + " im Speicher";
    // inputText.style.backgroundColor = "orange";
    // buttonZurück.style.backgroundColor = "orange";
    speicherCall.hidden = false;
  }
  if (inputText.textContent != "" && inputText.style.backgroundColor === "orange") {
    speicher[speicherIndex - 1] = inputText.textContent;
    alert("Speicherplatz " + speicherIndex + " geändert");
  }
}


function speicherShow() {
  if (speicher.length > 0 && inputText.style.backgroundColor != "orange") {
    inputText.textContent = speicher[speicherIndex - 1];
    inputText.style.backgroundColor = "orange";
    buttonReturn.style.backgroundColor = "red";
    speicherIndex = speicher.length;
    speicherZähler.textContent = speicherIndex + "/" + speicher.length;
    speicher.length > 1 ? speicherVor.hidden = false : speicherVor.hidden = true;
    speicher.length > 1 ? speicherZurück.hidden = false : speicherZurück.hidden = true;
    speicherCall.hidden = true;
    speicherPlus.hidden = true;
    speicherEntfern.hidden = false;
    speicherVerlassen.hidden = false;
    speicher.length > 1 ? speicherLeeren.hidden = false : speicherLeeren.hidden = true;
    // buttonZurück.style.backgroundColor = "orange";
  }
}

function speicherShowBefore() {
  if (speicherIndex > 1 && inputText.style.backgroundColor === "orange") {
    --speicherIndex;
    inputText.textContent = speicher[speicherIndex - 1];
    speicherZähler.textContent = speicherIndex + "/" + speicher.length;
  }
}

function speicherShowNext() {
  if (speicherIndex < speicher.length && inputText.style.backgroundColor === "orange") {
    ++speicherIndex;
    inputText.textContent = speicher[speicherIndex - 1];
    speicherZähler.textContent = speicherIndex + "/" + speicher.length;
  }
}

function speicherRemove() {
  if (confirm("aktuellen Speicherplatz löschen?")) {
    if (speicher.length > 0) {
      speicher.splice(speicherIndex - 1, 1);
      speicherIndex = speicher.length;
      if (speicher.length > 0) {
        inputText.textContent = speicher[speicherIndex - 1];
        speicherZähler.textContent = `${speicherIndex}/${speicher.length}`;
        if (speicher.length === 1) {
          speicherVor.hidden = true;
          speicherZurück.hidden = true;
          speicherLeeren.hidden = true;
        }
      } else {
        startInput();
      };
    };
  } else {
    return;
  };
}

function speicherLeave() {
  startInput();
}

function speicherClear() {
  if (confirm("Speicher KOMPLETT löschen?")) {
    while (speicher.length > 0) {
      speicher.pop();
      speicherIndex = speicher.length;
    }
    startInput()
  } else {
    return;
  };
}

function updateInput(e) {
  buttonReturn.style.backgroundColor = "red";
  const t = e.srcElement.textContent
  if (t === "⏎") {
    if (inputText.style.backgroundColor != "orange") {
      speicherPush();
      buttonRechts.style.backgroundColor = "orange";
      buttonLinks.style.backgroundColor = "orange";
      buttonSpace.textContent = `${speicherIndex}/${speicher.length}`;
    }
    endInput();
  } else if (t === "⌫" && t != "") {
    // if (buttonZurück.style.backgroundColor === "orange"){
    //   inputText.textContent = "";
    //   buttonZurück.style.backgroundColor = "lightgray";
    // }
    const str = String(inputText.textContent);
    const strShorter = str.slice(0, str.length - 1);
    inputText.textContent = strShorter;
    if (inputText.textContent === "") {
      buttonReturn.style.backgroundColor = "rgb(96, 150, 244)";
    }
  } else {
    inputText.textContent = inputText.textContent + t;
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

buttonPrinz.addEventListener("touchend", displayPrinz);
buttonPrinz.addEventListener("mousedown", displayPrinz);
function displayPrinz() {
  inputText.textContent = "3";
  displayText();
}
buttonBauer.addEventListener("touchend", displayBauer);
buttonBauer.addEventListener("mousedown", displayBauer);
function displayBauer() {
  inputText.textContent = "68";
  displayText();
}
buttonJungfrau.addEventListener("touchend", displayJungfrau);
buttonJungfrau.addEventListener("mousedown", displayJungfrau);
function displayJungfrau() {
  inputText.textContent = "33";
  displayText();
}
buttonProsit.addEventListener("touchend", displayProsit);
buttonProsit.addEventListener("mousedown", displayProsit);
function displayProsit() {
  inputText.textContent = "15";
  displayText();
}
buttonHappyBirthday.addEventListener("touchend", displayHappyBirthday);
buttonHappyBirthday.addEventListener("mousedown", displayHappyBirthday);
function displayHappyBirthday() {
  inputText.textContent = "Happy Birthday in As";
  displayText();
}

function endInput(e) {
  eingabeHide();
  inputText.textContent = String(inputText.textContent).toUpperCase();
  inputText.textContent = String(inputText.textContent).trim();
  if (inputText.textContent === "") {
    inputText.textContent = "KUNO";
  }
  if (inputText.textContent === "T") {
    inputText.textContent = "1 x TUSCH";
  }
  if (String(inputText.textContent).startsWith("TT")) {
    inputText.textContent = "3 x TUSCH";
  }
  if (inputText.textContent === "H") {
    inputText.textContent = "Happy Birthday in As";
  }
  if (inputText.textContent === "P") {
    inputText.textContent = "3";
  }
  if (inputText.textContent === "B") {
    inputText.textContent = "68";
  }
  if (inputText.textContent === "J") {
    inputText.textContent = "33";
  }
  if (inputText.textContent === "K") {
    inputText.textContent = "KUNO";
    ritterKuno.hidden = false;
  }
  //      check ob eine evtl. eingegebene Zahl zu einer Nummer eines MS passt - dann darf sie nicht in der folgenden Suchfunktion verwendet werden
  msFilterNummer = musikSammlung.filter((m) => String(m.nummer) === String(inputText.textContent));
  msFilterTitel = musikSammlung;
  if (msFilterNummer.length === 0) {
    msFilterTitel = musikSammlung.filter((m) => m.titel.toUpperCase().includes(inputText.textContent));
    buttonSpace.textContent = "..." + inputText.textContent + "...";
    buttonSpace.style.display = "flex";
    for (m of msFilterTitel) {
      inputText.textContent = m.nummer;
      if (m.nummer === "Anhang") {
        inputText.textContent = m.titel.toUpperCase();
      }
      if (m.nummer === "KG Blau-Weiß Fischenich") {
        inputText.textContent = "";
      }
      break;
    }
  }
  if (msFilterTitel.length > 1 && msFilterTitel !== musikSammlung && buttonRechts.style.backgroundColor != "orange") {
    buttonRechts.style.backgroundColor = "green";
    buttonRechts.style.display = "flex";
    buttonSpace.style.display = "flex";
    buttonLinks.style.backgroundColor = "green";
    buttonLinks.style.display = "flex";
  } else if (msFilterTitel.length !== 1) {
    buttonRechts.style.backgroundColor = "white";
    buttonRechts.style.display = "flex";
    buttonSpace.textContent = " ";
    buttonSpace.style.display = "none";
    buttonLinks.style.backgroundColor = "white";
    buttonLinks.style.display = "flex";
  } else if (msFilterTitel.length === 1) {
    buttonRechts.style.display = "none";
    buttonSpace.textContent = " ";
    buttonSpace.style.display = "none";
    buttonLinks.style.display = "none";
  }
  // inputText.hidden = true;
  displayText();
}

function displayText() {
  if (inputText.textContent === "KUNO") {
    ritterKuno.hidden = false;
    containerGesamt.hidden = true;
    containerUnten.hidden = true;
    buttonLinks.hidden = true;
    buttonRechts.hidden = true;
    buttonSpace.hidden = true;
  }
  eingabeHide();
  containerGesamt.hidden = false;
  containerOben.hidden = false;
  containerTitel.hidden = false;
  containerTonart.hidden = false;
  containerUnten.hidden = false;
  outputText.hidden = false;
  outputTitel.hidden = false;
  outputTonart.hidden = false;
  outputTitel.textContent = "";
  outputTitel.style.color = "black";
  outputTitel.style.backgroundColor = "white";
  containerTitel.style.backgroundColor = "white";
  outputTonart.textContent = "";
  outputTonart.style.color = "black";
  outputTonart.style.backgroundColor = "white";
  containerTonart.style.backgroundColor = "white";
  outputText.textContent = "";
  inputText.textContent = String(inputText.textContent).trimEnd();

  for (m of musikSammlung) {
    if (String(m.nummer).toUpperCase() === String(inputText.textContent).toUpperCase()) {
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
        fontGroesse = fontGroesse - 1;
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
        fontGroesse = fontGroesse - 1;
        outputTonart.style.fontSize = `${fontGroesse}px`;
      }
      break;
    }
  }

  if (inputText.textContent !== "KUNO") {
    outputText.textContent = inputText.textContent;
    let fontGroesse = 1;
    do {
      fontGroesse = fontGroesse + 1;
      outputText.style.fontSize = `${fontGroesse}px`;
      outputText.style.fontFamily = "Times";
      outputText.style.overflowWrap = "normal";
      // outputText.style.hyphens = "auto";
      outputText.textContent = inputText.textContent;
    } while (
      (outputText.clientHeight < containerGesamt.clientHeight) &
      (outputText.clientWidth <= containerGesamt.clientWidth)
    );
    fontGroesse = fontGroesse - 1;
    outputText.style.fontSize = `${fontGroesse}px`;
    outputText.textContent = inputText.textContent;
  }
}

function startInput() {
  eingabeShow();
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
  // inputText.hidden = false;

  // buttonLinks.style.backgroundColor = "white";
  // buttonRechts.style.backgroundColor = "white";

  outputText.textContent = "";
  outputTitel.textContent = "";
  outputTonart.textContent = "";

  buttonSpace.textContent = " ";
  buttonSpace.style.display = "none";

  inputText.textContent = "";

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
    parseFloat(inputText.textContent) > 0 &&
    parseFloat(inputText.textContent) < 1000 &&
    musikSammlung.filter((e) => e.nummer === inputText.textContent).length === 0
  ) {
    msFilterTitel = musikSammlung;
    let i = parseFloat(inputText.textContent);
    while (i >= 0) {
      const arrayTemp = musikSammlung.filter((e) => parseFloat(e.nummer) === i);
      if (arrayTemp.length > 0) {
        inputText.textContent = arrayTemp[0].nummer;
        break;
      }
      i = i - 1;
    }
  }
  let index = 0;
  for (m of msFilterTitel) {
    if (
      String(inputText.textContent) === String(m.nummer) ||
      String(inputText.textContent) === String(m.titel).toUpperCase()
    ) {
      // alert("! "+inputText.textContent);
      index = msFilterTitel.indexOf(m);
      // alert("index"+index);
      // alert("msFiTiLength:"+msFilterTitel.length);
      if (index < msFilterTitel.length - 1) {
        inputText.textContent = msFilterTitel[index + 1].nummer;
        // alert("msFiTi.index..index+1..index+2.nummer"+musikSammlung[index].nummer + "/"+musikSammlung[index+1].nummer + "/"+musikSammlung[index+2].nummer);
      }
      if (msFilterTitel[index + 1].nummer === "Anhang") {
        inputText.textContent = msFilterTitel[index + 1].titel.toUpperCase();
      }
      displayText();
      break;
    }
  }
  // if (buttonRechts.style.backgroundColor !== "green") {
  //   buttonSpace.textContent = " ";
  //   buttonSpace.style.display = "none";
  // }
}

function nachLinks() {
  if (msFilterTitel.length === 1) {
    msFilterTitel = musikSammlung;
  }
  if (
    parseFloat(inputText.textContent) > 0 &&
    parseFloat(inputText.textContent) < 1000 &&
    musikSammlung.filter((e) => e.nummer === inputText.textContent).length === 0
  ) {
    msFilterTitel = musikSammlung;
    let i = parseFloat(inputText.textContent);
    while (i <= musikSammlung[musikSammlung.length - 1].nummer) {
      const arrayTemp = musikSammlung.filter((e) => parseFloat(e.nummer) === i);
      if (arrayTemp.length > 0) {
        inputText.textContent = arrayTemp[0].nummer;
        break;
      }
      i = i + 1;
    }
  }

  let index = 0;
  for (m of msFilterTitel) {
    if (
      inputText.textContent === String(m.nummer) ||
      inputText.textContent === String(m.titel).toUpperCase()
    ) {
      index = msFilterTitel.indexOf(m);
      if (index > 0) {
        inputText.textContent = msFilterTitel[index - 1].nummer;
      }
      if (msFilterTitel[index - 1].nummer === "Anhang") {
        inputText.textContent = msFilterTitel[index - 1].titel.toUpperCase();
      }
      displayText();
      break;
    }
  }
  // if (buttonLinks.style.backgroundColor !== "red") {
  //   buttonSpace.textContent = " ";
  //   buttonSpace.style.display = "none";
  // }
}

function eingabeHide() {
  containerEingabe.hidden = true;
  inputText.hidden = true;
  containerFavoriten.hidden = true;
  // buttonEinfachTusch.hidden = true;
  // buttonDreifachTusch.hidden = true;
  buttonPrinz.hidden = true;
  buttonBauer.hidden = true;
  buttonJungfrau.hidden = true;
  buttonProsit.hidden = true;
  buttonHappyBirthday.hidden = true;
  autoCheck.hidden = true;
  for (b of buttonABC) {
    b.hidden = true;
  }
  for (b of buttonZahl) {
    b.hidden = true;
  }
  buttonLeer.hidden = true;
  buttonZurück.hidden = true;
  leerzeile.hidden = true;
  buttonReturn.hidden = true;
}

function eingabeShow() {
  containerEingabe.hidden = false;
  inputText.hidden = false;
  inputText.style.backgroundColor = "rgb(96, 150, 244)";
  speicherIndex = speicher.length;
  speicherZähler.textContent = speicher.length === 0 ? "Speicher ist leer" :  speicher.length + " im Speicher";
  containerFavoriten.hidden = false;
  // buttonEinfachTusch.hidden = false;
  // buttonDreifachTusch.hidden = false;
  buttonPrinz.hidden = false;
  buttonBauer.hidden = false;
  buttonJungfrau.hidden = false;
  buttonProsit.hidden = false;
  buttonHappyBirthday.hidden = false;
  speicherPlus.style.display = "none";
  if (speicher.length === 0) {
    speicherCall.hidden = true;
  } else {
    speicherCall.hidden = false
  };
  speicherZurück.hidden = true;
  speicherVor.hidden = true;
  speicherEntfern.hidden = true;
  speicherVerlassen.hidden = true;
  speicherLeeren.hidden = true;
  autoCheck.hidden = false;
  for (b of buttonABC) {
    b.hidden = false;
  }
  for (b of buttonZahl) {
    b.hidden = false;
  }
  buttonLeer.hidden = false;
  buttonZurück.hidden = false;
  leerzeile.hidden = false;
  buttonReturn.hidden = false;
  buttonReturn.style.backgroundColor = "dodgerblue";
  buttonZurück.style.backgroundColor = "lightgray";
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

