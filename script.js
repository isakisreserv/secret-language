var input = document.getElementById("input");
var output = document.getElementById("output");
var key = document.getElementById("key");
var button = document.getElementById("button");

var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖabcdefghijklmnopqrstuvwxyzåäö0123456789";  //
var list = characters.split("");
var reveredList = list.slice();
reveredList.reverse();

setInterval(update, 500);

function update() {
  console.log("ey");
  output.value = crypt(input.value);
}

button.onclick = function() {
  characters = key.value;
  list = characters.split("");
  reveredList = list.slice();
  reveredList.reverse();
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
