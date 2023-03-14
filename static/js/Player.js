export default class Player{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.speed = 5;
        this.width = 60;
        this.height = 30;

        this.bullets = [];
        this.bulletDelay = 1;

        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
    }

    draw(){
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
        
        return {x: this.x, y: this.y, width: this.width, height: this.height}
        // ctx.drawImage(this.playerSprite, this.x, this.y, this.width, this.height)
    }

    shootBullet(){
        if(this.bulletDelay > 0){
            this.bulletDelay--;
        }

        let bullet = {speed: 6, x: this.x + this.width/2, y: this.y, width: 5, height: 10, interval: 1000}
        if(this.v){
            this.bullets.push(bullet);
            this.v = false;
        }
        return this.bullets
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

        if(key.code === "KeyV"){
            if(this.bulletDelay == 0){ 
                this.v = true;
                this.bulletDelay = 10
            }

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
        if(key.code === "KeyV"){
            this.v = false;
        }
    }

}

