export default class BoardItem{
    constructor(location)
    {
        this.location = location;
        this.center = new Object();
        this.center.x = this.location[0] * 60 + 30;
        this.center.y = this.location[1] * 60 + 30;
    }

    draw(context)
    {
        throw new Error('Abstract method must be implemented in child class');
    }

    makeNextMove(board, pacman)
    {
        throw new Error('Abstract method must be implemented in child class');
    }

    realignCenter()
    {
        this.center.x = this.location[0] * 60 + 30;
        this.center.y = this.location[1] * 60 + 30;
    }
}