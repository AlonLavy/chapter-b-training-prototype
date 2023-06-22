import * as CONSTANTS from "./CONSTANTS.js";
import { BoardItem } from "./boardItem.js";
import { Obstacle } from "./obstacle.js";
import { Empty } from "./empty.js";
import { Food } from "./food.js";

export class Pacman extends BoardItem {
    constructor(location) {
        super(location);
        this.score = 0;
    }

    draw(context, keysDown) {
        let keyPressed = this.#getKeyPressed(keysDown);
        let rotation;
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
            default:
                rotation = 0;
        }
        context.beginPath();
        context.rect(this.center.x - 30, this.center.y - 30, 60, 60);
        context.fillStyle = CONSTANTS.colorPalette.backgroundColor; //color
        context.fill();

        context.beginPath();
        context.arc(this.center.x, this.center.y, 30, (0.15 * Math.PI) + rotation, (1.85 * Math.PI) + rotation); // half circle
        context.lineTo(this.center.x, this.center.y);
        context.fillStyle = CONSTANTS.colorPalette.pacmanColor; //color
        context.fill();
        context.beginPath();
        switch (rotation) {
            case CONSTANTS.pacmanRotation.right:
                context.arc(this.center.x + 5, this.center.y - 15, 5, 0, 2 * Math.PI);
                break;
            case CONSTANTS.pacmanRotation.left:
                context.arc(this.center.x - 5, this.center.y - 15, 5, 0, 2 * Math.PI);
                break;
            case CONSTANTS.pacmanRotation.up:
                context.arc(this.center.x + 15, this.center.y - 5, 5, 0, 2 * Math.PI);
                break;
            case CONSTANTS.pacmanRotation.down:
                context.arc(this.center.x + 15, this.center.y + 5, 5, 0, 2 * Math.PI);
                break;
        }
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

    #ifFood(board)
    {
        if (board.board[this.location[0]][this.location[1]] instanceof Food)
        {
            console.log(board);
            this.score = this.score + board.board[this.location[0]][this.location[1]].points;
            const indexRemove = board.foods.indexOf(board.board[this.location[0]][this.location[1]]);
            board.foods.splice(indexRemove, 1);
        }
    }

    makeNextMove(board, keysDown) {
        let pressedKey = this.#getKeyPressed(keysDown);
        switch (pressedKey) {
            case CONSTANTS.orientation.left:
                if (this.location[0] > 0 && ! (board.board[this.location[0] - 1][this.location[1]] instanceof Obstacle)) {
                    this.location[0] = this.location[0] - 1;
                }
                break;
            case CONSTANTS.orientation.right:
                if (this.location[0] < CONSTANTS.boardItems.boardLength - 1 && ! (board.board[this.location[0] + 1][this.location[1]] instanceof Obstacle)) {
                    this.location[0] = this.location[0] + 1;
                }
                break;
            case CONSTANTS.orientation.up:
                if (this.location[1] > 0 && ! (board.board[this.location[0]][this.location[1] - 1] instanceof Obstacle)) {
                    this.location[1] = this.location[1] - 1;
                }
                break;
            case CONSTANTS.orientation.down:
                if (this.location[1] < CONSTANTS.boardItems.boardLength - 1 && ! (board.board[this.location[0]][this.location[1] + 1] instanceof Obstacle)) {
                    this.location[1] = this.location[1] + 1;
                }
                break;
            default:
                break;
            
        }
        this.#ifFood(board);
        board.placeItems();
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
}