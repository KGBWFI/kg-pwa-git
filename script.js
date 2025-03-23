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
const containerButtons = document.getElementById("containerButtons");
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
const speicherLetzteAnzeige =document.getElementById("speicherLetzteAnzeige");
const speicherPlus = document.getElementById("speicherPlus");
const speicherCall = document.getElementById("speicherCall");
const speicherZurück = document.getElementById("speicherZurück");
const speicherZähler = document.getElementById("speicherZähler");
const speicherVor = document.getElementById("speicherVor");
const speicherEntfernen = document.getElementById("speicherEntfernen");
const speicherVerlassen = document.getElementById("speicherVerlassen");
const speicherLeeren = document.getElementById("speicherLeeren");
const karneval = document.getElementById("Karneval");
const umusik = document.getElementById("UMusik");
const marschheft = document.getElementById("Marschheft");

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
let musikstueckequelle = "Karneval";
let automatik = "an";

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

speicherLetzteAnzeige.addEventListener("onclick", speicherLast);
speicherLetzteAnzeige.addEventListener("mousedown", speicherLast);

speicherPlus.addEventListener("onclick", speicherPush);
speicherPlus.addEventListener("mousedown", speicherPush);

speicherCall.addEventListener("onclick", speicherShow);
speicherCall.addEventListener("mousedown", speicherShow);

speicherZurück.addEventListener("onclick", speicherShowBefore);
speicherZurück.addEventListener("mousedown", speicherShowBefore);

speicherVor.addEventListener("onclick", speicherShowNext);
speicherVor.addEventListener("mousedown", speicherShowNext);

speicherEntfernen.addEventListener("onclick", speicherRemove);
speicherEntfernen.addEventListener("mousedown", speicherRemove);

speicherVerlassen.addEventListener("onclick", speicherLeave);
speicherVerlassen.addEventListener("mousedown", speicherLeave);

speicherLeeren.addEventListener("onclick", speicherClear);
speicherLeeren.addEventListener("mousedown", speicherClear);

karneval.addEventListener("onclick", musikQuelleWaehlen);
karneval.addEventListener("mousedown", musikQuelleWaehlen);

umusik.addEventListener("onclick", musikQuelleWaehlen);
umusik.addEventListener("mousedown", musikQuelleWaehlen);

marschheft.addEventListener("onclick", musikQuelleWaehlen);
marschheft.addEventListener("mousedown", musikQuelleWaehlen);



function speicherLast() {
  inputText.textContent = speicher[speicherIndex-1];
  endInput();
}

function speicherPush() {
  if (inputText.textContent != "" && inputText.style.backgroundColor != "orange") {
    speicher.push(inputText.textContent);
    ++speicherIndex;
    // speicherZähler.textContent = speicher.length + " im Speicher";
    // inputText.style.backgroundColor = "orange";
    // buttonZurück.style.backgroundColor = "orange";
    speicherCall.hidden = false;
  }
  if (inputText.textContent != "" && inputText.style.backgroundColor === "orange") {
    speicher[speicherIndex - 1] = inputText.textContent;
  }
}

function speicherShow() {
  if (inputText.style.backgroundColor != "orange") {
    speicherIndex = speicher.length;
  }
  inputText.textContent = speicher[speicherIndex - 1];
  inputText.style.backgroundColor = "orange";
  buttonReturn.style.backgroundColor = "red";
  speicherZähler.textContent = speicherIndex + "/" + speicher.length;
  speicherLetzteAnzeige.style.display = "none";
  speicherZähler.hidden = false;
  speicherVor.hidden = false;
  speicherZurück.hidden = false;
  speicherCall.hidden = true;
  speicherPlus.hidden = true;
  speicherEntfernen.hidden = false;
  speicherVerlassen.hidden = false;
  speicherLeeren.hidden = false;
}

function speicherShowBefore() {
  speicher[speicherIndex - 1] = inputText.textContent;
  if (speicherIndex > 1) {
    --speicherIndex;
    inputText.textContent = speicher[speicherIndex - 1];
    speicherZähler.textContent = speicherIndex + "/" + speicher.length;
    // speicherIndex === speicher.length ? speicherVor.hidden = true : speicherVor.hidden = false;
    // speicherIndex === 1 ? speicherZurück.hidden = true : speicherZurück.hidden = false;
  }
}

function speicherShowNext() {
  speicher[speicherIndex - 1] = inputText.textContent;
  if (speicherIndex < speicher.length) {
    ++speicherIndex;
    inputText.textContent = speicher[speicherIndex - 1];
    speicherZähler.textContent = speicherIndex + "/" + speicher.length;
    // speicherIndex === speicher.length ? speicherVor.hidden = true : speicherVor.hidden = false;
    // speicherIndex === 1 ? speicherZurück.hidden = true : speicherZurück.hidden = false;
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
      } else {
        inputText.style.backgroundColor = "rgb(96, 150, 244)";
        startInput();
      };
    };
  } else {
    return;
  };
}

function speicherLeave() {
  speicher[speicherIndex - 1] = inputText.textContent;
  inputText.style.backgroundColor = "rgb(96, 150, 244)";
  startInput();
}

function speicherClear() {
  if (confirm("Speicher KOMPLETT löschen?")) {
    while (speicher.length > 0) {
      speicher.pop();
      speicherIndex = speicher.length;
    }
    inputText.style.backgroundColor = "rgb(96, 150, 244)";
    startInput()
  } else {
    return;
  };
}

function updateInput(e) {
  buttonReturn.style.backgroundColor = "red";
  const t = e.srcElement.textContent
  if (t === "⏎") {
    if (inputText.style.backgroundColor != "orange" && inputText.textContent != "") {
      speicherPush();
    }
    if (inputText.style.backgroundColor === "orange") {
      speicher[speicherIndex - 1] = inputText.textContent;
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
      buttonReturn.style.backgroundColor = "darkgrey";
    }
  } else {
    inputText.textContent = inputText.textContent + t;
  }
}

function automatikEinaus(e) {
  if (autoCheck.style.backgroundColor === "lightgray") {
    automatik = "an";
    autoCheck.style.backgroundColor = "red";
    autoCheck.textContent = "Automatik ist an";
    autoCheck.style.fontWeight = "normal";
    switch(musikstueckequelle){
      case "Karneval":
        karneval.style.color = "red";
        break;
      case "U-Musik":
        umusik.style.color = "red";
        break;
      case "Marschheft":
        marschheft.style.color = "red";
    }
    musikSammlung = msGeladen;
  } else {
    automatik = "aus";
    autoCheck.style.backgroundColor = "lightgray";
    autoCheck.textContent = "Freitext ohne Automatik";
    autoCheck.style.fontWeight = "normal";
    karneval.style.color = "gray";
    umusik.style.color = "gray";
    marschheft.style.color = "gray";
    musikSammlung = [];
  }
};

function musikQuelleWaehlen(e){
  musikstueckequelle = e.srcElement.textContent;
  alert(musikstueckequelle);
  musikSammlungErstellen();
  switch (musikstueckequelle){
    case "Karneval":
    karneval.style.color = "red";
    umusik.style.color = "gray";
    marschheft.style.color = "gray";
    break;

    case "U-Musik":
    karneval.style.color = "gray";
    umusik.style.color = "red";
    marschheft.style.color = "gray";
    break;

    case "Marschheft":
    karneval.style.color = "gray";
    umusik.style.color = "gray";
    marschheft.style.color = "red";
    break;
  }
  autoCheck.style.backgroundColor = "lightgray";
  automatikEinaus();
}

async function getText(file) {
  let myText = "";
  let myObject = await fetch(file);
  myText = await myObject.text();
  return myText;
}

async function musikSammlungErstellen() {
  let _musikSammlung = [];
  let _musikStueckeQuellText = await getText(musikstueckequelle);
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
  speicher.push(inputText.textContent);
  ++speicherIndex;
  endInput();
}
buttonBauer.addEventListener("touchend", displayBauer);
buttonBauer.addEventListener("mousedown", displayBauer);
function displayBauer() {
  inputText.textContent = "68";
  speicher.push(inputText.textContent);
  ++speicherIndex;
  endInput();
}
buttonJungfrau.addEventListener("touchend", displayJungfrau);
buttonJungfrau.addEventListener("mousedown", displayJungfrau);
function displayJungfrau() {
  inputText.textContent = "33";
  speicher.push(inputText.textContent);
  ++speicherIndex;
  endInput();
}
buttonProsit.addEventListener("touchend", displayProsit);
buttonProsit.addEventListener("mousedown", displayProsit);
function displayProsit() {
  inputText.textContent = "15";
  speicher.push(inputText.textContent);
  ++speicherIndex;
  endInput();
}
buttonHappyBirthday.addEventListener("touchend", displayHappyBirthday);
buttonHappyBirthday.addEventListener("mousedown", displayHappyBirthday);
function displayHappyBirthday() {
  inputText.textContent = "Happy Birthday in As";
  speicher.push(inputText.textContent);
  ++speicherIndex;
  endInput();
}

function endInput(e) {
  eingabeHide();
  inputText.textContent = String(inputText.textContent).toUpperCase();
  inputText.textContent = String(inputText.textContent).trim();
  if (inputText.textContent === "") {
    inputText.textContent = "KUNO";
  }
  // if (inputText.textContent === "T") {
  //   inputText.textContent = "1 x TUSCH";
  // }
  // if (String(inputText.textContent).startsWith("TT")) {
  //   inputText.textContent = "3 x TUSCH";
  // }
  // if (inputText.textContent === "H") {
  //   inputText.textContent = "Happy Birthday in As";
  // }
  // if (inputText.textContent === "P") {
  //   inputText.textContent = "3";
  // }
  // if (inputText.textContent === "B") {
  //   inputText.textContent = "68";
  // }
  // if (inputText.textContent === "J") {
  //   inputText.textContent = "33";
  // }
  // if (inputText.textContent === "K") {
  //   inputText.textContent = "KUNO";
  //   ritterKuno.hidden = false;
  // }
  //      check ob eine evtl. eingegebene Zahl zu einer Nummer eines MS passt - dann darf sie nicht in der folgenden Suchfunktion verwendet werden
  msFilterNummer = musikSammlung.filter((m) => String(m.nummer) === String(inputText.textContent));
  msFilterTitel = musikSammlung;
  
  if (msFilterNummer.length === 0) {
    console.log(musikSammlung);
    msFilterTitel = musikSammlung.filter((m) => m.titel.toUpperCase().includes(inputText.textContent));
    buttonSpace.textContent = "..." + inputText.textContent + "...";
    buttonSpace.style.display = "flex";
    for (m of msFilterTitel) {
      inputText.textContent = m.nummer;
      speicher[speicherIndex-1] = inputText.textContent;
      if (m.nummer === "Anhang") {
        inputText.textContent = m.titel.toUpperCase();
      }
      if (m.nummer === "KG Blau-Weiß Fischenich") {
        inputText.textContent = "";
      }
      break;
    }
  }
  if (msFilterTitel.length > 1 && msFilterTitel !== musikSammlung) {
    buttonRechts.style.backgroundColor = "green";
    buttonRechts.textContent = "▶️";
    // buttonRechts.style.display = "flex";
    buttonSpace.style.display = "flex";
    buttonLinks.style.backgroundColor = "green";
    // buttonLinks.style.display = "none";
    buttonLinks.textContent = "";
    buttonLinks.style.background = "transparent";
  } else if (speicher.length > 1) {
    buttonRechts.style.backgroundColor = "orange";
    if (speicherIndex === speicher.length) {
      // buttonRechts.style.display = "none";
      buttonRechts.textContent = "";
      buttonRechts.style.background = "transparent"
    } else {
      // buttonRechts.style.display = "flex";
      buttonRechts.textContent = "▶️";
      buttonRechts.style.backgroundColor = "orange";
    }
    buttonSpace.style.display = "flex";
    buttonSpace.textContent = `Verlauf ${speicherIndex}/${speicher.length}`;
    buttonLinks.style.backgroundColor = "orange";
    if (speicherIndex === 1) {
      // buttonLinks.style.display = "none";
      buttonLinks.textContent = "";
      buttonLinks.style.backgroundColor = "transparent";
    } else {
      // buttonLinks.style.display = "flex";
      buttonLinks.textContent = "◀️";
      buttonLinks.style.backgroundColor = "orange";
    }
  } else {
    // buttonRechts.style.display = "none";
    buttonRechts.textContent = "";
    buttonRechts.style.background = "transparent"
    buttonSpace.textContent = "";
    buttonSpace.style.display = "flex";
    // buttonLinks.style.display = "none";
    buttonLinks.textContent = "";
    buttonLinks.style.background = "transparent"

  }
  displayText();
}

function displayText() {
  if (inputText.textContent != "KUNO"){
    speicher[speicherIndex - 1] = inputText.textContent;
  }
  if (inputText.textContent === "KUNO") {
    ritterKuno.hidden = false;
    containerGesamt.hidden = true;
    containerUnten.hidden = true;
    // containerButtons.display = "none";
    return;
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
      } else if (String(m.mappe).startsWith("rot")) {
        containerTitel.style.backgroundColor = "red";
        outputTitel.style.backgroundColor = "red";
        outputTitel.style.color = "white";
        containerTonart.style.backgroundColor = "red";
        outputTonart.style.backgroundColor = "red";
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
    let fontGroesse = 1;
    if (musikstueckequelle === "Marschheft" && automatik === "an" && msFilterTitel.length > 0) {
      inputText.textContent = "MH " + inputText.textContent;
    }
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
  // containerEingabe.hidden = false;
  // inputText.hidden = false;

  // buttonLinks.style.backgroundColor = "white";
  // buttonRechts.style.backgroundColor = "white";

  outputText.textContent = "";
  outputTitel.textContent = "";
  outputTonart.textContent = "";

  buttonSpace.textContent = " ";
  buttonSpace.style.display = "none";

  inputText.textContent = "";

  // containerOben.style.backgroundColor = "white";
  // containerTitel.style.backgroundColor = "white";
  // containerTonart.style.backgroundColor = "white";
  // containerUnten.style.backgroundColor = "white";
  // outputTitel.style.backgroundColor = "white";
  // outputTonart.style.backgroundColor = "white";
  // outputText.style.backgroundColor = "rgba(1, 1, 1, 0.001)";
  // containerUnten.style.backgroundColor = "white";

  outputTitel.style.color = "black";
  outputTonart.style.color = "black";
  outputText.style.color = "black";

  msFilterTitel = musikSammlung;

  if (inputText.style.backgroundColor != "orange") {
    inputText.style.backgroundColor = "rgb(96, 150, 244)";
  } else {
    speicherShow();
  }
}

function nachRechts() {
  if (buttonRechts.style.backgroundColor === "orange") {
    if (speicherIndex < speicher.length) {
      ++speicherIndex;
      buttonSpace.textContent = `Verlauf ${speicherIndex}/${speicher.length}`;
      inputText.textContent = speicher[speicherIndex - 1];
      if (speicherIndex > 1) {
        // buttonLinks.style.display = "flex";
        buttonLinks.textContent = "◀️";
        buttonLinks.style.backgroundColor = "orange";
      };
      if (speicherIndex === speicher.length) {
        // buttonRechts.style.display = "none";
        buttonRechts.textContent = "";
        buttonRechts.style.backgroundColor = "transparent";
      }
      displayText();
    }
  } else if (buttonRechts.style.backgroundColor === "green"){
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
        index = msFilterTitel.indexOf(m);
        if (index < msFilterTitel.length - 1) {
          inputText.textContent = msFilterTitel[index + 1].nummer;
        }
        if (msFilterTitel[index + 1].nummer === "Anhang") {
          inputText.textContent = msFilterTitel[index + 1].titel.toUpperCase();
        }
        if (index + 1 === msFilterTitel.length - 1) {
          // buttonRechts.style.display = "none";
          buttonRechts.textContent = "";
          buttonRechts.style.backgroundColor = "transparent";
        }
        if (index + 1 > 0) {
          // buttonLinks.style.display = "flex";
          buttonLinks.textContent = "◀️";
          buttonLinks.style.backgroundColor = "green";
        }
        displayText();
        break;
      }
    }
  }
}

function nachLinks() {
  if (buttonLinks.style.backgroundColor === "orange") {
    if (speicherIndex > 1) {
      --speicherIndex;
      inputText.textContent = speicher[speicherIndex - 1];
      buttonSpace.textContent = `Verlauf ${speicherIndex}/${speicher.length}`;
      if (speicherIndex === 1) {
        // buttonLinks.style.display = "none";
        buttonLinks.textContent = "";
        buttonLinks.style.backgroundColor = "transparent";
      };
      if (speicherIndex < speicher.length) {
        // buttonRechts.style.display = "flex";
        buttonRechts.textContent = "▶️";
        buttonRechts.style.backgroundColor = "orange";
      }
      displayText();
    }
  } else if (buttonLinks.style.backgroundColor === "green"){
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
        if (index - 1 < msFilterTitel.length - 1) {
          // buttonRechts.style.display = "flex";
          buttonRechts.textContent = "▶️";
          buttonRechts.style.backgroundColor = "green";
        }
        if (index - 1 === 0) {
          // buttonLinks.style.display = "none";
          buttonLinks.textContent = "";
          buttonLinks.style.backgroundColor = "transparent";
        }
        displayText();
        break;
      }
    }
  }
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
  // inputText.style.backgroundColor = "rgb(96, 150, 244)";
  if (inputText.style.backgroundColor != "orange") {
    speicherIndex = speicher.length;
    speicherZähler.textContent = speicher.length === 0 ? "Verlauf ist leer" : speicherZähler.hidden = true;
    speicherLetzteAnzeige.style.display = speicher.length === 0 ? "none" : "flex";
  }
  containerFavoriten.style.display = "none";
  // containerFavoriten.hidden = false;
  // buttonEinfachTusch.hidden = false;
  // buttonDreifachTusch.hidden = false;
  buttonPrinz.hidden = false;
  buttonBauer.hidden = false;
  buttonJungfrau.hidden = false;
  buttonProsit.hidden = false;
  buttonHappyBirthday.hidden = false;
  speicherLetzteAnzeige.style.display = "flex";
  speicherPlus.style.display = "none";
  if (speicher.length === 0) {
    speicherCall.hidden = true;
    speicherLetzteAnzeige.style.display = "none";
  } else {
    speicherCall.hidden = false;
    speicherLetzteAnzeige.style.display = "flex";
  };
  speicherZurück.hidden = true;
  speicherVor.hidden = true;
  speicherEntfernen.hidden = true;
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
  buttonReturn.style.backgroundColor = "darkgrey";
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

