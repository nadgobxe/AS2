var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;

var lastPressed = false;
var timeout = 0;

var tankArray = document.getElementsByClassName('tank');

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


function addBomb(tank) { //add bomb

	var bomb = document.createElement('div');
	bomb.classList.add('bomb');
	var body = document.body;
	body.appendChild(bomb);
	bomb.style.top = tank.offsetTop + 10 + 'px';
	bomb.style.left = tank.offsetLeft + 'px';
	bomb.style.position = "absolute";
	console.log(tank.offsetTop);
	console.log(tank.offsetLeft);
	timeout = setInterval(moveBomb, 10);
}




function moveBomb() { //move bomb
	var bombs = document.getElementsByClassName('bomb');


	for (var i = 0; i < bombs.length; i++) {  // loop through all bombs
		var left = bombs[i].offsetLeft;
		var top = bombs[i].offsetTop

		function bombExplode() { // reusable function
			var explosion = document.createElement('div'); // add explosion class when bomb offsetLeft reaches 1
			explosion.classList.add('explosion');


			explosion.style.top = bombs[i].offsetTop + "px"; // add explosion based on the last bomb position
			explosion.style.left = bombs[i].offsetLeft + "px";
			document.body.appendChild(explosion);


			function removeExplosion() {
				var newExplosions = document.getElementsByClassName('explosion'); // remove explosion after 5 seconds
				for (var j = 0; j < newExplosions.length; j++) {
					newExplosions[j].classList.remove('explosion');
				}
			}
			setTimeout(removeExplosion, 1000);

			bombs[i].remove();
		}
		/// Start Life Counting ///

		var healthDiv = document.getElementsByClassName('health')[0];
		var lifeBalls = healthDiv.getElementsByTagName('li');
		var lifeCount = lifeBalls.length;

		if (left >= 1) {
			console.log(left);
			bombs[i].style.left = left - 1 + 'px';  // bomb going from tank towards the left edge
			var elementBomb = document.elementFromPoint(left, top);
			if (elementBomb.classList.contains('head') || elementBomb.classList.contains('body')) {

				console.log("ZZzzZZZZZZZzzzZZZZZZZZ"); // testing collision


				console.log("My number of lifes is" + lifeCount); // check my logic

				if (lifeCount >= 1) {

					healthDiv.removeChild(lifeBalls[0]); // Remove a life ball from the DOM
					lifeCount--;
				}




				///////////////
				else if (lifeCount == 0) {
					player.className = 'character dead'; // set css style for dead

					var gameOver = document.getElementsByClassName('start')[0]; // game over bar with dead character
					gameOver.style.display = "block";
					gameOver.classList.remove('start');
					gameOver.classList.add('gameover');
					gameOver.innerHTML = "Game Over";

					bombExplode(); // call bombExplosion

					gameOver.addEventListener('click', refreshGame); // call reste game function
				}
			}
		}
		else {

			bombExplode(); // call bombExplosion
		}
	}
}

function myLoadFunction() {
	timeout = setInterval(move, 10); /* This line constantly checks if any of the below statements are true or not: 'keydown' or 'keyup'. If I press the "left key," the 'keydown' function will execute and start moving the player towards the left. When I release the left key, the 'keyup' function comes into action and player stops moving. */
	document.addEventListener('keydown', keydown); /* trigger for move function */
	document.addEventListener('keyup', keyup); /* stops move function */

}

function startGame() {
	var selectStartButton = document.getElementsByClassName('start');  /* Selects HTML elements with the class 'start' */
	selectStartButton[0].style.display = 'none'; /*Removes the start bar */	

	function repeatBomb() {
		for (var i = 0; i < tankArray.length; i++) { // add bomb to each tank start position
			var tankElement = tankArray[i];
			addBomb(tankElement);
		}
	}
	
	setInterval(repeatBomb, 2500); // Call repeatBomb() every 5 seconds
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

	for (var i = 0; i < 3; i++) { //restore no of lifes
		var healthDiv = document.getElementsByClassName('health')[0];
		var li = document.createElement("li");
		healthDiv.appendChild(li);
	}

	startGame();
}

document.addEventListener('click', startGame);
document.addEventListener('DOMContentLoaded', myLoadFunction);