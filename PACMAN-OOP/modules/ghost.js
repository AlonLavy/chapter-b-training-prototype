import * as CONSTANTS from './CONSTANTS.js';

export class Ghost extends BoardItem {
    constructor(location, color, losePoints, livesTaken) {
        super(location);
        this.losePoints = losePoints;
        this.livesTaken = livesTaken;
        this.color = color;
    }

    draw(center) {
        context.beginPath();
        context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
        context.fillStyle = this.color; //color
        context.fill();
    }

    #euclideanDistance(a, b) { return Math.hypot(...Object.keys(a).map(k => b[k] - a[k])); }

    #findAllValidDirections(board) {
        let validDirections = [];
        const sameLocation = (ghost, direction) => ghost.location == [this.location[0] + direction[0], this.location[1] +direction[1]];

        if (this.location[0] > 0 && board[this.location[0] - 1][this.location[1]].getClassName() != "Obstacle" && !board.ghosts.some(sameLocation([-1, 0]))) {
            validDirections.push([-1, 0]); // Left
        }
        if (this.location[0] < CONSTANTS.boardItems.boardLength - 1 && board[this.location[0] + 1][this.location[1]].getClassName() != "Obstacle" && !board.ghosts.some(sameLocation([1,0]))) {
            validDirections.push([1, 0]); // Right
        }
        if (this.location[1] > 0 && board[this.location[0]][this.location[1] - 1].getClassName() != "Obstacle" && !board.ghosts.some(sameLocation([0, -1]))) {
            validDirections.push([0, -1]); // Up
        }
        if (this.location[1] < CONSTANTS.boardItems.boardLength - 1 && board[this.location[0]][this.location[1] + 1].getClassName() != "Obstacle" && !board.ghosts.some(sameLocation([0, 1]))) {
            validDirections.push([0, 1]); // Down
        }
        if (validDirections.length == 0) {
            return [[0, 0]];
        }
        return validDirections;
    }

    #shortestDirectionToPacman(board, pacman) {
        validDirections = this.#findAllValidDirections(board);
        let distances = validDirections.map(direction => this.#euclideanDistance([this.location[0] + direction[0], this.location[1] + direction[1]], pacman.location));
        let shortestDistance = Math.min(...distances);
        let shortestDirection = validDirections[distances.indexOf(shortestDistance)];
        return shortestDirection;
    }
}