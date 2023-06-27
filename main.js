import { Pacman } from "./pacman.js";
import { Food } from "./food.js";
import { Ghost } from "./ghost.js";
import { Obstacle } from "./obstacle.js";
import { Board } from "./board.js";
import * as CONSTANTS from "./CONSTANTS.js";

const context = canvas.getContext("2d");
let gameStarted = false;
let gameInterval;
const keysDown = {};
keysDown.ArrowUp = false;
keysDown.ArrowDown = false;
keysDown.ArrowLeft = false;
keysDown.ArrowRight = false;
let startTime = 0;
let gameOver;
let board;
const labelTime = document.getElementById("lblTime");
const labelGhosts = document.getElementById("labelGhosts");
const labelFoods = document.getElementById("labelFoods");
const changes = document.getElementById("changeGame");
const labelScore = document.getElementById("lblScore");
const labelLives = document.getElementById("labelLives");
let numOfFoods = labelFoods.value;
let numOfGhosts = labelGhosts.value;
let lives = CONSTANTS.startLives;
let score = 0;
const ghostNotMove = [];


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
    board = new Board(new Pacman([1, 1], score, keysDown), [], [], []);
    for (let i = 0; i < numOfGhosts && i < 4; i++) {
        board.ghosts.push(new Ghost(CONSTANTS.corners[i], CONSTANTS.colorPalette.ghostColor));
        ghostNotMove.push(false);
    }
    CONSTANTS.obstacles.forEach((coordinate) => board.obstacles.push(new Obstacle(coordinate, CONSTANTS.colorPalette.obstacleColor)));

    board.placeItems();
    board.pacman = new Pacman(findRandomEmptyCell(board), score, keysDown);
    board.placeItems();

    for (let i = 0; i < numOfFoods; i++) {
        let currentFood = new Food(findRandomEmptyCell(board), CONSTANTS.colorPalette.foodColor)
        board.foods.push(currentFood);
        board.board[currentFood.location[0]][currentFood.location[1]] = currentFood;
    }
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

    labelLives.value = lives;
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
        startTime = 0;
        score = 0;
        labelScore.value = score;
        lives = CONSTANTS.startLives;
        gameOver = false;
        window.clearInterval(gameInterval);
        keysDown.ArrowUp = false;
        keysDown.ArrowDown = false;
        keysDown.ArrowLeft = false;
        keysDown.ArrowRight = false;
        initializeGame();
    }

    initializeBoard(numOfGhosts, numOfFoods);
    addEventListener("keydown", function (e) {
        Object.keys(keysDown).forEach((key) => keysDown[key] = false);
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
    gameStarted = board.pacman.makeNextMove(board, gameStarted);
    if (gameStarted && startTime == 0) {
        startTime = new Date();
    }
    for (let i = 0; i < board.ghosts.length && gameStarted; i++) {
        if (currentTime % 10 > CONSTANTS.slowMotionTime) {
            board.ghosts[i].makeNextMove(board, board.pacman);
        }
        else if (!ghostNotMove[i]) {
            board.ghosts[i].makeNextMove(board, board.pacman);
        }
        ghostNotMove[i] = !ghostNotMove[i];
    }
    board.draw();
    const killed = board.isKilled();
    if (killed) {
        gameStarted = false;
        startTime = 0;
        lives = lives - 1;
        score = board.pacman.score - 10;
        labelScore.value = score;
        labelLives.value = lives;
        if (lives == 0) {
            gameOver = true;
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        window.clearInterval(gameInterval);
        Object.keys(keysDown).forEach((key) => keysDown[key] = false);
        initializeGame();
    }

    if (!gameOver) {
        board.draw();
    }
    else {
        context.beginPath();
        context.rect(0, 0, canvas.width, canvas.height)
        context.fillStyle = CONSTANTS.colorPalette.backgroundGameOver;
        context.fill();
        context.font = "55px Comic Sans MS";
        context.fillStyle = CONSTANTS.colorPalette.textGameOver;
        context.textAlign = "center";
        context.fillText("Game Over! You Lost!", canvas.width / 2, canvas.height / 2);
        window.clearInterval(gameInterval);
    }

    if (board.pacman.score == numOfFoods) {
        context.beginPath();
        context.rect(0, 0, canvas.width, canvas.height)
        context.fillStyle = CONSTANTS.colorPalette.backgroundGameWon;
        context.fill();
        context.font = "55px Comic Sans MS";
        context.fillStyle = CONSTANTS.colorPalette.textGameWon;
        context.textAlign = "center";
        context.fillText("Congrats! You won!", canvas.width / 2, canvas.height / 2);
        window.clearInterval(gameInterval);
    }
}


initializeGame();