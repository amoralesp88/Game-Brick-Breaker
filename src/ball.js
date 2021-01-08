class Ball {
    constructor(game) {
        this.image = new Image()
        this.image.src = './assets/images/ball.png'


        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.game = game;

       this.reset();
       this.size = 19;
    }
    reset (){
        this.position = {
            x: Math.round(Math.random() * (700 - 20) + 20),
            y: Math.round(Math.random() * (500 - 400) + 400)
        };

        this.speed = {
            x: 6,
            y: -2
        };
    }

    draw(ctx) {

        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.size,
            this.size
        );
    }

    update(deltaTime) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
            this.speed.x = -this.speed.x;
        }

        if (this.position.y < 0) {
            this.speed.y = -this.speed.y;
        }

        if (this.position.y + this.size > this.gameHeight) {
            this.game.lives--;
            this.reset();

        }
        if (detectCollision(this, this.game.paddle)) {
            this.speed.y = -this.speed.y;
            this.position.y = this.game.paddle.position.y - this.size;
        }
    }
}