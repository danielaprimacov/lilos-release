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
      "./images/stitch.png"
    );

    this.enemy = new Enemy(
      this.battleArena,
      100,
      100,
      "./images/reuben-enemy.png"
    );

    // Game Screen width and height
    this.height = 600;
    this.width = 1000;

    // Game Control Settings
    this.gameIsOver = false;
    this.gameIntervalId = null;
    this.enemyJumpIntervalId = null;
    this.gameLoopFrequency = Math.round(1000 / 60);
  }

  start() {
    if (this.gameIntervalId) {
      clearInterval(this.gameIntervalId);
    }

    if (this.enemyJumpIntervalId) {
      clearInterval(this.enemyJumpIntervalId);
    }

    this.gameIsOver = false;

    // Reset to original position
    this.player.left = 200; 
    this.player.top = 400;
    this.player.characterRotation = 0;
    this.player.updatePosition();
    this.player.isJumping = false;
    this.player.updateArrowPosition();

    this.enemy.left = 100;
    this.enemy.top = 100;
    this.enemy.updatePosition();

    // Clear previous game screen content (e.g., player, enemy)
    this.gameScreen.innerHTML = "";

    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    this.startScreen.classList.add("hidden");
    this.gameEndScreen.style.display = "none";

    setTimeout(() => {
      this.startScreen.style.display = "none";

      this.gameScreen.style.display = "flex";
      this.gameScreen.classList.add("active");

      this.gameScreen.appendChild(this.battleArena);
      this.battleArena.style.display = "flex";
      this.battleArena.classList.add("active");
    }, 1000);

    this.gameScreen.appendChild(this.battleArena);
    this.gameScreen.appendChild(this.enemy.health);
    this.gameScreen.appendChild(this.player.health);
    this.battleArena.style.display = "flex";

    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);

    this.enemyJumpIntervalId = setInterval(() => {
      this.enemy.jumpToTheOtherSide();
    }, 3000);
  }

  gameLoop() {
    this.update();
    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId);
      clearInterval(this.enemyJumpIntervalId);
    }
  }

  update() {
    this.enemy.move();

    if (!this.player.isJumping && this.enemy.didCollide(this.player)) {
      if (this.player.health.value > 0) {
        this.player.health.value -= 10;
      }
    } else if (
      this.player.isJumping &&
      this.player.isPlayerTouchingEnemy(this.enemy)
    ) {
      this.enemy.health.value -= 10;
    }

    if (this.player.health.value === 0) {
      this.endGame();
    }

    this.enemy.resetCollision();
    this.enemy.exitCollisionArea(this.player);
  }

  endGame() {
    this.gameIsOver = true;
    if (this.gameIsOver) {
      this.gameScreen.style.display = "none";
      this.battleArena.style.display = "none";

      this.gameEndScreen.style.display = "flex";
      this.gameEndScreen.classList.add;

      clearInterval(this.gameIntervalId);
      clearInterval(this.enemyJumpIntervalId);
    }
  }

  resetGame() {
    window.location.reload();
  }
}
