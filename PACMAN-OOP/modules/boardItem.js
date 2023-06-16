class BoardItem{
    constructor(location, color)
    {
        this.location = location;
        this.color = color;
    }

    placeItem(board)
    {
        board[this.location[0]][this.location[1]] = this;
    }
}