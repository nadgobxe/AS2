var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;

var selectStart = document.getElementsByClassName('start')[0];
var tanks = document.getElementsByClassName('tank');
var bombs = document.getElementsByClassName('bomb');

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
function explodeBomb(element) {
	var explosion = document.createElement('div');
	explosion.classList.add('explosion');
	document.body.appendChild(explosion);
	explosion.style.left = element.offsetLeft + 15 + "px";
	explosion.style.top = element.offsetTop + 15 + "px";
	function explosionOff() {
		explosion.classList.remove('explosion');
		explosion.remove();
		clearInterval(timeoutBomb);
	}
	setTimeout(explosionOff, 1000) // bomb control - 3rd part sets explosion off after 1 sec
}

function moveElement() {
	for (var i = 0; i < bombs.length; i++) {
		var element = bombs[i];
		var left = element.offsetLeft;
		var top = element.offsetTop;
		var bottom = element.offsetTop - element.offsetHeight;

			if ((left > 0 /* conditionTrigger ) && (left > 0 conditionTrigger || top > 0) && (top > 0 && bottom < (window.innerHeight - 1)*/)) {
				left = left - 1;
				top = top - 1;

				// element.style.top = top + "px";
				element.style.left = left + "px";
			}
			else {
				explodeBomb(element);
				element.classList.remove('bomb');
				element.remove();
			}
	}
}

function spawnTanks() {
	for (var i = 0; i < tanks.length; i++) {
		randomPointY = (Math.floor(Math.random() * window.innerHeight));

		tanks[i].style.top = randomPointY + 68 + "px";
		var tankTopValue = tanks[i].style.top;
		var parseTankTopValue = parseInt(tankTopValue);

		if (window.innerHeight < parseTankTopValue + 68) {
			tanks[i].style.top = randomPointY - 68 + "px";
		}

		var bomb = addBomb();

		bomb.style.left = tanks[i].offsetLeft + 'px';
		bomb.style.top = tanks[i].offsetTop + 'px';
		// bomb.style.position = 'absolute';

		moveElement(bomb);
	}
}

function addBomb() {
	var bomb = document.createElement('div');
	bomb.classList = 'bomb';
	document.body.appendChild(bomb);

	return bomb;
}

function reuseableForLoop(element, property) {
	for (var i = 0; i < element.length; i++) {
		element[i].style.display = property;
	}
}

function startGame() {
	selectStart.style.display = 'none';
	timeout = setInterval(move, 10);
	timeoutMove = setInterval(moveElement, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
	timeoutTanks = setInterval(spawnTanks, 5000);
	reuseableForLoop(tanks, 'block');
}

function myLoadFunction() {
	selectStart.addEventListener('click', startGame);
	reuseableForLoop(tanks, 'none');
}

document.addEventListener('DOMContentLoaded', myLoadFunction);