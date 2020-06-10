var input = document.getElementById("input");
var output = document.getElementById("output");
var key = document.getElementById("key");
var reset = document.getElementById("resetButton");
var scramble = document.getElementById("scrambleButton");
var warning = document.getElementById("warning");
var settingsHeader = document.getElementById("settings").getElementsByTagName("h2")[0];

var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖabcdefghijklmnopqrstuvwxyzåäö";
var list = characters.split("");
var reveredList = list.slice();
reveredList.reverse();

window.onload = function() {
  if (localStorage.getItem("key") != null) {
    key.value = localStorage.getItem("key");
  }
}

function updateOutput() {
  output.value = crypt(input.value);
}

function updateKey() {
  if (characters != key.value) {
    characters = key.value;
    localStorage.setItem("key", characters);
    console.log("saved");
    list = characters.split("");
    reveredList = list.slice();
    reveredList.reverse();
    updateOutput();

    var listCopy = characters.split("");
    for (var i = 0; i < list.length; i ++) {
      var char = listCopy[0];
      listCopy.splice(0,1)
      if (listCopy.includes(char)) {
        key.style.backgroundColor = "indianred";
        settingsHeader.innerHTML = "WARNING: The key contains duplicates of: \'" + char + "\', the code will not work correctly";
        return;
      }
    }
    key.style.backgroundColor = "palegreen";
    settingsHeader.innerHTML = "Key settings";
  }
}

input.oninput = function() {
  updateOutput();
}

key.oninput = function() {
  updateKey();
}

scramble.onclick = function() {
  key.value = shuffleString(key.value);
  characters = key;
  updateKey();
}
reset.onclick = function() {
  key.value = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖabcdefghijklmnopqrstuvwxyzåäö";
  characters = key;
  updateKey();
}

function crypt(text) {
  var textArray = text.split("");
  for (var i = 0; i < textArray.length; i ++) {
    var character = textArray[i];
    if (list.includes(character)) {
      var position = list.indexOf(character);
      character = reveredList[position];
    }
    textArray[i] = character;
  }

  text = "";
  for (var i = 0; i < textArray.length; i++) {
    text = text + textArray[i];
  }
  return text;
}

function shuffleString(string) {
  var tempList = string.split("");
  shuffle(tempList);
  return tempList.join("");
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
