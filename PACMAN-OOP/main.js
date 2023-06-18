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

function findRandomEmptyCell(board) {
    let i = Math.floor((Math.random() * (CONSTANTS.boardItems.boardLength - 1)) + 1);
    let j = Math.floor((Math.random() * (CONSTANTS.boardItems.boardLength - 1)) + 1);
    while (board[i][j] != CONSTANTS.boardItems.empty) {
        i = Math.floor((Math.random() * (CONSTANTS.boardItems.boardLength - 1)) + 1);
        j = Math.floor((Math.random() * (CONSTANTS.boardItems.boardLength - 1)) + 1);
    }
    return [i, j];
}

function initializeBoard(numOfGhosts, numOfFoods) {
    let allObstacles = [];
    for (location of CONSTANTS.obstacles) {
        allObstacles.push(Obstacle())
    }

    let allGhosts = [];
    for (let i = 0; i < numOfGhosts || i < 4; i++) {
        allGhosts.push(Ghost(CONSTANTS.corners[i], CONSTANTS.colorPalette.ghostColor));
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
    board.Food = allFoods;
    board.placeItems();
}

function timer() {
    if (!gameStarted) {
        return 0;
    }
    currentTime = new Date();
    return (currentTime - startTime) / 1000;
}

function main() {
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
}

main();