import * as CONSTANTS from './CONSTANTS.js';
import { Empty } from "./empty.js";

export class Board {
    constructor(pacman, foods, ghosts, obstacles) {
        this.board = [];
        for (let i = 0; i < CONSTANTS.boardItems.boardLength; i++) {
            this.board[i] = [];
            for (let j = 0; j < CONSTANTS.boardItems.boardLength; j++) {
                this.board[i].push(new Empty({"x": i, "y": j}));
            }
        }
        this.pacman = pacman;
        this.foods = foods;
        this.ghosts = ghosts;
        this.obstacles = obstacles;
    }

    #placeFoods() {
        for (let i = 0; i < this.foods.length; i++) {
            this.board[this.foods[i].location.x][this.foods[i].location.y] = this.foods[i];
        }
    }

    #placePacmans() {
        this.board[this.pacman.location.x][this.pacman.location.y] = this.pacman;
    }

    #placeGhosts() {
        for (let i = 0; i < this.ghosts.length; i++) {
            this.board[this.ghosts[i].location.x][this.ghosts[i].location.y] = this.ghosts[i];
        }
    }

    #placeObstacles() {
        for (let i = 0; i < this.obstacles.length; i++) {
            this.board[this.obstacles[i].location.x][this.obstacles[i].location.y] = this.obstacles[i];
        }
    }

    placeItems() {
        // Order of placement: food, pacman, ghosts, obstacles
        for (let i = 0; i < CONSTANTS.boardItems.boardLength; i++) {
            for (let j = 0; j < CONSTANTS.boardItems.boardLength; j++) {
                this.board[i][j] = new Empty({"x": i, "y": j});
            }
        }
        this.#placePacmans();
        this.#placeFoods();
        this.#placeGhosts();
        this.#placeObstacles();
    }

    isKilled() {
        for (const ghost of this.ghosts) {
            if (ghost.location.x == this.pacman.location.x && ghost.location.y == this.pacman.location.y) {
                alert("gameover");
                return true;
            }
        }
        return false;
    }

    draw() {
        this.placeItems();
        for (let i = 0; i < CONSTANTS.boardItems.boardLength; i++) {
            for (let j = 0; j < CONSTANTS.boardItems.boardLength; j++) {
                this.board[i][j].draw();
            }
        }
    }


    getObjectInLocation(location) {
        if (this.ghosts && this.ghosts.some((ghost) => {
            return ghost.location.x == location.x && ghost.location.y == location.y;
        })) {
            return CONSTANTS.boardItems.ghost;
        } else if (this.foods && this.foods.some((food) => {
            return food.location.x == location.x && food.location.y == location.y;
        })) {
            return CONSTANTS.boardItems.food;
        } else if (this.obstacles && this.obstacles.some((obstacle) => {
            return obstacle.location.x == location.x && obstacle.location.y == location.y;
        })) {
            return CONSTANTS.boardItems.obstacle;
        } else if (this.pacmans && this.pacmans.some((pacman) => {
            return pacman.location.x == location.x && pacman.location.y == location.y;
        })) {
            return CONSTANTS.boardItems.pacman;
        } else {
            return CONSTANTS.boardItems.empty;
        }
    }
}
