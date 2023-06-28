import { Empty } from "./empty.js";
import * as CONSTANTS from "./CONSTANTS.js";
import { BoardItem } from "./boardItem.js";

const context = canvas.getContext("2d");

export class Ghost extends BoardItem {
  constructor(location, color) {
    super(location);
    this.color = color;
    this.previous = new Empty(location);
  }

  draw() {
    super.realignCenter();
    context.beginPath();
    context.rect(this.center.x - 30, this.center.y - 30, 60, 60);
    context.fillStyle = CONSTANTS.colorPalette.backgroundColor;
    context.fill();
    context.beginPath();
    context.arc(this.center.x, this.center.y, 15, 0, 2 * Math.PI); // circle
    context.fillStyle = this.color;
    context.fill();
  }

  #euclideanDistance(pacmansLocation, myLocation) {
    const xHypot = (pacmansLocation.x - myLocation.x) ** 2;
    const yHypot = (pacmansLocation.y - myLocation.y) ** 2;
    return Math.sqrt(xHypot + yHypot);
  }

  #sameLocation(board, direction) {
    for (const ghost of board.ghosts) {
      if (
        ghost.location.x == this.location.x + direction.x &&
        ghost.location.y == this.location.y + direction.y
      ) {
        return true;
      }
    }
    return false;
  }

  #findAllValidDirections(board) {
    const validDirections = [];

    if (
      this.location.x > 0 &&
      !(
        board.getObjectInLocation({
          x: this.location.x - 1,
          y: this.location.y,
        }) === CONSTANTS.boardItems.obstacle
      ) &&
      !this.#sameLocation(board, { x: -1, y: 0 })
    ) {
      validDirections.push({ x: -1, y: 0 }); // Left
    }
    if (
      this.location.x < CONSTANTS.boardItems.boardLength - 1 &&
      !(
        board.getObjectInLocation({
          x: this.location.x + 1,
          y: this.location.y,
        }) === CONSTANTS.boardItems.obstacle
      ) &&
      !this.#sameLocation(board, { x: 1, y: 0 })
    ) {
      validDirections.push({ x: 1, y: 0 }); // Right
    }
    if (
      this.location.y > 0 &&
      !(
        board.getObjectInLocation({
          x: this.location.x,
          y: this.location.y - 1,
        }) === CONSTANTS.boardItems.obstacle
      ) &&
      !this.#sameLocation(board, { x: 0, y: -1 })
    ) {
      validDirections.push({ x: 0, y: -1 }); // Up
    }
    if (
      this.location.y < CONSTANTS.boardItems.boardLength - 1 &&
      !(
        board.getObjectInLocation({
          x: this.location.x,
          y: this.location.y + 1,
        }) === CONSTANTS.boardItems.obstacle
      ) &&
      !this.#sameLocation(board, { x: 0, y: 1 })
    ) {
      validDirections.push({ x: 0, y: 1 }); // Down
    }
    if (
      this.#euclideanDistance(board.pacman.location, this.location) == 0 ||
      validDirections.length == 0
    ) {
      validDirections.push({ x: 0, y: 0 });
    }
    return validDirections;
  }

  #directionToGoTo(board, pacman) {
    const validDirections = this.#findAllValidDirections(board);
    const distances = [];
    for (const direction of validDirections) {
      distances.push(
        this.#euclideanDistance(
          {
            x: this.location.x + direction.x,
            y: this.location.y + direction.y,
          },
          pacman.location
        )
      );
    }
    let distanceToGoTo = Math.min(...distances);
    const randomNum = Math.random();
    if (randomNum < 0.3 && distanceToGoTo != 0) {
      distanceToGoTo = Math.max(...distances);
    }
    const directionToGoTo = validDirections[distances.indexOf(distanceToGoTo)];
    return directionToGoTo;
  }

  makeNextMove(board, pacman) {
    const direction = this.#directionToGoTo(board, pacman);
    if (
      board.getObjectInLocation(this.previous.location) ===
      CONSTANTS.boardItems.pacman
    ) {
      this.previous = new Empty(this.location);
    }
    board.board[this.location.x][this.location.y] = this.previous;
    this.location = {
      x: this.location.x + direction.x,
      y: this.location.y + direction.y,
    };
    this.previous = board.board[this.location.x][this.location.y];
    board.board[this.location.x][this.location.y] = this;
    super.realignCenter();
  }
}
