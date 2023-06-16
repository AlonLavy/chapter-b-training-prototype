var context = canvas.getContext("2d");
var shape = new Object();
var board;
var score;
var pac_color;
var startTime = 0;
var timeElapsed;
var interval;
var intervalRotate;
var gameOver = false;
var perviousGhosts = [];
var killed = false;

const boardItems = {
	boardLength: 10,
	pacmans: 1,
	empty: 0,
	pacman: 2,
	food: 1,
	obstacle: 4,
	ghost: 3
};

var foodStart;
var timeLimit;
var ghostCount;

const pacmanRotation = {
	right: 0,
	left: Math.PI,
	down: Math.PI / 2,
	up: -Math.PI / 2
};

const moveDirection = {
	up: 1,
	down: 2,
	left: 3,
	right: 4
};

const obstacles = [[3, 3], [3, 4], [3, 5], [6, 1], [6, 2]];

const corners = [[0, 0], [0, boardItems.boardLength - 1], [boardItems.boardLength - 1, 0], [boardItems.boardLength - 1, boardItems.boardLength - 1]]


Start();

function userInput() {
	foodStart = prompt("Enter amount of food wanted: ");
	timeLimit = prompt("Enter time limit for the game: ");
	ghostCount = prompt("Enter the amount of ghosts to add to the game: Maximum 4: ");
}

function Start() {
	userInput();
	board = new Array();
	score = 0;
	pac_color = "rgb(255,255,0)";
	for (let i = 0; i < boardItems.boardLength; i++) {
		board[i] = new Array();
		for (let j = 0; j < boardItems.boardLength; j++) {
			board[i][j] = boardItems.empty;
			for (let k = 0; k < obstacles.length; k++) {
				if (obstacles[k][0] == i && obstacles[k][1] == j) {
					board[i][j] = boardItems.obstacle;
				}
			}
			for (let k = 0; k < corners.length; k++) {
				if (corners[k][0] == i && corners[k][1] == j && ghostCount > 0) {
					board[i][j] = boardItems.ghost;
					perviousGhosts.push([[i, j], 0])
					ghostCount--;
				}
			}
		}
	}
	for (let i = 0; i < boardItems.pacmans; i++) {
		let emptyCell = findRandomEmptyCell(board);
		shape.i = emptyCell[0];
		shape.j = emptyCell[1];
		board[shape.i][shape.j] = boardItems.pacman;
	}
	for (let i = 0; i < foodStart; i++) {
		let emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = boardItems.food;
	}
	keysDown = {};
	addEventListener("keydown", function (e) {
		for (let key in keysDown) {
			keysDown[key] = false;
		}
		keysDown[e.code] = true;
	}, false);
	if (!gameOver) {
		intervalRotate = setInterval(rotatePacman, 10)
		interval = setInterval(UpdatePosition, 250);
	}
}



function findRandomEmptyCell(board) {
	let i = Math.floor((Math.random() * (boardItems.boardLength - 1)) + 1);
	let j = Math.floor((Math.random() * (boardItems.boardLength - 1)) + 1);
	while (board[i][j] != boardItems.empty) {
		i = Math.floor((Math.random() * (boardItems.boardLength - 1)) + 1);
		j = Math.floor((Math.random() * (boardItems.boardLength - 1)) + 1);
	}
	return [i, j];
}


function GetKeyPressed() {
	if (keysDown['ArrowUp']) {
		if (startTime == 0) {
			startTime = new Date();
		}
		return moveDirection.up;
	}
	if (keysDown['ArrowDown']) {
		if (startTime == 0) {
			startTime = new Date();
		}
		return moveDirection.down;
	}
	if (keysDown['ArrowLeft']) {
		if (startTime == 0) {
			startTime = new Date();
		}
		return moveDirection.left;
	}
	if (keysDown['ArrowRight']) {
		if (startTime == 0) {
			startTime = new Date();
		}
		return moveDirection.right;
	}
}

function drawPacman(context, center, rotation) {
	context.beginPath();
	context.arc(center.x, center.y, 30, (0.15 * Math.PI) + rotation, (1.85 * Math.PI) + rotation); // half circle
	context.lineTo(center.x, center.y);
	context.fillStyle = pac_color; //color
	context.fill();
	context.beginPath();
	switch (rotation) {
		case pacmanRotation.right:
			context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI);
			break;
		case pacmanRotation.left:
			context.arc(center.x - 5, center.y - 15, 5, 0, 2 * Math.PI);
			break;
		case pacmanRotation.up:
			context.arc(center.x + 15, center.y - 5, 5, 0, 2 * Math.PI);
			break;
		case pacmanRotation.down:
			context.arc(center.x + 15, center.y + 5, 5, 0, 2 * Math.PI);
			break;
	}
	context.fillStyle = "rgb(0,0,0)"; //color
	context.fill();
}

function Draw(rotation) {
	context.clearRect(0, 0, canvas.width, canvas.height); //clean board
	lblScore.value = score;
	lblTime.value = timeElapsed;
	for (let i = 0; i < boardItems.boardLength; i++) {
		for (let j = 0; j < boardItems.boardLength; j++) {
			let center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] === boardItems.pacman) {
				drawPacman(context, center, rotation);
			}
			else if (board[i][j] == boardItems.ghost) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "rgb(0,0,255)"; //color
				context.fill();
			}
			else if (board[i][j] === boardItems.food) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "rgb(0,0,0)"; //color
				context.fill();
			} else if (board[i][j] === boardItems.obstacle) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "rgb(128,128,128)"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	let pressedKey = GetKeyPressed();
	switch (pressedKey) {
		case moveDirection.up:
			if (shape.j > 0 && board[shape.i][shape.j - 1] !== boardItems.obstacle) {
				shape.j--;
			}
			break;
		case moveDirection.down:
			if (shape.j < boardItems.boardLength - 1 && board[shape.i][shape.j + 1] !== boardItems.obstacle) {
				shape.j++;
			}
			break;
		case moveDirection.left:
			if (shape.i > 0 && board[shape.i - 1][shape.j] !== boardItems.obstacle) {
				shape.i--;
			}
			break;
		case moveDirection.right:
			if (shape.i < boardItems.boardLength - 1 && board[shape.i + 1][shape.j] !== boardItems.obstacle) {
				shape.i++;
			}
			break;
	}
	if (board[shape.i][shape.j] === boardItems.food) {
		score++;
	}
	else if (board[shape.i][shape.j] === boardItems.ghost) {
		killed = true;
		score = score - 10;
	}
	
	board[shape.i][shape.j] = boardItems.pacman;
	let randomizer = Math.random();
	if (randomizer <= 0.9) {
		perviousGhosts = moveGhosts(board, perviousGhosts);
	}
	timer();
	if (killed) {
		lblScore.value = score;
		lblTime.value = timeElapsed;
		window.clearInterval(interval);
		window.clearInterval(intervalRotate);
		window.alert("killed");
	}
	if (score >= foodStart / 2 && timeElapsed <= 5) {
		pac_color = "rgb(0,255,0)";
	}
	if (score == foodStart) {
		gameOver = true;
		lblScore.value = score;
		lblTime.value = timeElapsed;
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		rotatePacman();
	}
}

function rotatePacman(pressedKey) {
	timer();
	pressedKey = pressedKey || GetKeyPressed();
	switch (pressedKey) {
		case moveDirection.up:
			Draw(pacmanRotation.up);
			break;
		case moveDirection.down:
			Draw(pacmanRotation.down);
			break;
		case moveDirection.left:
			Draw(pacmanRotation.left);
			break;
		case moveDirection.right:
			Draw(pacmanRotation.right);
			break;
		default:
			Draw(pacmanRotation.right);
	}
}

function timer() {
	if (!gameOver) {
		var currentTime = new Date();
	}
	if (startTime != 0) {
		timeElapsed = (currentTime - startTime) / 1000;
	}
	else {
		timeElapsed = 0;
	}
	if (timeElapsed > timeLimit) {
		gameOver = true;
		lblScore.value = score;
		lblTime.value = timeElapsed;
		window.clearInterval(interval);
		window.alert("Game over due to time limit.");
	}
}

function findAllGhosts(board) {
	let ghostsArray = [];
	for (let i = 0; i < boardItems.boardLength; i++) {
		for (let j = 0; j < boardItems.boardLength; j++) {
			if (board[i][j] == boardItems.ghost) {
				ghostsArray.push([i, j]);
			}
		}
	}
	return ghostsArray;
}

function findPacman(board) {
	for (let i = 0; i < boardItems.boardLength; i++) {
		for (let j = 0; j < boardItems.boardLength; j++) {
			if (board[i][j] == boardItems.pacman) {
				return [i, j];
			}
		}
	}
}

const euclideanDistance = (a, b) => Math.hypot(...Object.keys(a).map(k => b[k] - a[k]));

function directionToPacman(ghost, pacman, board) {
	let validDirections = [];

	if (ghost[0] > 0 && board[ghost[0] - 1][ghost[1]] !== boardItems.obstacle) {
		validDirections.push([-1, 0]); // Left
	}
	if (ghost[0] < boardItems.boardLength - 1 && board[ghost[0] + 1][ghost[1]] !== boardItems.obstacle) {
		validDirections.push([1, 0]); // Right
	}
	if (ghost[1] > 0 && board[ghost[0]][ghost[1] - 1] !== boardItems.obstacle && board[ghost[0]][ghost[1] - 1] !== boardItems.ghost) {
		validDirections.push([0, -1]); // Up
	}
	if (ghost[1] < boardItems.boardLength - 1 && board[ghost[0]][ghost[1] + 1] !== boardItems.obstacle) {
		validDirections.push([0, 1]); // Down
	}

	if (validDirections.length === 0) {

		return [0, 0];
	}


	let distances = validDirections.map(direction => euclideanDistance([ghost[0] + direction[0], ghost[1] + direction[1]], pacman));
	const randomizerFunction = 0.008 * (ghostCount ** 2) + 0.099 * ghostCount + 0.25;
	const randomizer = Math.random();
	let shortestDistance = Math.min(...distances);
	if (randomizer < randomizerFunction) {
		shortestDistance = Math.max(...distances);
	}
	let shortestDirection = validDirections[distances.indexOf(shortestDistance)];

	return shortestDirection;
}


function moveGhosts(board, prevGhosts) {
	if (startTime === 0) {
		return prevGhosts;
	}

	const nextGhostsReplace = [];
	const currentGhosts = findAllGhosts(board);
	const nextGhosts = [];
	const pacman = findPacman(board);

	for (let ghost of currentGhosts) {
		direction = directionToPacman(ghost, pacman, board);
		if (board[ghost[0] + direction[0]][ghost[1] + direction[1]] == boardItems.ghost) {
			continue;
		}
		nextGhostsReplace.push([[ghost[0] + direction[0], ghost[1] + direction[1]], board[ghost[0] + direction[0]][ghost[1] + direction[1]]]);
		nextGhosts.push([ghost[0] + direction[0], ghost[1] + direction[1]]);
	}

	// Check for collisions between ghosts
	for (let ghost1 of nextGhostsReplace) {
		for (let ghost2 of nextGhostsReplace) {
			if (ghost1 !== ghost2 && ghost1[0][0] === ghost2[0][0] && ghost1[0][1] === ghost2[0][1]) {
				ghost1[0][0] = ghost1[0][0] - direction[0];
				ghost1[0][1] = ghost1[0][1] - direction[1];
			}
		}
	}

	for (let ghost of nextGhostsReplace) {
		const [i, j] = ghost[0];
		if (board[i][j] == boardItems.pacman) {
			killed = true;
			score = score - 10;
		}
		if (board[i][j] == boardItems.obstacle) {
			continue;
		}
		board[i][j] = boardItems.ghost;
	}

	for (let prevGhost of prevGhosts) {
		board[prevGhost[0][0]][prevGhost[0][1]] = prevGhost[1];
	}

	return nextGhostsReplace;
}
