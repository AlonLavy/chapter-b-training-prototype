import { boardItems } from './CONSTANTS';

class Board {
    constructor(boardLength) {
        this.board = []
        for (let i = 0; i < boardLength; i++) {
            this.board[i] = new Array();
            for (let j = 0; j < boardLength; j++) {
                this.board[i][j] = boardItems.empty;
            }
        }
    }

    placeItems(pacmans, foods, ghosts, obstacles) {
        let center = new Object();
        center.x = i * 60 + 30;
        center.y = j * 60 + 30;
        // Draw function for each item should get center as well.
        // Order of placement: food, pacman, ghosts, obstacles

    }
}