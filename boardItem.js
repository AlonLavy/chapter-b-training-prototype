export class BoardItem {
    constructor(location) {
        this.location = location;
        this.center = new Object();
        this.center.x = this.location.x * 60 + 30;
        this.center.y = this.location.y * 60 + 30;
    }

    draw() {
        throw new Error('Abstract method must be implemented in child class');
    }

    makeNextMove(board, pacman) {
        throw new Error('Abstract method must be implemented in child class');
    }

    realignCenter() {
        this.center.x = this.location.x * 60 + 30;
        this.center.y = this.location.y * 60 + 30;
    }

    
}