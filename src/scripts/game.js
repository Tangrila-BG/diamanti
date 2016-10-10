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

    let imageSources = [
        { src: 'images/bira.png' },
        { src: 'images/rakia.png' },
        { src: 'images/salata-shopska.png' },
        { src: 'images/salata.png' },
    ]

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

	let salata = { dimensions: { x: 130, y: 110} };
	let salataShopska = { dimensions: {x: 130, y: 110} };
	let bira = { dimensions: {x: 45, y: 110} };
	let rakia = { dimensions: {x: 35, y: 110} };

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

	draw();
	function draw() {
		//clearing the frame
		ctx.clearRect(0,0,800,600);
        let startingCoordinates = [];
        while(startingCoordinates.length < 4){
            let randomnumber=Math.ceil(Math.random()*670)
            let found=false;
            for(let i=0;i<startingCoordinates.length;i++){
                if(Math.abs(startingCoordinates[i]-randomnumber)<120){found=true;break}
            }
            if(!found)startingCoordinates[startingCoordinates.length]=randomnumber;
        }
		// catcher
		nakovImg.onload = () => {
			ctx.drawImage(nakovImg, nakov.startPos.x, nakov.startPos.y);
		};
		 salataShopskaImg.onload = () => {
		 	ctx.drawImage(salataShopskaImg, startingCoordinates[0], 0);
		 };
		 salataImg.onload = () => {
		 	ctx.drawImage(salataImg, startingCoordinates[1], 0);
		 };
		 // alcohol
		 biraImg.onload = () => {
		 	ctx.drawImage(biraImg, startingCoordinates[2], 0);
		 };
		 rakiaImg.onload = () => {
		 	ctx.drawImage(rakiaImg, startingCoordinates[3], 0);
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