import { Pacman } from "./modules/pacman";
import { Food } from "./modules/food";
import { Ghost } from "./modules/ghost";
import { Obstacle } from "./modules/obstacle";
import { Board } from "./modules/board";
import * as CONSTANTS from "./modules/CONSTANTS.js";

function findRandomEmptyCell(board) {
    let i = Math.floor((Math.random() * (CONSTANTS.boardItems.boardLength - 1)) + 1);
    let j = Math.floor((Math.random() * (CONSTANTS.boardItems.boardLength - 1)) + 1);
    while (board[i][j] != CONSTANTS.boardItems.empty) {
        i = Math.floor((Math.random() * (CONSTANTS.boardItems.boardLength - 1)) + 1);
        j = Math.floor((Math.random() * (CONSTANTS.boardItems.boardLength - 1)) + 1);
    }
    return [i, j];
}

function initializeBoard() {
    let allObstacles = [];
    for (location of CONSTANTS.obstacles) {
        allObstacles.push(Obstacle())
    }

    let numOfGhosts = 0; //Add infrastructure to connect it to HTML. Should be taken from form element.
    let allGhosts = [];
    for (let i = 0; i < numOfGhosts || i < 4; i++) {
        allGhosts.push(Ghost(CONSTANTS.corners[i], CONSTANTS.colorPalette.ghostColor));
    }

    board = Board([], [], allGhosts, allObstacles);
    board.placeItems();
    const pacman = [new Pacman(findRandomEmptyCell(board))];
    board.pacmans = pacman;
    board.placeItems();

    let numOfFoods = 0; //Add infrastructure to connect it to HTML. Should be taken from form element.
    let allFoods = 0;
    for (let i = 0; i < numOfFoods; i++) {
        allFoods.push(new Food(findRandomEmptyCell(board), CONSTANTS.colorPalette.foodColor));
    }
    board.Food = allFoods;
    board.placeItems();
}