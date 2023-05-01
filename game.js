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

function bombControl() {
	
	var bombs = document.getElementsByClassName('bomb');

	for (var i = 0; i < bombs.length; i++) {
		var left = bombs[i].offsetLeft;
		var top = bombs[i].offsetTop;

		if (left <= 1) { // check if bomb has reached left edge
			bombExplode(bombs[i]); // trigger explosion
		}
	}

	function bombExplode(bomb) { // reusable function
		var explosion = document.createElement('div'); // add explosion class when bomb offsetLeft reaches 1
		explosion.classList.add('explosion');

		explosion.style.top = bomb.offsetTop + "px"; // add explosion based on the last bomb position
		explosion.style.left = bomb.offsetLeft + "px";
		document.body.appendChild(explosion);

		function removeExplosion() {
			var newExplosions = document.getElementsByClassName('explosion'); // remove explosion after 5 seconds
			for (var j = 0; j < newExplosions.length; j++) {
				newExplosions[j].classList.remove('explosion');
			}
		}
		setTimeout(removeExplosion, 1000); // explosion active for 1 second and then removals class ('explosion')

		bomb.remove();
	}
}
//==============================================================================================================================================
function moveBomb(elBomb) { //bomb control - first part is moves the bomb as long as bomb.offsetLeft is bigger or equal with 0

	var bombLeft = elBomb.offsetLeft;
	var bombTop = elBomb.offsetTop;

	if (bombLeft >= 0) {

		elBomb.style.left = bombLeft - 1 + "px";
		var elBomb = document.elementFromPoint(bombLeft, bombTop);

		if (elBomb.classList.contains('head') || elBomb.classList.contains('body')) {
			//call playerCollisionWithBomb()
			console.log("Hey - I'm dead");

			var bombs = document.getElementsByClassName('bomb');
			
			
			bombControl(); // triggers bomb explosion

			var deadPlayer = document.getElementById('player');
			deadPlayer.classList.add("dead");

			var removeClassListArray = ["stand", "walk", "up", "down", "left", "right"];
			for (var i = 0; i < removeClassListArray.length; i++) {
				deadPlayer.classList.remove(removeClassListArray[i]);
			}
		}
	} else { //bomb control - 2nd part activates the explosion as soon as bomb.offsetLeft is less than 0 px
		
		bombControl(); //call bombControl() function
	}
}

//===============================================================================================================

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