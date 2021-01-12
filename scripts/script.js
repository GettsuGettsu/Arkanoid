const field = document.getElementById('field');
const brField = document.getElementById('brField');
const bricks = brField.getElementsByTagName('td');
const ball = document.getElementById('ball');
const paddle = document.getElementById('paddle');
const inpt = document.getElementById('input');
let score = 0;
let lifes = 3;
var Ball = {
	x: 947.5,
	y: 926,
	width: 25,
	height: 25,
	dx: 0,
	dy: 0,
	v: 5
}
var Paddle = {
	x:886,
	y:951,
	height: 25,
	width: 148
}
var bord = {
	y: 10,
	left: 567.5,
	right: 1352.5,
	bottom: 976
}

function collides(obj1, obj2) {
  return obj1.x < obj2.x + obj2.width &&
         obj1.x + obj1.width > obj2.x &&
         obj1.y < obj2.y + obj2.height &&
         obj1.y + obj1.height > obj2.y;
}

document.addEventListener('keydown', function (e) {
		if (e.key == "Pause" || e.key == "Escape") alert('Pause!');
	}, false)

function cycle() {
	requestAnimationFrame(cycle);
	
	field.addEventListener('mousemove', function (e) {
		let px;
		if (e.pageX - Paddle.width/2 > bord.left) {
			if (e.pageX + Paddle.width/2 < bord.right)
			px = e.pageX - Paddle.width/2;
			else px = bord.right - Paddle.width;
		}
		else px = bord.left;
		paddle.style.left = px + 'px';
		Paddle.x = px;
	}, false);
	
	Ball.x += Ball.dx;
	ball.style.left = Ball.x;
	Ball.y += Ball.dy;
	ball.style.top = Ball.y;
	
	if (Ball.x >= bord.right - Ball.width) {
		Ball.x = bord.right - Ball.width;
		Ball.dx *= -1;
	}
	if (Ball.x <= bord.left) {
		Ball.x = bord.left;
		Ball.dx *= -1;
	}
	if (Ball.y <= bord.y) {
		Ball.y = bord.y;
		Ball.dy *= -1;
	}
	if (Ball.y >= bord.bottom - Ball.width - 1) {
		if (lifes > 1) {
			lifes--;
			Ball.y = bord.bottom - Ball.width - 1;
			Ball.dy *= -1;
		}
		else {
			alert('Game over');
			/*Ball.x = 947.5;
			Ball.y = 926;
			Ball.dx = 0;
			Ball.dy = 0;
			lifes= 3;*/
			location.reload();
		}
	}
	
	if (collides(Ball, Paddle)) { 
		Ball.y = Paddle.y - Ball.height; 
		Ball.dy *= -1;
	}
	
	for (let i = 0; i < bricks.length; i++) {
		let brick = bricks[i].getBoundingClientRect();
		if (collides(Ball, brick)) {
			if (bricks[i].className !== 'hide') {
				if (Ball.y + Ball.height - Ball.v <= brick.y || Ball.y >= brick.y + brick.height - Ball.v) {
					Ball.dy *= -1;
				}
				else Ball.dx *= -1;
				bricks[i].className = 'hide';
			}
			break;
		}
	}
	
	field.addEventListener('mousedown', function(e) {
		if (Ball.dx === 0 && Ball.dy === 0 && e.which === 1) {
		Ball.dx = Ball.v;
		Ball.dy = -1*Ball.v;
		}
	}, false);
	
	inpt.setAttribute('value', "lifes: " + lifes);
}
requestAnimationFrame(cycle());


