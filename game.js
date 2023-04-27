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


function addBomb(tank) {

		var bomb = document.createElement('div');
		bomb.classList.add('bomb');
		var body = document.body;
		body.appendChild(bomb);
		bomb.style.top = tank.offsetTop + 10 + 'px';
		bomb.style.left = tank.offsetLeft + 'px';
		bomb.style.position = 'absolute';
		console.log(tank.offsetTop);
		console.log(tank.offsetLeft);
		setInterval(moveBomb, 10);
}


function moveBomb() {
	var bombs = document.getElementsByClassName('bomb');

	for (var i = 0; i < tankArray.length; i++) { 
		var viewportW = window.innerWidth;
		var left = bombs[i].offsetLeft;
		if(left > 0) {
			console.log(left);
			bombs[i].style.left = left - 1 + 'px'; 
		}
		else {
	
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
	for (var i = 0; i < tankArray.length; i++) {
		var tankElement = tankArray[i];
		addBomb(tankElement);
	};
}

document.addEventListener('click', startGame);
document.addEventListener('DOMContentLoaded', myLoadFunction);