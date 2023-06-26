import * as CONSTANTS from './CONSTANTS.js';
import { Empty } from "./empty.js";

var context = canvas.getContext("2d");
export class Board {
    constructor(pacmans, foods, ghosts, obstacles) {
        this.board = [];
        for (let i = 0; i < CONSTANTS.boardItems.boardLength; i++) {
            this.board[i] = [];
            for (let j = 0; j < CONSTANTS.boardItems.boardLength; j++) {
                this.board[i].push(new Empty([i, j]));
            }
        }
        this.pacmans = pacmans;
        this.foods = foods;
        this.ghosts = ghosts;
        this.obstacles = obstacles;
    }

    #placeFoods() {
        for (let i = 0; i < this.foods.length; i++) {
            this.board[this.foods[i].location[0]][this.foods[i].location[1]] = this.foods[i];
        }
    }

    #placePacmans() {
        for (let i = 0; i < this.pacmans.length; i++) {
            this.board[this.pacmans[i].location[0]][this.pacmans[i].location[1]] = this.pacmans[i];
        }
    }

    #placeGhosts() {
        for (let i = 0; i < this.ghosts.length; i++) {
            this.board[this.ghosts[i].location[0]][this.ghosts[i].location[1]] = this.ghosts[i];
        }
    }

    #placeObstacles() {
        for (let i = 0; i < this.obstacles.length; i++) {
            this.board[this.obstacles[i].location[0]][this.obstacles[i].location[1]] = this.obstacles[i];
        }
    }

    placeItems() {
        // Order of placement: food, pacman, ghosts, obstacles
        for (let i = 0; i < CONSTANTS.boardItems.boardLength; i++) {
            for (let j = 0; j < CONSTANTS.boardItems.boardLength; j++) {
                this.board[i][j] = new Empty([i, j]);
            }
        }
        this.#placePacmans();
        this.#placeFoods();
        this.#placeGhosts();
        this.#placeObstacles();
    }

    isKilled() {
        for (let ghost of this.ghosts) {
            if (ghost.location[0] == this.pacmans[0].location[0] && ghost.location[1] == this.pacmans[0].location[1]) {
                alert("gameover");
                return true;
            }
        }
        return false;
    }

    // Draw function for each item should get center as well.
    draw(keysDown) {
        this.placeItems();
        for (let i = 0; i < CONSTANTS.boardItems.boardLength; i++) {
            for (let j = 0; j < CONSTANTS.boardItems.boardLength; j++) {
                this.board[i][j].draw(keysDown);
            }
        }
    }


    getObjectInLocation(location) {
        if (this.board.ghosts && this.board.ghosts.some((ghost) => {
            return ghost.location[0] === location[0] && ghost.location[1] === location[1];
        })) {
            return CONSTANTS.boardItems.ghost;
        } else if (this.board.foods && this.board.foods.some((food) => {
            return food.location[0] === location[0] && food.location[1] === location[1];
        })) {
            return CONSTANTS.boardItems.food;
        } else if (this.board.obstacles && this.board.obstacles.some((obstacle) => {
            return obstacle.location[0] === location[0] && obstacle.location[1] === location[1];
        })) {
            return CONSTANTS.boardItems.obstacle;
        } else if (this.board.pacmans && this.board.pacmans.some((pacman) => {
            return pacman.location[0] === location[0] && pacman.location[1] === location[1];
        })) {
            return CONSTANTS.boardItems.pacman;
        } else {
            return CONSTANTS.boardItems.empty;
        }
    }


}
