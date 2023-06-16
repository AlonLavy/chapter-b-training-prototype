export class BoardItem{
    constructor(location)
    {
        this.location = location;
    }

    draw(center)
    {
        throw new Error('Abstract method must be implemented in child class');
    }

    findNextMove(board)
    {
        throw new Error('Abstract method must be implemented in child class');
    }
}