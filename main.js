import { Pacman } from "./pacman.js";
import { Food } from "./food.js";
import { Ghost } from "./ghost.js";
import { Obstacle } from "./obstacle.js";
import { Board } from "./board.js";
import { Empty } from "./empty.js";
import * as CONSTANTS from "./CONSTANTS.js";

var context = canvas.getContext("2d");
var gameStarted = false;
var keysDown = {};
keysDown["ArrowUp"] = false;
keysDown["ArrowDown"] = false;
keysDown["ArrowLeft"] = false;
keysDown["ArrowRight"] = false;
var startTime;
var gameOver;
var board = new Board([], [], [], []);

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
    let allObstacles = [];
    for (let coordinate of CONSTANTS.obstacles) {
        allObstacles.push(new Obstacle(coordinate, CONSTANTS.colorPalette.obstacleColor));
    }

    let allGhosts = [];
    for (let i = 0; i < numOfGhosts || i < 4; i++) {
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
        allFoods.push(new Food(findRandomEmptyCell(board), CONSTANTS.colorPalette.foodColor));
    }
    board.foods = allFoods;
    board.placeItems();
}

function timer() {
    if (!gameStarted) {
        return 0;
    }
    currentTime = new Date();
    return (currentTime - startTime) / 1000;
}

function initializeGame() {
    let numOfGhosts = 1;
    let numOfFoods = 50;
    initializeBoard(numOfGhosts, numOfFoods);
    addEventListener("keydown", function (e) {
        for (let key in keysDown) {
            keysDown[key] = false;
        }
        if (!gameStarted && e.code in Object.keys(keysDown) && this.document.getElementById("game").style.display == "block") {
            gameStarted = true;
            startTime = new Date();
        }
        keysDown[e.code] = true;
    });
    board.draw(context, keysDown);
    let gameInterval = setInterval(() => playGame(board), 250);
}

function playGame(board) {
    for (let i = 0; i < board.pacmans.length; i++) {
        board.pacmans[i].makeNextMove(board, keysDown);
    }
    for (let i = 0; i < board.ghosts.length && gameStarted; i++) {
        board.ghosts[i].makeNextMove(board, board.pacmans[0]);
    }
    board.draw(context, keysDown);
    for (let i = 0; i < board.ghosts.length; i++) {
        if (board.pacmans[0].location == board.ghosts[i].location) {
            gameOver = true;
            window.clearInterval(playGame);
        }
    }
    if (!gameOver) {
        board.draw(context, keysDown);
    }
}


initializeGame();