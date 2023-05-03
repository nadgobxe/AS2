var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;

var startBar = document.getElementsByClassName('start')[0];
var tanks = document.getElementsByClassName('tank');

var timeoutTanks = 0;
var timeout = 0;

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
// remove start bar
function removeStartBar() {
	startBar.style.display = "none";

	//show tanks
	for (var i = 0; i < tanks.length; i++) {
		tanks[i].style.display = "block";
	}
}
startBar.addEventListener('click', removeStartBar);
//end 

// spawn randomly tanks
function spawnTanks() {
	var windowHeight = window.innerHeight;
	for (var i = 0; i < tanks.length; i++) {
		randomPointY = (Math.floor(Math.random() * windowHeight));
		console.log("Value of WindowHeight is" + tanks[i].style.top);
		tanks[i].style.top = randomPointY + 68 + "px";

		var tankTopValue = tanks[i].style.top;
		var parseTankTopValue = parseInt(tankTopValue);
		console.log(parseTankTopValue);

		if (windowHeight < parseTankTopValue + 68) { //avoid tank going off from the canvas
			console.log("Value of WindowHeight is -<<<<<" + windowHeight);
			tanks[i].style.top = randomPointY - 68 + "px";
		}
	}


}
// end

function myLoadFunction() {
	timeoutTanks = setInterval(spawnTanks, 1000);
	timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);

	//hide tanks
	for (var i = 0; i < tanks.length; i++) {
		tanks[i].style.display = "none";
	}

}

document.addEventListener('DOMContentLoaded', myLoadFunction);