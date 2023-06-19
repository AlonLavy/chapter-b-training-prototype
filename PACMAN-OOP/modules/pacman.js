import * as CONSTANTS from './CONSTANTS.js';
import { BoardItem } from "./boardItem";

export class Pacman extends BoardItem {
    constructor(location) {
        super(location);
    }

    draw(rotation, center, context) {
        context.beginPath();
        context.arc(center.x, center.y, 30, (0.15 * Math.PI) + rotation, (1.85 * Math.PI) + rotation); // half circle
        context.lineTo(center.x, center.y);
        context.fillStyle = CONSTANTS.colorPalette.pacmanColor; //color
        context.fill();
        context.beginPath();
        this.#rotate(rotation, context, center);
        context.fillStyle = CONSTANTS.colorPalette.eyeColor; //color
        context.fill();
    }

    #rotate(rotation, context, center) {
        switch (rotation) {
            case CONSTANTS.pacmanRotation.right:
                context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI);
                break;
            case CONSTANTS.pacmanRotation.left:
                context.arc(center.x - 5, center.y - 15, 5, 0, 2 * Math.PI);
                break;
            case CONSTANTS.pacmanRotation.up:
                context.arc(center.x + 15, center.y - 5, 5, 0, 2 * Math.PI);
                break;
            case CONSTANTS.pacmanRotation.down:
                context.arc(center.x + 15, center.y + 5, 5, 0, 2 * Math.PI);
                break;
        }
    }

    #getKeyPressed(keysDown) {
        switch (true) {
            case keysDown['ArrowUp']:
                return CONSTANTS.orientation.up;
            case keysDown['ArrowDown']:
                return CONSTANTS.orientation.down;
            case keysDown['ArrowLeft']:
                return CONSTANTS.orientation.left;
            case keysDown['ArrowRight']:
                return CONSTANTS.orientation.right;
            default:
                break;
        }
    }

    makeNextMove(board, keysDown) {
        let pressedKey = this.#getKeyPressed(keysDown);
        switch (pressedKey) {
            case CONSTANTS.orientation.left:
                if (this.location[0] > 0 && board.board[this.location[0] - 1][this.location[1]].getClassName() != "Obstacle") {
                    this.location[0]--;
                    board.board[this.location[0]][this.location[1]] = this;
                    break;
                }
            case CONSTANTS.orientation.right:
                if (this.location[0] < CONSTANTS.boardItems.boardLength - 1 && board.board[this.location[0] + 1][this.location[1]].getClassName() != "Obstacle") {
                    this.location[0]++;
                    board.board[this.location[0]][this.location[1]] = this;
                    break;
                }
            case CONSTANTS.orientation.up:
                if (this.location[1] > 0 && board.board[this.location[0]][this.location[1] - 1].getClassName() != "Obstacle") {
                    this.location[1]--;
                    board.board[this.location[0]][this.location[1]] = this;
                    break;
                }
            case CONSTANTS.orientation.down:
                if (this.location[1] < CONSTANTS.boardItems.boardLength - 1 && board.board[this.location[0]][this.location[1] + 1].getClassName() != "Obstacle") {
                    this.location[1]++;
                    board.board[this.location[0]][this.location[1]] = this;
                    break;
                }
        }
        super.realignCenter();
    }

    #isGameOver(ghosts) {
        for (let ghost of ghosts) {
            if (ghost.location[0] == this.location[0] && ghost.location[1] == this.location[1]) {
                return true;
            }
        }
        return false;
    }

    scoreKeeping(board, score) {
        if (!this.#isGameOver(board.ghosts)) {
            score = score - 10;
        }
        for (let food in board.food) {
            if (food.location == this.location) {
                score++;
            }
        }
        return score;
    }
}