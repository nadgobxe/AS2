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
function playerCollisionWithBomb() {

}

function bombControl(elBomb) {
	var explosion = document.createElement('div');
	explosion.classList.add('explosion');
	var body = document.body;
	body.appendChild(explosion);
	explosion.style.top = elBomb.offsetTop + "px";
	explosion.style.left = elBomb.offsetLeft + "px";
	// explosion.style.position = "absolute";
	elBomb.classList.remove('bomb');
	function explosionOff() {
		explosion.classList.remove('explosion')
	}
	setTimeout(explosionOff, 1000) // bomb control - 3rd part sets explosion off after 1 sec
	console.log("Stop Bomb at the edge of the left screen")
}

function moveBomb(elBomb) { //bomb control - first part is moves the bomb as long as bomb.offsetLeft is bigger or equal with 0

	var bombLeft = elBomb.offsetLeft;
	var bombTop = elBomb.offsetTop;

	if (bombLeft >= 0) {

		elBomb.style.left = bombLeft - 1 + "px";
		var elBomb = document.elementFromPoint(bombLeft, bombTop);

		if (elBomb.classList.contains('head') || elBomb.classList.contains('body')) {
			//call playerCollisionWithBomb()
			console.log("Hey - I'm dead");
			
			bombControl(elBomb); // triggers bomb explosion

			var deadPlayer = document.getElementById('player');
			deadPlayer.classList.add("dead");

			var removeClassListArray = ["stand", "walk", "up", "down", "left", "right"];
			for (var i = 0; i < removeClassListArray.length; i++) {
				deadPlayer.classList.remove(removeClassListArray[i]);
			}
		}
	} else { //bomb control - 2nd part activates the explosion as soon as bomb.offsetLeft is less than 0 px

		bombControl(elBomb); //call bombControl() function
	}
}

function addBomb(tank) {
	var bomb = document.createElement('div');
	bomb.classList.add('bomb');
	var body = document.body;
	body.appendChild(bomb);
	bomb.style.top = tank.offsetTop + 10 + 'px';
	bomb.style.left = tank.offsetLeft + 'px';
	bomb.style.position = "absolute";
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
}

document.addEventListener('DOMContentLoaded', myLoadFunction);