var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
var spaceBarPressed = false;

var startBar = document.getElementsByClassName('start')[0];
var tanks = document.getElementsByClassName('tank');
var bombs = document.getElementsByClassName('bomb');

var timeoutTanks = 0;
var timeout = 0;
var timeoutBomb = 0;
var timeoutRandomExplode = 0;
var timeoutArrow = 0;
var conditionTrigger = 0;

var score = 0;
var level = 1;
var hiddenScore = 0; //increase level
var addLifeStore = 0; //add life

var directions = 0;
var wayBomb = [-0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75];
var nameS = [];
var scoreS = [];

var player = document.getElementById('player');
var weapon = document.getElementsByClassName('weapon')[0];
var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;

// localStorage.clear();


function keyup(event) {

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
		removeEventDom();
		setTimeout(function () {
			weapon.style.display = 'none';
			weapon.classList.remove('fire');
			activateEvenDom();
		}, 500)
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
		if (element.classList.contains('cactus') == false && element.classList.contains('tank') == false && positionBottom < (windowHeight - 5)) {
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

	if (event.keyCode == 32) {
		spaceBarPressed = true;
	}
}


//explode arrow
function explodeArrow() {
	var arrows = document.getElementsByClassName('arrow');

	for (var i = 0; i < arrows.length; i++) {
		var currentArrow = arrows[i];
		var top = currentArrow.offsetTop;
		var left = currentArrow.offsetLeft;
		var right = left + 32; // Move the declaration here
		var bottom = top + 10;

		//   console.log("left is " + left);
		//   console.log("right value is " + right);

		var element = document.elementFromPoint(right, top);
		var elementReverse = document.elementFromPoint(left, bottom);
		if (element.classList.contains('bomb') || element.classList.contains('tank') || elementReverse.classList.contains('bomb') || elementReverse.classList.contains('tank')) {
			explodeBomb(currentArrow);
			currentArrow.remove();
			clearInterval(timeoutArrow);
			continue; // Skip the remaining code and proceed to the next arrow
		}
		var windowWidth = window.innerWidth;
		if (top <= 0 || bottom >= (window.innerHeight - 1) || left <= 0 || right >= (windowWidth - 1)) {
			explodeBomb(currentArrow);
			currentArrow.remove();
		}
	}
}

// move arrow
function moveArrow() {
	var arrows = document.getElementsByClassName('arrow');

	for (var i = 0; i < arrows.length; i++) {
		var currentArrow = arrows[i];
		var arrowSpeed = 1;
		var positionL = currentArrow.offsetLeft;
		var positionT = currentArrow.offsetTop;

		currentArrow.style.left = positionL + arrowSpeed + 'px';

		// if (leftFire) {
		// 	currentArrow.style.left = positionL - arrowSpeed + 'px';
		// }

		// if (rightFire) {
		// 	currentArrow.style.left = positionL + arrowSpeed + 'px';
		// }

		// if (upFire) {
		// 	currentArrow.style.top = positionT - arrowSpeed + 'px';
		// }	

		// if (downFire) {
		// 	currentArrow.style.top = positionT + arrowSpeed + 'px';
		// }	
	}

	explodeArrow();
}

//add Arrow
function addArrow() {
	var arrow = document.createElement('div');
	arrow.className = 'arrow';
	arrow.style.top = player.offsetTop + 'px';
	arrow.style.left = player.offsetLeft + 'px';
	arrow.style.position = 'absolute';
	document.body.appendChild(arrow);
	
}


// call leaderboard
function callLeaderboard() {
	var elLeader = document.createElement('button');
	var hud = document.getElementsByClassName('hud')[0];
	hud.appendChild(elLeader);
	elLeader.classList.add('leaderboardtop');
	elLeader.style.position = 'absolute';
	elLeader.style.left = '50%';
	elLeader.style.backgroundColor = '#ccc';
	elLeader.style.borderRadius = '50%';
	elLeader.style.marginLeft = '25px';
	elLeader.style.marginTop = '25px';
	elLeader.style.fontFamily = 'Anton';
	elLeader.style.fontSize = '2em';
	elLeader.style.color = '#257000';
	elLeader.style.boxShadow = '0px 10px 30px #000';
	elLeader.style.textShadow = '2px 2px 2px #000';
	elLeader.innerHTML = 'Leaderboard';
	elLeader.addEventListener('click', displayLeaderboard);
}

// display leaderboard
function displayLeaderboard() {
	var localName = JSON.parse(localStorage.getItem('name'));
	var localScore = JSON.parse(localStorage.getItem('score'));

	var createLeaderboard = document.createElement('div');
	createLeaderboard.classList.add('leaderboard');
	document.body.appendChild(createLeaderboard);
	createLeaderboard.style.width = '70vw';
	createLeaderboard.style.height = '50vh';
	createLeaderboard.style.border = '5px dashed gold';
	createLeaderboard.style.backgroundColor = '#ccc';
	createLeaderboard.style.zIndex = '1000';
	createLeaderboard.style.fontFamily = 'Anton';
	createLeaderboard.style.fontSize = '2em';
	createLeaderboard.style.top = '20%';
	createLeaderboard.style.left = '20%';
	createLeaderboard.style.position = 'absolute';
	createLeaderboard.innerHTML =
		'Hi ' +
		localName +
		', you are on the 1st place with a score of ' +
		localScore;

	var closeButton = document.createElement('button');
	closeButton.classList.add('remove-leaderboard');
	createLeaderboard.appendChild(closeButton);
	closeButton.style.top = '50%';
	closeButton.style.left = '50%';
	closeButton.style.position = 'absolute';
	closeButton.innerHTML = 'Close Leaderboard';
	closeButton.style.color = 'white';
	closeButton.style.zIndex = '100';
	closeButton.style.width = '100px';
	closeButton.style.height = '50px';
	closeButton.addEventListener('click', function () {
		var leaderboardElement = document.getElementsByClassName('leaderboard')[0];
		leaderboardElement.remove();
	});
}
// displayLeaderboard();
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
	inputButton.textNode = 'Save my Score';
	//   // Redirect to score page or display success message
	// });
	// end=====================================================================================================


}
// desgin score table ===============================================================================
function createForm() {
	var form = document.createElement('form');
	form.style.top = "40%";
	form.style.left = "50%";
	form.style.position = "absolute";
	form.style.transform = "translate(-50%, -50%)";
	form.style.backgroundColor = "#ccc";
	form.style.backgroundImage = 'url(images/trophy.png)'
	form.style.backgroundRepeat = 'no-repeat';
	form.style.backgroundPosition = '50% 210%';
	form.style.backgroundSize = '32px'
	form.style.padding = "0.5em";
	form.style.zIndex = "1000";
	form.style.fontFamily = 'Anton';
	form.style.fontSize = "2em";
	form.style.textShadow = "2px 2px 2px #000";
	form.style.color = 'white';
	form.style.boxShadow = '4px 4px 4px #000';
	form.style.borderRadius = '20px';
	document.body.appendChild(form);

	var nameLabel = document.createElement('label');
	nameLabel.textContent = 'Name: ';
	nameLabel.style.marginRight = '10px';
	form.appendChild(nameLabel);

	var nameInput = document.createElement('input');
	nameInput.setAttribute('type', 'text');
	nameInput.setAttribute('name', 'name');
	nameInput.setAttribute('id', 'name');
	nameInput.style.padding = '5px';
	nameInput.style.borderRadius = '5px';
	nameInput.style.border = 'none';
	nameInput.style.marginRight = '10px';
	form.appendChild(nameInput);

	var scoreInput = document.createElement('input');
	scoreInput.setAttribute('type', 'hidden');
	scoreInput.setAttribute('name', 'score');
	scoreInput.setAttribute('id', 'score');
	var newScore = document.getElementsByClassName('score')[0];
	var parseNewScore = parseInt(newScore);
	scoreInput.value = parseNewScore;
	form.appendChild(scoreInput);

	var submitButton = document.createElement('button');
	submitButton.setAttribute('type', 'submit');
	submitButton.innerHTML = 'Save my Score';
	submitButton.style.padding = '5px 10px';
	submitButton.style.borderRadius = '5px';
	submitButton.style.backgroundColor = '#ff6347';
	submitButton.style.border = 'none';
	submitButton.style.color = 'white';
	form.appendChild(submitButton);

	scoreInput.value = score;
	// console.log("My values is +" + scoreInput.value);

	form.addEventListener('submit', function () {

		nameS = document.getElementById('name').value;
		scoreS = document.getElementById('score').value;

		var storeScoreLocal = [];
		var storeNameLocal = [];

		storeScoreLocal.push(scoreS);
		storeNameLocal.push(nameS);

		localStorage.setItem('name', JSON.stringify(nameS));
		localStorage.setItem('score', JSON.stringify(scoreS));

	});
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
}
// end ==============================================================================================
//remove life =======================================================================================
function removeEventDom() { //bug fix when restart stoping the player going on the last direction ===
	document.removeEventListener('keyup', keyup);
	document.removeEventListener('keydown', keydown);
	upPressed = false;
	downPressed = false;
	leftPressed = false;
	rightPressed = false;
	spaceBarPressed = false;
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

	var retriveTank = document.getElementsByClassName('tank')[0];
	var offsetTankLeft = retriveTank.offsetLeft;
	var canvasLength = windowWidth - (offsetTankLeft / 2); // value of remaining distance from tank to left end of the canvas
	conditionTrigger = Math.floor(canvasLength * Math.random()); // modify conditionTrigger value in the global scope
}
randomExplode(); // call function first time
// end ==============================================================================================
// gameOver =========================================================================================
// gameOver =========================================================================================
function gameOver() {
	var gameOver = document.getElementsByClassName('start')[0]; // game over bar with dead character
	gameOver.style.display = "none";
	gameOver.classList.remove('start');
	gameOver.classList.add('gameover');
	gameOver.innerHTML = "Play Again?";

	// create restartButton
	var restartButton = document.createElement('div');
	restartButton.className = 'start playAgain';
	restartButton.style.left = "50%";
	restartButton.style.top = "50%";
	restartButton.style.position = 'absolute';
	gameOver.innerHTML = "Play Again?";

	callLeaderboard();

	var gameOverMessage = document.createElement('div');
	document.body.appendChild(gameOverMessage);
	gameOverMessage.className = 'gameover-message';

	gameOverMessage.style.top = "60%";
	gameOverMessage.style.left = "50%";
	gameOverMessage.style.width = "20vw";
	gameOverMessage.style.backgroundColor = "#ccc";
	gameOverMessage.style.zIndex = "1000";
	gameOverMessage.style.textShadow = "2px 2px 2px #000";
	gameOverMessage.style.color = 'white';
	gameOverMessage.style.boxShadow = '4px 4px 4px #000';
	gameOverMessage.style.borderRadius = '20px';
	gameOverMessage.style.position = "absolute";
	gameOverMessage.style.fontSize = "32px";
	gameOverMessage.style.fontFamily = 'Anton';
	gameOverMessage.style.marginLeft = '-10vw';
	gameOverMessage.style.marginTop = '-1em';
	gameOverMessage.style.cursor = 'pointer';
	gameOverMessage.style.textAlign = 'center';


	restartButton.innerHTML = 'Play Again?';
	document.body.appendChild(restartButton);
	gameOverMessage.textContent = ">>> Game Over <<<";

	var restartButtonSelect = document.getElementsByClassName('playAgain')[0];
	console.log(restartButtonSelect);
	gameOver.addEventListener('click', restartGame);

	restartButtonSelect.addEventListener('click', restartGame);

	bombClearOut(); // should clear-out all the bombs when gameover
	createForm();
}

// restart game
function restartGame() {
	var gameOver = document.getElementsByClassName('gameover')[0];
	gameOver.classList.add('start');
	gameOver.style.display = "none";

	var restartButtonSelect = document.getElementsByClassName('playAgain')[0];
	restartButtonSelect.style.display = 'none';

	var removeGameOver = document.getElementsByClassName('gameover-message')[0];
	removeGameOver.classList.remove('gameover-message');
	removeGameOver.remove();

	var selectLeaderboard = document.getElementsByClassName('leaderboardtop')[0];
	selectLeaderboard.style.display = 'none';

	var selectForm = document.getElementsByTagName('form')[0]; // get input form
	var parentOfForm = selectForm.parentNode;
	parentOfForm.removeChild(selectForm);


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
	spaceBarPressed = false;
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
	startGame();
	clearInterval(timeout);
	clearInterval(timeoutArrow);
}
// end

// dead player
function deadPlayer() {
	var player = document.getElementById('player');
	player.className = 'character dead';
	// reactivate when refresh game
	document.removeEventListener('keydown', keydown);
	document.removeEventListener('keyup', keyup);
	clearInterval(timeoutTanks);
	clearInterval(timeout);
}
// end 
// explode bombs
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
// end
// move bombs 
function moveBomb() {
	var bombs = document.getElementsByClassName('bomb');
	var arrow = document.getElementsByClassName('arrow');
	for (var i = 0; i < bombs.length; i++) {
		var elBomb = bombs[i];
		var bombLeft = elBomb.offsetLeft;
		var bombTop = elBomb.offsetTop;
		var bombRight = elBomb.offsetLeft + 31;
		var bombBottom = elBomb.offsetTop + 10;

		if ((bombLeft > conditionTrigger) && (bombLeft > conditionTrigger || bombTop > 0) && (bombTop > 0 && bombBottom < (windowHeight - 1))) {

			var randomBombSpeed = Math.ceil(Math.random() * level + 0.25);

			elBomb.style.top = bombTop - wayBomb[directions] + "px";
			elBomb.style.left = bombLeft - randomBombSpeed + "px";

			var elBombAtPos = document.elementFromPoint(bombLeft, bombTop);
			var elBombAtPosInverse = document.elementFromPoint(bombRight, bombBottom);
			var elBombAtPosInverseReverse = document.elementFromPoint(bombLeft, bombBottom);
			var elBombAtPosInverseInverse = document.elementFromPoint(bombRight, bombTop);

			// console.log("elBombAtPos:", elBombAtPos);
			// console.log("elBombAtPosInverse:", elBombAtPosInverse);

			if (elBombAtPos && (elBombAtPos.classList.contains("head") || elBombAtPos.classList.contains("body")) ||
				(elBombAtPosInverse && (elBombAtPosInverse.classList.contains("head") || elBombAtPosInverse.classList.contains("body") || elBombAtPosInverse.classList.contains("body")))) {
				explodeBomb(bombs[i]);
				bombs[i].remove();
				removeLife();
			} if (elBombAtPos.classList.contains("arrow") || elBombAtPosInverse.classList.contains("arrow") || elBombAtPosInverseInverse.classList.contains("arrow") || elBombAtPosInverseReverse.classList.contains("arrow")) {
				console.log("bomb explodes");
				explodeBomb(bombs[i]);
				bombs[i].remove();
				arrow[0].remove();
				var elScore = document.getElementsByClassName('score')[0];
				score++;
				directions = Math.floor(Math.random() * 7);
				hiddenScore++;
				addLifeStore++;
				elScore.innerHTML = "Your Score: " + score;
				levelUp();
				addLife();
				clearInterval(timeoutArrow);
			}

		} else {
			explodeBomb(bombs[i]);
			bombs[i].remove();
			var elScore = document.getElementsByClassName('score')[0];
			score++;
			directions = Math.floor(Math.random() * 7);
			hiddenScore++;
			addLifeStore++;
			elScore.innerHTML = "Your Score: " + score;
			levelUp();
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

	timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
}
startBar.addEventListener('click', startGame);
//end ================================================================================================

function myLoadFunction() {

	windowHeight = window.innerHeight;
	windowWidth = window.innerWidth;

	console.log("w h " + windowHeight);
	console.log("w w " + windowWidth);
	scoreCount();
	designLevel();
	//hide tanks
	for (var i = 0; i < tanks.length; i++) {
		tanks[i].style.display = "none";
	}
}
document.addEventListener('DOMContentLoaded', myLoadFunction);