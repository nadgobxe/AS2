var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;

function keyup(event) {
	var player = document.getElementById("player");
	if (event.keyCode == 37) {
		leftPressed = false;
		lastPressed = "left";
	}
	if (event.keyCode == 39) {
		rightPressed = false;
		lastPressed = "right";
	}
	if (event.keyCode == 38) {
		upPressed = false;
		lastPressed = "up";
	}
	if (event.keyCode == 40) {
		downPressed = false;
		lastPressed = "down";
	}

	player.className = "character stand " + lastPressed;
	console.log(player.className);
}

function move() {
	var player = document.getElementById("player");
	var positionLeft = player.offsetLeft;
	var positionTop = player.offsetTop;
	if (downPressed) {
		var newTop = positionTop + 2;

		player.style.top = newTop + "px";

		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = "character walk down";
			}
		}
	}
	if (upPressed) {
		var newTop = positionTop - 3;

		player.style.top = newTop + "px";

		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = "character walk up";
			}
		}
	}
	if (leftPressed) {
		var newLeft = positionLeft - 1;

		player.style.left = newLeft + "px";

		player.className = "character walk left";
	}
	if (rightPressed) {
		var newLeft = positionLeft + 1;

		player.style.left = newLeft + "px";

		player.className = "character walk right";
	}
}

function keydown(event) {
	if (event.keyCode == 37) {
		leftPressed = true;
	}
	if (event.keyCode == 39) {
		rightPressed = true;
	}
	if (event.keyCode == 38) {
		upPressed = true;
	}
	if (event.keyCode == 40) {
		downPressed = true;
	}
}

function myLoadFunction() {
	timeout = setInterval(move, 10);
	document.addEventListener("keydown", keydown);
	document.addEventListener("keyup", keyup);
}


let startButton = document.getElementsByClassName('start');

function startGame() {
	startButton[0].style.display = "none";
	// tank function here
	console.log("test")
}



if (startButton[0]) {
	startButton[0].addEventListener('click', startGame);
}

// initial code that was not working
// let startButton = document.getElementsByClassName('start');

// function startGame() {
// 	startButton[0].style.display = "none";
// 	console.log("test")
// }
// startButton.addEventListener('click', startGame);
// 
// link1: https://stackoverflow.com/questions/26107125/cannot-read-property-addeventlistener-of-null
// bug2: debugged by using console.log(startButton) = index 0 with value
// bug 3: had to add defer to game.html as the script was starting before dom loading


document.addEventListener("DOMContentLoaded", myLoadFunction);
