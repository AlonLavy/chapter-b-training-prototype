import * as CONSTANTS from './CONSTANTS.js';

class Board {
    constructor(pacmans, foods, ghosts, obstacles) {
        this.board = []
        for (let i = 0; i < CONSTANTS.boardItems.boardLength; i++) {
            this.board[i] = new Array();
            for (let j = 0; j < CONSTANTS.boardItems.boardLength; j++) {
                this.board[i][j] = CONSTANTS.boardItems.empty;
            }
        }
        this.pacmans = pacmans;
        this.foods = foods;
        this.ghosts = ghosts;
        this.obstacles = obstacles;
    }

    #placeFoods() {
        for (let i = 0; i < this.foods.length; i++) {
            this.board[this.foods[i].location[0]][this.foods[i].location[0]] = this.foods[i];
        }
    }

    #placePacmans() {
        for (let i = 0; i < this.pacmans.length; i++) {
            this.board[this.pacmans[i].location[0]][this.pacmans[i].location[0]] = this.pacmans[i];
        }
    }

    #placeGhosts() {
        for (let i = 0; i < this.ghosts.length; i++) {
            this.board[this.ghosts[i].location[0]][this.ghosts[i].location[0]] = this.ghosts[i];
        }
    }

    #placeObsacles() {
        for (let i = 0; i < this.obstacles.length; i++) {
            this.board[this.obstacles[i].location[0]][this.obstacles[i].location[0]] = this.obstacles[i];
        }
    }


    #placeItems() {
        // Order of placement: food, pacman, ghosts, obstacles
        this.#placePacmans();
        this.#placeFoods();
        this.#placeGhosts();
        this.#placeObsacles();
    }

    // Draw function for each item should get center as well.
    draw() {
        this.#placeItems();
        let center = new Object();
        center.x = i * 60 + 30;
        center.y = j * 60 + 30;

        for (let i = 0; i < CONSTANTS.boardItems.boardLength; i++) {
            for (let j = 0; i < CONSTANTS.boardItems.boardLength; j++) {
                if (this.board[i][j] != CONSTANTS.boardItems.empty)
                {
                    this.board[i][j].draw(center);
                }
            }
        }
    }
}