window.onload = function () {
  const startButton = document.querySelector("#start-btn");
  const tryAgainButton = document.querySelector("#try-again-btn");
  const exitButton = document.querySelector("#exit-btn");

  let newGame = new Game();

  startButton.addEventListener("click", () => {
    startGame();
  });

  tryAgainButton.addEventListener("click", () => {
    resetGame();
  });

  exitButton.addEventListener("click", () => {
    exitGame();
  });

  function startGame() {
    console.log("Start Game");
    newGame.start();
  }

  function resetGame() {
    console.log("Reset Game");
    newGame.resetGame();
  }

  function exitGame() {
    console.log("Exit game");
    newGame.exitGame();
  }

  window.addEventListener("keydown", (event) => {
    const possibleKeys = ["ArrowLeft", "ArrowRight", "Space", " "];
    // Check if the pressed key is in the possibleKeys array
    if (possibleKeys.includes(event.key)) {
      event.preventDefault();
      switch (event.key) {
        case "ArrowLeft":
          newGame.player.moveArrow("left");
          break;

        case "ArrowRight":
          newGame.player.moveArrow("right");
          break;

        case "Space":
        case " ":
          if (!newGame.player.isJumping) {
            newGame.player.move();
          }
          break;
      }
    }
  });
};
