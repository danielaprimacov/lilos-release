class Player {
  constructor(gameScreen, left, top, width, height, imageURL) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.directionX = 0;
    this.directionY = 0;
    this.arrowAngle = -90;
    this.arrowDirection = 1;
    this.arrowRotation = 0;

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
    arrowElement.style.top = `${this.top - 80}px`;
    arrowElement.style.left = `${this.left + this.width / 2 - 105}px`;
    arrowElement.style.transform = `rotate(${this.arrowRotation}deg)`;
    this.arrowElement = arrowElement;

    // Append to the arrow element
    this.gameScreen.appendChild(this.arrowElement);

    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.updateArrowPosition();
  }

  updateArrowPosition() {
    this.arrowElement.style.top = `${this.top - 80}px`;
    this.arrowElement.style.left = `${this.left + this.width / 2 - 105}px`;
    this.arrowElement.style.transform = `rotate(${this.arrowRotation}deg)`;
  }

  move() {}

  moveArrow(key) {
    //Set the limits of the line rotation
    const minRotation = -55;
    const maxRotation = 55;
    const rotationStep = 10;
    if (key === "left" && this.arrowRotation > minRotation) {
      this.arrowRotation -= rotationStep;
    } else if (key === "right" && this.arrowRotation < maxRotation) {
      this.arrowRotation += rotationStep;
    }
    this.updateArrowPosition();
  }

  atack() {}
}
