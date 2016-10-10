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
//

function game() {
	// A Way of loading the images
	let nakovImg = new Image();
	let salataShopskaImg = new Image();
	let biraImg = new Image();
	let rakiaImg = new Image();
	let salataImg = new Image();

	//Objects
	let nakov = {
		startPos: {x: 360, y: 490},
		currentPos: {x: 360, y: 490},
		left: false,
		dimensions: { x: 110, y: 110},
		velX: 0,
		keys: [],
		maxSpeed: 10
	};

	let salata = {
		startPos: {x:150, y:Math.min(-110,-Math.random()* 500)},
		dimensions: { x: 130, y: 110},
		currentPos: {x:150, y:Math.min(-110,-Math.random()* 500)},
		velY: 0
	};
	let salataShopska = {
		startPos: {x:150, y:Math.min(-110,-Math.random()* 500)},
		dimensions: {x: 130, y: 110},
		currentPos: {x:150, y:Math.min(-110,-Math.random()* 500)},
		velY: 0
	};
	let bira = {
		startPos: {x:100, y: Math.min(-110,-Math.random()* 500)},
		dimensions: {x: 45, y: 110},
		currentPos: {x:100, y:Math.min(-110,-Math.random()* 500)},
		velY: 0,
		speed: 10
	};
	let rakia = {
		startPos: {x:45, y:Math.min(-110,-Math.random()* 500)},
		dimensions: {x: 35, y: 110},
		currentPos: {x:45, y:Math.min(-110,-Math.random()* 500)},
		velY: 0,
		speed: 10
	};

	//Constant values

	window.addEventListener("keydown", function (e) {
		nakov.keys[e.keyCode] = true;
	});

	window.addEventListener("keyup", function (e) {
		nakov.keys[e.keyCode] = false;
	});

	nakovControl();
	function nakovControl() {
		movingNakov();
		function movingNakov() {
			nakovKey();
			nakov.currentPos.x += nakov.velX;
			nakovStop();
			moveNakov();
			requestAnimationFrame(movingNakov);
		}
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

		function moveNakov() {
			// -5 as a safeguard for insufficiently deletion
			ctx.clearRect(nakov.left ? nakov.currentPos.x - nakov.velX - 5 : nakov.currentPos.x + nakov.velX - 5,
				nakov.currentPos.y, nakov.dimensions.x + nakov.maxSpeed - nakov.velX, nakov.dimensions.y);
			ctx.drawImage(nakovImg, nakov.currentPos.x, nakov.currentPos.y);
		}
	}
	animateBira();
	function animateBira() {
		bira.currentPos.y+=bira.velY;
		ctx.clearRect(bira.currentPos.x,bira.currentPos.y - bira.velY-0.025,bira.currentPos.x,bira.currentPos.y);
		ctx.drawImage(biraImg, bira.currentPos.x, bira.currentPos.y);
		bira.velY+=0.05;
		window.requestAnimationFrame(animateBira);
	}
	animateRakia();
	function animateRakia() {
		rakia.currentPos.y+=rakia.velY;
		ctx.clearRect(rakia.currentPos.x,rakia.currentPos.y - rakia.velY-0.025,rakia.currentPos.x,rakia.currentPos.y);
		ctx.drawImage(rakiaImg, rakia.currentPos.x, rakia.currentPos.y);
		rakia.velY+=0.05;
		window.requestAnimationFrame(animateRakia);
	}
	animateSalata();
	function animateSalata() {
		salata.currentPos.y+=salata.velY;
		ctx.clearRect(salata.currentPos.x,salata.currentPos.y - salata.velY-0.025,salata.currentPos.x,salata.currentPos.y);
		ctx.drawImage(salataImg, salata.currentPos.x, salata.currentPos.y);
		salata.velY+=0.05;
		window.requestAnimationFrame(animateSalata);
	}
	animateSalataShopska();
	function animateSalataShopska() {
		salataShopska.currentPos.y+=salataShopska.velY;
		ctx.clearRect(salataShopska.currentPos.x,salataShopska.currentPos.y - salataShopska.velY-0.025,salataShopska.currentPos.x,salataShopska.currentPos.y);
		ctx.drawImage(salataShopskaImg, salataShopska.currentPos.x, salataShopska.currentPos.y);
		salataShopska.velY+=0.05;
		window.requestAnimationFrame(animateSalataShopska);
	}


	draw();
	function draw() {
		// catcher
		//clearing the frame
		ctx.clearRect(0,0,800,600);
		nakovImg.onload = () => {
			// salads
			ctx.drawImage(nakovImg, nakov.startPos.x, nakov.startPos.y);
		};

		salataShopskaImg.onload = () => {
			// alcohol
			ctx.drawImage(salataShopskaImg, salataShopska.startPos.x, salataShopska.startPos.y);
		};
		salataImg.onload = () => {
			ctx.drawImage(salataImg, salata.startPos.x, salata.startPos.y);
		};
		biraImg.onload = () => {
			ctx.drawImage(biraImg, bira.startPos.x, bira.startPos.y);
		};
		rakiaImg.onload = () => {
			ctx.drawImage(rakiaImg, rakia.startPos.x, rakia.startPos.y);
		};

		// load images
		biraImg.src = 'images/bira.png';
		rakiaImg.src = 'images/rakia.png';
		salataShopskaImg.src = 'images/salata-shopska.png';
		salataImg.src = 'images/salata.png';
		nakovImg.src = 'images/nakov.png';
	}
}

game();
