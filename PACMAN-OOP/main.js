import { Pacman } from "./modules/pacman";
import { Food } from "./modules/food";
import { Ghost } from "./modules/ghost";
import { Obstacle } from "./modules/obstacle";
import { Board } from "./modules/board";
import * as CONSTANTS from "./modules/CONSTANTS.js";

var context = canvas.getContext("2d");
var gameStarted = false;
var keysDown;
var startTime;
var livesLeft = 3;
var gameOver;

function findRandomEmptyCell(board) {
    let i = Math.floor((Math.random() * (CONSTANTS.boardItems.boardLength - 1)) + 1);
    let j = Math.floor((Math.random() * (CONSTANTS.boardItems.boardLength - 1)) + 1);
    while (board.board[i][j] == CONSTANTS.boardItems.empty) {
        i = Math.floor((Math.random() * (CONSTANTS.boardItems.boardLength - 1)) + 1);
        j = Math.floor((Math.random() * (CONSTANTS.boardItems.boardLength - 1)) + 1);
    }
    return [i, j];
}

function initializeBoard(numOfGhosts, numOfFoods) {
    let allObstacles = [];
    for (location of CONSTANTS.obstacles) {
        allObstacles.push(new Obstacle(location, CONSTANTS.colorPalette.obstacleColor));
    }

    let allGhosts = [];
    for (let i = 0; i < numOfGhosts || i < 4; i++) {
        allGhosts.push(new Ghost(CONSTANTS.corners[i], CONSTANTS.colorPalette.ghostColor));
    }

    board = Board([], [], allGhosts, allObstacles);
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
    let numOfGhosts = 0;
    let numOfFoods = 0;
    initializeBoard(numOfGhosts, numOfFoods);
    keysDown = {};
    addEventListener("keydown", function (e) {
        for (let key in keysDown) {
            keysDown[key] = false;
        }
        if (!gameStarted) {
            gameStarted = true;
            startTime = new Date();
        }
        keysDown[e.code] = true;
    });
    gameInterval = setInterval(() => playGame(board), 250);
}

function playGame(board) {
    for (let i = 0; i < board.pacmans.length; i++) {
        board.pacmans[i].makeNextMove(keysDown);
    }
    for (let i = 0; i < board.ghosts.length; i++) {
        board.ghosts[i].makeNextMove(keysDown);
    }
    board.draw(context);
    for (let i = 0; i < board.ghosts.length; i++) {
        if (board.pacmans[0].location == board.ghosts[0].location) {
            gameOver = true;
            window.clearInterval(playGame);
        }
    }
}