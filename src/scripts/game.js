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
		dimensions: { x: 110, y: 110}
	};
	let salata = { dimensions: { x: 130, y: 110} };
	let salataShopska = { dimensions: {x: 130, y: 110} };
	let bira = { dimensions: {x: 45, y: 110} };
	let rakia = { dimensions: {x: 35, y: 110} };

	//Constant values
	let nakovSpeed = 20;

	window.addEventListener('keydown', movingNakov);

	function movingNakov(event) {
		switch (event.code) {
			case 'ArrowLeft':
				if (nakov.currentPos.x - nakovSpeed >= 0) {
					nakov.currentPos.x -= nakovSpeed;
					nakov.left = false;
				}
				break;
			case 'ArrowRight':
				if (nakov.currentPos.x + nakovSpeed <= 700) {
					nakov.currentPos.x += nakovSpeed;
					nakov.left = true;
				}
				break;
		}
		requestAnimationFrame(moveNakov);
	}

	function moveNakov() {
		ctx.clearRect(nakov.left ? nakov.currentPos.x - nakovSpeed : nakov.currentPos.x + nakovSpeed,
			nakov.currentPos.y, nakov.dimensions.x + nakovSpeed, nakov.dimensions.y);
		ctx.drawImage(nakovImg, nakov.currentPos.x, nakov.currentPos.y);
	}

	draw();
	function draw() {
		//clearing the frame
		ctx.clearRect(0,0,800,600);

		// catcher
		nakovImg.onload = () => {
			ctx.drawImage(nakovImg, nakov.startPos.x, nakov.startPos.y);
		};
		// salads
		salataShopskaImg.onload = () => {
			ctx.drawImage(salataShopskaImg, 200, 0);
		};
		salataImg.onload = () => {
			ctx.drawImage(salataImg, 350, 0);
		};
		// alcohol
		biraImg.onload = () => {
			ctx.drawImage(biraImg, 100, 0);
		};
		rakiaImg.onload = () => {
			ctx.drawImage(rakiaImg, 0, 0);
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