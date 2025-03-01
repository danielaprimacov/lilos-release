window.onload = function () {
  const startButton = document.querySelector("#start-btn");
  let newGame;

  startButton.addEventListener("click", () => {
    startGame();
  });

  function startGame() {
    console.log("Start Game");

    newGame = new Game();
    newGame.start();
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
          break;
      }
    }
  });
};
