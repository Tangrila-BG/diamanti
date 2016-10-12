/**
 * Created by tangrila on 08-Oct-16.
 */

//
// This is where the game code will be written
// Every function from frame.js is accessible here.
//

//
// global vars:
// canvas = document.getElementById("canvas");
// ctx = canvas.getContext("2d");
//

//
// Images dimensions
// WIDTH x HEIGHT
// bira.png - 45x110 ; rakia.png - 35x110 ;
// salata.png - 130x110 ; salata-shopska.png - 130x110
// nakov.png - 110x110



function game() {
	ctx.fillText('Press "S" to start.', 380, 300);

	let nakovImg = new Image();
	let salataShopskaImg = new Image();
	let biraImg = new Image();
	let rakiaImg = new Image();
	let salataImg = new Image();
	let diamantiImg = new Image();
	biraImg.src = 'images/bira.png';
	rakiaImg.src = 'images/rakia.png';
	salataShopskaImg.src = 'images/salata-shopska.png';
	salataImg.src = 'images/salata.png';
	nakovImg.src = 'images/nakov.png';
	diamantiImg.src = 'images/diamanti.png';
	let isPaused = false;
	let isStarted = false;
	let gameTimer = null;
	let elapsedTime = 0;


	function randomCoordinates(startingCoordinates) {
		while (startingCoordinates.length < 4) {
			let randomNumber = Math.ceil(Math.random() * 670);
			let found = false;
			for (let i = 0; i < startingCoordinates.length; i++) {
				if (Math.abs(startingCoordinates[i] - randomNumber) < 120) {
					found = true;
					break
				}
			}
			if (!found)startingCoordinates[startingCoordinates.length] = randomNumber;
		}
		return startingCoordinates;
	}

	let startingCoordinates = [];
	startingCoordinates = randomCoordinates(startingCoordinates);

	//Objects
	let objects = [];
	let nakov = {
		startPos: {x: 360, y: 490},
		currentPos: {x: 360, y: 490},
		left: false,
		dimensions: {x: 110, y: 110},
		velX: 0,
		keys: [],
		drunkLevel: 0,
		maxSpeed: 10,
		drankBottles: 1
	};

	let salata = {
		dimensions: {x: 130, y: 110},
		currentPos: {x: startingCoordinates[0], y: Math.min(-110, -Math.random() * 500)},
		velY: 0,
		weight: -0.2
	};
	objects.push(salata);

	let salataShopska = {
		dimensions: {x: 130, y: 110},
		currentPos: {x: startingCoordinates[1], y: Math.min(-110, -Math.random() * 500)},
		velY: 0,
		weight: -0.2
	};
	objects.push(salataShopska);

	let bira = {
		type: 'alcohol',
		dimensions: {x: 45, y: 110},
		currentPos: {x: startingCoordinates[2], y: Math.min(-110, -Math.random() * 500)},
		velY: 0,
		speed: 10,
		weight: 0.2
	};
	objects.push(bira);

	let bira1 = {
		type: 'alcohol',
		dimensions: {x: 45, y: 110},
		currentPos: {x: startingCoordinates[1], y: Math.min(-110, -Math.random() * 500)},
		velY: 0,
		speed: 10,
		weight: 0.2
	};
	objects.push(bira1);

	let rakia = {
		type: 'alcohol',
		dimensions: {x: 35, y: 110},
		currentPos: {x: startingCoordinates[3], y: Math.min(-110, -Math.random() * 500)},
		velY: 0,
		speed: 10,
		weight: 0.3
	};
	objects.push(rakia);

	let rakia1 = {
		type: 'alcohol',
		dimensions: {x: 35, y: 110},
		currentPos: {x: startingCoordinates[2], y: Math.min(-110, -Math.random() * 500)},
		velY: 0,
		speed: 10,
		weight: 0.3
	};
	objects.push(rakia1);

	window.addEventListener("keydown", function (e) {
		// registers the key 'P'
		if (e.keyCode == 80) {
			if (isPaused) {
				isPaused = false;
			} else {
				isPaused = true;
			}
		}
		// registers the key 'S'
		if (e.keyCode == 83) {
			isStarted = true;
			// starts the game timer
			if (!gameTimer) gameTimer = setInterval(setTime, 1000);
		}
		nakov.keys[e.keyCode] = true;
	});
	window.addEventListener("keyup", function (e) {
		nakov.keys[e.keyCode] = false;
	});

	function drawScore() {
		ctx.font = "24px Times New Roman";
		ctx.fillText("Drunk level: " + nakov.drunkLevel.toFixed(2), 20, 30);
	}

	function gameLoop() {
		if (isStarted && !isPaused) {
			cls();
			animateNakov();
			update(bira, 2);
			animate(bira, 1);
			update(rakia, 1);
			animate(rakia, 2);
			update(salata, 3);
			animate(salata, 3);
			update(salataShopska, 0);
			animate(salataShopska, 0);
			update(bira1, 1);
			animate(bira1, 3);
			update(rakia1, 2);
			animate(rakia1, 1);
			draw();
			drawScore();
			score();
			timer();
		}
		if (isPaused) {
			ctx.fillText('Paused', 100, 100);
		}
		if (nakov.drunkLevel >= 1) {
			restartGame();
		}
		requestAnimationFrame(gameLoop);
	}

	function animateNakov() {
		nakovKey();
		nakov.currentPos.x += nakov.velX;
		nakovStop();
		ctx.drawImage(nakovImg, nakov.currentPos.x, nakov.currentPos.y);
		function nakovStop() {
			if (nakov.currentPos.x < -10) nakov.velX = 0;
			if (nakov.currentPos.x > 700) nakov.velX = 0;
		}

		function nakovKey() {
			if (nakov.keys[37]) {
				if (nakov.velX > -nakov.maxSpeed) {
					if (nakov.currentPos.x - 0.5 < 0) return;
					if (nakov.velX == 0) nakov.velX -= 2;
					else nakov.velX -= 0.5;
					nakov.left = false;
				}
			}
			if (nakov.keys[39]) {
				if (nakov.velX < nakov.maxSpeed) {
					if (nakov.currentPos.x - 0.5 > 700) return;
					if (nakov.velX == 0) nakov.velX += 2;
					else nakov.velX += 0.5;
					nakov.left = true;
				}
			}
			if (nakov.keys[32])
				nakov.velX = 0;
		}
	}

	function animate(currentObj, index) {
		currentObj.currentPos.y += currentObj.velY;
		if (currentObj.velY < 20)
			currentObj.velY += 0.05;
		if (currentObj.currentPos.y > 600) {
			startingCoordinates = [];
			startingCoordinates = randomCoordinates(startingCoordinates);
			currentObj.currentPos.y = Math.min(-110, -Math.random() * 300);
			currentObj.currentPos.x = startingCoordinates[index];
			currentObj.velY = 0;
		}
	}

	function update(currentObject, index) {
		let x = nakov.currentPos.x - currentObject.currentPos.x;
		let y = nakov.currentPos.y - currentObject.currentPos.y;
		let distance = Math.sqrt(x * x + y * y);
		if (distance < 80) {
			nakov.drunkLevel += currentObject.weight;
			nakov.drunkLevel = Math.max(0, nakov.drunkLevel);
			startingCoordinates = [];
			startingCoordinates = randomCoordinates(startingCoordinates);
			currentObject.currentPos.y = Math.min(-110, -Math.random() * 300);
			currentObject.currentPos.x = startingCoordinates[index];
			currentObject.velY = 0;
			if (currentObject.type == 'alcohol')
				nakov.drankBottles++;
		}
	}

	function draw() {
		ctx.clearRect(0, 0, 800, 600);
		ctx.drawImage(nakovImg, nakov.currentPos.x, nakov.currentPos.y);
		ctx.drawImage(salataShopskaImg, salataShopska.currentPos.x, salataShopska.currentPos.y);
		ctx.drawImage(salataImg, salata.currentPos.x, salata.currentPos.y);
		ctx.drawImage(biraImg, bira.currentPos.x, bira.currentPos.y);
		ctx.drawImage(biraImg, bira1.currentPos.x, bira1.currentPos.y);
		ctx.drawImage(rakiaImg, rakia.currentPos.x, rakia.currentPos.y);
		ctx.drawImage(rakiaImg, rakia1.currentPos.x, rakia1.currentPos.y);
	}

	function restartGame() {
		nakov.drunkLevel = 0;
		bira.currentPos.x = startingCoordinates[0];
		bira.currentPos.y = Math.min(-110, -Math.random() * 300);
		bira1.currentPos.x = startingCoordinates[1];
		bira1.currentPos.y = Math.min(-110, -Math.random() * 300);
		rakia.currentPos.x = startingCoordinates[2];
		rakia.currentPos.y = Math.min(-110, -Math.random() * 300);
		rakia1.currentPos.x = startingCoordinates[1];
		rakia1.currentPos.y = Math.min(-110, -Math.random() * 300);
		salata.currentPos.x = startingCoordinates[3];
		salata.currentPos.y = Math.min(-110, -Math.random() * 300);
		salataShopska.currentPos.x = startingCoordinates[0];
		salataShopska.currentPos.y = Math.min(-110, -Math.random() * 300);
		nakov.startPos.x = 360;
		nakov.startPos.y = 490;
		nakov.drankBottles = 1;
		ctx.fillText("Nakov got drunk again.\nPress 's' to restart!", 100, 100);
		isPaused = false;
		isStarted = false;
		elapsedTime = 0;
		clearInterval(gameTimer);
		gameTimer = null;
		ctx.drawImage(diamantiImg, 200, 200);
	}

	function score() {
		ctx.save();
		ctx.font="24px New Times Roman";
		let score = Math.round(elapsedTime * 100 / nakov.drankBottles);
		ctx.fillText(`Score ${score}`, 20, 60);
		ctx.restore();
	}

	function timer() {
		if (isStarted) {
			ctx.save();
			ctx.beginPath();
			ctx.fillStyle = "red";
			ctx.font = "24px New Times Roman";
			ctx.fillText(`${elapsedTime} secs`, canvas.width - 85, 30);
			ctx.restore();
		}
	}

	function setTime() {
		if (!isPaused)
			elapsedTime++;
	}
	// start the game
	gameLoop();
}
game();
