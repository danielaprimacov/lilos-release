class Player {
  constructor(gameScreen, left, top, width, height, imageURL) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.characterRotation = 0;
    this.arrowDirection = 1;
    this.arrowRotation = 0;
    this.isJumping = false;

    this.element = document.createElement("img");
    this.element.src = imageURL;
    this.element.style.position = "absolute";

    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;

    this.gameScreen.appendChild(this.element);

    // Create the arrow element
    let arrowElement = document.createElement("div");
    arrowElement.classList.add("arrow");
    this.arrowElement = arrowElement;
    // Append to the arrow element
    this.gameScreen.appendChild(this.arrowElement);
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.transform = `rotate(${this.characterRotation}deg)`;

    this.updateArrowPosition();
  }

  updateArrowPosition() {
    const arrowDistance = 50; // Distance above Stitch

    // Convert character rotation to radians
    const angleInRadians = this.characterRotation * (Math.PI / 180);

    // Calculate new arrow position relative to Stitch
    const arrowX = Math.abs(
      this.left - arrowDistance * Math.sin(angleInRadians)
    );
    const arrowY =
      this.top - this.height / 2 - arrowDistance * Math.cos(angleInRadians);

    // When Stitch is at the top, enforce a specific top value
    if (this.top > 0 && this.top < 50) {
      this.arrowElement.style.top = `${this.top - 180}px`;
      this.arrowElement.style.left = `${arrowX}px`;
    } else if (this.top > 50 && this.top < 100) {
      this.arrowElement.style.top = `${this.top - 160}px`;
      this.arrowElement.style.left = `${arrowX}px`;
    } else if (this.top > 100 && this.top < 150) {
      this.arrowElement.style.top = `${this.top - 160}px`;
      this.arrowElement.style.left = `${this.left}px`;
    } else if (this.top > 150 && this.top < 200) {
      this.arrowElement.style.top = `${this.top - 160}px`;
      this.arrowElement.style.left = `${this.left - 40}px`;
    } else if (this.top > 200 && this.top < 261) {
      this.arrowElement.style.top = `${this.top - 160}px`;
      this.arrowElement.style.left = `${this.left + 20}px`;
    } else if (this.top > 261 && this.top < 300) {
      this.arrowElement.style.top = `${this.top - 160}px`;
      this.arrowElement.style.left = `${this.left}px`;
    } else if (this.top > 300 && this.top < 400) {
      this.arrowElement.style.top = `${this.top - 130}px`;
      this.arrowElement.style.left = `${this.left}px`;
    } else {
      this.arrowElement.style.top = `${arrowY - 20}px`;
      this.arrowElement.style.left = `${arrowX}px`;
    }

    this.arrowElement.style.transform = `rotate(${
      this.characterRotation + this.arrowRotation
    }deg)`;
  }

  move() {
    if (this.isJumping) return;
    this.isJumping = true;

    let jumpImg = "./images/jump-stitch.png";
    let originalImg = this.element.src;
    this.element.src = jumpImg;

    const arena = this.gameScreen.getBoundingClientRect();

    const diameter = arena.width; // Fixed diameter of the circle
    const radius = diameter / 2;
    const angleInRadians =
      (this.characterRotation + this.arrowRotation) * (Math.PI / 180);

    const centerX = arena.width / 2;
    const centerY = arena.height / 2;

    // Calculate new position based on the circular path
    let newLeft = centerX + radius * Math.sin(angleInRadians) - this.width / 2; // X position
    let newTop = centerY - radius * Math.cos(angleInRadians) - this.height / 2; // Y position (subtracted to flip Y-axis)

    // Compute the distance from the center (using Pythagorean theorem)
    const distanceFromCenter = Math.sqrt(
      Math.pow(newLeft - arena.width / 2, 2) +
        Math.pow(newTop - arena.height / 2, 2)
    );

    // Maximum allowed distance from the center (radius of the arena)
    const maxDistance = radius;

    if (distanceFromCenter < 180) {
      newTop -= 10;
      newLeft -= 60;
    } else if (distanceFromCenter > 180 && distanceFromCenter < 190) {
      newTop -= 30;
      newLeft -= 30;
    } else if (distanceFromCenter > 190 && distanceFromCenter < 200) {
      newTop -= 40;
      newLeft -= 40;
    } else if (distanceFromCenter > 200 && distanceFromCenter < 210) {
      newLeft -= 50;
      newTop -= 40;
    } else if (distanceFromCenter > 210 && distanceFromCenter < 221) {
      newLeft -= 50;
      newTop -= 50;
    } else if (distanceFromCenter > 221 && distanceFromCenter < 231) {
      newLeft += 20;
      newTop -= 30;
    } else if (distanceFromCenter > 231 && distanceFromCenter < maxDistance) {
      newLeft -= 0;
      newTop += 60;
    } else if (distanceFromCenter > maxDistance && distanceFromCenter < 260) {
      newLeft += 60;
    } else if (
      distanceFromCenter > maxDistance &&
      distanceFromCenter < 260 &&
      this.top < 50
    ) {
      newLeft -= 90;
      newTop -= 40;
    } else if (distanceFromCenter > 260 && distanceFromCenter < 270) {
      newLeft += 80;
      newTop += 30;
    } else if (distanceFromCenter > 270 && distanceFromCenter < 280) {
      newLeft -= 0;
    }

    // If the new position exceeds the radius, we need to scale it down
    if (distanceFromCenter > maxDistance) {
      const scale = maxDistance / distanceFromCenter; // Calculate scaling factor
      newLeft = arena.width / 2 + (newLeft - arena.width / 2) * scale - 10;
      newTop = arena.height / 2 + (newTop - arena.height / 2) * scale;
    }

    console.log(`distance ${distanceFromCenter}`);
    console.log(`Left ${newLeft} Top ${newTop}`);

    // Compute the new character rotation to face the center
    const newRotation =
      Math.atan2(centerY - newTop, centerX - newLeft) * (180 / Math.PI) + 90;

    let startTime = null;
    const duration = 700; // Duration of the jump

    const animateJump = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Interpolate position and rotation
      this.left = this.left + (newLeft - this.left) * progress;
      this.top = this.top + (newTop - this.top) * progress;
      this.characterRotation =
        this.characterRotation +
        (newRotation - this.characterRotation) * progress;

      this.updatePosition();

      if (progress < 1) {
        requestAnimationFrame(animateJump);
        this.arrowElement.style.display = "none";
      } else {
        this.arrowElement.style.display = "block";
        this.element.src = originalImg;
        this.isJumping = false;
      }
    };

    requestAnimationFrame(animateJump);
  }

  moveArrow(key) {
    //Set the limits of the line rotation
    const minRotation = -35;
    const maxRotation = 35;
    const rotationStep = 5;
    if (key === "left" && this.arrowRotation > minRotation) {
      this.arrowRotation -= rotationStep;
    } else if (key === "right" && this.arrowRotation < maxRotation) {
      this.arrowRotation += rotationStep;
    }
    //console.log(`arrow rotation ${this.arrowRotation}`);
    this.updateArrowPosition();
  }

  attack(enemy) {}

  // New method to check if the player is touching the enemy (based on the Y-axis)
  isPlayerTouchingEnemy(enemy) {
    // Assuming the player jumps vertically, check if the player’s vertical position
    // overlaps with the enemy's position
    const playerRect = this.element.getBoundingClientRect();
    const enemyRect = enemy.enemyElement.getBoundingClientRect();

    return (
      playerRect.top < enemyRect.bottom && // Player is above the enemy
      playerRect.bottom > enemyRect.top && // Player is below the enemy
      playerRect.left < enemyRect.right && // Player's left side is to the left of the enemy
      playerRect.right > enemyRect.left // Player's right side is to the right of the enemy
    );
  }
}
