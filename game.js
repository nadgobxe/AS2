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
		var element = document.elementFromPoint(positionLeft, newTop + 46); /* Detect position X/Y axis and return the top element at the specified coordinates. In our case, we would like to find when we collide with the 'cactus' class. To do that, we have to check for element.classList.contains('cactus') */

		console.log("Value of Element is :" + element.className);

		if (element.classList.contains('cactus') == false && element.classList.contains('tank') == false) {
			player.style.top = newTop + 'px';
		}
		player.className = 'character walk down';

	}
	if (upPressed == true) {
		var newTop = positionTop - 1;
		var element = document.elementFromPoint(positionLeft, newTop);

		if (element.classList.contains('cactus') == false && element.classList.contains('tank') == false) {
			player.style.top = newTop + 'px';
		}
		player.className = 'character walk up';
	}
	if (leftPressed == true) {
		var newLeft = positionLeft - 1;
		var element = document.elementFromPoint(newLeft, positionTop);

		if (element.classList.contains('cactus') == false && element.classList.contains('tank') == false) {
			player.style.left = newLeft + 'px';
		}
		player.className = 'character walk left';
	}
	if (rightPressed == true) {
		var newLeft = positionLeft + 1;
		var element = document.elementFromPoint(newLeft + 32, positionTop);

		if (element.classList.contains('cactus') == false && element.classList.contains('tank') == false) {
			player.style.left = newLeft + 'px';
		}
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




function playerDead() {
	var deadPlayer = document.getElementById("player");
	deadPlayer.classList.add("dead");
	var removeClassListArray = ["stand", "walk", "up", "down", "left", "right"];
	for (var i = 0; i < removeClassListArray.length; i++) {
		deadPlayer.classList.remove(removeClassListArray[i]);
	}
}

function bombControl(elBomb) { //bomb explosion
	var explosion = document.createElement('div');
	explosion.classList.add('explosion');

	var top = elBomb.offsetTop;
	var left = elBomb.offsetLeft;

	explosion.style.top = top + "px";
	explosion.style.left = left + "px";
	document.body.appendChild(explosion);
	explosion.style.position = "absolute";

	elBomb.classList.remove('bomb');

	function explosionOff() {
		explosion.classList.remove('explosion')
	}
	console.log("TOP is:" + top);
	setTimeout(explosionOff, 1000) // bomb control - 3rd part sets explosion off after 1 sec
	console.log("Stop Bomb at the edge of the left screen")
}
//==============================================================================================================================================
function moveBomb(elBomb) { //bomb movement + bomb explosion end of screen and bomb explosion(call function bombControl) when meets players
	var bombLeft = elBomb.offsetLeft;
	var bombTop = elBomb.offsetTop;
	var bombRight = elBomb.offsetLeft + 31;
	var bombBottom = elBomb.offsetTop + 10;

	if (bombLeft >= 0) {
		elBomb.style.left = bombLeft - 1 + "px";
		var elBombAtPos = document.elementFromPoint(bombLeft, bombTop); //check position from top/left points
		var elBombAtPosInverse = document.elementFromPoint(bombRight, bombBottom); //check position from inverse points

		if (elBombAtPos.classList.contains("head") || elBombAtPos.classList.contains("body") || elBombAtPosInverse.classList.contains("head") || elBombAtPosInverse.classList.contains("body")) { //check collision from multiple points
			console.log("Hey - I'm dead");
			playerDead() // call playerDead function
			bombControl(elBomb); // call bombControl
		}
	} else {
		bombControl(elBomb); // when bomb reach end of screen (bomb.offsetLeft == 0) then explode
	}
}

//===============================================================================================================
// end bomb settings

function addBomb(tank) { // add tank div on canvas
	var bomb = document.createElement('div');
	bomb.classList.add('bomb');
	var body = document.body;
	body.appendChild(bomb);
	bomb.style.top = tank.offsetTop + 10 + 'px';
	bomb.style.left = tank.offsetLeft + 'px';
	bomb.style.position = "absolute";
}



function randomTanksSpawn(tank) { // randomize tank css position
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