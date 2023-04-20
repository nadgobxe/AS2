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

function tankStart(tank) {  // tank function

	var windowHeight = window.innerHeight;
	var left = tank.offsetLeft;
	var top = tank.offsetTop;
	var selectTank = document.getElementsByClassName("tank");

	var one = document.getElementsByClassName("one");
	var two = document.getElementsByClassName("two");
	var three = document.getElementsByClassName("three");

	var tankArray = [one[1], two[1], three[1]];


	function move() {
		var selectBomb = document.getElementsByClassName('bomb');
		for (var i = 0; i < selectBomb.length; i++) {
			var startPosition = selectBomb[i].offsetLeft;
			console.log(startPosition);
			var windowStart = window.innerWidth;
			console.log(windowStart);
			var tankStart = selectTank[0].offsetLeft;
			console.log(tankStart);
			var tankPosition = windowStart - tankStart;
			var explosionMoment = (windowStart - tankPosition) + startPosition;
			console.log("explosion location" + explosionMoment);
			var explosionLocationCoordonates = 750;
			var explosionLocation = document.querySelector("body");
			explosionLocation.style.left =  explosionLocationCoordonates;
			if (explosionMoment <= 750) {
				selectBomb[i].style.display = "none";
				var explosion = document.createElement('div')
				explosion.className = 'explosion';
				explosionLocation.appendChild(explosion);
				clearInterval(timer);
			}
			selectBomb[i].style.left = startPosition - 1 + 'px';
		}
	}

	function generateRandomTank(tank) {
		var randomTankPosition = Math.floor((Math.random() * (windowHeight - 150))); // generate a random number based on the number of divs with tank class
		tank.style.top = randomTankPosition + "px";
		var bomb = document.createElement('div');
		bomb.className = "bomb";
		bomb.style.top = tank.style.width + 10 + "px";
		tank.appendChild(bomb); // source https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild // https://stackoverflow.com/questions/49824383/javascript-document-createelement-not-showing-any-results

		var timer = setInterval(move, 100);
	
	};

	for (var i = 0; i < tankArray.length; i++) {
		var tankElement = tankArray[i];
		console.log(`test tankElement${tankElement}`);
		generateRandomTank(tankElement);
	}


	console.log(one[0]);
	console.log("Tank3 Position is:" + top);
	console.log(windowHeight);
	console.log("my name is: " + tank);
	console.log(two[0]);
};

var selectCactus = document.getElementsByClassName('cactus');
var selectTank = document.getElementsByClassName('tank');
var playerNew = document.querySelector("#player");


function startGame() {
	startButton[0].style.display = "none"; // hide start div
	var selectTank = document.getElementsByClassName("tank");
	for (var i = 0; i < selectTank.length; i++) {
		tankIndex = i;
		selectTank[tankIndex].style.display = "block";
		tankStart(selectTank[tankIndex]);
	};
	console.log("test StartGame")
}

function loadStartGame() { // load startGame()
	startButton[0].addEventListener('click', startGame);
}

function preventCollision(player, cactus) {
	setInterval(function () {
		var playerRect = player.getBoundingClientRect(); //https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
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


var cactusIndex

for (var i = 0; i < selectCactus.length; i++) {
	cactusIndex = i;
	preventCollision(playerNew, selectCactus[cactusIndex]); // select all cactus rather than use selectCactus[0];
};

var tankIndex

for (var i = 0; i < selectTank.length; i++) {
	tankIndex = i;
	preventCollision(playerNew, selectTank[tankIndex]);
};


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



// avoid tank overlapping

	// var tankOne = tankArray[0].getBoundingClientRect();
		// var tankTwo = tankArray[1].getBoundingClientRect();
		// var tankThree = tankArray[2].getBoundingClientRect();
		// console.log("Bouding Value is: " + tankOne.height);

		// if (tankOne.y + tankOne.height <= tankTwo.y && tankOne.y <= tankTwo.y + tankTwo.height) {
		// 	tankArray[0].style.top = tankOne.y + tankTwo.height + 10 + "px";
		// 	console.log("collision detected tank 1 with tank2");
		// } else if (tankTwo.y + tankTwo.height <= tankOne.y && tankTwo.y <= tankOne.y + tankOne.height) {
		// 	tankArray[1].style.top = tankTwo.y + tankOne.height + 10 + "px";
		// 	console.log("collision detected tank 2 with tank1");
		// } 
		//  else if (tankOne.y + tankOne.height <= tankThree.y && tankOne.y <= tankThree.y + tankThree.height) {
		// 	tankArray[0].style.top = tankOne.y + tankThree.height + 10 + "px";
		// 	console.log("collision detected tank 1 with tank3");
		// } 
		// else if (tankThree.y + tankThree.height <= tankOne.y && tankThree.y <= tankOne.y + tankOne.height) {
		// 	tankArray[2].style.top = tankThree.y + tankOne.height + 10 + "px";
		// 	console.log("collision detected tank 3 with tank 1");
		// }
		// else if (tankTwo.y + tankTwo.height <= tankThree.y && tankTwo.y <= tankThree.y + tankThree.height) {
		// 	tankArray[2].style.top = tankTwo.y + tankThree.height + 10 + "px";
		// 	console.log("collision detected tank 2 with tank 3");
		// } else if (tankThree.y + tankThree.height <= tankTwo.y && tankThree.y <= tankTwo.y + tankTwo.height) {
		// 	tankArray[1].style.top = tankThree.y + tankTwo.height + 10 + "px";
		// 	console.log("collision detected tank 3 with tank 2");
		// } else {
		// 	return false;
		// }