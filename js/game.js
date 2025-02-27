class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.battleArena = document.getElementById("battle-arena");
    this.gameContainer = document.getElementById("game-container");
    this.player = new Player(
      this.battleArena,
      200,
      400,
      100,
      100,
      "../images/stitch.png"
    );
    this.enemy = null;
    this.height = 600;
    this.width = 1000;
    this.score = 0;
    this.lives = 3;
    this.gameIsOver = false;
    this.gameIntervalId;
    this.gameLoopFrequency = Math.round(1000 / 60);
  }

  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    this.startScreen.classList.add("hidden");

    setTimeout(() => {
      this.startScreen.style.display = "none";

      this.gameScreen.style.display = "flex";
      this.gameScreen.classList.add("active");

      this.gameScreen.appendChild(this.battleArena);
      this.battleArena.style.display = "flex";
      this.battleArena.classList.add("active");

      this.gameScreen.appendChild(this.gameContainer);
      this.gameContainer.style.display = "flex";
      this.gameContainer.classList.add("active");
    }, 1000);

    this.gameScreen.appendChild(this.battleArena);
    this.battleArena.style.display = "flex";

    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }

  gameLoop() {
    this.update();
    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId);
    }
  }

  update() {}
}
