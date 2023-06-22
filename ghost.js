import { Obstacle } from "./obstacle.js";
import { Empty } from "./empty.js";
import * as CONSTANTS from "./CONSTANTS.js";
import { BoardItem } from "./boardItem.js";

export class Ghost extends BoardItem {
    constructor(location, color) {
        super(location);
        this.color = color;
        this.previous = new Empty(location);
    }

    draw(context, keysDown) {
        super.realignCenter();
        context.beginPath();
        context.arc(this.center.x, this.center.y, 15, 0, 2 * Math.PI); // circle
        context.fillStyle = this.color; //color
        context.fill();
    }

    #euclideanDistance(a, b) { return Math.hypot(...Object.keys(a).map(k => b[k] - a[k])); }

    #findAllValidDirections(board) {
        let validDirections = [];
        const sameLocation = (ghost, direction) => ghost.location.every((element, index) => element === this.location[index] + direction[index]);

        if (this.location[0] > 0 && !(board.board[this.location[0] - 1][this.location[1]] instanceof Obstacle) && !board.ghosts.some(ghost => sameLocation(ghost, [-1, 0]))) {
            validDirections.push([-1, 0]); // Left
        }
        if (this.location[0] < CONSTANTS.boardItems.boardLength - 1 && !(board.board[this.location[0] + 1][this.location[1]] instanceof Obstacle) && !board.ghosts.some(ghost => sameLocation(ghost, [1, 0]))) {
            validDirections.push([1, 0]); // Right
        }
        if (this.location[1] > 0 && !(board.board[this.location[0]][this.location[1] - 1] instanceof Obstacle) && !board.ghosts.some(ghost => sameLocation(ghost, [0, -1]))) {
            validDirections.push([0, -1]); // Up
        }
        if (this.location[1] < CONSTANTS.boardItems.boardLength - 1 && !(board.board[this.location[0]][this.location[1] + 1] instanceof Obstacle) && !board.ghosts.some(ghost => sameLocation(ghost, [0, 1]))) {
            validDirections.push([0, 1]); // Down
        }
        if (validDirections.length == 0)
        {
            return [[0, 0]];
        }
        return validDirections;
    }

    #shortestDirectionToPacman(board, pacman) {
        let validDirections = this.#findAllValidDirections(board);
        let distances = validDirections.map(direction => this.#euclideanDistance([this.location[0] + direction[0], this.location[1] + direction[1]], pacman.location));
        let shortestDistance = Math.min(...distances);
        let shortestDirection = validDirections[distances.indexOf(shortestDistance)];
        return shortestDirection;
    }

    makeNextMove(board, pacman) {
        let direction = this.#shortestDirectionToPacman(board, pacman);
        board.board[this.location[0]][this.location[1]] = this.previous;
        this.location = [this.location[0] + direction[0], this.location[1] + direction[1]];
        this.previous = board.board[this.location[0]][this.location[0]];
        board.board[this.location[0]][this.location[1]] = this;
        super.realignCenter();
    }
}