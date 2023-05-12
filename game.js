var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;

var player = document.getElementById('player');
var tanks = document.getElementsByClassName('tank');
var start = document.getElementsByClassName('start')[0];
var bombs = document.getElementsByClassName('bomb');

var timeoutTank = 0;
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
function explosion(bomb) {
	var explosion = document.createElement('div');
	explosion.classList.add('explosion');
	bomb.appendChild(explosion);

	explosion.style.top = bomb.offsetTop + 'px';
	explosion.style.left = bomb.offsetLeft + 'px';

	var bombsParent = bomb.parentNode;
	bombsParent.removeChild(bomb);

	setTimeout(function () {
		var explosionParent = explosion.parentNode;
		explosionParent.removeChild(explosion);
	}, 2000)


}

function moveBomb(bomb) {
	var bombLeft = bomb.offsetLeft;

	if (bombLeft > 0) {
		bomb.style.left = bombLeft - 1 + 'px';
	} else {
		explosion(bomb);
	}
}

function addBomb(tank) {
	var bombs = document.createElement('div');
	bombs.classList.add('bomb');
	document.body.appendChild(bombs);
	bombs.style.top = tank.offsetTop + 10 + 'px';
	bombs.style.left = tank.offsetLeft + 'px';
	bombs.style.zIndex = 2;
}

function tanksSpawn(tank) {
	var randomPointY = (Math.floor(Math.random() * window.innerHeight));
	tank.style.top = randomPointY + 68 + 'px';

	var tankTopValue = tank.style.top;
	var parseTankTopValue = parseInt(tankTopValue);

	if (window.innerHeight < parseTankTopValue + 68) { //avoid tank going off from the canvas
		tank.style.top = randomPointY - 68 + "px";
	}

	addBomb(tank); // call bombs
}

function myLoadFunction() {

	start.addEventListener('click', startGame);

	for (var i = 0; i < tanks.length; i++) {
		tanks[i].style.display = 'none';
	}

}

function startGame() {

	timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
	start.style.display = 'none';

	for (var i = 0; i < tanks.length; i++) {
		tanks[i].style.display = 'block';
	}
	timeoutTank = setInterval(function () {
		for (var i = 0; i < tanks.length; i++) {
			tanksSpawn(tanks[i]);
		}
	}, 3000);

	timeoutBomb = setInterval(function () {

		for (var i = 0; i < bombs.length; i++) {
			var newBombs = bombs[i];
			moveBomb(newBombs);
		}
	}, 10);


}

document.addEventListener('DOMContentLoaded', myLoadFunction);