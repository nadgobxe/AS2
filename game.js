var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
var spaceBarPressed = false;

var selectStart = document.getElementsByClassName('start')[0];
var tanks = document.getElementsByClassName('tank');
var bombs = document.getElementsByClassName('bomb');
var player = document.getElementById('player');

var score = 0;
var level = 1;
var hiddenScore = 0; //increase level
var addLifeStore = 0; //add life

var conditionTrigger = 0;

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

	if (event.keyCode == 32) {
		spaceBarPressed = false;

	}

	player.className = 'character stand ' + lastPressed;
}


function move() {

	var positionLeft = player.offsetLeft;
	var positionTop = player.offsetTop;
	var positionBottom = positionTop + player.offsetHeight;
	var tankLeft = tanks[0].offsetLeft;
	var positionRight = positionLeft + player.offsetWidth;

	// console.log("Left" + positionLeft);
	// // console.log("Top" + positionTop);
	// // console.log("Right" + positionRight);
	// // console.log("Bottom" + positionBottom);
	// console.log(windowWidth);
	// console.log(tankLeft);

	if (downPressed == true) {
		var newTop = positionTop + 1;
		var element = document.elementFromPoint(positionLeft, newTop + 46); /* Detect position X/Y axis and return the top element at the specified coordinates. In our case, we would like to find when we collide with the 'cactus' class. To do that, we have to check for element.classList.contains('cactus') */
		if (element.classList.contains('cactus') == false && element.classList.contains('tank') == false && positionBottom < (window.innerHeight - 5)) {
			player.style.top = newTop + 'px';
		}
		player.className = 'character walk down';
	}
	if (upPressed == true) {
		var newTop = positionTop - 1;
		var element = document.elementFromPoint(positionLeft, newTop);
		if (element.classList.contains('cactus') == false && element.classList.contains('tank') == false && positionTop > 5) {
			player.style.top = newTop + 'px';
		}
		player.className = 'character walk up';
	}
	if (leftPressed == true) {
		var newLeft = positionLeft - 1;
		var element = document.elementFromPoint(newLeft, positionTop);
		if (element.classList.contains('cactus') == false && element.classList.contains('tank') == false && positionLeft > 5) {
			player.style.left = newLeft + 'px';
		}
		player.className = 'character walk left';
	}
	if (rightPressed == true) {
		var newLeft = positionLeft + 1;
		var element = document.elementFromPoint(newLeft + 32, positionTop);
		if (element.classList.contains('cactus') == false && element.classList.contains('tank') == false && positionRight < (tankLeft - 10)) {
			player.style.left = newLeft + 'px';
		}

		player.className = 'character walk right';
	}

	if (spaceBarPressed) {

		weapon.style.display = 'block';
		addArrow();
		timeoutArrow = setInterval(moveArrow, 10);

		if (!downPressed || !upPressed || !leftPressed || !rightPressed) {

			player.className = 'character stand ' + lastPressed + ' fire';
		}

		if (downPressed || upPressed || leftPressed || rightPressed) {
			player.className = 'character fire walk ' + lastPressed;
		}

		removeEventDom();
		setTimeout(function () {
			weapon.style.display = 'none';
			weapon.classList.remove('fire');
			activateEvenDom();
		}, 500)
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
function designLevel() {
	var elLevel = document.createElement('div');
	var hud = document.getElementsByClassName('hud')[0];
	hud.appendChild(elLevel);
	elLevel.classList.add('level');
	elLevel.style.marginLeft = "25px";
	elLevel.style.marginTop = "25px";
	elLevel.style.fontFamily = "Anton";
	elLevel.style.fontSize = "2em";
	elLevel.style.color = "#257000";
	elLevel.style.textShadow = "2px 2px 2px #000";
	elLevel.innerHTML = "Your Level: " + level;
}

function levelUp() {
	if (hiddenScore == 10) {
		level++;
		hiddenScore = 0; // reset hiddenScore
		var elLevel = document.getElementsByClassName('level')[0];
		elLevel.innerHTML = "Your Level: " + level;
	}
}

function scoreCount() {
	var elScore = document.createElement('div');
	var hud = document.getElementsByClassName('hud')[0];
	hud.appendChild(elScore);
	elScore.classList.add('score');
	elScore.style.marginLeft = "25px";
	elScore.style.marginTop = "25px";
	elScore.style.fontFamily = "Anton";
	elScore.style.fontSize = "2em";
	elScore.style.color = "#257000"
	elScore.style.textShadow = "2px 2px 2px #000";
	elScore.innerHTML = "Your Score: " + score;
}

function addLife() {
	// retrieve health  bar elements
	var healthBar = document.getElementsByClassName('health')[0];
	var currentLi = healthBar.getElementsByTagName('li');
	var li = document.createElement('li');
	// console.log("this is hiddenScore" + hiddenScore);
	// console.log("this is li length" + currentLi.length);
	if ((addLifeStore == 50) && (currentLi.length < 3)) {
		healthBar.appendChild(li);
		addLifeStore = 0; // reset addlifeStore to 0
		// console.log("addLife active");
	}
}

function removeLife() {
	var player = document.getElementById("player");
	var healthBar = document.getElementsByClassName('health')[0];
	var li = healthBar.getElementsByTagName('li');
	if (li.length > 1) {
		li[0].remove();
		player.className = 'character hit ' + lastPressed; //hit feature
		removeEventDom(); // remove keyCode event listener
		setTimeout(activateEvenDom, 2000); // start walking	
		// player flickers when hit by bomb ====================================
		for (var i = 0; i < 8; i++) // 4th Step loop 8 times
		{
			setTimeout(() => {
				var editCharacterClass = document.getElementsByClassName('character')[0];
				if (editCharacterClass.style.opacity === "0.5" || editCharacterClass.style.top === editCharacterClass.offsetTop + 5 + "px" || editCharacterClass.style.left === editCharacterClass.offsetLeft + 5 + "px") { //2nd step checking if all true
					editCharacterClass.style.opacity = "1"; //3rd step restore to initial 
					editCharacterClass.style.top = editCharacterClass.offsetTop - 5 + "px";
					editCharacterClass.style.left = editCharacterClass.offsetLeft - 5 + "px";
				} else {
					editCharacterClass.style.opacity = "0.5";
					editCharacterClass.style.top = editCharacterClass.offsetTop + 10 + "px"; //1st step
					editCharacterClass.style.left = editCharacterClass.offsetLeft + 5 + "px";
				}
			}, i * 250); // 5th step after 8 * 250 = 2000 ms / 2 sec
		}
	} //end =====================================================================
	else {
		// gameover
		gameOver();
		li[0].remove();
	}
}

function bombClearOut() {
	var bombs = document.getElementsByClassName('bomb');
	for (var i = bombs.length - 1; i >= 0; i--) {
		bombs[i].classList.remove('bomb');
	}
}

function gameOver() {
	selectStart.style.display = 'block';
	selectStart.className = 'gameover';
	selectStart.textContent = 'Play Again?';

	player.className = 'character dead';
	removeEventDom();
	bombClearOut();
	clearInterval(timeoutTanks);
}

function playerCollision(left, right, top, bottom, bomb) {

	var bombLeftTop = document.elementFromPoint(left, top);
	var bombRightBottom = document.elementFromPoint(right, bottom);

	if (bombLeftTop && (bombLeftTop.classList.contains("head") || bombLeftTop.classList.contains("body")) ||
		(bombRightBottom && (bombRightBottom.classList.contains("head") || bombRightBottom.classList.contains("body") || bombRightBottom.classList.contains("body")))) {
		explodeBomb(bomb);
		bomb.remove();
		removeLife();

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

function randomExplode() {

	var retriveTank = document.getElementsByClassName('tank')[0];
	var offsetTankLeft = retriveTank.offsetLeft;
	var canvasLength = window.innerWidth - (offsetTankLeft / 2); // value of remaining distance from tank to left end of the canvas
	conditionTrigger = Math.floor(canvasLength * Math.random()); // modify conditionTrigger value in the global scope
}
randomExplode(); // call function first time

function moveElement() {
	for (var i = 0; i < bombs.length; i++) {
		var element = bombs[i];
		var left = element.offsetLeft;
		var top = element.offsetTop;
		var bottom = element.offsetTop + element.offsetHeight;
		var right = element.offsetLeft + element.offsetWidth;



		if ((left > conditionTrigger) && (left > conditionTrigger || top > 0) && (top > 0 && bottom < (window.innerHeight - 1))) {
			console.log(conditionTrigger);
			left = left - 1;
			top = top - 1;

			// element.style.top = top + "px";
			element.style.left = left + "px";
			var elScore = document.getElementsByClassName('score')[0];
			score++;
			directions = Math.floor(Math.random() * 7);
			hiddenScore++;
			addLifeStore++;
			elScore.innerHTML = "Your Score: " + score;
			levelUp();
			addLife();
		}
		else {
			explodeBomb(element);
			element.classList.remove('bomb');
			element.remove();
		}
		playerCollision(left, right, top, bottom, element);
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
		randomExplode();
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

function removeEventDom() {
	document.removeEventListener('keyup', keyup);
	document.removeEventListener('keydown', keydown);
	upPressed = false;
	downPressed = false;
	leftPressed = false;
	rightPressed = false;
	spaceBarPressed = false;
}
function activateEvenDom() {
	document.addEventListener('keyup', keyup);
	document.addEventListener('keydown', keydown);
}

function myLoadFunction() {
	selectStart.addEventListener('click', startGame);
	reuseableForLoop(tanks, 'none');
	scoreCount();
	designLevel();
}

document.addEventListener('DOMContentLoaded', myLoadFunction);