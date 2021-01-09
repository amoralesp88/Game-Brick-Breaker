class InputHandler {
    constructor(paddle, game) {
        document.addEventListener('keydown', (event) => {
            switch (event.keyCode) {
                case 37:
                    paddle.moveLeft();
                    break;

                case 39:
                    paddle.moveRight();
                    break;

                case 27:
                    game.togglePause();
                    break;

                default:
                    break;
            }
        })
        document.addEventListener('keyup', (event) => {
            switch (event.keyCode) {
                case 37:
                    if (paddle.speed < 0) paddle.stop();
                    break;

                case 39:
                    paddle.stop();
                    if (paddle.speed > 0) paddle.stop();
                    break;


                default:
                    break;
            }
        })
    }
}