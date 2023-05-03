var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;

var lastPressed = false;
var timeout = 0;
var timeoutBomb = 0;
var repeatBombInterval = 0;
var bombClearOutInterval = 0;

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
/// suport for player hit animation ////
function removeEventDom() {
	document.removeEventListener('keyup', keyup);
	document.removeEventListener('keydown', keydown);
	upPressed = false; //bug fix when restart stoping the player going on the last direction
	downPressed = false;
	leftPressed = false;
	rightPressed = false;
	lastPressed = false;
}

function activateEvenDom() {
	document.addEventListener('keyup', keyup);
	document.addEventListener('keydown', keydown);
}

//////////////////////////////// end

function removeLife() {
	var player = document.getElementById("player");
	
	var healthBar = document.getElementsByClassName('health')[0];
	var li = healthBar.getElementsByTagName('li');
	if (li.length > 1) {
		li[0].remove();
		player.className = 'character hit  ' + lastPressed; //hit feature
		removeEventDom(); // remove keyCode event listener
		setTimeout(activateEvenDom, 1000); // resume walking 1 sec after impact
	}

	else {
		// gameover
		playerDead(); // call playerDead function
		removeEventDom(); // remove keyCode event listener when gameover
		li[0].remove(); // remove the last life - call gameover
	}

}

function bombClearOut() { //clear out all bombs from the screen when gameover
	var bombs = document.getElementsByClassName('bomb');
	for (var i = 0; i < bombs.length; i++) {
		bombControl(bombs[i]);
	}
}

function playerDead() {
	var deadPlayer = document.getElementById("player");
	deadPlayer.className = 'character dead';
	var gameOver = document.getElementsByClassName('start')[0]; // game over bar with dead character
	gameOver.style.display = "block";
	gameOver.classList.remove('start');
	gameOver.classList.add('gameover');
	gameOver.innerHTML = "GAME OVER - PLAY AGAIN";

	bombClearOutInterval = setInterval(bombClearOut(), 10); //call bombClearOut
	setTimeout = (bombClearOut, 1000);

	gameOver.addEventListener('click', refreshGame); // call reset game function
	clearInterval(timeout); // stop checking for movement
	clearInterval(timeoutBomb); // stop adding more bombs and increasing the speed of the game
	clearInterval(repeatBombInterval); // stop bombs when gameover (bomb collides with player)
}

function refreshGame() { //reset game
	var gameOver = document.getElementsByClassName('gameover')[0]; //switch hud bar from gameover to start game
	gameOver.classList.remove('gameover');
	gameOver.classList.add('start');
	gameOver.style.display = "block";

	var player = document.getElementById('player'); // restore player position and class
	player.className = 'character stand';
	player.style.top = "80vh";
	player.style.left = "200px";

	var health = document.getElementsByClassName('health')[0];

	for (var i = 0; i < 3; i++) {
		var li = document.createElement("li");
		health.appendChild(li);
	}

	timeout = setInterval(move, 10); //start checking for movement

	upPressed = false; //bug fix when restart stoping the player going on the last direction
	downPressed = false;
	leftPressed = false;
	rightPressed = false;
	lastPressed = false;

	startGame();
	conditionTrigger = 0;
}
//start random bomb explode
var conditionTrigger = 0;
function randomExplode() {

	var windowWidth = window.innerWidth; //get canvas total width

	var retriveTank = document.getElementsByClassName('tank')[0];
	var offsetTankLeft = retriveTank.offsetLeft;

	var canvasLength = windowWidth - offsetTankLeft; // value of remaining distance from tank to left end of the canvas
	conditionTrigger = Math.floor(canvasLength * Math.random()); // modify conditionTrigger value in the global scope


}
randomExplode(); // call function first time

function bombControl(elBomb) { //bomb explosion
	var explosion = document.createElement('div');
	explosion.classList.add('explosion');

	var top = elBomb.offsetTop;
	var left = elBomb.offsetLeft;

	explosion.style.top = top + 15 + "px";
	explosion.style.left = left + 15 + "px";
	document.body.appendChild(explosion);
	explosion.style.position = "absolute";

	elBomb.classList.remove('bomb');
	elBomb.remove();

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

	console.log("Exploding Point Value is:" + conditionTrigger);
	if (bombLeft >= conditionTrigger) {
		elBomb.style.left = bombLeft - 1 + "px";
		var elBombAtPos = document.elementFromPoint(bombLeft, bombTop); //check position from top/left points
		var elBombAtPosInverse = document.elementFromPoint(bombRight, bombBottom); //check position from inverse points

		if (elBombAtPos.classList.contains("head") || elBombAtPos.classList.contains("body") || elBombAtPosInverse.classList.contains("head") || elBombAtPosInverse.classList.contains("body")) { //check collision from multiple points
			console.log("Hey - I'm dead");
			removeLife(); // call removeLife
			bombControl(elBomb); // call bombControl
		}
	} else {
		bombControl(elBomb), 1500;
	}
}

//===============================================================================================================
// end bomb settings

function addBomb(tank) { // add tank div on canvas

	randomExplode(); // call random explosion point again

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
		addBomb(selectTanks[i])
	}
}

//end triggers

function startGame() {
	selectStartBar.style.display = "none";
	lastPressed = false;
	repeatBombInterval = setInterval(triggerTankSpawn, 5000); // spawn bomb and tank each 5 sec
	timeoutBomb = setInterval(function () {
		triggerMoveBomb(moveBomb);
	}, 10); // ignite bomb movement	
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
}

document.addEventListener('DOMContentLoaded', myLoadFunction);