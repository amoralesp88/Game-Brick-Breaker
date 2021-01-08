let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);

let home = document.getElementById("welcome-image");


let playAgainBtn = document.getElementById("buttonrestart")
let unShow = (element) => element.style.visibility = "hidden"
let hide = (element) => element.style.display = "none"
unShow(playAgainBtn)


buttonrestart.addEventListener('click', () => {
    location.reload();
});

document.addEventListener('keydown', (event) => {
    console.log('entra',home)
    switch (event.keyCode) {
        case 32:
            game.start();
            hide(home)
            break;
        default:
            break;
    }
});


let lastTime = 0;
function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    game.update(deltaTime);
    game.draw(ctx);

   

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);