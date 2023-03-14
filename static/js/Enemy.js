export default class Enemy{
    constructor(x, y, speed){
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = 60;
        this.height = 30;
        this.enemySprite = new Image();
        this.enemySprite.src = '/sprites/player/enemy.png';
    }

    draw(ctx){
        ctx.drawImage(this.enemySprite, this.x, this.y, this.width, this.height)
    }
}