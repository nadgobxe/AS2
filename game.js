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
var timeoutRandomExplode = 0;

var conditionTrigger = 0;

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


// randomPoint ======================================================================================
function randomExplode() {

	var windowWidth = window.innerWidth; //get canvas total width

	var retriveTank = document.getElementsByClassName('tank')[0];
	var offsetTankLeft = retriveTank.offsetLeft;

	var canvasLength = windowWidth - offsetTankLeft; // value of remaining distance from tank to left end of the canvas
	conditionTrigger = Math.floor(canvasLength * Math.random()); // modify conditionTrigger value in the global scope
}
randomExplode(); // call function first time
// end ==============================================================================================


// dead player ======================================================================================

// end ==============================================================================================
// explode bombs ====================================================================================
function explodeBomb(bomb) {

    var explosion = document.createElement('div');
    explosion.classList.add('explosion');
    document.body.appendChild(explosion);

    explosion.style.left = bomb.offsetLeft + 15 + "px";
    explosion.style.top = bomb.offsetTop + 15 + "px";

	function explosionOff() {
		explosion.classList.remove('explosion');
	}

	setTimeout(explosionOff, 1000) // bomb control - 3rd part sets explosion off after 1 sec

}
// end ==============================================================================================


// move bombs =======================================================================================
function moveBomb() {

    var bombs = document.getElementsByClassName('bomb');

    for (var i = 0; i < bombs.length; i++) {

        var bombsInitialPosition = bombs[i].offsetLeft;

        if (bombsInitialPosition > conditionTrigger) { //randomPoint

            bombs[i].style.left = bombsInitialPosition - 1 + "px";

		// is statement for player collision with bomb

        } else {

            explodeBomb(bombs[i]);
            bombs[i].remove();
			
        }
		
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
	randomExplode();
	

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