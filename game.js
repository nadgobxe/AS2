var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;

var lastPressed = false;
var timeout = 0;

var selectStartBar = document.getElementsByClassName('start')[0]; //select Start Bar
var selectTanks = document.getElementsByClassName('tanks'); // select tanks



function keyup(event) {
	var player = document.getElementById('player');
	if (event.keyCode == 37) {
		leftPressed = false;
		lastPressed = 'left';
	}
	if (event.keyCode == 39) {
		rightPressed = false;
		lastPressed = 'right';
	}
	if (event.keyCode == 38) {
		upPressed = false;
		lastPressed = 'up';
	}
	if (event.keyCode == 40) {
		downPressed = false;
		lastPressed = 'down';
	}

	player.className = 'character stand ' + lastPressed;
}

function move() {
	var player = document.getElementById('player');
	var positionLeft = player.offsetLeft;
	var positionTop = player.offsetTop;

	if (downPressed == true) {
		var newTop = positionTop + 1;
		player.style.top = newTop + 'px';
		player.className = 'character walk down';
	}
	if (upPressed == true) {
		var newTop = positionTop - 1;
		player.style.top = newTop + 'px';
		player.className = 'character walk up';
	}
	if (leftPressed == true) {
		var newLeft = positionLeft - 1;
		player.style.left = newLeft + 'px';
		player.className = 'character walk left';
	}
	if (rightPressed == true) {
		var newLeft = positionLeft + 1;
		player.style.left = newLeft + 'px';
		player.className = 'character walk right';
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



function loopItems(param, loopFunction) { // reusable function param = item select via for loop (tank, bomb, explosion etc) and loopFunction is the traget function like (randomTanks)
	for (var i = 0; i < param.length; i++) {
		loopFunction(param[i]);
	}
}


function randomTanksSpawn(tank) {
	var randomize = Math.floor(Math.random() * window.innerHeight); // generate random number
	tank.style.display = "block";
	tank.style.top = randomize + "px";
	console.log("Value of the tank is" + tank);
}

function myLoadFunction() {

	timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);


	selectStartBar.addEventListener('click', startGame);
}

function startGame() {
	// tank starting to fire
	selectStartBar.style.display = "none";
	selectTanks.style.display = "none";
	randomTanksSpawn(selectTanks[0]);
}

document.addEventListener('DOMContentLoaded', myLoadFunction);