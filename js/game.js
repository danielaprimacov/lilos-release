class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end-lose");
    this.gameEndScreenWin = document.getElementById("game-end-win");
    this.battleArena = document.getElementById("battle-arena");
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

    this.modalScreen;
  }

  start() {
    if (this.gameIntervalId) {
      clearInterval(this.gameIntervalId);
    }

    if (this.enemyJumpIntervalId) {
      clearInterval(this.enemyJumpIntervalId);
    }

    this.hasCollied = false;
    this.gameIsOver = false;

    if (!this.modalScreen) {
      this.modalScreen = document.getElementById("modal-screen");
      this.createHowToPlayModal();
    }

    // Fade out the game intro smoothly
    setTimeout(() => {
      this.startScreen.style.opacity = "0"; // Start fading out
      this.gameEndScreen.style.display = "none";
      // Clear previous game screen content (e.g., player, enemy)
      this.gameScreen.innerHTML = "";

      this.gameScreen.style.height = `${this.height}px`;
      this.gameScreen.style.width = `${this.width}px`;

      // Wait for fade-out transition to complete, then hide intro
      setTimeout(() => {
        this.startScreen.style.display = "none"; // Fully hide intro screen

        // Show the game screen (but with the transition modal on top)
        this.gameScreen.style.display = "flex";
        this.gameScreen.classList.add("active");

        this.gameScreen.appendChild(this.battleArena);
        this.battleArena.style.display = "flex";
        this.battleArena.classList.add("active");

        this.gameScreen.appendChild(this.enemy.health);
        this.gameScreen.appendChild(this.player.health);
        this.battleArena.style.display = "flex";

        // Reset to original position
        this.player.left = 200;
        this.player.top = 400;
        this.player.characterRotation = 0;
        this.player.updatePosition();
        this.player.isJumping = false;
        this.player.updateArrowPosition();

        this.enemy.left = 400;
        this.enemy.top = 300;
        this.enemy.updatePosition();

        //  Show the transition modal
        this.modalScreen.style.display = "flex";
        this.modalScreen.classList.add("active");

        // After 5 seconds, fade out the transition modal
        setTimeout(() => {
          this.modalScreen.style.opacity = "0"; // Smooth fade-out

          // Hide transition screen completely after fade-out
          setTimeout(() => {
            this.modalScreen.style.display = "none";

            // Start the game loop
            this.gameIntervalId = setInterval(() => {
              this.gameLoop();
            }, this.gameLoopFrequency);

            this.enemyJumpIntervalId = setInterval(() => {
              this.enemy.jumpToTheOtherSide();
            }, 3000);
          }, 1000); // Wait for fade-out duration
        }, 5000); // Transition modal stays for 5 seconds
      }, 1000); // Wait for intro screen fade-out before displaying game screen
    }, 1000); // Delay before intro starts fading out
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
      this.player.isPlayerTouchingEnemy(this.enemy) &&
      !this.hasCollied
    ) {
      this.enemy.health.value -= 10;
      this.hasCollied = true;
    }

    if (
      !this.player.isJumping ||
      !this.player.isPlayerTouchingEnemy(this.enemy)
    ) {
      this.hasCollied = false;
    }

    if (this.player.health.value === 0) {
      this.endGame();
    } else if (this.enemy.health.value === 0) {
      this.endGameWin();
    }

    this.enemy.resetCollision();
    this.enemy.exitCollisionArea(this.player);
  }

  endGame() {
    this.gameIsOver = true;
    if (this.gameIsOver) {
      setTimeout(() => {
        this.gameScreen.style.display = "none";
        this.battleArena.style.display = "none";

        this.gameEndScreen.style.display = "flex";
        this.gameEndScreen.classList.add("active");

        clearInterval(this.gameIntervalId);
        clearInterval(this.enemyJumpIntervalId);
      }, 500);
    }
  }

  endGameWin() {
    this.gameIsOver = true;
    if (this.gameIsOver) {
      this.gameScreen.style.display = "none";
      this.battleArena.style.display = "none";
      this.gameEndScreen.style.display = "none";
      this.gameEndScreen.classList.remove("active");
      this.gameEndScreen.classList.add;

      this.gameEndScreenWin.style.display = "flex";
      this.gameEndScreenWin.classList.add("active");

      clearInterval(this.gameIntervalId);
      clearInterval(this.enemyJumpIntervalId);
    }
  }

  resetGame() {
    const gameContainer = document.querySelector("main");
    if (this.gameIsOver) {
      gameContainer.classList.add("fade-out");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  createHowToPlayModal() {
    const explanation = document.createElement("div");
    const explanationTitle = document.createElement("h1");
    const explanationParagraph = document.createElement("p");
    const goalParagraph = document.createElement("p");
    const actions = document.createElement("div");
    const leftArrow = document.createElement("img");
    const rightArrow = document.createElement("img");
    const spaceBar = document.createElement("img");

    actions.id = "how-to-play-actions";

    leftArrow.src = "../images/keyboard-key-left-arrow.png";
    leftArrow.alt = "How to play - left arrow";
    leftArrow.classList.add("keyboard-arrow");

    rightArrow.src = "../images/keyboard-key-right-arrow.png";
    rightArrow.alt = "How to play - right arrow";
    rightArrow.classList.add("keyboard-arrow");

    spaceBar.src = "../images/space-key.png";
    spaceBar.alt = "How to play - space bar";
    spaceBar.classList.add("keyboard-space");

    actions.appendChild(leftArrow);
    actions.appendChild(spaceBar);
    actions.appendChild(rightArrow);

    explanationTitle.textContent = "How to Play";
    explanationParagraph.textContent =
      "Use the left and right arrow keys to move the player and use the space bar to jump.";

    goalParagraph.textContent =
      "The goal is to defeat the enemy by reducing his health to 0.The player and enemy health bars are visible above. To rescue Lilo, you must empty the enemy's health bar!";

    explanation.appendChild(explanationTitle);
    explanation.appendChild(explanationParagraph);
    explanation.appendChild(actions);
    explanation.appendChild(goalParagraph);

    this.modalScreen.appendChild(explanation);
  }
}
