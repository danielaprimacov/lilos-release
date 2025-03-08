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
    this.isMuted = false;

    this.bgMusic = new Audio("../audio/stitch-instrumental.mp3");
    this.reubenWin = new Audio("../audio/reuben-win.mp3");
    this.allAudio = [this.bgMusic];
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
      // Play the background music
      if (!this.isMuted) {
        this.bgMusic.loop = true;
        this.bgMusic.volume = 0.07;
        this.bgMusic.play();
      }

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

        const musicActions = document.createElement("div");
        musicActions.innerHTML = `<img id="music-action" src="../images/music.png" alt="Music icon">`;
        this.gameScreen.appendChild(musicActions);

        const music = document.getElementById("music-action");

        musicActions.addEventListener("click", () => {
          if (this.isMuted) {
            // Unmute all audio
            this.allAudio.forEach((audio) => {
              audio.muted = false; // Unmute each audio
              audio.play(); // Start playing if needed
            });
            music.src = "../images/music.png"; // Change music icon to unmuted
            this.isMuted = false;
          } else {
            // Mute all audio
            this.allAudio.forEach((audio) => {
              audio.muted = true; // Mute each audio
              audio.pause(); // Stop any playing audio
            });
            music.src = "../images/muted-music.png"; // Change music icon to muted
            this.isMuted = true;
          }
        });

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
        // Stop the Music
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;

        this.gameScreen.style.display = "none";
        this.battleArena.style.display = "none";

        this.gameEndScreen.style.display = "flex";

        setTimeout(() => {
          this.gameEndScreen.classList.add("active");
          this.reubenWin.play();
          this.reubenWin.volume = 0.1;
        }, 500);

        clearInterval(this.gameIntervalId);
        clearInterval(this.enemyJumpIntervalId);
      }, 500);
      this.reubenWin.pause();
      this.reubenWin.currentTime = 0;
    }
  }

  endGameWin() {
    this.gameIsOver = true;
    if (this.gameIsOver) {
      // Stop the Music
      this.bgMusic.pause();
      this.bgMusic.currentTime = 0;

      this.gameScreen.style.display = "none";
      this.battleArena.style.display = "none";
      this.gameEndScreen.style.display = "none";
      this.gameEndScreen.classList.remove("active");

      this.gameEndScreenWin.style.display = "flex";

      setTimeout(() => {
        this.gameEndScreenWin.classList.add("active");
      }, 500);

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
    explanation.innerHTML = `
  <h1>How to Play</h1>
  <p>Use the left and right arrow keys to move the player and use the space bar to jump.</p>
  <div id="how-to-play-actions">
    <img src="../images/keyboard-key-left-arrow.png" alt="How to play - left arrow" class="keyboard-arrow">
    <img src="../images/space-key.png" alt="How to play - space bar" class="keyboard-space">
    <img src="../images/keyboard-key-right-arrow.png" alt="How to play - right arrow" class="keyboard-arrow">
  </div>
  <p>The goal is to defeat the enemy by reducing his health to 0. The player and enemy health bars are visible above. To rescue Lilo, you must empty the enemy's health bar!</p>
`;

    this.modalScreen.appendChild(explanation);
  }
}
