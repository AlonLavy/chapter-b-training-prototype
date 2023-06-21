import * as CONSTANTS from "/CONSTANTS.js";
import { BoardItem } from "/boardItem.js";

export class Pacman extends BoardItem {
    constructor(location) {
        super(location);
    }

    draw(context, keysDown) {
        let keyPressed = this.#getKeyPressed(keysDown);
        switch (keyPressed) {
            case CONSTANTS.orientation.up:
                rotation = CONSTANTS.pacmanRotation.up;
                break;
            case CONSTANTS.orientation.left:
                rotation = CONSTANTS.pacmanRotation.left;
                break;
            case CONSTANTS.orientation.right:
                rotation = CONSTANTS.pacmanRotation.right;
                break;
            case CONSTANTS.orientation.down:
                rotation = CONSTANTS.pacmanRotation.down;
                break;
        }
        context.beginPath();
        context.arc(this.center.x, this.center.y, 30, (0.15 * Math.PI) + rotation, (1.85 * Math.PI) + rotation); // half circle
        context.lineTo(center.x, center.y);
        context.fillStyle = CONSTANTS.colorPalette.pacmanColor; //color
        context.fill();
        context.beginPath();
        context.fillStyle = CONSTANTS.colorPalette.eyeColor; //color
        context.fill();
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