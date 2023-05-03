var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;

var startBar = document.getElementsByClassName('start')[0];
var tanks = document.getElementsByClassName('tank');

var timeoutTanks = 0;
var timeout = 0;
var timeoutBomb = 0;

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
	if (downPressed) {
		var newTop = positionTop + 1;

		player.style.top = newTop + 'px';

		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk down';
			}
		}
	}
	if (upPressed) {
		var newTop = positionTop - 1;

		player.style.top = newTop + 'px';

		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk up';
			}
		}
	}
	if (leftPressed) {
		var newLeft = positionLeft - 1;

		player.style.left = newLeft + 'px';

		player.className = 'character walk left';
	}
	if (rightPressed) {
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

// move bombs =======================================================================================
function moveBomb() {
	var bombs = document.getElementsByClassName('bomb')
	for (var i = 0; i < bombs.length; i++) {
	var bombsInitialPosition = bombs[i].offsetLeft;
	bombs[i].style.left = bombsInitialPosition - 1 + "px";
}
}
// end bombs ========================================================================================


// add bombs ========================================================================================
function addBomb() {

	var body = document.body;

	for (var i = 0; i < tanks.length; i++) {
		var bomb = document.createElement('div');
		bomb.classList.add('bomb');
		body.appendChild(bomb);

		bomb.style.top = tanks[i].offsetTop + 10 + "px";
		bomb.style.left = tanks[i].offsetLeft + "px";

		console.log(tanks[i].offsetLeft);
	}

	clearInterval(timeoutBomb); // when addBomb repeats we clearInterval to avoid increasing the speed of the bombs
	
}
// end ========================================================================================


// spawn randomly tanks ==============================================================================
function spawnTanks() {
	var windowHeight = window.innerHeight;

	for (var i = 0; i < tanks.length; i++) {
		randomPointY = (Math.floor(Math.random() * windowHeight));
		// console.log("Value of WindowHeight is" + tanks[i].style.top);
		tanks[i].style.top = randomPointY + 68 + "px";

		var tankTopValue = tanks[i].style.top;
		var parseTankTopValue = parseInt(tankTopValue);
		// console.log(parseTankTopValue);

		if (windowHeight < parseTankTopValue + 68) { //avoid tank going off from the canvas
			// console.log("Value of WindowHeight is -<<<<<" + windowHeight);
			tanks[i].style.top = randomPointY - 68 + "px";
		}
	}

	addBomb();
	timeoutBomb = setInterval(moveBomb, 10);
	
}
// end =============================================================================================


// start game  || remove start bar || add tanks ====================================================
function startGame() {
	startBar.style.display = "none";
	timeoutTanks = setInterval(spawnTanks, 2500);

	//show tanks
	for (var i = 0; i < tanks.length; i++) {
		tanks[i].style.display = "block";
	}
}
startBar.addEventListener('click', startGame);
//end ================================================================================================


function myLoadFunction() {
	timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);

	//hide tanks
	for (var i = 0; i < tanks.length; i++) {
		tanks[i].style.display = "none";
	}

}

document.addEventListener('DOMContentLoaded', myLoadFunction);