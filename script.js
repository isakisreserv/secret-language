var input = document.getElementById("input");
var output = document.getElementById("output");
var key = document.getElementById("key");
var reset = document.getElementById("resetButton");
var scramble = document.getElementById("scrambleButton");
var warning = document.getElementById("warning");

var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖabcdefghijklmnopqrstuvwxyzåäö";
var list = characters.split("");
var reveredList = list.slice();
reveredList.reverse();

window.onload = function() {
  if (localStorage.getItem("key") != null) {
    key.value = localStorage.getItem("key");
  }
  update();
  setInterval(update, 500);
}

function update() {
  output.value = crypt(input.value);
  if (characters != key.value) {
    characters = key.value;
    localStorage.setItem("key", characters);
    console.log("saved");
    list = characters.split("");
    reveredList = list.slice();
    reveredList.reverse();
    output.value = crypt(input.value);

    var listCopy = characters.split("");
    for (var i = 0; i < list.length; i ++) {
      var char = listCopy[0];
      listCopy.splice(0,1)
      if (listCopy.includes(char)) {
        key.style.backgroundColor = "#f4354c";
        warning.innerHTML = "WARNING: The key contains duplicates of: \'" + char + "\', the code will not work correctly";
        return;
      }
    }
    key.style.backgroundColor = "white";
    warning.innerHTML = "";
  }
}

scramble.onclick = function() {
  key.value = shuffleString(key.value);
  characters = key;
}
reset.onclick = function() {
  key.value = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖabcdefghijklmnopqrstuvwxyzåäö";
  characters = key;

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
  string = "";
  for (var i = 0; i < tempList.length; i++) {
    string = string + tempList[i];
  }
  return string;
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
