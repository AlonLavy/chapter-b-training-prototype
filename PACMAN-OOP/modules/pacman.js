class Pacman extends BoardItem {
    constructor(location) {
        super(location);
    }

    draw(center) {
        context.beginPath();
        context.arc(center.x, center.y, 30, (0.15 * Math.PI) + rotation, (1.85 * Math.PI) + rotation); // half circle
        context.lineTo(center.x, center.y);
        context.fillStyle = pac_color; //color
        context.fill();
        context.beginPath();
        switch (rotation) {
            case pacmanRotation.right:
                context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI);
                break;
            case pacmanRotation.left:
                context.arc(center.x - 5, center.y - 15, 5, 0, 2 * Math.PI);
                break;
            case pacmanRotation.up:
                context.arc(center.x + 15, center.y - 5, 5, 0, 2 * Math.PI);
                break;
            case pacmanRotation.down:
                context.arc(center.x + 15, center.y + 5, 5, 0, 2 * Math.PI);
                break;
        }
        context.fillStyle = "rgb(0,0,0)"; //color
        context.fill();
    }
}