import * as CONSTANTS from "./CONSTANTS.js";
import { BoardItem } from "./boardItem.js";
import { Obstacle } from "./obstacle.js";
import { Food } from "./food.js";


var labelScore = document.getElementById("lblScore");
var context = canvas.getContext("2d");

export class Pacman extends BoardItem {
    constructor(location, score) {
        super(location);
        this.score = score;
    }

    draw(keysDown) {
        let keyPressed = this.#getKeyPressed(keysDown);
        let rotation;
        //rotation = CONSTANTS.pacmanRotation[keyPressed];
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

    #ifFood(board) {
        if (board.getObjectInLocation(this.location) === CONSTANTS.boardItems.food) {
            this.score = this.score + board.board[this.location[0]][this.location[1]].points;
            const indexRemove = board.foods.indexOf(board.board[this.location[0]][this.location[1]]);
            board.foods.splice(indexRemove, 1);
            labelScore.value = this.score;
        }
    }

    makeNextMove(board, keysDown, startGame) {
        let pressedKey = this.#getKeyPressed(keysDown);
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