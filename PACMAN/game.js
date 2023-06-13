var context = canvas.getContext("2d");
var shape = new Object();
var board;
var score;
var pac_color;
var start_time = 0;
var time_elapsed;
var interval;

Start();

function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if ((i === 3 && j === 3) || (i === 3 && j === 4) || (i === 3 && j === 5) || (i === 6 && j === 1) || (i === 6 && j === 2)) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= 1.0 * food_remain / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < 1.0 * (pacman_remain + food_remain) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	keysDown = {};
	addEventListener("keydown", function (e) {
		for (let key in keysDown)
		{
			keysDown[key] = false;
		}
		keysDown[e.code] = true;
	}, false);
	/*addEventListener("keyup", function (e) {
		keysDown[e.code] = false;
	}, false);*/
	interval = setInterval(UpdatePosition, 250);
}


function findRandomEmptyCell(board) {
	var i = Math.floor((Math.random() * 9) + 1);
	var j = Math.floor((Math.random() * 9) + 1);
	while (board[i][j] !== 0) {
		i = Math.floor((Math.random() * 9) + 1);
		j = Math.floor((Math.random() * 9) + 1);
	}
	return [i, j];
}


function GetKeyPressed() {
	if (keysDown['ArrowUp']) {
		if (start_time == 0) {
			start_time = new Date();
		}
		return 1;
	}
	if (keysDown['ArrowDown']) {
		if (start_time == 0) {
			start_time = new Date();
		}
		return 2;
	}
	if (keysDown['ArrowLeft']) {
		if (start_time == 0) {
			start_time = new Date();
		}
		return 3;
	}
	if (keysDown['ArrowRight']) {
		if (start_time == 0) {
			start_time = new Date();
		}
		return 4;
	}
}

function Draw(rotation) {
	context.clearRect(0, 0, canvas.width, canvas.height); //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] === 2) {
				context.beginPath();
				context.arc(center.x, center.y, 30, (0.15 * Math.PI)+rotation, (1.85 * Math.PI)+rotation); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] === 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] === 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x === 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] !== 4) {
			shape.j--;
		}
	}
	if (x === 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] !== 4) {
			shape.j++;
		}
	}
	if (x === 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] !== 4) {
			shape.i--;
		}
	}
	if (x === 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] !== 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] === 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	if (start_time != 0) {
		time_elapsed = (currentTime - start_time) / 1000;
	}
	else {
		time_elapsed = 0;
	}
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score === 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		switch(x)
		{
			case 1:
				Draw(-Math.PI/2);
				break;
			case 2:
				Draw(Math.PI/2);
				break;
			case 3:
				Draw(Math.PI);
				break;
			case 4:
				Draw(0);
				break;
			default:
				Draw(0);
		}
	}
}