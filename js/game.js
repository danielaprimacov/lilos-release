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

    // Game Stats
    this.score = 0;
    this.scoreHTML = document.getElementById("score");

    this.lives = 5;
    this.livesHTML = document.getElementById("lives");

    this.hasScored = false;

    // Game Control Settings
    this.gameIsOver = false;
    this.gameIntervalId = null;
    this.enemyJumpIntervalId = null;
    this.gameLoopFrequency = Math.round(1000 / 60);
  }

  start() {
    if (this.gameIntervalId) {
      clearInterval(this.gameIntervalId); // Prevent duplicate intervals if already running
    }

    if (this.enemyJumpIntervalId) {
      clearInterval(this.enemyJumpIntervalId);
    }

    // Reset score, lives, and stats
    this.score = 0;
    this.lives = 5;
    this.hasScored = false;
    this.gameIsOver = false;

    // Reset the DOM elements for score and lives
    this.livesHTML.innerText = this.lives;
    this.scoreHTML.innerText = this.score;

    this.player.left = 200; // Reset to original position
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

      this.gameScreen.appendChild(this.gameContainer);
      this.gameContainer.style.display = "flex";
      this.gameContainer.classList.add("active");
    }, 1000);

    this.gameScreen.appendChild(this.battleArena);
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
      if (this.lives > 0) {
        this.lives--;
        // Change lives on the DOM
        this.livesHTML.innerText = this.lives;
      }
    } else if (
      this.player.isJumping &&
      this.player.isPlayerTouchingEnemy(this.enemy) &&
      !this.hasScored
    ) {
      this.score++;
      // Change score on the DOM
      this.scoreHTML.innerText = this.score;

      this.hasScored = true;
    }

    // If the player is no longer touching the enemy, reset hasScored
    if (
      !this.player.isJumping ||
      !this.player.isPlayerTouchingEnemy(this.enemy)
    ) {
      this.hasScored = false;
    }

    if (this.lives === 0) {
      //this.endGame();
    }

    this.enemy.resetCollision();
    this.enemy.exitCollisionArea(this.player);
  }

  endGame() {
    this.gameIsOver = true;
    if (this.gameIsOver) {
      this.gameScreen.style.display = "none";
      this.battleArena.style.display = "none";
      this.gameContainer.style.display = "none";

      this.gameEndScreen.style.display = "flex";
      this.gameEndScreen.classList.add("active");

      clearInterval(this.gameIntervalId);
      clearInterval(this.enemyJumpIntervalId);
    }
  }

  resetGame() {
    this.gameEndScreen.classList.remove("active");

    setTimeout(() => {
      this.gameEndScreen.style.display = "none";
      this.gameContainer.style.display = "flex";
      this.gameContainer.classList.add("active");

      this.gameScreen.style.display = "flex";
      this.gameScreen.classList.add("active");
      this.start();
    }, 1000);
  }
}
