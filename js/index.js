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
};
