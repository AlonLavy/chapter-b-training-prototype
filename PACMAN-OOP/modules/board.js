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
}