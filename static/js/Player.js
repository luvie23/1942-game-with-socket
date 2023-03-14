export default class Player{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.speed = 5;
        this.playerSprite = new Image();
        this.playerSprite.src = '/sprites/player/player.png';

        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
    }

    draw(ctx){
        if(this.up && (this.y - this.speed) > 0){
            this.y -= this.speed;
        }
        if(this.down && (this.y - this.speed) < 750){
            this.y += this.speed;
        }
        if(this.right && (this.x - this.speed) < 525){
            this.x += this.speed;
        }
        if(this.left && (this.x - this.speed) > 0){
            this.x -= this.speed;
        }
        ctx.drawImage(this.playerSprite, this.x, this.y,60,30)
    }

    keydown = (key) => {
        if(key.code === "ArrowUp"){
            this.up = true;
        }
        if(key.code === "ArrowDown"){
            this.down = true;
        }
        if(key.code === "ArrowRight"){
            this.right = true;
        }
        if(key.code === "ArrowLeft"){
            this.left = true;
        }

        if(key.code === "Space"){
            this.space = true;
        }
    }

    keyup =(key) =>{
        if(key.code === "ArrowUp"){
            this.up = false;
        }
        if(key.code === "ArrowDown"){
            this.down = false;
        }
        if(key.code === "ArrowRight"){
            this.right = false;
        }
        if(key.code === "ArrowLeft"){
            this.left = false;
        }
        if(key.code === "Space"){
            this.space = false;
        }
    }

}

