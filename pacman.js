import * as CONSTANTS from "./CONSTANTS.js";
import { BoardItem } from "./boardItem.js";


const labelScore = document.getElementById("lblScore");
const context = canvas.getContext("2d");

export class Pacman extends BoardItem {
    constructor(location, score, keysDown) {
        super(location);
        this.score = score;
        this.keysDown = keysDown
    }

    draw() {
        const keyPressed = this.#getKeyPressed(this.keysDown);
        const rotation = CONSTANTS.pacmanRotation[keyPressed];
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

    #getKeyPressed() {
        switch (true) {
            case this.keysDown['ArrowUp']:
                return CONSTANTS.orientation.up;
            case this.keysDown['ArrowDown']:
                return CONSTANTS.orientation.down;
            case this.keysDown['ArrowLeft']:
                return CONSTANTS.orientation.left;
            case this.keysDown['ArrowRight']:
                return CONSTANTS.orientation.right;
            default:
                return 0;
        }
    }

    #ifFood(board) {
        if (board.getObjectInLocation(this.location) === CONSTANTS.boardItems.food) {
            this.score = this.score + board.board[this.location[0]][this.location[1]].points;
            const indexRemove = board.foods.indexOf(board.board[this.location[0]][this.location[1]]);
            board.foods.splice(indexRemove, 1);
            labelScore.value = this.score;
        }
    }

    makeNextMove(board, startGame) {
        const pressedKey = this.#getKeyPressed(this.keysDown);
        switch (pressedKey) {
            case CONSTANTS.orientation.left:
                if (this.location[0] > 0 && !(board.getObjectInLocation([this.location[0] - 1, this.location[1]]) === CONSTANTS.boardItems.obstacle)) {
                    this.location[0] = this.location[0] - 1;
                    startGame = true;
                }
                break;
            case CONSTANTS.orientation.right:
                if (this.location[0] < CONSTANTS.boardItems.boardLength - 1 && !(board.getObjectInLocation([this.location[0] + 1, this.location[1]]) === CONSTANTS.boardItems.obstacle)) {
                    this.location[0] = this.location[0] + 1;
                    startGame = true;
                }
                break;
            case CONSTANTS.orientation.up:
                if (this.location[1] > 0 && !(board.getObjectInLocation([this.location[0], this.location[1] - 1]) === CONSTANTS.boardItems.obstacle)) {
                    this.location[1] = this.location[1] - 1;
                    startGame = true;
                }
                break;
            case CONSTANTS.orientation.down:
                if (this.location[1] < CONSTANTS.boardItems.boardLength - 1 && !(board.getObjectInLocation([this.location[0], this.location[1] + 1]) === CONSTANTS.boardItems.obstacle)) {
                    this.location[1] = this.location[1] + 1;
                    startGame = true;
                }
                break;
            default:
                break;
        }
        this.#ifFood(board);
        board.placeItems();
        super.realignCenter();
        return startGame;
    }

}