class Enemy {
  constructor(gameScreen, width, height, imageURL) {
    this.gameScreen = gameScreen;
    this.width = width;
    this.height = height;
    this.angle = Math.random() * 360;
    this.speed = 1;

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
    const arenaRadius = Math.min(arena.width, arena.height) / 2 - 30; // This is now the radius for the perimeter

    const angleInRadians = this.angle * (Math.PI / 180);

    const positionX = centerX + arenaRadius * Math.cos(angleInRadians);
    const positionY = centerY + arenaRadius * Math.sin(angleInRadians);

    // Position the enemy element
    this.enemyElement.style.left = `${positionX - this.width / 2}px`; // Center the image
    this.enemyElement.style.top = `${positionY - this.height / 2}px`; // Center the image

    // Calculate the angle to make the enemy face the center of the circle
    const angleToCenter =
      Math.atan2(centerY - positionY, centerX - positionX) * (180 / Math.PI);
    this.enemyElement.style.transform = `rotate(${angleToCenter + 100}deg)`;
  }

  move() {
    // Randomly change the angle by a small amount
    this.angle += this.speed;

    // Check if the angle exteends 360 or goes below 0
    if (this.angle >= 360) {
      this.angle -= 360;
    } else if (this.angle < 0) {
      this.angle += 360;
    }

    // Update position
    this.updatePosition();
  }
}
