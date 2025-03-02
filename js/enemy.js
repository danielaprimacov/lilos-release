class Enemy {
  constructor(gameScreen, width, height, imageURL) {
    this.gameScreen = gameScreen;
    this.width = width;
    this.height = height;
    this.angle = Math.random() * 360;

    this.enemyElement = document.createElement("img");
    this.enemyElement.src = imageURL;
    this.enemyElement.style.position = "absolute";

    this.enemyElement.style.width = `${this.width}px`;
    this.enemyElement.style.height = `${this.height}px`;
    this.enemyElement.style.top = `${this.top}px`;
    this.enemyElement.style.left = `${this.left}px`;

    // Append the Enemy to the screen
    this.gameScreen.appendChild(this.enemyElement);

    this.updatePosition();
  }

  updatePosition() {
    const arena = this.gameScreen.getBoundingClientRect();

    const centerX = arena.width / 2;
    const centerY = arena.height / 2;
    const arenaRadius = arena.width / 2;

    const angleInRadians = this.angle * (Math.PI / 180);

    const positionX = centerX + arenaRadius * Math.cos(angleInRadians);
    const positionY = centerY + arenaRadius * Math.sin(angleInRadians);

    this.enemyElement.style.left = `${positionX + 50}px`;
    this.enemyElement.style.top = `${positionY + 30}px`;
    const angleToCenter =
      Math.atan2(centerY - positionY, centerX - positionX) * (180 / Math.PI);
    this.enemyElement.style.transform = `rotate(${angleToCenter + 150}deg)`;
  }
}
