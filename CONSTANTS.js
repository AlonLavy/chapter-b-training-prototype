export const boardItems = {
	boardLength: 10,
	ghost: 1,
	obstacle: 2,
	pacman: 3,
	empty: 4,
	food: 5
}

export const orientation = {
	right: 0,
	left: 1,
	down: 2,
	up: 3
}

export const pacmanRotation = {
	right: 0,
	left: Math.PI,
	down: Math.PI / 2,
	up: -Math.PI / 2
}

export const obstacles = [{"x": 3, "y": 3}, {"x": 3, "y": 4}, {"x": 3, "y": 5}, {"x": 6, "y": 1}, {"x": 6, "y": 2}];

export const corners = [{"x": 0, "y": 0}, {"x": 0, "y": boardItems.boardLength - 1}, {"x": boardItems.boardLength - 1, "y": 0}, {"x": boardItems.boardLength - 1, "y": boardItems.boardLength - 1}]

export const colorPalette = {
	pacmanColor: "rgb(255,255,0)",
	eyeColor: "rgb(0,0,0)",
	ghostColor: "rgb(0,0,255)",
	foodColor: "rgb(0,0,0)",
	obstacleColor: "rgb(128,128,128)",
	backgroundColor: "rgb(61, 61, 61)",
	backgroundGameWon: "rgb(255,255,255)",
	textGameWon: "rgb(207, 181, 59)",
	textGameOver: "rgb(207, 181, 59",
	backgroundGameOver: "rgb(0, 0, 0)"
}

export const startLives = 3;
export const slowMotionTime = 3;

