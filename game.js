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

function bombExplosion() {
	var selectBombs = document.getElementsByClassName('bomb')[0];
	var left = selectBombs.offsetLeftl
	windowWidth = window.innerWidth;
	var tankLocation = document.getElementsByClassName('tank')[0];


	if (left <= 0) {
		console.log("STOPPPPP");
		console.log("left is" + left);
		console.log
	}
}

function moveBomb(elBomb) {
	var bombLeft = elBomb.offsetLeft;
	elBomb.style.left = bombLeft - 1 + "px";
}

function addBomb(tank) {
	var bomb = document.createElement('div');
	left = tank.offsetLeft;
	top = tank.offsetTop + 151;
	bomb.className = "bomb";
	bomb.style.top = top + 10 + "px";
	bomb.style.left = left + "px";
	bomb.style.position = "absolute";
	var body = document.body;
	body.appendChild(bomb);
}

// end bomb settings

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

//triggers

function triggerMoveBomb(functionParam) { //reussable function used for bombMove
	var bombs = document.getElementsByClassName('bomb');
	for (var i = 0; i < bombs.length; i++) {
		functionParam(bombs[i]);
		console.log(bombs[0]);
	}
}

function triggerTankSpawn() {
	for (var i = 0; i < selectTanks.length; i++) {
		selectTanks[i].style.display = "display";
		randomTanksSpawn(selectTanks[i]);
		addBomb(selectTanks[i]);
	}
}

//end triggers

function startGame() {
	selectStartBar.style.display = "none";

	triggerTankSpawn(); // tank spawn
	
	setInterval(function () {
		triggerMoveBomb(moveBomb);
	}, 10); // ignite bomb movement	
	bombExplosion();
}

document.addEventListener('DOMContentLoaded', myLoadFunction);