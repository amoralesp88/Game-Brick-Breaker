const GAMESTATE = {
    PAUSE: 0,
    RUNNING: 1,
    MENU: 2,
    NEWLEVEL: 4,
    GAMEOVER: 3

};

class Game {

    constructor(gameWidth, gameHeight) {
        this.restartButton = document.getElementById("buttonrestart")
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.gamestate = GAMESTATE.MENU;
        this.ball = new Ball(this);
        this.paddle = new Paddle(this);
        this.bricks = [];
        this.gameObjects = [];
        this.lives = 2;

        this.levels = [level1, level2, level3, level4];
        this.currentLevel = 0;

        new InputHandler(this.paddle, this);

        this.sounds = {
            theme: new Audio("../assets/audio/theme.mp3"),
            brick: new Audio("../assets/audio/bricks.mp3"),
            gameover: new Audio("../assets/audio/game-over-sound.wav")

        }

    }


    start() {
        this.sounds.theme.play()

        if (this.gamestate != GAMESTATE.MENU &&
            this.gamestate != GAMESTATE.NEWLEVEL

        ) return;


        this.bricks = buildLevel(this, this.levels[this.currentLevel]);
        this.ball.reset(this.currentLevel);

        this.gameObjects = [this.ball, this.paddle];
        this.gamestate = GAMESTATE.RUNNING;

        document.getElementById('level').innerText = `Level ${this.currentLevel +1}`

    }


    update(deltaTime) {
        if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;

        if (
            this.gamestate === GAMESTATE.PAUSE ||
            this.gamestate === GAMESTATE.MENU ||
            this.gamestate === GAMESTATE.GAMEOVER
        )
            return;

        if (this.bricks.length === 0) {
            this.currentLevel++;
            this.gamestate = GAMESTATE.NEWLEVEL;
            this.start();
        }
        [...this.gameObjects, ...this.bricks].forEach(object =>
            object.update(deltaTime));

        this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);

    }

    draw(ctx) {

        [...this.gameObjects, ...this.bricks].forEach(object => object.draw(ctx));
        if (this.gamestate == GAMESTATE.PAUSE) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fill();

            ctx.font = '30px Cabin Sketch';
            ctx.fillStyle = 'White';
            ctx.textAlign = 'center';
            ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
            this.sounds.theme.pause();
        }

        if (this.gamestate == GAMESTATE.RUNNING) {
            this.sounds.theme.play();

        }

        if (this.gamestate == GAMESTATE.MENU) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = 'rgba(0, 0, 0, 1)';
            ctx.fill();


            ctx.font = '30px Cabin Sketch';
            ctx.fillStyle = 'White';
            ctx.textAlign = 'center';
            ctx.fillText("Press SPACEBAR to Start", this.gameWidth / 2, this.gameHeight / 2);
        }

        if (this.gamestate == GAMESTATE.GAMEOVER) {
            this.gameOverImage = new Image()
            this.gameOverImage.src = '../assets/images/game-over.png'
            ctx.drawImage(
                this.gameOverImage,
                0,
                0,
                this.gameWidth,
                this.gameHeight
                );
            this.restartButton.style.visibility = "visible";
            this.sounds.gameover.play(),
            this.sounds.theme.pause()

        }
    }

    togglePause() {
        if (this.gamestate == GAMESTATE.PAUSE) {
            this.gamestate = GAMESTATE.RUNNING;
        } else {
            this.gamestate = GAMESTATE.PAUSE;
        }
    }
}
