module.exports = class Enemy{
    constructor(x, y, speed){
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = 60;
        this.height = 30;
    }

    draw(){
        return {x: this.x, y: this.y, width: this.width, height: this.height}
    }
}