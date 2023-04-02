var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;

function keyup(event) {
	var player = document.getElementById("player");
	if (event.keyCode == 37) {
		leftPressed = false;
		lastPressed = "left";
	}
	if (event.keyCode == 39) {
		rightPressed = false;
		lastPressed = "right";
	}
	if (event.keyCode == 38) {
		upPressed = false;
		lastPressed = "up";
	}
	if (event.keyCode == 40) {
		downPressed = false;
		lastPressed = "down";
	}

	player.className = "character stand " + lastPressed;
	console.log(player.className);
}

function move() {
	var player = document.getElementById("player");
	var positionLeft = player.offsetLeft;
	var positionTop = player.offsetTop;
	if (downPressed) {
		var newTop = positionTop + 1;

		player.style.top = newTop + "px";

		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = "character walk down";
			}
		}
	}
	if (upPressed) {
		var newTop = positionTop - 1;

		player.style.top = newTop + "px";

		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = "character walk up";
			}
		}
	}
	if (leftPressed) {
		var newLeft = positionLeft - 1;

		player.style.left = newLeft + "px";

		player.className = "character walk left";
	}
	if (rightPressed) {
		var newLeft = positionLeft + 1;

		player.style.left = newLeft + "px";

		player.className = "character walk right";
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

function myLoadFunction() {
	timeout = setInterval(move, 10);
	document.addEventListener("keydown", keydown);
	document.addEventListener("keyup", keyup);
}

let startButton = document.getElementsByClassName('start'); // select start div

function tankStart() {  // tank function
	var numberOfTanks = document.querySelectorAll('body > div.tank'); // select all 3 tank class divs
	var randomTankFire = Math.floor(Math.random() * numberOfTanks.length); // generate a random number based on the number of divs with tank class
	var selectTank = numberOfTanks[randomTankFire]; // select on tank from all off them
	numberOfTanks[randomTankFire].classList.add("explosion"); // add explosion class
	console.log("test_start_tankstart");
	for (var i = 0; i < numberOfTanks.length; i++) {	  // show the selected tank
		selectTank.style.display = "block";
	}
};

var selectCactus = document.querySelectorAll("body >div.cactus");
var playerNew = document.querySelector("#player");


function startGame() {
	startButton[0].style.display = "none"; // hide start div
	tankStart() // call tankstart function
	console.log("test StartGame")
}

function loadStartGame() { // load startGame()
	startButton[0].addEventListener('click', startGame);
}

function preventCollision(player, cactus) {
	setInterval(function () {
		var playerRect = player.getBoundingClientRect();
		var cactusRect = cactus.getBoundingClientRect();
		//   console.log(player.offsetWidth);
		//   console.log(cactusRect.left);

		if (playerRect.x + playerRect.width >= cactusRect.x &&
			playerRect.x <= cactusRect.x + cactusRect.width &&
			playerRect.y + playerRect.height >= cactusRect.y &&
			playerRect.y <= cactusRect.y + cactusRect.height) {
			console.log("collision detected!");
			console.log("player width is:" + playerRect.width);
			console.log("player x is:" + playerRect.x);
			console.log("cactus x is:" + cactusRect.x);
			console.log("player height is:" + playerRect.height);
			console.log("player y is:" + playerRect.y);
			console.log("cactus y is:" + cactusRect.y);
			console.log("Cactus Height is:" + cactusRect.height)
			// handle collision here, for example:
			// player.style.display = "none";

			if (playerRect.x - playerRect.width > cactusRect.x && leftPressed) {
				player.style.left = (playerRect.x + 5) + "px";
				console.log(playerRect.x + "coming from left");
			}
			if (playerRect.x < cactusRect.x + cactusRect.width && rightPressed) {
				player.style.left = (playerRect.x - 5) + "px";
				// console.log(playerRect.x + "coming from right");
			}
			if (playerRect.y + playerRect.height > cactusRect.y && downPressed) {
				player.style.top = (playerRect.y - 5) + "px";
				// console.log(playerRect.x + "from top");
			}
			if (playerRect.y < cactusRect.y + cactusRect.height && upPressed) {
				player.style.top = (playerRect.y + 5) + "px";
				// console.log(playerRect.x + "from bottom");
			}
		}
	}, 10); // check for collision every 10 milliseconds
}

preventCollision(playerNew, selectCactus[0]);

// Testing Area
var numberOfTanks = document.querySelectorAll('body > div.tank');
console.log(numberOfTanks);
var randomTankFire = Math.floor(Math.random() * numberOfTanks.length);
console.log(randomTankFire);
var selectTank = numberOfTanks[randomTankFire];
console.log(selectTank);
console.log(playerNew);


// initial code that was not working
// let startButton = document.getElementsByClassName('start');

// function startGame() {
// 	startButton[0].style.display = "none";
// 	console.log("test")
// }
// startButton.addEventListener('click', startGame);
// 
// link1: https://stackoverflow.com/questions/26107125/cannot-read-property-addeventlistener-of-null
// bug2: debugged by using console.log(startButton) = index 0 with value
// bug 3: had to add defer to game.html as the script was starting before dom loading


document.addEventListener("DOMContentLoaded", myLoadFunction);
document.addEventListener("DOMContentLoaded", loadStartGame); // Loads LoadStartGame()
document.addEventListener("DOMContentLoaded", detectCollision);