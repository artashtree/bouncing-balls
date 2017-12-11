function Ball(color, radius, angle, speed){
	this.color = color,
	this.radius = radius,
	this.angle = angle,
	this.speed = speed,
	this.x = 0,
	this.y = 0,
	this.dx = Math.cos(angle)*speed,
	this.dy = Math.sin(angle)*speed,
	this.toRight = true,
	this.toBottom = true,
	this.iteration = 0
}

function getAngle(){
	var angle;
	do {
		angle = Math.floor(Math.random()*360);
	} while ( (Math.cos(angle) <= 0.5) || (Math.sin(angle) <= 0.5) );
	return angle;
}
function getColor(){
	return 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';
}
function getRadius(){
	return Math.floor(Math.random() * 50) + 10;
}


var allBalls = [];
var balls = [];
balls.push(new Ball(getColor(), getRadius(), getAngle(), 3));
for(let j = 0; j < 20; j++){
  allBalls.push(new Ball(getColor(), getRadius(), getAngle(), 3));
}

var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");

function drawBalls(balls){

	c.clearRect(0, 0, canvas.width, canvas.height);

	balls.forEach( function(element, index) {
		c.fillStyle = element.color;
	    c.beginPath();
	    c.arc(element.x, element.y, element.radius, 0, 2*Math.PI);
	    c.closePath();
	    c.fill();

	 	var rightTouch, bottomTouch, leftTouch, topTouch;
	 	function checkIfTouched(){
		 	rightTouch = element.x >= canvas.width - element.radius;
		 	bottomTouch = element.y >= canvas.height - element.radius;
		 	leftTouch = element.x <= element.radius;
		 	topTouch = element.y <= element.radius;
	 	}
	 	function doBounce(){
			if(rightTouch || leftTouch){
				element.toRight = !element.toRight;
			}
			if(bottomTouch || topTouch){
				element.toBottom = !element.toBottom;
			}
	 	}

		if(element.toRight && element.toBottom){
			element.x += element.dx;
			element.y += element.dy;
			element.iteration++;
	 		(element.iteration >= (window.innerHeight / element.dy)-element.radius) || (element.iteration >= (window.innerWidth / element.dx)-element.radius) ? checkIfTouched() : false;
	 		doBounce();
		} else if(!element.toRight && element.toBottom){
			element.x -= element.dx;
			element.y += element.dy;
			element.iteration++;
	 		(element.iteration >= (window.innerHeight / element.dy)-element.radius) || (element.iteration >= (window.innerWidth / element.dx)-element.radius) ? checkIfTouched() : false;
	 		doBounce();
		} else if(!element.toRight && !element.toBottom){
			element.x -= element.dx;
			element.y -= element.dy;
			element.iteration++;
	 		(element.iteration >= (window.innerHeight / element.dy)-element.radius) || (element.iteration >= (window.innerWidth / element.dx)-element.radius) ? checkIfTouched() : false;
	 		doBounce();
		} else if(element.toRight && !element.toBottom){
			element.x += element.dx;
			element.y -= element.dy;
			element.iteration++;
	 		(element.iteration >= (window.innerHeight / element.dy)-element.radius) || (element.iteration >= (window.innerWidth / element.dx)-element.radius) ? checkIfTouched() : false;
	 		doBounce();
		}
	});
	
}

setInterval(drawBalls, 5, balls);

var i = 1;
function addBall(){
	if(i < allBalls.length){
		balls.push(allBalls[i]);
		i++;
	} else {
		clearInterval(t1);
	}
}
var t1 = setInterval(addBall, 5000);