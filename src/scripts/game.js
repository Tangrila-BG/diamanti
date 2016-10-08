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
	let nakov = {x:0};

	//Constant values
	let nakovSpeed = 10;

	window.addEventListener('keydown', moveingNakov);

	function moveingNakov(event) {
		switch (event.code) {
			case 'ArrowLeft':
				nakov.x -= nakovSpeed;
				break;
			case 'ArrowRight':
				nakov.x += nakovSpeed;
		}
		draw()
	}

	function draw() {
		//clearing the frame
		ctx.clearRect(0,0,800,600);

		// catcher
		nakovImg.onload = () => {
			ctx.drawImage(nakovImg, nakov.x, 490);
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
			ctx.drawImage(biraImg, biraPos.x, biraPos.y);
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