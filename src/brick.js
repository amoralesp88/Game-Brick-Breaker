class Brick {

    constructor(game, position){
        this.image = new Image()
        this.image.src = './assets/images/brick.png'

       this.game = game;

        this.position = position; 

        this.width = 80;
        this.height = 24;
        this.sounds = {
            bricks: new Audio("../assets/audio/bricks.mp3")
        }

        this.markedForDeletion= false;
    }


    update(){
        if(detectCollision(this.game.ball, this)){
            this.game.ball.speed.y = -this.game.ball.speed.y;
            this.markedForDeletion = true;
            this.sounds.bricks.play()
        }  
    }

    draw(ctx){
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
            );
    }
}