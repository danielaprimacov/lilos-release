class Enemy {
  constructor(gameScreen, width, height, imageURL) {
    this.gameScreen = gameScreen;
    this.width = width;
    this.height = height;
    this.angle = Math.random() * 360;
    this.speed = 0.8;
    this.isJumping = false;
    this.health;

    this.enemyElement = document.createElement("img");
    this.enemyElement.src = imageURL;
    this.enemyElement.style.position = "absolute";

    this.left = 400;
    this.top = 300;

    this.enemyElement.style.width = `${this.width}px`;
    this.enemyElement.style.height = `${this.height}px`;
    this.enemyElement.style.top = `${this.top}px`;
    this.enemyElement.style.left = `${this.left}px`;

    // Append the Enemy to the screen
    this.gameScreen.appendChild(this.enemyElement);

    this.updatePosition();

    this.hasCollied = false;

    // Cooldown timer for collision detection (in milliseconds)
    this.collisionCooldown = 2000; // 1 second cooldown
    this.lastCollisionTime = 0; // Last collision timestamp

    // Health
    let progressHealth = document.createElement("progress");
    progressHealth.value = 100;
    progressHealth.max = 100;
    progressHealth.min = 0;

    progressHealth.classList.add("enemy-health");

    this.health = progressHealth;
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

    this.left = positionX - this.width / 2; // Updating left position for collision detection
    this.top = positionY - this.height / 2; // Updating top position for collision detection

    // Calculate the angle to make the enemy face the center of the circle
    const angleToCenter =
      Math.atan2(centerY - positionY, centerX - positionX) * (180 / Math.PI);
    this.enemyElement.style.transform = `rotate(${angleToCenter + 100}deg)`;
  }

  move() {
    if (this.isJumping) return;
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

  jumpToTheOtherSide() {
    if (this.isJumping) return; // Prevent multiple jumps
    this.isJumping = true;

    const targetAngle = (this.angle + 180) % 360; // Exact opposite side
    const startAngle = this.angle;
    let progress = 0;
    const jumpDuration = 700; //700ms for the jump animation
    const startTime = performance.now();

    const animateJump = (currentTime) => {
      progress = (currentTime - startTime) / jumpDuration;

      if (progress < 1) {
        // Smooth interpolation from startAngle to targetAngle
        this.angle = startAngle + (targetAngle - startAngle) * progress;
        this.updatePosition();
        requestAnimationFrame(animateJump);
      } else {
        // Ensure final position is exactly at the opposite side
        this.angle = targetAngle;
        this.updatePosition();
        this.isJumping = false; // Reset jumping flag
      }
    };

    requestAnimationFrame(animateJump);
  }

  didCollide(player) {
    const playerRect = player.element.getBoundingClientRect();
    const enemyRect = this.enemyElement.getBoundingClientRect();

    const currentTime = Date.now();

    // Check if the enemy intersects with the player
    const isColliding =
      playerRect.left < enemyRect.right &&
      playerRect.right > enemyRect.left &&
      playerRect.top < enemyRect.bottom &&
      playerRect.bottom > enemyRect.top;

    if (isColliding && !this.hasCollied) {
      // Only allow one collision event if it's been enough time (no duplicate hits)
      if (currentTime - this.lastCollisionTime >= this.collisionCooldown) {
        this.hasCollied = true;
        this.lastCollisionTime = currentTime;
        return true; // Collision detected
      }
    }
    return false; // No collision
  }

  resetCollision() {
    // Reset the collision state when the enemy moves past the player
    if (this.hasCollied) {
      this.hasCollied = false;
    }
  }

  // Track when the enemy leaves the player area, so collision is no longer valid
  exitCollisionArea(player) {
    const playerRect = player.element.getBoundingClientRect();
    const enemyRect = this.enemyElement.getBoundingClientRect();

    // Check if the enemy has exited the player's area (this helps avoid multiple hits)
    if (
      enemyRect.left > playerRect.right ||
      enemyRect.right < playerRect.left
    ) {
      this.resetCollision();
    }
  }
}
