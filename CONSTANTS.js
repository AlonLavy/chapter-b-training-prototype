export const boardItems = {
	boardLength: 10,
}
export const orientation = {
	up: 1,
	left: 2,
	down: 3,
	right: 4
}

export const pacmanRotation = {
	right: 0,
	left: Math.PI,
	down: Math.PI / 2,
	up: -Math.PI / 2
}

export const obstacles = [[3, 3], [3, 4], [3, 5], [6, 1], [6, 2]];

export const corners = [[0, 0], [0, boardItems.boardLength - 1], [boardItems.boardLength - 1, 0], [boardItems.boardLength - 1, boardItems.boardLength - 1]]

export const colorPalette = {
	pacmanColor: "rgb(255,255,0)",
	eyeColor: "rgb(0,0,0)",
	ghostColor: "rgb(0,0,255)",
	foodColor: "rgb(0,0,0)",
	obstacleColor: "rgb(128,128,128)"
}