import { Pacman } from "./pacman.js";
import { Food } from "./food.js";
import { Ghost } from "./ghost.js";
import { Obstacle } from "./obstacle.js";
import { Board } from "./board.js";
import { Empty } from "./empty.js";
import * as CONSTANTS from "./CONSTANTS.js";

var context = canvas.getContext("2d");
var gameStarted = false;
var gameInterval;
var keysDown = {};
keysDown["ArrowUp"] = false;
keysDown["ArrowDown"] = false;
keysDown["ArrowLeft"] = false;
keysDown["ArrowRight"] = false;
var startTime = 0;
var gameOver;
var board = new Board([], [], [], []);
var labelTime = document.getElementById("lblTime");
var labelGhosts = document.getElementById("labelGhosts");
var labelFoods = document.getElementById("labelFoods");
var numOfFoods = labelFoods.value;
var numOfGhosts = labelGhosts.value;
var changes = document.getElementById("changeGame");

function findRandomEmptyCell(board) {
    let i = Math.floor((Math.random() * (CONSTANTS.boardItems.boardLength - 1)) + 1);
    let j = Math.floor((Math.random() * (CONSTANTS.boardItems.boardLength - 1)) + 1);
    while (!(board.board[i][j] instanceof Empty)) {
        i = Math.floor((Math.random() * (CONSTANTS.boardItems.boardLength - 1)) + 1);
        j = Math.floor((Math.random() * (CONSTANTS.boardItems.boardLength - 1)) + 1);
    }
    return [i, j];
}

function initializeBoard(numOfGhosts, numOfFoods) {
    board = new Board([], [], [], []);
    let allObstacles = [];
    for (let coordinate of CONSTANTS.obstacles) {
        allObstacles.push(new Obstacle(coordinate, CONSTANTS.colorPalette.obstacleColor));
    }

    let allGhosts = [];
    for (let i = 0; i < numOfGhosts && i < 4; i++) {
        allGhosts.push(new Ghost(CONSTANTS.corners[i], CONSTANTS.colorPalette.ghostColor));
    }

    board.ghosts = allGhosts
    board.obstacles = allObstacles;
    board.placeItems();
    const pacman = [new Pacman(findRandomEmptyCell(board))];
    board.pacmans = pacman;
    board.placeItems();

    let allFoods = [];
    for (let i = 0; i < numOfFoods; i++) {
        let currentFood = new Food(findRandomEmptyCell(board), CONSTANTS.colorPalette.foodColor)
        allFoods.push(currentFood);
        board.board[currentFood.location[0]][currentFood.location[1]] = currentFood;
    }
    board.foods = allFoods;
    board.placeItems();
}

function timer() {
    if (!gameStarted) {
        return 0;
    }
    const currentTime = new Date();
    return (currentTime - startTime) / 1000;
}

function initializeGame() {
    console.log("game initialization");

    changes.onchange = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        numOfFoods = labelFoods.value;
        numOfGhosts = labelGhosts.value;
        initializeBoard(numOfGhosts, numOfFoods);
    }

    initializeBoard(numOfGhosts, numOfFoods);
    addEventListener("keydown", function (e) {
        for (let key in keysDown) {
            keysDown[key] = false;
        }
        if (gameStarted && startTime == 0) {
            startTime = new Date();
        }
        keysDown[e.code] = true;
    });
    board.draw(context, keysDown);
    gameInterval = setInterval(() => playGame(board), 250);
}

function playGame(board) {
    const currentTime = timer();
    labelTime.value = currentTime;
    for (let i = 0; i < board.pacmans.length; i++) {
        gameStarted = board.pacmans[i].makeNextMove(board, keysDown, gameStarted);
    }
    for (let i = 0; i < board.ghosts.length && gameStarted; i++) {
        board.ghosts[i].makeNextMove(board, board.pacmans[0]);
    }
    board.draw(context, keysDown);
    gameOver = board.isKilled();
    if (!gameOver) {
        board.draw(context, keysDown);
    }
    else {
        window.clearInterval(gameInterval);
    }
}



initializeGame();