function Draw(rotation) {
	context.clearRect(0, 0, canvas.width, canvas.height); //clean board
	lblScore.value = score;
	lblTime.value = timeElapsed;
	for (let i = 0; i < boardFeatures.boardLength; i++) {
		for (let j = 0; j < boardFeatures.boardLength; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] === boardFeatures.pacman) {
				context.beginPath();
				context.arc(center.x, center.y, 30, (0.15 * Math.PI) + rotation, (1.85 * Math.PI) + rotation); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "rgb(0,0,0)"; //color
				context.fill();
			} else if (board[i][j] === boardFeatures.food) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "rgb(0,0,0)"; //color
				context.fill();
			} else if (board[i][j] === boardFeatures.obstacle) {
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
	let pressedKey = GetPressedKey();
	switch (pressedKey) {
		case moveDirection.up:
			if (shape.j > 0 && board[shape.i][shape.j - 1] !== boardFeatures.obstacle) {
				shape.j--;
			}
			break;
		case moveDirection.down:
			if (shape.j < boardFeatures.boardLength - 1 && board[shape.i][shape.j + 1] !== boardFeatures.obstacle) {
				shape.j++;
			}
			break;
		case moveDirection.left:
			if (shape.i > 0 && board[shape.i - 1][shape.j] !== boardFeatures.obstacle) {
				shape.i--;
			}
			break;
		case moveDirection.right:
			if (shape.i < boardFeatures.boardLength - 1 && board[shape.i + 1][shape.j] !== boardFeatures.obstacle) {
				shape.i++;
			}
			break;
	}
	if (board[shape.i][shape.j] === boardFeatures.food) {
		score++;
	}
	board[shape.i][shape.j] = boardFeatures.pacman;
	let currentTime = new Date();
	if (startTime != 0) {
		timeElapsed = (currentTime - startTime) / 1000;
	}
	else {
		timeElapsed = 0;
	}
	if (score >= foodStart / 2 && timeElapsed <= 5) {
		pac_color = "rgb(0,255,0)";
	}
	if (score === foodStart) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
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
}