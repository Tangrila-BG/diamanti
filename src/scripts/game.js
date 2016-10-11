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

    function randomCoordinates (startingCoordinates){
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
        maxSpeed: 10
    };

    let salata = {
        startPos: {x: startingCoordinates[0], y: Math.min(-110, -Math.random() * 500)},
        dimensions: {x: 130, y: 110},
        currentPos: {x: startingCoordinates[0], y: Math.min(-110, -Math.random() * 500)},
        velY: 0
    };
    objects.push(salata);
    let salataShopska = {
        startPos: {x: startingCoordinates[1], y: Math.min(-110, -Math.random() * 500)},
        dimensions: {x: 130, y: 110},
        currentPos: {x: startingCoordinates[1], y: Math.min(-110, -Math.random() * 500)},
        velY: 0
    };
    objects.push(salataShopska);
    let bira = {
        startPos: {x: startingCoordinates[2], y: Math.min(-110, -Math.random() * 500)},
        dimensions: {x: 45, y: 110},
        currentPos: {x: startingCoordinates[2], y: Math.min(-110, -Math.random() * 500)},
        velY: 0,
        speed: 10
    };
    objects.push(bira);
    let bira1 = {
        startPos: {x: startingCoordinates[1], y: Math.min(-110, -Math.random() * 500)},
        dimensions: {x: 45, y: 110},
        currentPos: {x: startingCoordinates[1], y: Math.min(-110, -Math.random() * 500)},
        velY: 0,
        speed: 10
    };
    objects.push(bira1);
    let rakia = {
        startPos: {x: startingCoordinates[3], y: Math.min(-110, -Math.random() * 500)},
        dimensions: {x: 35, y: 110},
        currentPos: {x: startingCoordinates[3], y: Math.min(-110, -Math.random() * 500)},
        velY: 0,
        speed: 10
    };
    objects.push(rakia);
    let rakia1 = {
        startPos: {x: startingCoordinates[2], y: Math.min(-110, -Math.random() * 500)},
        dimensions: {x: 35, y: 110},
        currentPos: {x: startingCoordinates[2], y: Math.min(-110, -Math.random() * 500)},
        velY: 0,
        speed: 10
    };
    objects.push(rakia1);

        //Constant values

        window.addEventListener("keydown", function (e) {
            nakov.keys[e.keyCode] = true;
        });

        window.addEventListener("keyup", function (e) {
            nakov.keys[e.keyCode] = false;
        });

		function gameLoop() {
			cls();
			//animateBira();
            animate(bira, biraImg, 1);
			animateNakov();
			animate(rakia, rakiaImg,2);
			animate(salata, salataImg,3);
			animate(salataShopska, salataShopskaImg,0);
            animate(bira1, biraImg, 3);
            animate(rakia1, rakiaImg,1);

			requestAnimationFrame(gameLoop);
		}
        function animateNakov() {
            movingNakov();
            function movingNakov() {
                nakovKey();
                nakov.currentPos.x += nakov.velX;
                nakovStop();
                drawNakov();
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

            function drawNakov() {
	            ctx.drawImage(nakovImg, nakov.currentPos.x, nakov.currentPos.y);
            }
        }
        function animate (currentObj, image, index){
            currentObj.currentPos.y += currentObj.velY;
            if (currentObj.velY < 20)
                currentObj.velY += 0.05;
            //if (bira.currentPos.y>300)
            //    animateBira1();
            if (currentObj.currentPos.y > 600) {
                startingCoordinates = [];
                startingCoordinates = randomCoordinates(startingCoordinates);
                currentObj.currentPos.y = Math.min(-110, -Math.random() * 300);
                currentObj.currentPos.x = startingCoordinates[index];
                currentObj.velY = 0;
            }
            ctx.drawImage(image, currentObj.currentPos.x, currentObj.currentPos.y);
        }



       ////function animateBira() {
       //    bira.currentPos.y += bira.velY;
	   //    if (bira.velY < 20)
	//        bira.velY += 0.05;
       //    //if (bira.currentPos.y>300)
       //    //    animateBira1();
       //    if (bira.currentPos.y > 600) {
       //        startingCoordinates = [];
       //        startingCoordinates = randomCoordinates(startingCoordinates);
       //        bira.currentPos.y = Math.min(-110, -Math.random() * 300);
       //        bira.currentPos.x = startingCoordinates[0];
       //        bira.velY = 0;
       //    }
	   //    ctx.drawImage(biraImg, bira.currentPos.x, bira.currentPos.y);
       //}

//      function animateBira1() {
//          bira1.currentPos.y += bira1.velY;
//          if (bira1.velY < 20)
//              bira1.velY += 0.05;
//          if (bira1.currentPos.y > 600) {
//              startingCoordinates = [];
//              startingCoordinates = randomCoordinates(startingCoordinates);
//              bira1.currentPos.y = Math.min(-110, -Math.random() * 300);
//              bira1.currentPos.x = startingCoordinates[3];
//              bira1.velY = 0;
//          }
//          ctx.drawImage(biraImg, bira1.currentPos.x, bira1.currentPos.y);
//      }

//      function animateRakia() {
//          rakia.currentPos.y += rakia.velY;
//	        if (rakia.velY < 20)
//		        rakia.velY += 0.05;
//          if (rakia.currentPos.y > 600) {
//              startingCoordinates = [];
//              startingCoordinates = randomCoordinates(startingCoordinates);
//              rakia.currentPos.y = Math.min(-110, -Math.random() * 300);
//              rakia.currentPos.x = startingCoordinates[1];
//              rakia.velY = 0;
//          }
//	        ctx.drawImage(rakiaImg, rakia.currentPos.x, rakia.currentPos.y);
//          scoring();

////      }

//   function animateRakia1() {
//       rakia1.currentPos.y += rakia1.velY;
//       if (rakia1.velY < 20)
//           rakia1.velY += 0.05;
//       if (rakia1.currentPos.y > 600) {
//           startingCoordinates = [];
//           startingCoordinates = randomCoordinates(startingCoordinates);
//           rakia1.currentPos.y = Math.min(-110, -Math.random() * 300);
//           rakia1.currentPos.x = startingCoordinates[1];
//           rakia1.velY = 0;
//       }
//       ctx.drawImage(rakiaImg, rakia1.currentPos.x, rakia1.currentPos.y);
//   }

//       function animateSalata() {
//           salata.currentPos.y += salata.velY;

//	        if (salata.velY < 20)
//		        salata.velY += 0.05;
//           if (salata.currentPos.y > 600) {
//               startingCoordinates = [];
//               startingCoordinates = randomCoordinates(startingCoordinates);
//               salata.currentPos.y = Math.min(-110, -Math.random() * 700);
//               salata.currentPos.x = startingCoordinates[2];
//               salata.velY = 0;
//           }
//	        ctx.drawImage(salataImg, salata.currentPos.x, salata.currentPos.y);
//       }

//       function animateSalataShopska() {
//           salataShopska.currentPos.y += salataShopska.velY;

//	        if (salataShopska.velY < 10)
//		        salataShopska.velY += 0.05;
//           if (salataShopska.currentPos.y > 600) {
//               startingCoordinates = [];
//               startingCoordinates = randomCoordinates(startingCoordinates);
//               salataShopska.currentPos.y = Math.min(-110, -Math.random() * 700);
//               salataShopska.currentPos.x = startingCoordinates[3];
//               salataShopska.velY = 0;
//           }
//	        ctx.drawImage(salataShopskaImg, salataShopska.currentPos.x, salataShopska.currentPos.y);
//       }
        draw();
		gameLoop();
        function draw() {
            // catcher
            //clearing the frame
            ctx.clearRect(0, 0, 800, 600);
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
            biraImg.onload = () => {
                ctx.drawImage(biraImg, bira1.startPos.x, bira1.startPos.y);
            };
            rakiaImg.onload = () => {
                ctx.drawImage(rakiaImg, rakia.startPos.x, rakia.startPos.y);
            };
            rakiaImg.onload = () => {
                ctx.drawImage(rakiaImg, rakia1.startPos.x, rakia1.startPos.y);
            };

            // load images
            biraImg.src = 'images/bira.png';
            rakiaImg.src = 'images/rakia.png';
            salataShopskaImg.src = 'images/salata-shopska.png';
            salataImg.src = 'images/salata.png';
            nakovImg.src = 'images/nakov.png';
        }

      // scoring();

      function scoring (){
           let x = nakov.currentPos.x - rakia.currentPos.x;
           let y = nakov.currentPos.y - rakia.currentPos.y;
           let distance = Math.sqrt(x*x + y*y);
           if (distance<40) {
               nakov.drunkLevel++;
           }
           console.log(nakov.drunkLevel);
       }

        function restartGame (){
            if (nakov.drunkLevel>=5){
                game();
            }
        }
}

game();
