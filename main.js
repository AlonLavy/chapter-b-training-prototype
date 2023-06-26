import { Pacman } from "./pacman.js";
import { Food } from "./food.js";
import { Ghost } from "./ghost.js";
import { Obstacle } from "./obstacle.js";
import { Board } from "./board.js";
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
var lives = CONSTANTS.startLives;
var score = 0;
var labelScore = document.getElementById("lblScore");


function findRandomEmptyCell(board) {
    let i = Math.floor((Math.random() * (CONSTANTS.boardItems.boardLength - 1)) + 1);
    let j = Math.floor((Math.random() * (CONSTANTS.boardItems.boardLength - 1)) + 1);
    while (!(board.getObjectInLocation([i, j]) == CONSTANTS.boardItems.empty)) {
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
    board.pacmans = [new Pacman(findRandomEmptyCell(board), score, keysDown)];
    board.placeItems();

    let allFoods = [];
    for (let i = 0; i < numOfFoods; i++) {
        let currentFood = new Food(findRandomEmptyCell(board), CONSTANTS.colorPalette.foodColor)
        allFoods.push(currentFood);
        board.foods = allFoods;
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
    context.clearRect(0, 0, canvas.width, canvas.height);

    changes.onchange = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        numOfFoods = labelFoods.value;
        numOfGhosts = labelGhosts.value;
        if (!(numOfFoods >= 0 && numOfFoods <= 70)) {
            alert("This number has to be an int between 0 and 70");
            numOfFoods = 30;
            labelFoods.value = 30;
        }
        else if (!(numOfGhosts > 0 && numOfGhosts <= 4)) {
            alert("This number has to be an int between 1 and 4");
            numOfGhosts = 3;
            labelGhosts.value = 3;
        }
        else {
            initializeBoard(numOfGhosts, numOfFoods);
        }
    }

    const restartButton = document.getElementById("restart");
    restartButton.onclick = () => {
        gameStarted = false;
        score = 0;
        labelScore.value = score;
        lives = CONSTANTS.startLives;
        gameOver = false;
        window.clearInterval(gameInterval);
        keysDown["ArrowUp"] = false;
        keysDown["ArrowDown"] = false;
        keysDown["ArrowLeft"] = false;
        keysDown["ArrowRight"] = false;
        initializeGame();
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
    board.draw();
    gameInterval = setInterval(() => playGame(board), 250);
}

function playGame(board) {
    const currentTime = timer();
    labelTime.value = currentTime;
    for (let i = 0; i < board.pacmans.length; i++) {
        gameStarted = board.pacmans[i].makeNextMove(board, gameStarted);
    }
    for (let i = 0; i < board.ghosts.length && gameStarted; i++) {
        board.ghosts[i].makeNextMove(board, board.pacmans[0]);
    }
    board.draw();
    let killed = board.isKilled();
    if (killed) {
        gameStarted = false;
        score = board.pacmans[0].score - 10;
        labelScore.value = score;
        lives = lives - 1;
        killed = false;
        if (lives == 0) {
            gameOver = true;
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        window.clearInterval(gameInterval);
        for (let key in keysDown) {
            keysDown[key] = false;
        }
        initializeGame();
    }

    if (!gameOver) {
        board.draw();
    }
    else {
        window.clearInterval(gameInterval);
    }

    if (board.pacmans[0].score == numOfFoods) {
        context.beginPath();
        context.rect(0, 0, canvas.width, canvas.height)
        context.fillStyle = CONSTANTS.colorPalette.backgroundGameWon;
        context.fill();
        context.font = "55px Comic Sans MS";
        context.fillStyle = CONSTANTS.colorPalette.textGameWon;
        context.textAlign = "center";
        context.fillText("Congrats! You won!", canvas.width/2, canvas.height/2);
        window.clearInterval(gameInterval);
    }
}


initializeGame();