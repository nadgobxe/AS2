var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;

var lastPressed = false;
var timeout = 0;

var selectStartBar = document.getElementsByClassName('start')[0]; //select Start Bar
var selectTanks = document.getElementsByClassName('tank'); // select tanks



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

function addBomb(tank) {
	var tankPosition = tank.offsetTop;
	var bomb = document.createElement('div');
	bomb.className = "bomb";
	bomb.style.top = tank.style.width + 10 + "px";
	tank.appendChild(bomb)
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

	for (var i = 0; i < selectTanks.length; i++) {
		selectTanks[i].style.display = "none";
	}
	selectStartBar.addEventListener('click', startGame);
}

function startGame() {
	selectStartBar.style.display = "none";
	// tank starting to fire
	for (var i = 0; i < selectTanks.length; i++) {
		selectTanks[i].style.display = "display";
		randomTanksSpawn(selectTanks[i]);
		addBomb(selectTanks[i]);
	}

}

document.addEventListener('DOMContentLoaded', myLoadFunction);