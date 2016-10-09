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
	let nakov = {x:400, left: false};

	//Constant values
	let nakovSpeed = 30;

	window.addEventListener('keydown', movingNakov);

	function movingNakov(event) {
		switch (event.code) {
			case 'ArrowLeft':
				if (nakov.x - nakovSpeed >= -10) {
					nakov.x -= nakovSpeed;
					nakov.left = false;
				}
				break;
			case 'ArrowRight':
				if (nakov.x + nakovSpeed <= 700) {
					nakov.x += nakovSpeed;
					nakov.left = true;
				}
				break;
		}
		requestAnimationFrame(moveNakov);
	}

	function moveNakov() {
		ctx.clearRect(nakov.left ? nakov.x - nakovSpeed : nakov.x + nakovSpeed, 490, 110 + nakovSpeed, 110);
		ctx.drawImage(nakovImg, nakov.x, 490);
	}

	draw();
	function draw() {
		//clearing the frame
		ctx.clearRect(0,0,800,600);

		// catcher
		nakovImg.onload = () => {
			ctx.drawImage(nakovImg, 400, 490);
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