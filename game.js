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
var score = 0;
var level = 1;
var hiddenScore = 0; //increase level
var addLifeStore = 0; //add life
var directions = [-0.75, - 0.5, -0.25, 0, +0.25, +0.5, +0.75];

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

		// console.log("Value of Element is :" + element.className);

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


// desgin score table ===============================================================================
function createForm() {

var inputForm = document.createElement('form');
inputButton.style.top = "50%";
inputButton.style.left = "50%";
inputButton.style.backgroundColor = "#ccc";
inputButton.style.zIndex = "1000";
inputButton.style.fontFamily = 'Anton';
inputButton.style.fontSize = "2em";
inputButton.style.textShadow = "2px 2px 2px #000";
inputButton.style.color = 'white';
inputButton.style.boxShadow = '4px 4px 4px #000';
inputButton.style.borderRadius = '20px';




inputForm.setAttribute("action", "/submit");

var createLabel = document.createElement('label');
createLabel.textContent = 'Name: ';

var inputElement = document.createElement('input');
inputElement.setAttribute('type', 'text');
inputElement.setAttribute('name', 'name');
inputElement.setAttribute('id', 'name');


var inputButton = document.createElement('button');
inputButton.setAttribute('type', 'submit');
inputButton.innerHTML = 'Save my Score';


}
// end ==============================================================================================


//design level bar ==================================================================================
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
// end ==============================================================================================
// level up =========================================================================================
function levelUp() {
	if (hiddenScore == 10) {
		level++;
		hiddenScore = 0; // reset hiddenScore
		var elLevel = document.getElementsByClassName('level')[0];
		elLevel.innerHTML = "Your Level: " + level;
	}
}

// end ==============================================================================================
// create Scoring system GUI functional and counting the bombs avoided ==============================
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

} // call on lines 293 - 295
// end ==============================================================================================
//remove life =======================================================================================
function removeEventDom() { //bug fix when restart stoping the player going on the last direction ===
	document.removeEventListener('keyup', keyup);
	document.removeEventListener('keydown', keydown);
	upPressed = false;
	downPressed = false;
	leftPressed = false;
	rightPressed = false;
	lastPressed = false;
}


function activateEvenDom() { //reinstante the movement ==============================================
	document.addEventListener('keyup', keyup);
	document.addEventListener('keydown', keydown);
}

// add life =========================================================================================
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
// end ===============================================================================================


function removeLife() {

	var player = document.getElementById("player");
	var healthBar = document.getElementsByClassName('health')[0];

	var li = healthBar.getElementsByTagName('li');
	if (li.length > 1) {
		li[0].remove();
		player.className = 'character ' + lastPressed + ' hit'; //hit feature
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
		deadPlayer();
		gameOver();
		li[0].remove();
	}

}
//end ===============================================================================================

//bomb clear out when gameOver ======================================================================
function bombClearOut() {
	var bombs = document.getElementsByClassName('bomb');

	for (var i = bombs.length - 1; i >= 0; i--) {
		bombs[i].classList.remove('bomb');

	}

}
// end ==============================================================================================


// randomPoint ======================================================================================
function randomExplode() {

	var windowWidth = window.innerWidth; //get canvas total width
	var windowHeight = window.innerHeight; //get canvas total height
	console.log("Height is:" + windowHeight);

	var retriveTank = document.getElementsByClassName('tank')[0];
	var offsetTankLeft = retriveTank.offsetLeft;

	var canvasLength = windowWidth - (offsetTankLeft / 2); // value of remaining distance from tank to left end of the canvas


	conditionTrigger = Math.floor(canvasLength * Math.random()); // modify conditionTrigger value in the global scope
	console.log(conditionTrigger);
	console.log("WW:" + windowWidth);
	console.log("OT:" + offsetTankLeft)

}
randomExplode(); // call function first time
// end ==============================================================================================

// gameOver =========================================================================================
// gameOver =========================================================================================
function gameOver() {
	var gameOver = document.getElementsByClassName('start')[0]; // game over bar with dead character

	gameOver.style.display = "block";
	gameOver.classList.remove('start');
	gameOver.classList.add('gameover');
	gameOver.innerHTML = "Game Over";

	// create restartButton
	var restartButton = document.createElement('div');
	restartButton.className = 'start playAgain';	
	restartButton.style.left = "50%";
	restartButton.style.top = "60%";
	restartButton.style.position = 'absolute';

	restartButton.innerHTML = 'Play Again?';
	document.body.appendChild(restartButton);

	var restartButtonSelect = document.getElementsByClassName('playAgain')[0];
	console.log(restartButtonSelect);

	restartButtonSelect.addEventListener('click', restartGame);

	bombClearOut(); // should clear-out all the bombs when gameover
}

// restart game =====================================================================================
function restartGame() {
	var gameOver = document.getElementsByClassName('gameover')[0];
	gameOver.classList.add('start');
	gameOver.style.display = "none";
	
	var restartButtonSelect = document.getElementsByClassName('playAgain')[0];
	restartButtonSelect.style.display = 'none';

	var player = document.getElementById('player'); // restore player position and class
	player.className = 'character stand';
	player.style.top = "80vh";
	player.style.left = "200px";

	document.addEventListener('keydown', keydown); //restore movement
	document.addEventListener('keyup', keyup);
	timeout = setInterval(move, 10);
	upPressed = false;
	downPressed = false;
	leftPressed = false;
	rightPressed = false;
	lastPressed = false;

	var health = document.getElementsByClassName('health')[0];

	for (var i = 0; i < 3; i++) {
		var li = document.createElement("li");
		health.appendChild(li);
	}
	var elLevel = document.getElementsByClassName('level')[0];
	elLevel.innerHTML = "Your Level: 1";

	var elScore = document.getElementsByClassName('score')[0];
	elScore.innerHTML = "Your Score: 0";

	score = 0;
	level = 1;
	hiddenScore = 0;
	addLifeStore = 0;
	// startGame();
}
// end ==============================================================================================

// dead player ======================================================================================
function deadPlayer() {
	var player = document.getElementById('player');
	player.className = 'character dead';

	// reactivate when refresh game
	document.removeEventListener('keydown', keydown);
	document.removeEventListener('keyup', keyup);
	clearInterval(timeoutTanks);
	clearInterval(timeout);
}
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
		explosion.remove();
	}

	setTimeout(explosionOff, 1000) // bomb control - 3rd part sets explosion off after 1 sec

}
// end ==============================================================================================


// move bombs =======================================================================================
function moveBomb() {

	var bombs = document.getElementsByClassName('bomb');

	for (var i = 0; i < bombs.length; i++) {

		var bombLeft = bombs[i].offsetLeft;
		var bombTop = bombs[i].offsetTop;
		var bombRight = bombs[i].offsetLeft + 31;
		var bombBottom = bombs[i].offsetTop + 10;
		var windowHeight = window.innerHeight;


		if ((bombLeft > conditionTrigger) && (bombLeft > conditionTrigger || bombTop > 0) && (bombTop >= 0 && bombBottom <= windowHeight)) { // if all of them true bomb move if one of them false bombs explodes
			// console.log("top value is" + bombTop);
			//random bomb speed =================================================================================
			// I'm planning to do a Math.Ceil(Math.Random() * level)

			// console.log("My speed is:" + randomBombSpeed);
			// console.log("value bombbTop" + bombTop);
			// console.log("value bombbBottom" + bombBottom);

			var randomBombSpeed = Math.ceil(Math.random() * level + 0.75);

			bombs[i].style.left = bombLeft - randomBombSpeed + "px";

			for (var j = 0; j < directions.length; j++) {
				bombs[i].style.top = bombTop - directions[j] + "px";
				console.log(directions[j]);
			}


			// var testBomb = bombs[i].style.top;
			// console.log(testBomb);


			// end random direction ====================================================================
			var elBombAtPos = document.elementFromPoint(bombLeft, bombTop); //check position from top/left points
			var elBombAtPosInverse = document.elementFromPoint(bombRight, bombBottom); //check position from inverse points

			// is statement for player collision with bomb

			if (elBombAtPos.classList.contains("head") || elBombAtPos.classList.contains("body") || elBombAtPosInverse.classList.contains("head") || elBombAtPosInverse.classList.contains("body")) { //check collision from multiple points
				// console.log("Hey - I'm dead");

				explodeBomb(bombs[i]);
				bombs[i].remove();
				removeLife();
			}

		} else {

			explodeBomb(bombs[i]);
			bombs[i].remove();
			var elScore = document.getElementsByClassName('score')[0]; /////  SCORE COUNTER =========
			score++;
			hiddenScore++;
			addLifeStore++;
			elScore.innerHTML = "Your Score: " + score;
			levelUp(); //call function
			addLife();

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

		// console.log(tanks[i].offsetLeft);
	}

	clearInterval(timeoutBomb); // when addBomb repeats we clearInterval to avoid increasing the speed of the bombs
	randomExplode();


}
// end ============================================================================================


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
	scoreCount();
	designLevel();


	//hide tanks
	for (var i = 0; i < tanks.length; i++) {
		tanks[i].style.display = "none";
	}
}

document.addEventListener('DOMContentLoaded', myLoadFunction);