const field = document.getElementById('field');
const brField = document.getElementById('brField');
const bricks = brField.getElementsByTagName('td');
const ball = document.getElementById('ball');
const paddle = document.getElementById('paddle');
const inpt = document.getElementById('input');

let score = 0;
let lifes = 3;

let Ball = {
	x: 947.5,
	y: 926,
	width: 25,
	height: 25,
	dx: 0,
	dy: 0,
	v: 5
}
let Paddle = {
	x:886,
	y:951,
	height: 25,
	width: 148
}
let bord = {
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

function dxRefl(k, dx) {
	if (dx > 0) return dx = k;
	else  return dx = -k;
}

document.addEventListener('keydown', function (e) {
		if (e.key == "Pause" || e.key == "Escape") alert('Pause!');
	}, false)

function cycle() {
	requestAnimationFrame(cycle);
	
	field.addEventListener('mousemove', function (e) {
		let px;
		if (Ball.dx === 0 && Ball.dy === 0) {
			Ball.x = Paddle.x + (Paddle.width - Ball.width)/2;
		}
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
	if (Ball.y + Ball.height >= bord.bottom) {
		if (lifes > 1) {
			lifes--;
			Ball.dy = Ball.dx = 0;
			Ball.y = 926;
			Ball.x = Paddle.x + (Paddle.width - Ball.width)/2;
		}
		else {
			alert('Game over');
			location.reload();
		}
	}
	
	if (collides(Ball, Paddle)) { 
		if ((Ball.x + Ball.width > Paddle.x && Ball.x + Ball.width/2 <= Paddle.x + Paddle.width/5) ||
		(Ball.x + Ball.width/2 >= Paddle.x + Paddle.width * 4/5 && Ball.x - Ball.width/2 < Paddle.x + Paddle.width)) {
			Ball.dy *= -3 / Ball.dy;
			Ball.dx = dxRefl(10, Ball.dx);
			Ball.y = Paddle.y - Ball.height;
		} else if (Ball.x + Ball.width/2 > Paddle.x + Paddle.width/5 && Ball.x + Ball.width/2 < Paddle.x + Paddle.width * 4/5) {
			Ball.dy *= -5 / Ball.dy;
			Ball.dx = dxRefl(5, Ball.dx);
			Ball.y = Paddle.y - Ball.height;
		} else if (Ball.y + Ball.height === Paddle.y && (Ball.x + Ball.width === Paddle.x || Ball.x  === Paddle.x + Paddle.width)) {
			Ball.dy *= -1;
			Ball.dx *= -1;
		} else if (Ball.y + Ball.height > Paddle.y && (Ball.x + Ball.width <= Paddle.x || Ball.x >= Paddle.x + Paddle.width)) {
			Ball.dx *= -1;
		}
	}
	
	for (let i = 0; i < bricks.length; i++) {
		let brick = bricks[i].getBoundingClientRect();
		if (collides(Ball, brick)) {
			if (bricks[i].className !== 'hide') {
				score++;
				if (Ball.y + Ball.height - Ball.v <= brick.y || Ball.y >= brick.y + brick.height - Ball.v) {
					Ball.dy *= -1;
				}
				else Ball.dx *= -1;
				bricks[i].className = 'hide';
				if (score === 110) {
					alert('You win!');
					location.reload();
				}
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
requestAnimationFrame(cycle);
