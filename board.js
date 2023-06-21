import * as CONSTANTS from './CONSTANTS.js';
import { Empty } from "./empty.js";

export class Board {
    constructor(pacmans, foods, ghosts, obstacles) {
        this.board = [];
        for (let i = 0; i < CONSTANTS.boardItems.boardLength; i++) {
            this.board[i] = [];
            for (let j = 0; j < CONSTANTS.boardItems.boardLength; j++) {
                this.board[i].push(new Empty());
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
                this.board[i][j] = new Empty();
            }
        }
        this.#placePacmans();
        this.#placeFoods();
        this.#placeGhosts();
        this.#placeObstacles();
    }

    // Draw function for each item should get center as well.
    draw(context, keysDown) {
        this.placeItems();
        for (let i = 0; i < CONSTANTS.boardItems.boardLength; i++) {
            for (let j = 0; j < CONSTANTS.boardItems.boardLength; j++) {
                if (!(this.board[i][j] instanceof Empty)) {
                    this.board[i][j].draw(context, keysDown);
                }
            }
        }
    }
}
